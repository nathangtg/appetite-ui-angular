import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { UserLayoutComponent } from './app/pages/layout/layout.component';
import { AdminLayoutComponent } from './app/admin-pages/layout/layout.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
