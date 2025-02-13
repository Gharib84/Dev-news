import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

  // Initialize Firebase
  const app = initializeApp(environment);
  const analytics = getAnalytics(app)

// Bootstrap Angular application
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));