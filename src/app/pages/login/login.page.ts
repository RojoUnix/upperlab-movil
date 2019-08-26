import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	
	constructor() { }
	
	ngOnInit() {
	}
	
	
	iniciar(){
		let correcto: boolean = false;
		
		this.verificarCorreo();
		console.log('Inicio sesión');
		
	}
	
	
	verificarCorreo() {
		
	}
	
}
