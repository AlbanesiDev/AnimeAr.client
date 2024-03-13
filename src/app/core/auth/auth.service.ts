import { Injectable, inject } from "@angular/core";
import {
  Auth,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "@angular/fire/auth";
import { Observable, from, throwError } from "rxjs";
import { deviceDetectorService } from "../services/device-detector.service";
import { UserInterface } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private mobileDetector = inject(deviceDetectorService);
  private auth: Auth = inject(Auth);
  public readonly authState$ = authState(this.auth);

  public registerWithEmail(credential: UserInterface): Observable<void> {
    try {
      const promise = createUserWithEmailAndPassword(this.auth, credential.email, credential.password).then(
        (response) => updateProfile(response.user, { displayName: credential.username }),
      );
      return from(promise);
    } catch (error) {
      return throwError(() => error);
    }
  }

  public loginWithEmail(credential: UserInterface): Observable<void> {
    try {
      const promise = signInWithEmailAndPassword(this.auth, credential.email, credential.password).then(() => {});
      return from(promise);
    } catch (error) {
      return throwError(() => error);
    }
  }

  public signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.mobileDetector.isMobile() ? this.#callRedirect(provider) : this.#callPopUp(provider);
  }

  public signInWithFacebook(): Promise<UserCredential> {
    const provider = new FacebookAuthProvider();
    return this.mobileDetector.isMobile() ? this.#callRedirect(provider) : this.#callPopUp(provider);
  }

  public async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  async #callRedirect(provider: AuthProvider): Promise<UserCredential> {
    try {
      return signInWithRedirect(this.auth, provider);
    } catch (error: any) {
      return error;
    }
  }

  async #callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result;
    } catch (error: any) {
      return error;
    }
  }
}
