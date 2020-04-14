import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google: any;
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})

export class RegisterComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;

  public mensaje = '';
  
  public formRegister: FormGroup = new FormGroup({
    'name': new FormControl(null,[Validators.required]),
    'email': new FormControl(null,[Validators.required]),
    'phone': new FormControl(null,[Validators.required]),
    'direction': new FormControl(null,[Validators.required]),
    'password': new FormControl(null,[Validators.required]),
    'repeatpassword': new FormControl(null,[Validators.required]),
  },{ validators: this.sonIguales('password','repeatpassword')});

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement,{
        types: [],
        componentRestrictions: {'country': 'PER'}
      });
      autocomplete.addListener('place_changed',() => {
        this.ngZone.run(() => {
          const place = google.maps.places.PlaceResult = autocomplete.getPlace();
          
          if(place.geometry === undefined || place.geometry === null){
            return;
          }    

        });
      });
    });

  }


  registrarUsuario(){
    
      if(this.formRegister.invalid){
        return;
      }

      this.formRegister.get('direction').setValue($('#direccion').val());

      this.usuarioService.registerUser(this.formRegister.value)
          .subscribe( resp =>{
            this.formRegister.reset();
            this.mensaje = 'Por favor, Confirme su correo electrónico'
          })

  }

  sonIguales(campo1:string,campo2:string){

    return (group: FormGroup)=>{

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2){
        return null;
      }

      return {
        sonIguales:true
      }

    };
  }

}
