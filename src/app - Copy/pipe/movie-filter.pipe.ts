import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(pipeData, pipeFilter): unknown {
    return pipeData.filter( movie => {
      return (
        movie['Genre'].toLowerCase().includes(pipeFilter) ||
        movie['Title'].toLowerCase().includes(pipeFilter) ||
        pipeFilter == ''
      );
    });
  }


}
