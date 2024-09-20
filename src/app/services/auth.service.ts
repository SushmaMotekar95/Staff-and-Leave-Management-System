import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, getAuth } from '@angular/fire/auth';
import { Database, ref, set, get, child } from '@angular/fire/database';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth;
  private db: Database;

  constructor(
    private router: Router,
    auth: Auth,
    db: Database
  ) {
    this.auth = auth;
    this.db = db;
  }

  // Register new user and store data in Realtime Database
    registerUser(email: string, password: string, name: string,  username:string, contactNumber: string, role: string, department: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((userCredential: UserCredential) => {
        const userId = userCredential.user.uid;
        // Store user details in the Realtime Database
        const userRef = ref(this.db, `/users/${userId}`);
        const usernameRef = ref(this.db, `/usernames/${username}`);
        return from(set(userRef, {
          email,
          name,
          username,
          contactNumber,
          role,
          department,
          userId
        })).pipe(
          switchMap(() => set(usernameRef, userId)), // Store username to userId mapping
          switchMap(() => of({ success: true })),
          catchError(error => {
            console.error('Registration error:', error);
            return of({ error: error.message });
          })
        );
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return of({ error: error.message });
      })
    );
  }

  // Login user with username and password
loginUser(username: string, password: string): Observable<any> {
  const usernameRef = ref(this.db, `/usernames/${username}`);
  return from(get(usernameRef)).pipe(
    switchMap(snapshot => {
      const userId = snapshot.val();
      if (!userId) {
        throw new Error('Username not found');
      }

      const userRef = ref(this.db, `/users/${userId}`);
      return from(get(userRef)).pipe(
        switchMap(userSnapshot => {
          const userData = userSnapshot.val();
          if (!userData) {
            throw new Error('User data not found');
          }

          const email = userData.email;
          const role = userData.role;
          const name = userData.name;
          const department = userData.department;
          

          return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
            switchMap((userCredential: UserCredential) => {
              return from(userCredential.user.getIdToken()).pipe(
                switchMap(token => {
                  // Return all relevant data including username
                  return of({ token, role, name, department, username });
                }),
                catchError(error => {
                  console.error('Error fetching token:', error);
                  return of({ error: error.message });
                })
              );
            }),
            catchError(error => {
              console.error('Login error:', error);
              return of({ error: error.message });
            })
          );
        }),
        catchError(error => {
          console.error('Error fetching user data:', error);
          return of({ error: error.message });
        })
      );
    }),
    catchError(error => {
      console.error('Username lookup error:', error);
      return of({ error: error.message });
    })
  );
}

  // Logout user
  logoutUser(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      switchMap(() => {
        this.router.navigate(['/login']);
        return of(undefined);
      }),
      catchError(error => {
        console.error('Logout error:', error);
        return of(undefined);
      })
    );
  }
}
