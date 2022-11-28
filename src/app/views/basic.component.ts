import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  BalButtonModule,
  BalHeadingModule,
  BalInputModule,
} from '@baloise/design-system-components-angular'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [CommonModule, BalButtonModule, BalHeadingModule, BalInputModule],
  template: `
    <section class="mt-large">
      <bal-heading>{{ firstname }} {{ lastname }}</bal-heading>
      <bal-heading level="h2" subtitle="">{{ fullName }}</bal-heading>

      <bal-input
        [value]="lastname"
        (balChange)="changeLastname($event.detail)"></bal-input>

      <bal-button-group class="mt-medium">
        <bal-button (click)="changeName()"> Change name </bal-button>

        <bal-button (click)="changeNameTimeout()">
          Change name with timeout
        </bal-button>

        <bal-button (click)="loadSwapi()"> Load Star Wars People </bal-button>
      </bal-button-group>

      <ng-container *ngIf="people.length > 0">
        <bal-heading level="h3" class="mt-large">Star Wars People</bal-heading>
        <ul class="is-list">
          <li *ngFor="let person of people">{{ person.name }}</li>
        </ul>
      </ng-container>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BasicComponent {
  firstname = 'Tony'
  lastname = 'Stark'

  get fullName() {
    console.warn('Change Detection happened!')
    return this.firstname + ' ' + this.lastname
  }

  changeNameTimeout() {
    console.log('-> changeNameTimeout')
    setTimeout(() => {
      console.log('-> changeNameTimeout ended')
      this.firstname = 'Bruce'
      this.lastname = 'Banner'
    }, 1000)
  }

  changeName() {
    console.log('-> changeName')
    this.firstname = 'Steve'
    this.lastname = 'Rogers'
  }

  changeLastname(value: string | undefined) {
    console.log('-> changeLastname')
    if (value) {
      this.lastname = value
    }
  }

  /**
   * Http Call
   */

  people: SwapiPeople[] = []

  constructor(private http: HttpClient) {}

  loadSwapi(): void {
    console.log('-> Http Call')
    this.http
      .get<SwapiPeopleResponse>('https://swapi.dev/api/people/')
      .subscribe(response => {
        console.log('-> Http Call ended')
        this.people = response.results
      })
  }
}

interface SwapiPeopleResponse {
  results: SwapiPeople[]
}

interface SwapiPeople {
  name: string
}
