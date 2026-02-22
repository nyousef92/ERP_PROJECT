import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { SessionService } from './session.service';
import { LocalStorageCacheService } from './local-storage-cache.service';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authUrl = environment.authUrl;
  private tokenExpirationTimer: any;
  private refreshInProgress$: Observable<any> | null = null;
  constructor(
    private session: SessionService,
    private apiService: ApiService,
    private ls: LocalStorageCacheService,
    private router:Router
  ) {
    this.restoreTokensFromStorage();
  }

  get refreshToken(): string | null {
    return this.session.refreshToken$();
  }

  private restoreTokensFromStorage(): void {
    try {
      const storedToken = this.ls.get<string | null>('accessToken', 'auth');
      const storedRefreshToken = this.ls.get<string | null>('refreshToken', 'auth');

      if (storedToken) {
        this.session.setToken(storedToken);
        const decoded = this.decodeToken(storedToken);
        if (decoded) {
          this.session.setDecodedToken(decoded);
          const expiresIn = decoded.exp * 1000 - Date.now();
          if (expiresIn > 0) {
            this.setTokenExpirationTimer(expiresIn);
          }
        }
      }

      if (storedRefreshToken) {
        this.session.setRefreshToken(storedRefreshToken);
      }
    } catch (e) {
      console.error("Error restoring session", e);
    }
  }


  private setTokenExpirationTimer(expiresIn: number): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    const refreshBuffer = 300000;
    const timeout = expiresIn - refreshBuffer;

    if (timeout > 0) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.refreshAccessToken().subscribe();
      }, timeout);
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1]; // Get the payload part
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private handleTokenResponse(response: TokenResponse): void {
    const { accessToken, refreshToken } = response;
    this.session.setToken(accessToken);
    this.session.setRefreshToken(refreshToken);
    this.ls.set('accessToken', accessToken, 'auth');
    this.ls.set('refreshToken', refreshToken, 'auth');
    let decoded = this.decodeToken(accessToken);
    if (decoded?.exp) {
      const expiresIn = decoded.exp * 1000 - Date.now();
      this.setTokenExpirationTimer(expiresIn);
      this.session.setDecodedToken(decoded);
    }
  }

  login(loginPayload: any): Observable<TokenResponse | string> {
    // const request = this.apiService.post<TokenResponse>(
    //   `${this.authUrl}/Login`,
    //   loginPayload
    // );

    const request = of(
      {
        "data": {
          "tokenType": "Bearer",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxODIyNDkzMTE0Nzk1ODIzMTA1Iiwic3ViIjoiMTMiLCJ1c2VySWQiOiIwMDAwMDAxMyIsIm5hbWUiOiJOYWRhIFlvdXNlZyIsInVzZXItbmFtZSI6Ik1TMU9ZV1JoTGxsdmRYTmxaZz09IiwiZW1haWwiOiJOYWRhLllvdXNlZkB5b3VyZG9tYWluLmNvbSIsImRldml2ZSI6Ik56ZGxPV0ppTUdObFpEaGxaamM1TVdVeFkyUTFZakkxWW1FeU1tWTBabUU9IiwidXNlciI6IkYxd1Bfblljbml5RHpKanFVV1N5ZE5Jazd4UGIwUXpROFNpNVdBVThYSUJJNFdEdXlyYWE3eHZET0ZPSUtlb0g5MFhtc0xlSFdZTV92LXV1OFRlT05RfHwiLCJleHAiOjE3NzExNDI4OTMsImlzcyI6Imh0dHBzOi8veW91cmRvbWFpbi5hdXRoLmNvbSIsImF1ZCI6Imh0dHBzOi8veW91cmRvbWFpbi5hcGkuY29tIn0.ObLPfZ-M6--wKTl9z6p3RNaHL-6FDVPTLC7w9tofGSM",
          "expiresIn": 1800,
          "refreshToken": "LVrxT-zJl7Xe_h43MlWKMof5Y4XInktgYWbZ6BbKThP5AiRsDY-XV1sZ4lZruJxLwKQ_Lu_7rrfsefF78qjwWuOxYEk-5wYhAnraLCoZ2EV-Q1XGRn5eIi2UMt4HWn-l5AL0n5B5e0nLJveCrHNPP95LDAlmLh7-whNQ_ynLHjE|",
          "refreshTokenExpiresIn": 604800,
          "user": {
            "displayName": "Nada Yousef",
            "email": "Nada.Yousef@gmail.com",
            "role": "editor"
          }
        },
        "success": true,
        "responseCode": 200,
        "id": "",
        "loginUser": null,
        "detailMessage": null,
        "messages": [],
        "hasMessage": false,
        "total": 0
      }
    ).pipe(
      map(resp => resp.data)
    );

    return request.pipe(
      tap((response: any) => this.handleTokenResponse(response)),
      catchError((e) => {
        console.error(e);
        this.logout();
        return throwError(()=>'logout')

      })
    );
  }

  refreshAccessToken(): Observable<any> {
    // If a refresh call is already in progress, return the existing observable
    if (this.refreshInProgress$) {
      return this.refreshInProgress$;
    }
    const payLoad = {};

    if (!this.refreshToken) {
      return this.login(payLoad);
    }

    this.refreshInProgress$ = this.apiService.post<TokenResponse>(
      `${this.authUrl}/RefreshToken`,
      { refreshToken: this.refreshToken }
    ).pipe(
      tap((response: any) => {
        this.handleTokenResponse(response);
        this.refreshInProgress$ = null;
      }),
      catchError((err) => {
        this.refreshInProgress$ = null;
        return throwError(() => err);
      })
    );

    return this.refreshInProgress$ ?? of('');
  }


  logout() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }

    this.session.setToken(null);
    this.session.setRefreshToken(null);
    this.session.setDecodedToken(null);
    this.ls.remove('accessToken', 'auth');
    this.ls.remove('refreshToken', 'auth');
    this.router.navigate(['/'])
  }


  //TODO is this page allowed for the logedin user
  isPageAllowed(pageName: string) {
    return of(true);
  }
}