import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, signOut, user } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { AuthProvider, GoogleAuthProvider, UserCredential, getAuth, signInWithPopup, updateProfile } from "@firebase/auth";
import { UserInterface } from "../interfaces/user.interface";
import { deviceDetectorService } from "./device-detector.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  firebaseAuth = inject(Auth);
  mobileDetector = inject(deviceDetectorService);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  userAuthSig = signal<boolean>(false)

  public registerWithEmail(username: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((response) =>
      updateProfile(response.user, { displayName: username }),
    );
    return from(promise);
  }

  public loginWithEmail(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }

  public signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.mobileDetector.isMobile() ? this.#callRedirect(provider) : this.#callPopUp(provider);
  }

  public sigInWithFacebook(): void {}

  public sigInWithApple(): void {}

  public async signOut(): Promise<void> {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      throw  error;
    }
  }

  async #callRedirect(provider: AuthProvider): Promise<UserCredential> {
    try {
      const auth = getAuth();
      return signInWithRedirect(auth, provider);
    }
    catch (error: any) {
      return error;
    }
  }

  async #callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(getAuth(), provider);
      return result;
    }
    catch (error: any) {
      return error;
    }
  }
}
