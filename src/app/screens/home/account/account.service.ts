import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  public getTransaction(){
    return this.dataApiService.post({}, 'apis/movements/select')
  }


}
