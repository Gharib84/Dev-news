import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './environments/environment';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
