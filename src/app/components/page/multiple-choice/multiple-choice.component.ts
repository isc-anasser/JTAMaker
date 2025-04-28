import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';
import { MultipleChoice } from '../../../types';
import { EditorComponent } from "../../editor/editor.component";

@Component({
  selector: 'cert-multiple-choice',
  imports: [EditorComponent],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChoiceComponent {
  mcObj = input.required<MultipleChoice>();
  altIDCounter = linkedSignal(()=>this.mcObj().alternatives.at(-1)?.id);
  returnAltID() {
    this.altIDCounter.update(oldVal => {
      if (oldVal) return oldVal+= 1
      else return 1
    })
    return this.altIDCounter()
  }
  addAlternative() {
    this.mcObj().alternatives.push({id: this.returnAltID()!, text: ""});
    console.log(this.mcObj())
  }
  removeAlternative(index: number) {
    let idx = this.mcObj().alternatives.findIndex(obj => obj.id === index)
    this.mcObj().alternatives.splice(idx, 1)
    console.log(this.mcObj().alternatives)
  }
  toggleOtherOption() {
    this.mcObj().hasComment = !this.mcObj().hasComment
  }
}
