import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
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
	
	correo: string;
	contrasena: string;

	constructor( public storage: Storage, private authServicio: AuthService, private router: Router, private alertService: AlertService, private navCtrl: NavController, private menuService: MenuService,  ) {
	}
	
	ngOnInit() {
		// No mostrar el menú en el LoginPage.
		this.menuService.showMenu(false);
	}

	// Formulario
	enviarFormulario() {

		this.authServicio.iniciarSesion(this.correo, this.contrasena).then( (userCredential: auth.UserCredential) => {
	
			// Se obtiene el usuario y sus atributos
			this.authServicio.usuario = userCredential.user;
						
			userCredential.user.getIdTokenResult(true).then( async idTokenResult => {				
				const rol = this.authServicio.valorNumericoRol( idTokenResult.claims );
				this.authServicio.rol = rol;

				// Guardar token
				await this.storage.set('token', idTokenResult.token);
				
				this.menuService.showMenu(true);

				if ( rol === ROLES.SUPERADMINISTRADOR ) {
					this.menuService.showMenu(false);
					this.alertService.mostrarError('Módulo no implementado', 'Pronto el Super administrador podrá ingresar...');
				} else if ( rol === ROLES.ADMINISTRADOR || rol === ROLES.PROFESOR ) {
					this.navCtrl.navigateRoot('/tickets');
				} else if ( rol === ROLES.ALUMNO ) {
					this.navCtrl.navigateRoot('/asistencia');
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
