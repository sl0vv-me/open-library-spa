import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

  transform(value: Array<any>, key?: string) {
    if (value) {
      let array = [];
      if (key) {
        array = value.map(val => val[key]);
      } else {
        array = value;
      }
      return array.join(', ');
    }
  }

}
