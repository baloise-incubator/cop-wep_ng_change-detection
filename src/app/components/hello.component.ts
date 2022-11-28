import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="my-medium p-normal has-background-green-2">
      <p class="is-bold">{{ getHello() }} {{ label }}!</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HelloComponent {
  /**
   * Defines the label of the greetings
   */
  @Input() label = 'hello'

  getHello() {
    console.warn('[HELLO] - Change Detection happened!')
    return 'Hello'
  }
}
