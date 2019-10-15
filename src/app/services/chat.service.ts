import { MensajeInterface } from './../models/ticket.model';
import io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { AuthService } from './auth.service'
import { Observable } from 'rxjs/Observable';;


@Injectable({
	providedIn: 'root'
})
export class ChatService {
	
	private url = URL_SERVICIOS;
	private socket; 
	nombre: String;
	
	//Inyectar AuthService para obtener datos
	constructor(public authService: AuthService) {
		this.socket = io(this.url);

		this.nombre = authService.usuario.displayName;
		//Cargar Datos del Usuario del Chat
		var usuario = {
			nombre: this.nombre
		}
	}

	//Entrar a sala
	entrarSala(data){
		this.socket.emit('join', data);
	}

	obtenerMensajes = () => {
        return Observable.create((observer) => {
            this.socket.on('mensajeNuevo', (mensaje) => {
				console.log(mensaje);
                observer.next(mensaje);
            });
        });
	}
	
	nuevoUsuarioEntro(){
		let observable = new Observable<{ mensaje:MensajeInterface }>(observer=>{
			this.socket.on('nuevoUsuario', (data)=>{
				observer.next(data);
			});
			return () => {this.socket.disconnect();}
		})
		return observable;
	}

	abandonarSala(data){
		this.socket.emit('leave', data);
	}
	
	usuarioAbandonoSala(){
		let observable = new Observable<{ mensaje:MensajeInterface }>(observer=>{
			this.socket.on(' Abandonó la sala ', (data)=>{
				observer.next(data);
			});
			return () => {this.socket.disconnect();}
		})
		return observable;
	}

	enviarMensaje(data){
		console.log('Funcion Enviar Mensaje', data);
		
		this.socket.emit('nuevoMensaje',data);
	}

	nuevoMensajeRecibido(){
		let observable = new Observable<{ mensaje:MensajeInterface }>(observer=>{
			this.socket.on('Respuesta', (data)=>{
				console.log('La información que regresa el servidor ', data);
				observer.next(data);
			});
			return () => {this.socket.disconnect();}
		})
		console.log(observable);		
		return observable;
	}
}