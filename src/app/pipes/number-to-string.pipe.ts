import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToString'
})
export class NumberToStringPipe implements PipeTransform {

  transform(value: number): string {
    return String.fromCodePoint(value + 65);
  }

}
