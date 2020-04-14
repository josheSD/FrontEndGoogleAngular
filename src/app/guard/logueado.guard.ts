import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}
  
  canActivate(){
    if(!this._usuarioService.estaLogueado()){
      return true;
    }else{  
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
  
}
