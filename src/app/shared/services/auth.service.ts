import { Injectable } from '@angular/core';
import { DataApiService } from './data-api.service';
import { StorageService } from './storage.service';
import { firstValueFrom, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public storageService: StorageService,
    private router: Router,
    public dataApiService: DataApiService
    ) { }

  public isLogger() {
    const token = this.storageService.getValue('token');
    return firstValueFrom(of(!!token));
  }

  public logout() {
    return this.dataApiService.post({},'auth/logout').then(()=>{
      this.storageService.cleanUser();
      this.router.navigate([`/`]);
    })
  }

}
