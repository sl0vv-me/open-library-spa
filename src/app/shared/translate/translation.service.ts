import { Injectable } from '@angular/core';

import { StorageService } from '../../storage.service';

import { Locale } from './locale';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public languages = ['en', 'ru'];

  public language = 'en';

  private dictionary: {[key: string]: Locale} = {
      'en' : {
          languange: 'en',
          values: {
              'nav_home': 'Home',
              'nav_favorites': 'Favorites',

              'search_search': 'Search',
              'search_columns': 'Columns',
              'search_subjects': 'Subjects',
              'search_of': 'of',

              'table_cover': 'Thumbnail',
              'table_title': 'Title',
              'table_publish_date': 'Publish date',
              'table_authors': 'Authors',
              'table_publishers': 'Publishers',
              'table_subject': 'Subjects',

              'details_no_image': 'No Image',
              'details_by_authors': 'by ',
              'details_published_date': 'Published',
              'details_published_by_publishers': 'by',
              'details_weight': 'Weight',
              'details_tags': 'Tags',

              'favorites_filter': 'Filter',
              'favorites_no_favorites': 'No favorites yet',
          }
      },
      'ru' : {
          languange: 'ru',
          values: {
              'nav_home': 'Главная',
              'nav_favorites': 'Избранное',

              'search_search': 'Поиск',
              'search_columns': 'Колонки',
              'search_subjects': 'Темы',
              'search_of': 'из',

              'table_cover': 'Обложка',
              'table_title': 'Название',
              'table_publish_date': 'Дата издания',
              'table_authors': 'Авторы',
              'table_publishers': 'Издательства',
              'table_subject': 'Темы',

              'details_no_image': 'Обложка отсутствует',
              'details_by_authors': '',
              'details_published_date': 'Опубликовано',
              'details_published_by_publishers': 'издательством',
              'details_weight': 'Вес',
              'details_tags': 'Теги',

              'favorites_filter': 'Фильтр',
              'favorites_no_favorites': 'Избранное отсутствует',
          }
      }
  };

  constructor(private storageService: StorageService) { }

  translate(key: string): string {
      if (this.dictionary[this.language] != null) {
          return this.dictionary[this.language].values[key];
      }
  }

  changeLang(lang: string): void {
    this.language = lang;
    this.storageService.set('lang', lang);
  }

  currentDictionary(): Locale {
    return this.dictionary[this.language];
  }
}
