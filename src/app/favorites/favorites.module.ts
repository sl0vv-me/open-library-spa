import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FavoriteListComponent } from './favorite-list/favorite-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FavoritesRoutingModule,
    SharedModule
  ],
  declarations: [FavoriteListComponent]
})
export class FavoritesModule { }
