import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'taskFilterPipe'
})
export class TaskFilterPipePipe implements PipeTransform {

  transform(value: any[], order = '', column: string = ''): any[] {
    const methodName = 'transform';
    if (!value || order === '' || !order) 
      return value; 
    if (value.length <= 1) 
      return value;    
    if (!column || column === '') {
      if (order === 'asc') 
        return value.sort() 
      else
        return value.sort().reverse();
    }
    return orderBy(value, [column], [order]);
  }

}
