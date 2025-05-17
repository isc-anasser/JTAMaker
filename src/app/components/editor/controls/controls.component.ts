import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Command } from '../editor.component';

@Component({
  selector: 'cert-controls',
  imports: [],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent {
  command = output<Command>();
  //Underline, Strikethrough, Bold, Italic, ADD CODE BLOCKS, TABLES, INLINE CODE
  buttonsArr = [
    {name: "underline", symbol: `U\u0332`},
    {name: "strikethrough", symbol: `\u0336S`},
    {name: "bold", symbol: `B`},
    {name: "italic", symbol: String.fromCodePoint(0x1D44E + 34)},
    {name: "removeFormat", symbol: "X"},
    {name: "inlineCode", symbol: "<c>"},
    {name: "codeBlock", symbol: "{}"},
    {name: "unorderedList", symbol: "\u2022-"},
    {name: "orderedList", symbol: "1."}
  ]
  emmitColor(e: Event) {
    this.command.emit({name: (e.target as HTMLInputElement).name, value: (e.target as HTMLInputElement).value})
  }
}
