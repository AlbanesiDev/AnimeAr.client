import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { updateProfile } from "@firebase/auth";
import { UserInterface } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(username: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((response) =>
      updateProfile(response.user, { displayName: username }),
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }
}
