import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public formLogin : FormGroup = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',Validators.required),
  })

  public mensaje = '';

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { 

    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      
      if(queryParams.get('token') === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJlbWFpbCI6Impvc2VAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJKb3PDqSBDaHV0YXMgUmFtb3MiLCJwYXNzd29yZCI6IjopIn0sImlhdCI6MTU4NjQ1MTEzMSwiZXhwIjoxNTg2NDY1NTMxfQ.Qk_ovYU6mRvchPECobE6Z8hL-Drn1y5ConAvKs5vWSAYXQiOjE1ODY1MjA4MTksImV4cCI6MTU4NjUzNTIxOX0.ndPbCZoOYRuW7t1I-EB4_HxTBvXi-fGOMB3D3ESjLPw'){
        this.formLogin.get('email').setValue(queryParams.get('e'));
        this.formLogin.get('password').setValue(queryParams.get('p'));
        let token = 1;
        this.ingresar(token);
      }


    })



  }

  ngOnInit(): void {  

  }

  ingresar(token?:number){
    if(this.formLogin.invalid){
      return
    }
    this._usuarioService.login(this.formLogin.value,token)
    .subscribe( resp => {
        this.router.navigate(['/dashboard']);
    },err =>{
      this.mensaje = 'Correo validar';
      console.log('ERROR INGRESAR');
    });
  }

}
