import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { BalCoreModule } from '@baloise/design-system-components-angular'

import { AppComponent } from './app/app.component'

enableProdMode()

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(BalCoreModule.forRoot()),
  ],
})
