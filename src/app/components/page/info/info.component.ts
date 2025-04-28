import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CertText } from '../../../types';
import { EditorComponent } from "../../editor/editor.component";

@Component({
  selector: 'cert-info',
  imports: [EditorComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {
  infoObj = input.required<CertText>()
}
