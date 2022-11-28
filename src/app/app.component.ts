import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  BalNavbarModule,
  BalTabsModule,
  BalTextModule,
} from '@baloise/design-system-components-angular'
import { BasicComponent } from './views/basic.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BasicComponent,
    BalNavbarModule,
    BalTextModule,
    BalTabsModule,
  ],
  template: `
    <bal-app>
      <header>
        <bal-navbar interface="app">
          <bal-navbar-brand>{{ getTitle() }}</bal-navbar-brand>
        </bal-navbar>
      </header>
      <main class="container">
        <app-basic></app-basic>
      </main>
    </bal-app>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  getTitle() {
    console.warn('[APP] - Change Detection happened!')
    return 'Change Detection'
  }
}
