import { Injectable } from '@angular/core';
import {
  User,
  UserList,
  UserListResult,
} from 'app/shared/models/user.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveUsersService {
  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService
  ) {}

  public getUsers(): Promise<UserListResult[]> {
    return this.dataApiService.post(
      {},
      `apis/all_users`
    );
  }

  public getUser(data_search: string) {
    return this.dataApiService.post({data_search, id_state: 1},'apis/perfil_select');
  }

  public createUser(user: User): Promise<any> {
    return this.dataApiService.post(user, 'apis/perfil_create');
  }

  public createPassword(password: {password: string}): Promise<any> {
    return this.dataApiService.post(password, 'auth/new_pass');
  }

  public updateUser(user: User): Promise<any> {
    return this.dataApiService.post(user, 'apis/perfil_edit');
  }
  
  public addPackage(user: any) {
    return this.dataApiService.post(
      user,
      'apis/package/create'
    );
  }
}
