import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ApiService } from '../../api.service';
import { StorageService } from '../../storage.service';
import { CheckOption } from '../../check-option';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  columns: CheckOption[] = [
    {
      code: 'cover',
      translation: 'table_cover',
      checked: true
    }, {
      code: 'title',
      translation: 'table_title',
      checked: true
    }, {
      code: 'publish_date',
      translation: 'table_publish_date',
      checked: true
    }, {
      code: 'authors',
      translation: 'table_authors',
      checked: true
    }, {
      code: 'publishers',
      translation: 'table_publishers',
      checked: true
    }, {
      code: 'subject',
      translation: 'table_subject',
      checked: true
    },
  ];
  subjects: CheckOption[] = [];
  start: number;
  totalPages: number;
  books = [];

  private searchParams = {
    q: '',
    limit: 5,
    page: 1,
  };
  private searchQuery = new Subject<string>();

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private route: Router
  ) { }

  search(): void {
    this.searchQuery.next(this.apiService.toQuery(this.searchParams));
  }

  changePage(delta: number): void {
    this.searchParams.page += delta;
    this.search();
  }

  filteredBooks() {
    let filters = <any>this.subjects.filter((val: CheckOption) => val.checked);
    if (filters.length) {
      filters = filters.map(val => val.name);
      return this.books.filter(val => {
        if (val.subject) {
          return val.subject.some(subject => filters.indexOf(subject) !== -1);
        }
        return false;
      });
    }
    return this.books;
  }

  ngOnInit(): void {
    const books$ = this.searchQuery.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((params: string) => this.apiService.search(params))
    );
    books$.subscribe((resp: any) => {
      this.start = resp.start + 1;
      this.totalPages = resp.num_found;
      this.books = resp.docs;
      this.subjects = [];

      let subject = this.books.reduce((acc, val) => {
        if (val.subject && val.subject.length) {
          acc.push(...(val.subject));
        }
        return acc;
      }, []);

      if (subject.length) {
        subject = [...(new Set(subject))];
        this.subjects = subject.map(val => {
          return {
            name: val,
            checked: false
          };
        });
      }
    });

    const searchParams = this.storageService.get('searchParams', false);
    if (searchParams) {
      this.searchParams = searchParams;
      this.search();
    }
    this.route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.storageService.set('searchParams', this.searchParams, false);
      }
    });
  }
}


