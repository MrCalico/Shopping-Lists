import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryItems'
})
export class CategoryItemsPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value) {
      return value.filter(i => { return i.category === args; } );
    }
  }

}
