import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';
import { LoginService } from './login.service';
import { RolClient } from 'app/shared/models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('myFormLogin', { static: false }) myFormLogin: NgForm | undefined;
  @ViewChild('myFormToken', { static: false }) myFormToken: NgForm | undefined;

  public loginForm: FormGroup;
  public tokenForm: FormGroup;

  public loginError = false;
  public wrongPassword = false;
  public hideRegister = true;
  public token = '';
  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    public configService: ConfigurationService,
    private router: Router,
    private snackBar: MatSnackBar,
    public storageService: StorageService
  ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
      {}
    );
    this.tokenForm = this.fb.group(
      {
        token: ['', [Validators.required]],
      },
      {}
    );
  }

  ngOnInit(): void {}

  login() {
    if (!this.loginForm?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const { email, password } = this.loginForm?.value;

    const loginSerialized = {
      username: email,
      password,
    };

    return this.loginService
      .login(loginSerialized)
      .then(async (data) => {
        if (data) {
          this.token = 'hola';
        }
        this.configService.setLoadingPage(false);
      })
      .catch((err) => {
        this.configService.setLoadingPage(false);
      });
  }

  restorePassword() {
    this.router.navigate(['/restore-password']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  landing() {
    this.router.navigate(['/']);
  }

  sendToken() {
    if (!this.tokenForm?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const { token } = this.tokenForm?.value;

    const tokenSerialized = {
      token: token,
      token2: token,
    };
    return this.loginService
      .token(tokenSerialized)
      .then(async (token) => {
        if (token) {
          this.snackBar.open('Bienvenido', 'x', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          return this.loginService.loadProfile().then((data) => {
            const user = {
              id: data[0].id,
              name: data[0].names,
              surname: data[0].surname,
              username: data[0].username,
              email: data[0].email,
              acceptTerms: true,
              idRol: data[0].id_rol,
              dateAcceptTerms: data[0].date_accept_terms,
            };
            this.storageService.setValue('user', user)
            this.storageService.setValue('token', 'esto es un token')
            this.storageService;
            this.configService.filterMenu();            
            if(user.idRol === new RolClient().key){
              this.router.navigate([`/home/account`, user.id]);
            } else{
              this.router.navigate([`/`]);
            }            
            this.configService.setLoadingPage(false);
          });
        } else {
          this.configService.setLoadingPage(false);
        }
      })
      .catch((err) => {
        this.loginError = true;
        this.configService.setLoadingPage(false);
      });
  }
}
