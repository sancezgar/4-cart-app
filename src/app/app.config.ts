import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { itemsReduce } from './store/items.reducer';
import { productsReducer } from './store/products.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore(
    {
      items: itemsReduce,
      products: productsReducer
    }
  ), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
