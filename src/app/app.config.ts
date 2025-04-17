import { ApplicationConfig, importProvidersFrom,  InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from "@auth0/angular-jwt";
import { provideToastr } from 'ngx-toastr';
import { authorizationInterceptor } from './interceptors/authorization.interceptor';
import { errorHandlingInterceptor } from './interceptors/error-handling.interceptor';


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const API_ROOT_URL = new InjectionToken<string>('API_ROOT_URL');
export const ENCRYPTION_SECRET_KEY =new InjectionToken<string>('ENCRYPTION_SECRET_KEY');


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), {
    provide: API_BASE_URL, useValue: 'https://localhost:7159/api', multi: true,
  }, {
    provide: API_ROOT_URL, useValue: 'https://localhost:7159', multi: true
  },
  {
    provide: ENCRYPTION_SECRET_KEY, useValue: '1234567890123456', multi: true
  },
  provideHttpClient(
    withInterceptors(
      [authorizationInterceptor, errorHandlingInterceptor]
    )
  ),
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

