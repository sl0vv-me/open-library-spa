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
  filters: CheckOption[];

  constructor(private storageService: StorageService) { }

  filteredBooks(): FavoriteBook[] {
    const filterRaw: CheckOption[] = this.filters.filter((val) => val.checked);
    const filter = filterRaw.map((val) => val.name);

    return this.books.filter((val) => {
      let result = false;
      for (const tag of val.tags) {
        if (filter.indexOf(tag) !== -1) {
          result = true;
          break;
        }
      }
      return result;
    });
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
          checked: true
        };
      });
    }
  }

}
