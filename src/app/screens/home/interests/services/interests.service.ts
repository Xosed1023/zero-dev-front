import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  constructor(public dataApiService: DataApiService,) { }

  public updateIntrest(body: any): Promise<any> {
    return this.dataApiService.post(body, 'apis/account/update_cupo');
  }
}
