import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JTA } from '../../../types';
import { KsagroupComponent } from "./ksagroup/ksagroup.component";

@Component({
  selector: 'cert-jta',
  imports: [KsagroupComponent],
  templateUrl: './jta.component.html',
  styleUrl: './jta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JtaComponent {
  jtaObj = input.required<JTA>();
  addKSAGroup() {
    this.jtaObj().ksaGroups.push({
      type: "KSAGroup",
      id: `${this.jtaObj().ksaGroups.length+1}`,
      text: "placeholder KSA Group text",
      comment: "",
      ksas: []
    })
  }

  //TODO: Add a remove KSA Group button
  removeKSAGroup(id:string) {
    let idx = this.jtaObj().ksaGroups.findIndex(obj => obj.id===id);
    this.jtaObj().ksaGroups.splice(idx, 1)
  }
}
