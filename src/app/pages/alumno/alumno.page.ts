import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http';


@Component({
	selector: 'app-alumno',
	templateUrl: './alumno.page.html',
	styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
	


	constructor( private http: HTTP) { }
	
	ngOnInit() {
	}
	
	
	onClick(){
		let url= 'www.google.com.mx';
		this.http.get( url, {}, {} ).then(data=> {
			console.log( data.status );
			console.log( data.error );
			console.log( data.headers );

		}).catch(error =>{
			console.log( error.status );
			console.log( error.error );
			console.log( error.headers );
		});
		
	}
}
