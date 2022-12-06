import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {PostEdition} from "./components/post_edition/post_edition.component"
import {Quit} from "./components/quit/quit.component";

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'post-edition', component:PostEdition},
  {path: 'quit', component:Quit},
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
