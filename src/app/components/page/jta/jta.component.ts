import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JTA } from '../../../types';

@Component({
  selector: 'cert-jta',
  imports: [],
  templateUrl: './jta.component.html',
  styleUrl: './jta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JtaComponent {
  jtaObj = input.required<JTA>();
}
