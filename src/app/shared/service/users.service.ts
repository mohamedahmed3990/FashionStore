import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../environments/environment.prod';
import { RegisterResponse, User } from '../interface/user.model';
// import { handleError } from '../../Utils/handleError';

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl = 'https://localhost:7041';
  private readonly apiUrlAuth = `${this.apiUrl}/auth`;
  private storageType: Storage | null = null;
  private profileImageSubject = new BehaviorSubject<string | null>(null);

  // Observable that components can subscribe to
  profileImage$ = this.profileImageSubject.asObservable();

  // Create a BehaviorSubject to track login state
  private _isLoggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') {
      this.storageType = sessionStorage;
    }
  }

  // users.service.ts
  addUser(user: User): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${this.apiUrlAuth}/register`, user)
      // .pipe(catchError(handleError));
  }

  // Login user
  loginUser(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrlAuth}/login`, { email, password })
      .pipe(
        tap((response) => {
          // Store the token in sessionStorage for authentication
          if (response && response.token) {
            this.setToken(response.token, false);
            this._isLoggedIn.next(true);
          }
        }),

        catchError((error) => {
          console.error('Login error:', error);
          let errorMessage = 'Login failed';

          if (error.status === 401) {
            errorMessage = 'Unauthorized. Please login again.';
            this.logout();
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }

          return throwError(() => new Error(errorMessage));
        })
      );
  }
  // reset password
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAuth}/forgot-password`, { email });
  }

  // Verify email token for password reset
  resetPassword(
    token: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAuth}/reset-password/${token}`, {
      password,
      confirmPassword,
    });
  }

  // Update user profile (requires token)
  updateUserProfile(userData: User, profileImage?: File): Observable<any> {
    const formData = new FormData();
    const token = this.getToken();

    // Append user data
    (Object.keys(userData) as Array<keyof User>).forEach((key) => {
      // Skip password and profileImage fields
      if (
        key !== 'password' &&
        key !== 'profileImage' &&
        userData[key] !== undefined &&
        userData[key] !== null
      ) {
        formData.append(key, String(userData[key]));
      }
    });

    // Append image if exists
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put<any>(`${this.apiUrlAuth}/update-profile`, formData, { headers })
      .pipe(
        tap((response) => {
          // Update the profile image in the service
          if (response.user?.profileImage) {
            this.profileImageSubject.next(response.user.profileImage);
          }
        }),
        catchError((error) => {
          console.error('Update error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Update failed')
          );
        })
      );
  }

  // Get authenticated user profile (requires token)
  // Add this method to decode JWT token
  private getPayload(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Update getUserProfile method
  // Add this constant at the top of the class
  private readonly defaultProfileImage = 'images/img-preview.png';

  // Update getUserProfile method to include default image
  getUserProfile(): Observable<User> {
    const token = this.getToken();
    // console.log('Current environment:', environment);
    // console.log('API URL:', this.apiUrlAuth);
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    const PayloadToken = this.getPayload(token);
    if (!PayloadToken?.id) {
      return throwError(() => new Error('Invalid token'));
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http
      .get<{ success: boolean; user: User }>(
        `${this.apiUrlAuth}/users/${PayloadToken.id}`,
        { headers }
      )
      .pipe(
        map((response) => ({
          ...response.user,
          profileImage: response.user.profileImage || this.defaultProfileImage,
        })),
        tap((user) => {
          // console.log('User profile loaded:', user);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching profile:', error);
          let errorMessage = 'Failed to fetch user profile';

          if (error.status === 401) {
            errorMessage = 'Unauthorized. Please login again.';
            this.logout();
          } else if (error.status === 404) {
            errorMessage = 'User not found';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }

          return throwError(() => new Error(errorMessage));
        })
      );
  }
  // Delete user (requires token)
  deleteUser(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlAuth}/profile`).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }

  setToken(token: string, rememberMe: boolean = false) {
    if (rememberMe) {
      localStorage.setItem('authToken', token);
      this.storageType = localStorage;
    } else {
      sessionStorage.setItem('authToken', token);
      this.storageType = sessionStorage;
    }
  }
  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return (
        localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
      );
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // Method to get current profile image
  getCurrentProfileImage(): string | null {
    return this.profileImageSubject.getValue();
  }

  // Add this method to the UsersService class
  sendPasswordResetLink(email: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrlAuth}/forgot-password`, { email })
      .pipe(
        tap((response) => {
          // console.log('Password reset link sent:', response);
        }),
        catchError((error) => {
          console.error('Password reset link error:', error);
          return throwError(
            () =>
              new Error(
                error.error?.message || 'Failed to send password reset link'
              )
          );
        })
      );
  }

  // delete profile image
  deleteProfileImage(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete<any>(`${this.apiUrlAuth}/profile-image`, { headers })
      .pipe(
        tap((response) => {
          // Update the profile image subject with default image
          this.profileImageSubject.next(this.defaultProfileImage);
        }),
        catchError((error) => {
          console.error('Delete profile image error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Failed to delete profile image')
          );
        })
      );
  }

  // Method to check and update login state
  checkLoginState() {
    this._isLoggedIn.next(this.isLoggedIn());
  }
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    const payload = this.getPayload(token);
    return payload?.unique_name || null; // حسب ما الـ backend بيصدر اسم المستخدم
  }
  
}
