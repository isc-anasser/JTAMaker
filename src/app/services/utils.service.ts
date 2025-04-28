import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  surveyHasJTA = signal(false);

  private pageCounter: number = 0;

  getPageID ():number {
    this.pageCounter+= 1;
    return this.pageCounter
  }

  private infoCounter: number = 0;
  getInfoID():string {
    this.infoCounter+=1;
    return `Info-${this.infoCounter}`
  }

  private mcCounter: number = 0
  getMCID ():string {
    this.mcCounter += 1;
    return `MC-${this.mcCounter}`
  }
  private commentCounter: number = 0
  getCommentID():string {
    this.commentCounter += 1
    return `C-${this.commentCounter}`
  }
}
