import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey: string = environment.firebaseApiKey;

  public idToken: string | null = null;

  constructor(private httpClient: HttpClient) {
    const tmp = localStorage.getItem("idToken");

    if (tmp) {
      this.idToken = JSON.parse(tmp);
    }
  }

  private onLogin(idToken: string) {
    this.idToken = idToken;
    localStorage.setItem("idToken", JSON.stringify(this.idToken));
  }

  public isLoggedIn() {
    return this.idToken != null;
  }

  public signup(email: string, password: string) {
    return this.httpClient.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap((data) => {
      this.onLogin(data.idToken);
    }));
  }

  public signin(email: string, password: string) {
    return this.httpClient.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap((data) => {
      this.onLogin(data.idToken);
    }));
  }
}
