import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Page, SurveyContent } from './types';
import { PageComponent } from "./components/page/page.component";
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'jtamaker';
  surveyContent: SurveyContent = {
    examName: "",
    url: "",
    pages: []
  }
  utils = inject(UtilsService);
  addPage() {
    let newPage: Page = {
      title: "",
      pageNum: this.utils.getPageID(),
      content: []
    }
    this.surveyContent.pages.push(newPage)
  }

  warnDialog = viewChild.required<ElementRef<HTMLDialogElement>>('warnDialog');

  async removePage(pageNum: number) {
    //Warn user that they are about to remove an entire page
    await new Promise(resolve => {
      this.warnDialog().nativeElement.addEventListener('close', resolve)
      this.warnDialog().nativeElement.showModal()
    })
    if (this.warnDialog().nativeElement.returnValue === 'cancel') {
      this.warnDialog().nativeElement.returnValue = '';
      return
    } else if (this.warnDialog().nativeElement.returnValue === 'confirm') {
      this.warnDialog().nativeElement.returnValue = '';
      //Find the index of the page in the pages array
      let idx = this.surveyContent.pages.findIndex(page => page.pageNum === pageNum);
      //This assumes that there can only be one page that has a JTA
      if (this.surveyContent.pages[idx].content[0]?.type === "JTA") this.utils.surveyHasJTA.set(false)
      this.surveyContent.pages.splice(idx, 1)
    }

  }
}
