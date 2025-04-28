import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, linkedSignal, signal, viewChild } from '@angular/core';
import { CertComment, CertText, JTA, MultipleChoice, Page } from '../../types';
import { ThisReceiver } from '@angular/compiler';
import { UtilsService } from '../../services/utils.service';
import { InfoComponent } from "./info/info.component";
import { MultipleChoiceComponent } from "./multiple-choice/multiple-choice.component";
import { CommentComponent } from "./comment/comment.component";
import { JtaComponent } from "./jta/jta.component";

@Component({
  selector: 'cert-page',
  imports: [InfoComponent, MultipleChoiceComponent, CommentComponent, JtaComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {
  page = input.required<Page>();
  utils = inject(UtilsService);
  pageHasJTA = false;
  dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog')
  
  updateTitle(e: Event) {
    this.page().title = (e.target as HTMLInputElement).value
  }

  addText() {
    if (this.pageHasJTA) return
    let newContent: CertText = {
      type: "info",
      id: this.utils.getInfoID(),
      html: ""
    }
    this.page().content.push(newContent)
  }
  
  addMC() {
    if (this.pageHasJTA) return
    let newContent: MultipleChoice = {
      type: "MC",
      id: this.utils.getMCID(),
      text: "",
      alternatives: [{id: 1, text: ""}],
      hasComment: false,
      response: "",
      comment: ""
    }
    this.page().content.push(newContent)
  }

  addComment() {
    if (this.pageHasJTA) return
    let newContent: CertComment = {
      type: "comment",
      id: this.utils.getCommentID(),
      text: "",
      response: ""
    }
    this.page().content.push(newContent)
  }

  async addJTA() {
    if (this.utils.surveyHasJTA()) return
    
    let resolveFunc = (value:unknown)=>{};
    if (this.page().content.length) {
      await new Promise(resolve=>{
        resolveFunc = resolve;
        this.dialogRef().nativeElement.addEventListener('close', resolve)
        this.dialogRef().nativeElement.showModal();
      })
      this.dialogRef().nativeElement.removeEventListener('close',resolveFunc)
      if (this.dialogRef().nativeElement.returnValue === "cancel") {
        this.dialogRef().nativeElement.returnValue = ""
        return
      }
    }
    this.page().content.length = 0;
    this.pageHasJTA = true;
    this.utils.surveyHasJTA.set(true);
    let newContent:JTA = {
      type: "JTA",
      id: "JTA",//There can only be one JTA
      ksaGroups: []
    }
    this.page().content[0] = newContent
  }

  removeElement(id: string) {
    let idx = this.page().content.findIndex(element => element.id === id);
    if (this.page().content[idx].type === "JTA") {
      this.utils.surveyHasJTA.set(false);
      this.pageHasJTA = false;
    }
    this.page().content.splice(idx, 1);
  }
}
