import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CertComment } from '../../../types';
import { EditorComponent } from "../../editor/editor.component";

@Component({
  selector: 'cert-comment',
  imports: [EditorComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  commentObj = input.required<CertComment>();
  
}
