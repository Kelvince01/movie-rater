import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  //transform(pipeData, pipeFilter): unknown {
    /*return pipeData.filter( movie => {
      return (
        movie['Genre'].toLowerCase().includes(pipeFilter) ||
        movie['Title'].toLowerCase().includes(pipeFilter) ||
        pipeFilter == ''
      );
    });*/

    public transform(value, keys: string, term: string) {

      if (!term) return value;
      return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  
    }
  //}


}
