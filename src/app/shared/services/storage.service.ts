import { Injectable } from '@angular/core';

interface StorageProps {
  user: {
    id: number,
    names: string,
    surname: string,
    username: string,
    email: string,
    acceptTerms: boolean,
    idRol: number,
    dateAcceptTerms: string
  },
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private SETTINGS_KEY = '_zerodev';
  public settings: any = {};
  public defaultValues: StorageProps = {
    user: {
      id: 1,
      names: "Juan",
      surname: "Perez",
      username: "",
      email: "",
      acceptTerms: false,
      idRol: 0,
      dateAcceptTerms: ""
    },
    token: ''
  }

  constructor() {
    this.load();
  }

  public load(): void {
    try {
      this.settings = localStorage.getItem(this.SETTINGS_KEY) ? JSON.parse(localStorage.getItem(this.SETTINGS_KEY) ?? '') : null;
      if (!this.settings) {
        this.settings = this.defaultValues;
      }
    } catch (error) {
      this.settings = this.defaultValues;
    }
  }

  public setValue(key: string, value: any): void {
    this.settings[key] = value;
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.settings));
  }

  public setAll(value: any): void {
    this.settings = value;
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(value));
  }

  public getValue(key: string): any {

    this.settings = localStorage.getItem(this.SETTINGS_KEY) ? JSON.parse(localStorage.getItem(this.SETTINGS_KEY) ?? '') : {};
    if (this.settings && this.settings[key]) {
      return this.settings[key];
    }
    return null;
  }

  public save(): void {
    return this.setAll(this.settings);
  }

  public getAllSettings(): any {
    this.settings = localStorage.getItem(this.SETTINGS_KEY) ? JSON.parse(localStorage.getItem(this.SETTINGS_KEY) ?? '') : {};
    return this.settings;
  }

  public cleanUser(): void {
    delete this.settings;
    this.settings = {};
    return this.save();
  }
}
