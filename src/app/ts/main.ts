import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../ts/app.component';
import { provideRouter } from '@angular/router';
import { routes } from '../ts/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

bootstrapApplication(AppComponent, {

  providers: [

    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserModule, CommonModule), 
    CookieService,

  ]

});

