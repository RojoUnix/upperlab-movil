import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-conversacion',
	templateUrl: './conversacion.page.html',
	styleUrls: ['./conversacion.page.scss'],
})
export class ConversacionPage implements OnInit {
	
	formChat = new FormGroup({
		mensaje: new FormControl('')
	});
	nombre: String;
	sala: String;
	MensajeTexto: String;
	mensajesArreglo:Array<{user:String,mensaje:String}> =[];
	
	constructor(private chatService: ChatService, private activeRoute: ActivatedRoute, private authService: AuthService){ 
		//Observables para identificar a Usuarios en la sala y Mensajes
		this.chatService.nuevoUsuarioEntro().subscribe(data=> this.mensajesArreglo.push(data));
		this.chatService.nuevoMensajeRecibido().subscribe(data=> this.mensajesArreglo.push(data.mensaje));
		this.chatService.usuarioAbandonoSala().subscribe(data=>	this.mensajesArreglo.push(data));
	}
	
	ngOnInit() {
		this.nombre = this.authService.usuario.displayName.split(' ')[0];
		
		this.sala = this.activeRoute.snapshot.paramMap.get('idTicket');
		console.log('La sala es ', this.sala);
		this.entrarSala(this.sala);
	}
	
	entrarSala(sala){
		this.chatService.entrarSala({
			user: this.nombre,
			sala
		});
	}

	abandonarSala(sala){
		this.chatService.abandonarSala({
			user: this.nombre,
			sala
		});
	}

	enviarMensaje(sala){
		sala = this.sala
		console.log('Sala', sala);
		this.MensajeTexto = this.formChat.get('mensaje').value;
		console.log('Mensaje para enviar: ', this.MensajeTexto);
		if(this.MensajeTexto != ''){
			this.chatService.enviarMensaje({
				user: this.nombre,
				sala,
				mensaje: this.MensajeTexto
			});
		}
	}
	
}
