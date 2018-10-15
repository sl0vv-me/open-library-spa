import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ArrayToStringPipe } from './array-to-string/array-to-string.pipe';
import { TranslatePipe } from './translate/translate.pipe';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ArrayToStringPipe,
    TranslatePipe,
    InputComponent,
    SelectComponent,
    TagsComponent
  ],
  exports: [
    ArrayToStringPipe,
    TranslatePipe,
    InputComponent,
    SelectComponent,
    TagsComponent
  ]
})
export class SharedModule { }
