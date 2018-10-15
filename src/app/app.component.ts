import { Component, OnInit } from '@angular/core';

import { TranslationService } from './shared/translate/translation.service';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOpen = false;

  constructor(
    private translationService: TranslationService,
    private storageService: StorageService
  ) { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    const lang = this.storageService.get('lang');
    if (lang) {
      this.translationService.language = lang;
    }
  }
}
