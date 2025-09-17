import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import {
  HttpHeaders,
  HttpClient,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

export interface HeadersType {
  name: string; // name header
  key: string; // name to storage
}

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  url401 = '';
  reload = 0;

  public urlApi = environment.urlApi;

  constructor(
    private router: Router,
    private http: HttpClient,
    public storageService: StorageService,
    private snackBar: MatSnackBar
  ) {}

  getHeaders(contentLength?: any): HttpHeaders {
    const extraValues = {
      Accept: 'application/json',
    };
    return new HttpHeaders({
      ...extraValues,
    });
  }

  getContentLength(formData: FormData) {
    let acc = 50;
    formData.forEach((value: any, key) => {
      if (typeof value === 'string') return acc + value.length;
      if (typeof value === 'object') return acc + value.size;
    });
    return acc;
  }

  handleOnSuccess = (result: any, notMessage?: boolean) => {
    if (result && result.length && result[2]) {
      if (!notMessage) {
        this.snackBar.open(result[2], 'x', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
    }
    if (result && result.length && result[3]) {
      if (
        result[2] ==
        'El token ingresado no coincide con el token enviado por el sistema'
      )
        return undefined;
      else return result[3];
    } else {
      return null;
    }
  };

  handleOnError = (result: any | any, notMessage?: boolean) => {
    if (result.status === 500) {
      return this.post({}, 'auth/logout').then(()=>{
        this.storageService.cleanUser();
        this.snackBar.open('sesion caducada', 'x', {
          duration: 2000,
          panelClass: ['snackbar-alert'],
        });
        this.router.navigate([`/`]);
      })
    }
    else{
      this.snackBar.open('Ocurrio un error', 'x', {
        duration: 2000,
        panelClass: ['snackbar-alert'],
      });
      return null;
    }
  };

  public getAll(
    extension: string,
    url?: string,
    notMessage?: boolean
  ): Promise<any> {
    const urlGet = url ? url : this.urlApi;
    return lastValueFrom(
      this.http.get<any>(urlGet + extension, {
        headers: this.getHeaders(),
        withCredentials: true,
        observe: 'response',
      }),
      { defaultValue: [] }
    )
      .then((response: HttpResponse<any> | never[]) => {
        if (response instanceof HttpResponse) {
          return this.handleOnSuccess(response.body);
        } else {
          return this.handleOnSuccess('');
        }
      })
      .catch((error: any) => this.handleOnError(error, notMessage));
  }

  public getById(
    extension: string,
    id: string,
    extraParams?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        }
  ): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(this.urlApi + extension + '/' + id, {
        headers: this.getHeaders(),
        params: { ...extraParams },
      })
    )
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public postById(element: any, extension: string, url?: string): Promise<any> {
    return firstValueFrom(
      this.http.post<any>(this.urlApi + extension + '/' + element.id, element, {
        headers: this.getHeaders(),
      })
    )
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public post(element: any, extension: string, url?: string): Promise<any> {
    this.cleanObject(element);
    const urlGet = url ? url : this.urlApi;
    let formData = new FormData();
    Object.keys(element).forEach((key) => {
      formData.append(key, element[key]);
    });
    return firstValueFrom(
      this.http.post<any>(urlGet + extension, formData, {
        headers: this.getHeaders(this.getContentLength(formData)),
        observe: 'response',
        withCredentials: true,
      })
    )
      .then((response: HttpResponse<any>) => {
        return this.handleOnSuccess(response.body);
      })
      .catch(this.handleOnError);
  }

  public patch(element: any, extension: string): Promise<any> {
    this.cleanObject(element);
    return firstValueFrom(
      this.http.patch<any>(this.urlApi + extension, element, {
        headers: this.getHeaders(),
      })
    )
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public update(
    element: any,
    extension: string,
    extraHeaders?: any,
    notId?: boolean
  ): Promise<any> {
    this.cleanObject(element);
    const id = element.id;
    if (notId) {
      delete element['id'];
    }
    return firstValueFrom(
      this.http.put<any>(
        this.urlApi + extension + (id ? '/' + id : ''),
        element,
        {
          headers: this.getHeaders(extraHeaders),
        }
      )
    )
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public disable(
    element: any,
    id: any,
    extension: string,
    extraHeaders?: any
  ): Promise<any> {
    this.cleanObject(element);
    return firstValueFrom(
      this.http.put<any>(this.urlApi + extension + '/' + id, element, {
        headers: this.getHeaders(extraHeaders),
      })
    )
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public delete(
    extension: string,
    id?: string | number,
    url?: string,
    extraParams?: HttpParams,
    body?: any
  ): Promise<any> {
    const urlGet = url ? url : this.urlApi;
    const params = id ? { id, ...extraParams } : { ...extraParams };
    return firstValueFrom(
      this.http.delete<any>(urlGet + extension, {
        headers: this.getHeaders(),
        params: params,
        body: body,
      })
    )
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  cleanObject(element: any) {
    Object.keys(element).forEach((key) => {
      if (element[key] === null) {
        delete element[key];
      }
    });
  }
}
