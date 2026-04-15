
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth/login';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  signup(details: {username: string, password: string, email: string}): Observable<any> {
    // We can use the same base path but with /signup
    const signupUrl = this.apiUrl.replace('/login', '/signup');
    return this.http.post<any>(signupUrl, details);
  }
}
