import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

export interface Person {
  firstname: string
  lastname: string
}

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="my-medium p-normal has-background-purple-2">
      <p class="is-bold">
        {{ getHello() }} {{ person.firstname }} {{ person.lastname }}!
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PersonComponent {
  @Input() person!: Person

  getHello() {
    console.error('[PERSON] - Change Detection happened!')
    return 'Aloha'
  }
}
