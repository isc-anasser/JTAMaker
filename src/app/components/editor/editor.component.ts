import { ChangeDetectionStrategy, Component, ElementRef, model, ModelSignal, Renderer2, viewChild } from '@angular/core';
import { ControlsComponent } from "./controls/controls.component";

export type Command = {
  name: string,
  value?: string,
}

@Component({
  selector: 'cert-editor',
  imports: [ControlsComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  html: ModelSignal<string> = model.required();
  editor = viewChild.required('content', { read: ElementRef })
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  ngOnInit() {
    this.renderer.setProperty(this.editor().nativeElement, 'innerHTML', this.html())
  }

  executeCommand(command: Command) {
    switch (command.name) {
      case "inlineCode":
        let selection;
        try {
          selection = this.el.nativeElement.shadowRoot.getSelection();
        } catch (error) {
          selection = document.getSelection();
        }
        if (!selection) return
        let range = selection.getRangeAt(0);
        if (this.editor().nativeElement.contains(range.commonAncestorContainer)) {
          let content = `${selection?.getRangeAt(0).cloneContents().textContent}`;
          document.execCommand('insertHTML', false, `<code>${content}</code>`)
        }
        break;
      case "codeBlock":
        {
          let selection;
          try {
            selection = this.el.nativeElement.shadowRoot.getSelection();
          } catch (error) {
            selection = document.getSelection();
          }
          if (!selection) return
          let range = selection.getRangeAt(0);
          if (this.editor().nativeElement.contains(range.commonAncestorContainer)) {
            let content = `${selection?.getRangeAt(0).cloneContents().textContent}`;
            document.execCommand('insertHTML', false, `<pre><code>${content}</code></pre>`)
          }
        }
        break;
      default:
        document.execCommand(command.name, false, command.value ? command.value : '')
        break;
    }
  }

  applyStrikethrough() {
    document.execCommand('strikeThrough', false, '');
  }

  updateHtml = () => {
    let newHtml = this.editor().nativeElement.innerHTML
    this.html.set(newHtml)
  }

  ngOnDestroy() {
    //serialize the editor html and save it to html()
    let newHtml = this.editor().nativeElement.innerHTML
    this.html.set(newHtml)
  }

}
