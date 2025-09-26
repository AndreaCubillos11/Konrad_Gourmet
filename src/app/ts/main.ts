import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../ts/app.component';
import { provideRouter } from '@angular/router';
import { routes } from '../ts/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(CommonModule)   
  ]
});
