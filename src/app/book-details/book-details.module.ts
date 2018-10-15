import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookDetailsRoutingModule } from './book-details-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BookDetailsRoutingModule,
    SharedModule
  ],
  declarations: [
    BookDetailsComponent
  ]
})
export class BookDetailsModule { }
