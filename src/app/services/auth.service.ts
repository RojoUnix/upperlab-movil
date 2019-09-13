import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ROLES } from '../config/config';



@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	// Se agrega la modelo de usuario
	public usuario: firebase.User;
	public rol: number;
	
	// Inyectamos el servicio
	constructor( public afAuth: AngularFireAuth, private router: Router ){ }
	
	// Función para Iniciar Sesión
	iniciarSesion( correo: string, contrasena: string ){
		console.log(correo);
		
		return this.afAuth.auth.signInWithEmailAndPassword( correo, contrasena );
	}
	
	//EL usuario de autentico
	estaAutenticado(){
		return true;
	} 
	
	// Manejo del Token
	almacenarToken(){
		this.afAuth.auth.currentUser.getIdToken(true).then( idToken => {
			localStorage.setItem('token', idToken);
		});
	}
	
	borrarToken(){
		localStorage.removeItem('token');
	}
		
		// Valor numerico del Rol
		valorNumericoRol( claims: any ){
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
		cerrarSesion(){
			this.afAuth.auth.signOut().then ( (val) =>{
				// this.borrarToken();
				this.router.navigate(['login']);
			}).catch( err => {
				console.log('Cerrar Sesión Catch()');
				console.log( err );
			})
		}
		
	}
	