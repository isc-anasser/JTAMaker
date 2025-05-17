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
    startDate: "",
    endDate: "",
    pages: []
  }
  setExamName(e: Event) {
    this.surveyContent.examName = (e.target as HTMLInputElement).value;
  }
  submissionPopover = viewChild.required<ElementRef<HTMLDivElement>>('submission');
  showPopover = (elem: HTMLElement) => {
    this.submissionPopover().nativeElement.innerHTML = ''
    this.submissionPopover().nativeElement.append(elem)
    this.submissionPopover().nativeElement.showPopover()
  }
  setDate(e: Event, isStartDate: boolean) {
    let value = (e.target as HTMLInputElement).value
    if (isStartDate) {
      if (this.surveyContent.endDate !== "") {
        let startDate:any = new Date(value)
        let endDate:any = new Date(this.surveyContent.endDate)
        if (endDate - startDate < 0) {
          let p = document.createElement('p');
          p.textContent = "Please make sure that the end date comes before the start date";
          this.showPopover(p);
          (e.target as HTMLInputElement).value = this.surveyContent.startDate;
          return
        } else {
          this.surveyContent.startDate = value;
        }
      } else {
        this.surveyContent.startDate = value;
      }
    } else {
      if (this.surveyContent.startDate !== "") {
        let startDate:any = new Date(this.surveyContent.startDate)
        let endDate:any = new Date(value)
        if (endDate - startDate < 0) {
          let p = document.createElement('p');
          p.textContent = "Please make sure that the end date comes before the start date";
          this.showPopover(p);
          (e.target as HTMLInputElement).value = this.surveyContent.endDate;
          return
        } else {
          this.surveyContent.endDate = value;
        }
      } else {
        this.surveyContent.endDate = value;
      }
    }
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


  async submitSurvey() {
    //Validate that the survey has the necessary elements
    if (this.surveyContent.examName === "") {
      let p = document.createElement('p')
      p.textContent = "Please give the exam a name"
      this.showPopover(p)
      return
    } else if (this.surveyContent.pages.length === 0) {
      let p = document.createElement('p')
      p.textContent = "The survey should contain at least one page"
      this.showPopover(p)
      return
    } else if (this.surveyContent.startDate === "" || this.surveyContent.endDate === "") {
      let p = document.createElement('p')
      p.textContent = "Please give this survey a start date and an end date"
      this.showPopover(p)
      return
    }

    let response = await fetch('TODO', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(this.surveyContent)
    });
    if (response.ok) {
      let p = document.createElement('p');
      p.textContent = "Submission Successful";
      this.showPopover(p)
    } else {
      let div = document.createElement('div');
      let p1 = document.createElement('p');
      p1.textContent = "An error was encountered";
      let p2 = document.createElement('p');
      p2.textContent = await response.text()
      div.append(p1, p2)
      this.showPopover(div)
    };
  }
}
