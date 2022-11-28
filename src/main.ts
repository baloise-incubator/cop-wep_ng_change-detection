import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import {
  BalCoreModule,
  BalToastModule,
} from '@baloise/design-system-components-angular'

import { AppComponent } from './app/app.component'
import { routes } from './app/router/routes'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    /**
     * Our router, which sync URLs to views in your app.
     * To define a new route open the src/router folder.
     */
    provideRouter(routes),
    /**
     * Define the Baloise Design System specifics.
     */
    importProvidersFrom(BalCoreModule.forRoot()),
    importProvidersFrom(BalToastModule),
  ],
})
