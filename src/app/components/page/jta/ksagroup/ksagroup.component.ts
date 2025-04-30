import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { KSAGroup } from '../../../../types';
import { KsaComponent } from "./ksa/ksa.component";

@Component({
  selector: 'cert-ksagroup',
  imports: [KsaComponent],
  templateUrl: './ksagroup.component.html',
  styleUrl: './ksagroup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KsagroupComponent {
  KSAGroupObj = input.required<KSAGroup>();
  updateID(e: Event) {
    let id = (e.target as HTMLInputElement).value.toString()
    this.KSAGroupObj().id = id
  }
  addKSA() {
    this.KSAGroupObj().ksas.push(
      {type: "KSA", 
      id: `${this.KSAGroupObj().ksas.length+1}`,
      text: "",
      tis: []})
  }
  removeKSA(ksaID: string) {
    let idx = this.KSAGroupObj().ksas.findIndex(ksa => ksa.id === ksaID);
    this.KSAGroupObj().ksas.splice(idx,1)
  }
}
