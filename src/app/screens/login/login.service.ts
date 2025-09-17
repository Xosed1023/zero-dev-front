import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';
import { StorageService } from 'app/shared/services/storage.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    public dataApiService: DataApiService,
    public storageService: StorageService
  ) {}

  public async login(body: any): Promise<any> {
    return this.dataApiService.post(body, 'auth/login')
  }

  public async token(body: any): Promise<any> {
    return this.dataApiService.post(body, 'auth/login_jwt')
  }

  public async loadProfile(): Promise<any> {
    return this.dataApiService.getAll('apis/perfil_load', undefined, true)
  }
}
