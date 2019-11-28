import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ROLES } from 'src/app/config/config';
import { Storage } from '@ionic/storage';
import { AlertService } from '../../services/alert.service';

import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { FcmService } from '../../services/fcm.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
	public formulario: FormGroup;

	constructor( public storage: Storage, private authServicio: AuthService, private router: Router, private alertService: AlertService, public fcm: FcmService, public toastCtrl: ToastController  ) {
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


		this.fcm.getToken();

		this.fcm.listenToNotifications().pipe(
			tap( msg => {
				this.presentToast( msg );
			})
		);
	}

	async presentToast( msg: any ) {
		const toast = await this.toastCtrl.create({
			message: msg.body,
			duration: 2000
		});
		toast.present();
	}

	ionViewDidLoad() {

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
					this.alertService.mostrarError('Módulo no implementado', 'El módulo de superadmin aún no está implementado.');
				} else if ( rol === ROLES.ADMINISTRADOR ){
					this.router.navigate(['tickets']);
				} else if (rol === ROLES.PROFESOR){
					this.router.navigate(['profesor']);
				} else {
					// Ejemplo de envió http
					this.router.navigate(['/alumno/asistencia']);
				}				
			});
			
		}).catch( (error) => {
			console.log('Login');
			console.log(error);
			// Alerta Incorrecto
			this.alertService.mostrarError('Error', 'Usuario o Contraseña incorrectos');
		});
		
	}
}
