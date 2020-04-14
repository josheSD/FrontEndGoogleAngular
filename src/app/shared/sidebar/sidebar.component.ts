import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public usuario:any;

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario[0];
  }

}
