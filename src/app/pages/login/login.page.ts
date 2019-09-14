import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ROLES } from 'src/app/config/config';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
	public formulario: FormGroup;

	constructor( public storage: Storage, private authServicio: AuthService, private router: Router, public alertController: AlertController ) {
	}
	
	ngOnInit() {
		this.formulario = new FormGroup({
			correo: new FormControl('', [
			Validators.required,
			// tslint:disable-next-line: quotemark
			Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
			]),
			contrasena: new FormControl('', Validators.required)
		});
	}

	// Formulario
	enviarFormulario() {	

		this.authServicio.iniciarSesion(this.formulario.get('correo').value,
		this.formulario.get('contrasena').value).then( (userCredential: auth.UserCredential) => {
	
			// Se obtiene el usuario y sus atributos
			this.authServicio.usuario = userCredential.user;
		
						
			userCredential.user.getIdTokenResult(true).then( idTokenResult =>{				
				const rol = this.authServicio.valorNumericoRol( idTokenResult.claims );
				this.authServicio.rol = rol;

				// Guardar token
				this.storage.set('token', idTokenResult.token);

				if( rol === ROLES.SUPERADMINISTRADOR ){
					this.router.navigate(['super-admin']);
				} else if ( rol === ROLES.ADMINISTRADOR ){
					this.router.navigate(['administrador']);
				} else if (rol === ROLES.PROFESOR){
					this.router.navigate(['profesor']);
				} else {
					// Ejemplo de envió http
					this.router.navigate(['asistencia-qr']);
				}
				
				
			});
			
		}).catch( (error) => {
			console.log('Login');
			
			console.log(error);
			
			// Alerta Incorrecto
			this.mostrarAlerta();
			
		});
		
	}


	// Alertas
	async mostrarAlerta() {
		const alert = await this.alertController.create({
			header: 'Error ',
			subHeader: 'Usuario y/o contraña incorrectos',
			// message: 'Esta es una alerta',
			buttons: [{
				text: 'Aceptar',
				cssClass: 'primary',
				handler: (blah) => {
					console.log('Alerta error');
				}
			}]
		});
		await alert.present();
	}
}
