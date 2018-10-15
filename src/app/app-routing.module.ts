import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  }, {
    path: 'books',
    loadChildren: './books-list/books-list.module#BooksListModule'
  }, {
    path: 'books/:id',
    loadChildren: './book-details/book-details.module#BookDetailsModule'
  }, {
    path: 'favorites',
    loadChildren: './favorites/favorites.module#FavoritesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
