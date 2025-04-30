import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { KSA } from '../../../../../types';
import { TargetitemComponent } from "./targetitem/targetitem.component";

@Component({
  selector: 'cert-ksa',
  imports: [TargetitemComponent],
  templateUrl: './ksa.component.html',
  styleUrl: './ksa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KsaComponent {
  KSAObj = input.required<KSA>();
  KSAGroupNumber = input.required<string>();

  updateKSANumber(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    this.KSAObj().id = value;
  }
  updateKSAText(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    this.KSAObj().text = value;
  }

  addTI() {
    this.KSAObj().tis.push({
      id: `${this.KSAObj().tis.length + 1}`,
      text: "",
      scores: {
        applicability: "",
        importance: "",
        difficulty: "",
        frequency: ""
      }
    })
  }

  removeTI(id: string) {
    let idx = this.KSAObj().tis.findIndex(ti => ti.id === id);
    this.KSAObj().tis.splice(idx, 1)
  }
}
