import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  public sendForm(body: any): Promise<any> {
    return this.dataApiService.post(body, 'recovery-password');
  }

    /**
   * Sends an email with form data.
   *
   * @param {any} body - the body of the email form
   * @return {Promise<any>} a promise that resolves to the response from the data API service
   */
  public sendEmailForm(body: any): Promise<any> {
    return this.dataApiService.post(body, 'apis/register/new');
  }
}
