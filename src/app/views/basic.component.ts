import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  BalButtonModule,
  BalHeadingModule,
  BalInputModule,
} from '@baloise/design-system-components-angular'
import { HttpClient } from '@angular/common/http'
import { HelloComponent } from '../components/hello.component'
import { Person, PersonComponent } from '../components/person.component'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [
    CommonModule,
    BalButtonModule,
    BalHeadingModule,
    BalInputModule,
    HelloComponent,
    PersonComponent,
  ],
  template: `
    <section class="mt-large">
      <bal-heading>Basic Demo</bal-heading>
      <bal-heading level="h2">{{ firstname }} {{ lastname }}</bal-heading>
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
        <bal-button (click)="changeMutablePerson()">
          Change mutable Person
        </bal-button>
        <bal-button (click)="changeImmutablePerson()">
          Change immutable Person
        </bal-button>
      </bal-button-group>

      <app-hello [label]="lastname"></app-hello>

      <app-person [person]="person"></app-person>

      <ng-container *ngIf="people.length > 0">
        <bal-heading level="h3" class="mt-large">Star Wars People</bal-heading>
        <ul class="is-list">
          <li *ngFor="let person of people">{{ person.name }}</li>
        </ul>
      </ng-container>

      <!-- <ng-container *ngIf="people$ | async as asyncPeople">
        <bal-heading level="h3" class="mt-large">Star Wars People</bal-heading>
        <ul class="is-list">
          <li *ngFor="let person of asyncPeople">{{ person.name }}</li>
        </ul>
      </ng-container> -->
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BasicComponent {
  firstname = 'Tony'
  lastname = 'Stark'

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  get fullName() {
    console.warn('[BASIC] - Change Detection happened!')
    return this.firstname + ' ' + this.lastname
  }

  changeNameTimeout() {
    console.log('-> changeNameTimeout')
    setTimeout(() => {
      console.log('-> changeNameTimeout ended')
      this.firstname = 'Bruce'
      this.lastname = 'Banner'
      // this.changeDetectorRef.markForCheck()
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
   * Mutable objects
   */

  person: Person = {
    firstname: 'Peter',
    lastname: 'Parker',
  }

  changeMutablePerson() {
    console.log('-> changeMutablePerson')
    this.person.lastname = 'Mutable'
  }

  changeImmutablePerson() {
    console.log('-> changeImmutablePerson')
    this.person = { ...this.person, lastname: 'Immutable' }
  }

  /**
   * Http Call
   */

  people: SwapiPeople[] = []
  // people$ = new BehaviorSubject<SwapiPeople[]>([])

  loadSwapi(): void {
    console.log('-> Http Call')
    this.http
      .get<SwapiPeopleResponse>('https://swapi.dev/api/people/')
      .subscribe(response => {
        console.log('-> Http Call ended', response.results)
        // this.people$.next(response.results)
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
