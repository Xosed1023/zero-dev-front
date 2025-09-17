import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showThounsandDecimals'
})
export class ShowThounsandDecimalsPipe implements PipeTransform {

  transform(value: number | string): string {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));
  }
}
