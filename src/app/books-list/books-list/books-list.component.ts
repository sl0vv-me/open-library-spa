import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ApiService } from '../../api.service';
import { } from '../../shared/translate/translation.service';
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
  columnsFiltered = [];
  subjects = [];
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
  ) { }

  search(): void {
    this.searchQuery.next(this.apiService.toQuery(this.searchParams));
  }

  changePage(delta: number): void {
    this.searchParams.page += delta;
    this.search();
  }

  ngOnInit(): void {
    const subject = new Subject();
    subject.subscribe((resp: any) => {
      this.start = resp.start + 1;
      this.totalPages = resp.num_found;
      this.books = resp.docs;
    });

    const books$ = this.searchQuery.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((params: string) => this.apiService.search(params))
    );
    books$.subscribe(subject);
  }
}


