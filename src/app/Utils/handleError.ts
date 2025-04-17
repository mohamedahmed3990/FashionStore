// import { HttpErrorResponse } from "@angular/common/http";
// import { throwError } from "rxjs";

// export function handleError(error: HttpErrorResponse) {
//   const errorMap: { [key: number]: string } = {
//     400: error.error?.message || 'Invalid form data',
//     409: 'Email already exists',
//     500: 'Something went wrong. Please try again later.',
//     0: 'Unable to connect to the server'
//   };
//   const errorMessage = errorMap[error.status] || 'An error occurred';
//   console.error('API Error:', { status: error.status, error: error.error });
//   return throwError(() => ({
//     userMessage: errorMessage,
//     isServerError: error.status >= 500
//   }));
// }
