import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
  ],
  declarations: []
})
export class SharedModule { }
