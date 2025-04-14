import { HttpInterceptorFn } from '@angular/common/http';


export const myhttpInterceptor: HttpInterceptorFn = (req, next) => {
  if( localStorage.getItem('eToken')!=null ){
    let myHeaders:any = { token:localStorage.getItem('eToken')}
    req= req.clone({
               setHeaders:myHeaders
      })
      }
  return next(req);
};
