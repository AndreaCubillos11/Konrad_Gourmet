import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../ts/app.component';
import { provideRouter } from '@angular/router';
import { routes } from '../ts/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
