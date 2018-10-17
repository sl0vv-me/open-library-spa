import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../storage.service';
import { CheckOption } from '../../check-option';
import { FavoriteBook } from '../../favorite-book';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {

  books: FavoriteBook[];
  filters: CheckOption[] = [];

  constructor(private storageService: StorageService) { }

  filteredBooks(): FavoriteBook[] {
    const filterRaw: CheckOption[] = this.filters.filter((val) => val.checked);
    if (filterRaw.length) {
      const filter = filterRaw.map((val) => val.name);
      return this.books.filter((val) => {
        return val.tags.some(tag => filter.indexOf(tag) !== -1);
      });
    }
    return this.books;
  }

  ngOnInit(): void {
    const storageData = this.storageService.get('favorites');
    this.books = storageData ? storageData : [];

    if (this.books.length) {
      let tags = [];
      for (const arr of this.books.map((book: FavoriteBook) => book.tags)) {
        tags.push(...arr);
      }
      tags = tags.filter((val, index, self) => self.indexOf(val) === index);
      this.filters = tags.map((val: string) => {
        return {
          name: val,
          checked: false
        };
      });
    }
  }

}
