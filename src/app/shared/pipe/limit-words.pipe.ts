import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWords',
  standalone: true
})
export class LimitWordsPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';  // Handle empty or undefined value
    const words = value.split(' ');
    return words.length <= limit ? value : words.slice(0, limit).join(' ') + '...';
  }

}
