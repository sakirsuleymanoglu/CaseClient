import { ApplicationConfig, importProvidersFrom, inject, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from "@auth0/angular-jwt";
import { provideToastr } from 'ngx-toastr';


export const API_BASE_URL = new InjectionToken<string>('apiBaseUrl');

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), {
    provide: API_BASE_URL, useValue: 'https://localhost:7159/api', multi: true
  },
  provideHttpClient(),
  importProvidersFrom(NgxSpinnerModule.forRoot({
    type: 'ball-clip-rotate'
  }),
    JwtModule.forRoot({
      config: {

      },
    }),),
  provideAnimations(),
  provideToastr()

  ]
};

