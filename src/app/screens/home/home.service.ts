import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public dataApiService: DataApiService,
  ) { }


  private balances = new BehaviorSubject<any>(null);
  balances$ = this.balances.asObservable();

  public uploadBalances(balance: any) {
    this.balances.next(balance);
  }

  public async accept(body: any): Promise<any> {
    return this.dataApiService.post(body, 'apis/accept_terms')
  }

  public getBalances(){
    return this.dataApiService.post({}, 'apis/account/select')
  }
}
