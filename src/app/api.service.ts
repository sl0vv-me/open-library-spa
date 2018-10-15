import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private searchAPI = 'https://openlibrary.org/search.json';
  private booksAPI = 'https://openlibrary.org/api/books';

  constructor(private http: HttpClient) { }

  toQuery(obj: object): string {
    return Object.entries(obj)
      .map((pair: any) => {
        if (Array.isArray(pair[1])) {
          pair[1] = pair[1].join(',');
        }
        return pair.join('=');
      })
      .join('&');
  }

  search(params: string): Observable<object> {
    return new Observable(observer => {
      const booksParams = {
        jscmd: 'data',
        format: 'json',
        bibkeys: []
      };

      this.http.get<object>(this.searchAPI, {
        params: new HttpParams({ fromString: params })
      }).subscribe((result: any) => {
        booksParams.bibkeys = result.docs.map((book: any) => {
          return 'OLID:' + book.edition_key[book.edition_key.length - 1];
        });
        this.getBooks(this.toQuery(booksParams)).subscribe((books: any) => {
          const searchResult = {
            start: result.start,
            num_found: result.num_found,
            docs: []
          };
          searchResult.docs = booksParams.bibkeys.map((key: any, index: number) => {
            const item = books[key];
            item.olid = result.docs[index].edition_key[result.docs[index].edition_key.length - 1];
            if (result.docs[index].subject) {
              item.subject = result.docs[index].subject;
            }
            return item;
          });
          observer.next(searchResult);
        });
      });
    });
  }

  getBooks(params: string): Observable<object> {
    return this.http.get<object>(this.booksAPI, {
      params: new HttpParams({ fromString: params })
    });
  }
}
