import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService,
  ) { }

  syncTags() {
    let favorites: FavoriteBook[] = this.storageService.get('favorites');
    if (!favorites) {
      favorites = [];
    }
    const index = favorites.findIndex(el => el.olid[0] === this.route.snapshot.paramMap.get('id'));
    if (index === -1) {
      favorites.push(new FavoriteBook(this.book.identifiers.openlibrary, this.book.title , this.tags));
    } else if (this.tags.length) {
      favorites[index].tags = this.tags;
    } else {
      favorites.splice(index, 1);
    }
    this.storageService.set('favorites', favorites);
  }

  addTags(value) {
    value = value.split(/\s*,\s*|\s/);
    value = value.filter(val => val);

    if (value.length) {
      this.tags.push(...value);
      this.tags = [...new Set(this.tags)];
      this.syncTags();
    }
  }

  onTagInput(event) {
    if ([' ', ','].indexOf(event.data) !== -1) {
      this.addTags(event.target.value);
      event.target.value = null;
    }
  }

  onTagEnter(event) {
    if (event.target.value) {
      this.addTags(event.target.value);
      event.target.value = null;
    }
  }

  ngOnInit(): void {
    this.bookParams.bibkeys.push('OLID:' + this.route.snapshot.paramMap.get('id'));

    const book$ = this.apiService.getBooks(this.apiService.toQuery(this.bookParams));
    book$.subscribe(resp => this.book = resp[this.bookParams.bibkeys[0]]);

    const favorites = this.storageService.get('favorites');
    if (favorites) {
      const index = favorites.findIndex(el => el.olid[0] === this.route.snapshot.paramMap.get('id'));
      if (index !== -1) {
        this.tags = favorites[index].tags;
      }
    }
  }
}
