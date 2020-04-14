import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { retry, map, filter, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:any;
  token:string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
  ) { 
    this.cargarStorage();
  }

  login(usuario:any,token?:number){

    let headers = new HttpHeaders({
      'Access-Active': `${token}`
    })

    let url = `${environment.API_URL}/usuario/login/normal`;
    return this.http.post(url,usuario,{headers})
                    .pipe(
                      map((resp:any)=>{
                        this.guardarStorage(resp.usuario[0]['id'],resp.token,resp.usuario);
                        return true;
                      }),
                      catchError((err:any) => {
                        return throwError(err);
                      })
                    );
  }

  registerUser(usuario:any):Observable<any>{
    let url = `${environment.API_URL}/usuario/post`;
    return this.http.post(url,usuario)
                .pipe(
                  map((resp:any) =>{
                    return resp;
                  }),
                  catchError((err:any) => {
                    return throwError(err);
                  })
                )

  }

  estaLogueado(){
    return (this.token.length > 5 ) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id:string,token:string,usuario:any){


    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    
    this.usuario = usuario; 
    this.token = token;
  }

  renuevaToken(){
    let headers = new HttpHeaders({
      'Access-Authorization': `${this.token}`
    })
    let url = `${environment.API_URL}/usuario/login/renuevatoken`;

    return this.http.get(url,{headers})
                    .pipe(
                      map((resp:any)=>{
                        this.token = resp.token;
                        localStorage.setItem('token',this.token);
                        return true;
                      }),
                      catchError((err:any)=>{
                        this.logout();
                        return throwError(err);
                      })
                    )
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

}