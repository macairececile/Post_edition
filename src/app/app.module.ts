import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CdkDragDrop, DragDropModule, moveItemInArray} from "@angular/cdk/drag-drop";
import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { PostEdition } from "./components/post_edition/post_edition.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { TranslatePictoComponent } from './components/translate-picto/translate-picto.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IvyCarouselModule} from "angular-responsive-carousel";
import {MatInputModule} from "@angular/material/input";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MatGridListModule} from "@angular/material/grid-list";
import { DialogMaxWordsComponent } from './components/dialog-max-words/dialog-max-words.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {ColorPickerModule} from "ngx-color-picker";
import {MatSelectModule} from "@angular/material/select";
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import { Observable } from 'rxjs';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Quit} from "./components/quit/quit.component";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostEdition,
    Quit,
    TranslatePictoComponent,
    DialogMaxWordsComponent,
    TranslatePictoComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    DragDropModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    IvyCarouselModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatListModule,
    MatRadioModule,
    MatExpansionModule,
    ColorPickerModule,
    MatSelectModule,
    AppRoutingModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
