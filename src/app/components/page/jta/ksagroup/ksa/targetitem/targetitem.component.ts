import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TargetItem } from '../../../../../../types';

@Component({
  selector: 'cert-targetitem',
  imports: [],
  templateUrl: './targetitem.component.html',
  styleUrl: './targetitem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetitemComponent {
  tiObj = input.required<TargetItem>();
  ksaNumber = input.required<string>();
  ksaGroupNumber = input.required<string>();

  updateTINumber(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    this.tiObj().id = value;
  }
  updateTIText(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    this.tiObj().text = value;
  }
}
