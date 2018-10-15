import { TestBed } from '@angular/core/testing';

import { TranslationService } from './translation.service';

describe('TranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslationService = TestBed.get(TranslationService);
    expect(service).toBeTruthy();
  });
});
