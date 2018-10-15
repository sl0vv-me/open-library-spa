import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BooksListRoutingModule } from './books-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BooksListComponent } from './books-list/books-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BooksListRoutingModule,
    SharedModule
  ],
  declarations: [
    BooksListComponent,
    // TranslatePipe
  ]
})
export class BooksListModule { }
