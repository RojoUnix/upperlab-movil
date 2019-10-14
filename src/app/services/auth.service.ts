import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ROLES } from '../config/config';
import { AlumnoModel } from '../models/alumno.model';
import { AlumnosService } from './alumno.service';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	// Se agrega la modelo de usuario
	public usuario: firebase.User;
	public rol: number;
	alumno: AlumnoModel;
	
	// Inyectamos el servicio
	constructor( public afAuth: AngularFireAuth, private router: Router, private alumnosService: AlumnosService, private storage: Storage ) { }
	
	// Función para Iniciar Sesión
	iniciarSesion( correo: string, contrasena: string ) {
		console.log(correo);
		
		return this.afAuth.auth.signInWithEmailAndPassword( correo, contrasena );
	}
	
	// EL usuario de autentico
	estaAutenticado() {
		return true;
	} 
	
	// Manejo del Token
	almacenarToken() {
		this.afAuth.auth.currentUser.getIdToken(true).then( idToken => {
			console.log(idToken);
			
			this.storage.set('token', idToken);
		});
	}
	
	borrarToken(){
		this.storage.remove('token');
	}
		
	// Valor numerico del Rol
	valorNumericoRol( claims: any ) {
		if ( !!claims.isAlumno ) {
			return ROLES.ALUMNO;
		} else if ( claims.isProfesor ){
			return ROLES.PROFESOR;
		} else if ( claims.isAdmin ){
			return ROLES.ADMINISTRADOR;
		} else {
			return ROLES.SUPERADMINISTRADOR;
		}
	}
	
	// Función para cerrar sesión
	cerrarSesion() {
		this.afAuth.auth.signOut().then ( (val) =>{
			// this.borrarToken();
			this.router.navigate(['login']);
		}).catch( err => {
			console.log('Cerrar Sesión Catch()');
			console.log( err );
		});
	}

	//Consultar datos del usuario
	consultarDatosUsuario() {
		if ( this.rol === ROLES.ADMINISTRADOR || this.rol === ROLES.SUPERADMINISTRADOR ) {

		} else if ( this.rol === ROLES.PROFESOR ) {

		} else if ( this.rol === ROLES.ALUMNO ) {
			
			return this.consultarDatosAlumno();

		}
	}

	//Consultar Datos del Alumno
	consultarDatosAlumno(): Promise<boolean> {
		return new Promise( (resolve, reject) => {

			this.alumnosService.getAlumnoPorMatricula( this.usuario.email.split('@')[0] ).toPromise().then( respuesta => {
				console.log(respuesta);
				this.alumno = new AlumnoModel(respuesta.alumno);
				return this.alumnosService.getAsignacionesDeAlumno( this.alumno.matricula ).toPromise();
			}).then( (respuesta) => {
				if ( respuesta.ok ) {
					this.alumno.asignaciones = respuesta.asignaciones;
					console.log('Asignaciones obtenidas...');
					console.log(this.alumno.asignaciones);
				}

				return resolve();
			}).catch( err => {
				// this.swalService.error('Error', err.error.message);
				return reject();
			});
		});
	}
			
}
