import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  public sendConversion(conversion : any){
    return this.dataApiService.post(conversion, 'apis/request/conversion')
  }


}
