import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import {
  BalNavbarModule,
  BalTabsModule,
  BalTextModule,
} from '@baloise/design-system-components-angular'
import { filter } from 'rxjs'

type TabValue = 'basic' | 'checkout'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BalNavbarModule,
    BalTextModule,
    BalTabsModule,
  ],
  template: `
    <bal-app>
      <header>
        <bal-navbar interface="app">
          <bal-navbar-brand>Change Detection</bal-navbar-brand>
          <bal-navbar-menu>
            <bal-navbar-menu-start class="is-justify-content-flex-start">
              <bal-tabs
                interface="navbar"
                inverted
                [value]="tabValue"
                (balChange)="tabChanged($event)">
                <bal-tab-item value="basic" label="Basic"></bal-tab-item>
              </bal-tabs>
            </bal-navbar-menu-start>
            <bal-navbar-menu-end></bal-navbar-menu-end>
          </bal-navbar-menu>
        </bal-navbar>
      </header>
      <main class="container">
        <router-outlet></router-outlet>
      </main>
    </bal-app>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  tabValue: TabValue = 'basic'

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const { url } = event as NavigationEnd
        if (url === '/') {
          this.tabValue = 'basic'
        } else {
          this.tabValue = 'checkout'
        }
      })
  }

  tabChanged(tabEvent: CustomEvent<string>) {
    const newTabValue = tabEvent.detail as TabValue
    if (this.tabValue !== newTabValue) {
      if (newTabValue === 'basic') {
        this.router.navigateByUrl('')
      }
      if (newTabValue === 'checkout') {
        this.router.navigateByUrl('')
      }
    }
  }
}
