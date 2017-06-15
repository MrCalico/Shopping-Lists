import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let num = 0;
    let lastCategory = "";
    if (value) {
      return ( value.filter( c => {
        if (c.category !== lastCategory) {
              lastCategory = c.category;
              return(c);
        };
      }));
    }
  }
}
