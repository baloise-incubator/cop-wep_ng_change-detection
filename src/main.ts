import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { BalCoreModule } from '@baloise/design-system-components-angular'

import { AppComponent } from './app/app.component'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    /**
     * Define the Baloise Design System specifics.
     */
    importProvidersFrom(BalCoreModule.forRoot()),
  ],
})
