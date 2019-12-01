import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ROLES } from 'src/app/config/config';
import { Storage } from '@ionic/storage';
import { AlertService } from '../../services/alert.service';
import { NavController } from '@ionic/angular';
import { MenuService } from '../../services/menu.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
	public formulario: FormGroup;

	constructor( public storage: Storage, private authServicio: AuthService, private router: Router, private alertService: AlertService, private navCtrl: NavController, private menuService: MenuService ) {
	}
	
	ngOnInit() {
		// No mostrar el menú en el LoginPage.
		this.menuService.showMenu(false);

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
		
						
			userCredential.user.getIdTokenResult(true).then( async idTokenResult => {				
				const rol = this.authServicio.valorNumericoRol( idTokenResult.claims );
				this.authServicio.rol = rol;

				// Guardar token
				console.log('Guardando token...');
				console.log(idTokenResult.token);
				await this.storage.set('token', idTokenResult.token);
				console.log('Guardado');
			
				
			
				if ( rol === ROLES.SUPERADMINISTRADOR ) {
					this.alertService.mostrarError('Módulo no implementado', 'El módulo de superadmin aún no está implementado.');
				} else if ( rol === ROLES.ADMINISTRADOR ) {
					this.menuService.showMenu(true);
					this.navCtrl.navigateRoot('/tickets');
					// this.router.navigate(['/admin/tickets']);
				} else if (rol === ROLES.PROFESOR) {
					this.menuService.showMenu(true);
					this.navCtrl.navigateRoot('/tickets');
					// this.router.navigate(['profesor']);
				} else if ( rol === ROLES.ALUMNO ) {
					this.menuService.showMenu(true);
					this.navCtrl.navigateRoot('/asistencia');
					// this.router.navigate(['/alumno/asistencia']);
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
