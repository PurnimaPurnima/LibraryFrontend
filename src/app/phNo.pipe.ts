import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phNo'
})
export class RatingPipe implements PipeTransform {

  transformed:string="";

  transform(value: string): string {
    this.transformed=value.substring(0,5)+'-'+value.substring(5,10);
    return this.transformed;
  }

}
