import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, take, tap } from 'rxjs';
import { AuthResponseDto } from '../dto/AuthResponse.dto';
import { TokensDto } from '../dto/Tokens.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';

  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  private readonly _base;

  constructor(private http: HttpClient) {
    this._base = `${environment.base_url}/oauth/`;
  }

  login(username: string, password: string): Observable<AuthResponseDto> {
    const body = {
      grant_type: environment.grant_type,
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      username,
      password,
    };
    return this.http.post<AuthResponseDto>(`${this._base}token`, body);
  }

  refreshToken() {
    const body = {
      grant_type: 'refresh_token',
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      refresh_token: this.getRefreshToken(),
    };
    return this.http
      .post<any>(`${environment.base_url}/oauth/token`, body)
      .pipe(tap((tokens: any) => this.storeTokens(tokens)));
  }

  logout() {
    this.http
      .get(`${this._base}logout`)
      .pipe(take(1))
      .subscribe(() => {
        this.removeTokens();
      });
  }

  storeTokens(tokens: TokensDto) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  getAuthorizationToken() {
    const token = localStorage.getItem(this.ACCESS_TOKEN);
    return token ? token : null;
  }

  getRefreshToken() {
    const token = localStorage.getItem(this.REFRESH_TOKEN);
    return token ? token : null;
  }

  statusOffline(status: 'online' | 'offline' = 'offline') {
    this.http.get(`${this._base}${status}`).pipe(take(1)).subscribe();
  }

  setLockStatus(id: number, action: 'locked' | 'unlocked') {
    return this.http.get(`${this._base}user/${action}/${id}`).pipe(take(1));
  }

  closeSystem(id: number, locked: boolean) {
    return this.http
      .post(`${this._base}user/closeSystem/${id}`, { locked })
      .pipe(take(1));
  }
}
