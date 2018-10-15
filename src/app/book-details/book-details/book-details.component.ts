import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

import { ApiService } from '../../api.service';
import { StorageService } from '../../storage.service';

import { FavoriteBook } from '../../favorite-book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book: any;
  tags = [];

  private bookParams = {
    jscmd: 'data',
    format: 'json',
    bibkeys: [],
  };
  private bookQuery = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService,
  ) { }

  onTagInput(event) {
    if ([' ', ','].indexOf(event.data) !== -1) {
      let value = event.target.value;
      value = value.split(/\s*,\s*|\s/);
      value = value.filter(val => val);

      if (value.length) {
        let favorites: FavoriteBook[] = this.storageService.get('favorites');
        if (!favorites) {
          favorites = [];
        }
        const index = favorites.findIndex(el => el.olid[0] === this.route.snapshot.paramMap.get('id'));
        if (index === -1) {
          favorites.push(new FavoriteBook(this.book.identifiers.openlibrary, this.book.title , value));
          this.tags = value;
        } else {
          favorites[index].tags.push(...value);
          this.tags = favorites[index].tags;
        }
        this.storageService.set('favorites', favorites);
        event.target.value = null;
      }
    }
  }

  ngOnInit(): void {
    this.bookParams.bibkeys.push('OLID:' + this.route.snapshot.paramMap.get('id'));

    const book$ = this.apiService.getBooks(this.apiService.toQuery(this.bookParams));
    book$.subscribe(resp => this.book = resp[this.bookParams.bibkeys[0]]);

    const favorites = this.storageService.get('favorites');
    const index = favorites.findIndex(el => el.olid[0] === this.route.snapshot.paramMap.get('id'));
        if (index !== -1) {
          this.tags = favorites[index].tags;
        }
  }
}
