import { PackageService } from './../../../services/package/package.service';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, Directive, ElementRef, Input, EventEmitter, Output, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  @ViewChild('startpoint') public searchElement: ElementRef;
  @ViewChild('endpoint') public searchElement2: ElementRef;

  public formPackage: FormGroup = new FormGroup({ 
    'contenido' : new FormControl(null,[Validators.required]),
    'dimension' : new FormControl(null,[Validators.required]),
    'start_point' : new FormControl(null,[Validators.required]),
    'end_point' : new FormControl(null,[Validators.required])
  });
  
  public zoom: number = 10;

  public startPoint: FormControl; 
  public endPoint: FormControl; 
  public contenido: FormControl  = new FormControl();
  public dimension: FormControl  = new FormControl();

  public lat = -11.8746293;
  public lng = -77.161303;
  
  public origin:any;
  public destination:any;

  public mapaShow : boolean = false;
  public mensaje : string = '';
  public idRole:number;

  public packages : any[];

  public packagesEmployees : any[];
  public mapaShowEmployee : boolean = false;
  public originEmployee:any;
  public destinationEmployee:any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _usuarioService : UsuarioService,
    private _packageService: PackageService
  ) { 

    // DEMO VALIDATION
    this.idRole = Number(this._usuarioService.usuario[0].id_role); 

  }

  ngOnInit(): void {

    // DEMO VALIDATION
    if(this.idRole == 3){
      this.getDataPackages();
    }

    if(this.idRole == 2){
      this.getDataPackagesUser();
      this.getStartPointMap();
      this.getEndPointMap();
    }

  }

  verRuta(data:any){
    
    this.mapaShowEmployee = true;
    this.originEmployee = JSON.parse(data.start_point);
    this.destinationEmployee = JSON.parse(data.end_point);

  }

  guardarPaquete(data:any){

    const enviar = {
      id_employee:  this._usuarioService.usuario[0].id,
      id_package: data.id
    };
    this._packageService.postPackageEmployee(enviar)
        .subscribe(resp =>{
          console.log(resp);
        })
  }

  getDataPackages(){
    this._packageService.getAllPackages()
        .subscribe( resp =>{
          this.packages = resp.packages;
        })
  }











  getDataPackagesUser(){
    this._packageService.getAllPackagesUser()
        .subscribe( resp =>{
          this.mensaje = '';
          this.packagesEmployees = resp.packages;
        })
  }


  calcularDistancia(){

    this.formPackage.get('contenido').setValue(this.contenido.value);
    this.formPackage.get('dimension').setValue(this.dimension.value);
    this.formPackage.get('start_point').setValue(JSON.stringify(this.origin));
    this.formPackage.get('end_point').setValue(JSON.stringify(this.destination));


    if(!this.formPackage.valid){
      return;
    }
    

    this._packageService.postPackage(this.formPackage.value)
        .subscribe(resp =>{
          this.mapaShow = true;
          this.startPoint.reset();
          this.endPoint.reset();
          this.contenido.reset();
          this.dimension.reset();
          this.formPackage.reset();

          this.getDataPackagesUser();
        });
  }

  getStartPointMap(){

    this.startPoint = new FormControl();

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
          
          const latlong = {
            lat : place.geometry.location.lat(),
            lng : place.geometry.location.lng()
          };

          this.origin = latlong;

        });
      });
    });
  }

  getEndPointMap(){

    this.endPoint = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElement2.nativeElement,{
        types: [],
        componentRestrictions: {'country': 'PER'}
      });
      autocomplete.addListener('place_changed',() => {
        this.ngZone.run(() => {
          const place = google.maps.places.PlaceResult = autocomplete.getPlace();
          
          if(place.geometry === undefined || place.geometry === null){
            return;
          }
          
          const latlong = {
            lat : place.geometry.location.lat(),
            lng : place.geometry.location.lng()
          };

          this.destination = latlong;

        });
      });
    });
  }

  logout(){
    this._usuarioService.logout();
  }

}
