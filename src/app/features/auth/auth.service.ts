import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, pluck, switchMap, forkJoin, BehaviorSubject } from 'rxjs';
import { updateProfile } from '@firebase/auth';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

import { SigninCredentials, SignupCredentials } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this._auth);

  constructor(
    private readonly _auth: Auth,
    private readonly _http: HttpClient
  ) {}

  getStreamToken() {
    return this._http
      .post<{ token: string }>(`${environment.apiUrl}/createStreamToken`, {
        user: this.getCurrentUser(),
      })
      .pipe(pluck('token'));
  }

  getCurrentUser() {
    return this._auth.currentUser!;
  }

  signIn({ email, password }: SigninCredentials) {
    return from(signInWithEmailAndPassword(this._auth, email, password));
  }

  signUp({ email, password, displayName }: SignupCredentials) {
    return from(
      createUserWithEmailAndPassword(this._auth, email, password)
    ).pipe(
      switchMap(({ user }) =>
        forkJoin([
          updateProfile(user, { displayName }),
          this._http.post(`${environment.apiUrl}/createStreamUser`, {
            user: { ...user, displayName },
          }),
        ])
      )
    );
  }

  signOut() {
    const user = this._auth.currentUser;
    return from(this._auth.signOut()).pipe(
      switchMap(() =>
        this._http.post(`${environment.apiUrl}/revokeStreamUserToken`, { user })
      )
    );
  }
}
