import { Observable } from 'rxjs';
import { UsuarioService } from './../usuario/usuario.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  getAllPackagesUser():Observable<any>{

    let headers = new HttpHeaders({
      'Access-Authorization': `${this._usuarioService.token}`
    })
    
    let url = `${environment.API_URL}/package/all/user`;
    return this.http.get(url,{headers});

  }

  postPackageEmployee(data:any):Observable<any>{

    let headers = new HttpHeaders({
      'Access-Authorization': `${this._usuarioService.token}`
    })
    
    let url = `${environment.API_URL}/package/update/package/employee`;
    return this.http.post(url,data,{headers});

  }

  getAllPackages():Observable<any>{

    let headers = new HttpHeaders({
      'Access-Authorization': `${this._usuarioService.token}`
    })
    
    let url = `${environment.API_URL}/package/all`;
    return this.http.get(url,{headers});

  }

  postPackage(data:any):Observable<any>{

    let headers = new HttpHeaders({
      'Access-Authorization': `${this._usuarioService.token}`
    })
    
    let url = `${environment.API_URL}/package/post`;
    return this.http.post(url,data,{headers});

  }

}
