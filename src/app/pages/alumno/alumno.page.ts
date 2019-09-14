import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';


@Component({
	selector: 'app-alumno',
	templateUrl: './alumno.page.html',
	styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
	


	constructor( private http: HTTP) { }
	
	ngOnInit() {
	}
	
	
	onClick() {
		const url = 'http://192.168.1.78:3000/plantilla/equipowasd';
		console.log(url);
		this.http.get('http://ionic.io', {}, {})
		.then(data => {
	
			console.log(data.status);
			console.log(data.data); // data received by server
			console.log(data.headers);
	
		})
		.catch(error => {
	
			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);
	
		});
		
	}
}
