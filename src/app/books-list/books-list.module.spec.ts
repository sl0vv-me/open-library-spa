import { BooksListModule } from './books-list.module';

describe('BooksListModule', () => {
  let booksListModule: BooksListModule;

  beforeEach(() => {
    booksListModule = new BooksListModule();
  });

  it('should create an instance', () => {
    expect(booksListModule).toBeTruthy();
  });
});
