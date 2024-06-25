import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut, signInWithPopup, authState, GoogleAuthProvider } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;
  redirectUri = '';
  storedUri = '';

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
  ) {
    this.user$ = authState(auth).pipe(
      switchMap(user => {
        if (user) {
          return docData(doc(afs, 'user', user.uid)) as Observable<User>;
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn() {
    const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
    const { uid, email, displayName, photoURL } = credential.user;
    let ref = doc(this.afs, 'user', uid);
    return setDoc(ref, { uid, email, displayName, photoURL }, { merge: true });
  }

  async signOut() {
    await signOut(this.auth)
      .finally(() => {
        this.router.navigate(['login']);
      });
  }

}
