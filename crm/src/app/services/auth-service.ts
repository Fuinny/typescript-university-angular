import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AuthResponse } from '../models/authResponse';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey: string = environment.firebaseApiKey;

  public idToken = signal<string>("");

  constructor(private httpClient: HttpClient, private router: Router) {
    const tmp = localStorage.getItem("idToken");

    if (tmp) {
      this.idToken.set(JSON.parse(tmp));
    }
  }

  private onLogin(idToken: string) {
    this.idToken.set(idToken);
    localStorage.setItem("idToken", JSON.stringify(this.idToken));
  }

  public isLoggedIn() {
    return this.idToken() != "";
  }

  public signup(email: string, password: string) {
    return this.httpClient.post<AuthResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap((data) => {
      this.onLogin(data.idToken);
    }));
  }

  public signin(email: string, password: string) {
    return this.httpClient.post<AuthResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap((data) => {
      this.onLogin(data.idToken);
    }));
  }

  public signout() {
    this.idToken.set("");
    localStorage.removeItem("idToken");
    this.router.navigate(['/login']);
  }
}
