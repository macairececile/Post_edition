import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SelectPictoComponent} from "./components/select-picto/select-picto.component";
import {TranslatePictoComponent} from "./components/translate-picto/translate-picto.component";
import {HomeComponent} from "./components/home/home.component";
import {PostEdition} from "./components/post_edition/post_edition.component"

const routes: Routes = [
  // {path: 'print', component:SelectPictoComponent},
  // {path: 'picto', component: TranslatePictoComponent},
  {path: 'home', component:HomeComponent},
  {path: 'post-edition', component:PostEdition},
  {path: '', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
