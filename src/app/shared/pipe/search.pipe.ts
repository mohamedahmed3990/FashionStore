import { Pipe, PipeTransform } from '@angular/core';
import { ProductInerface } from '../interface/product-inerface';


@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(producte:ProductInerface[], term: string): ProductInerface[] {
    return producte.filter((product)=>
    product.productName.toLowerCase().includes(term.toLowerCase()));
  }
//  transform(producte:ProductInerface[], term: string): ProductInerface[] {
//     return producte.filter((product)=>
//     product.title.toLowerCase().includes(term.toLowerCase()));
//   }

}
