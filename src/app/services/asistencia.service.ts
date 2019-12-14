import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../environments/environment';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AlumnoModel } from '../models/alumno.model';
import * as io from 'socket.io-client';



@Injectable({
	providedIn: 'root'
})
export class AsistenciaService {
	
	private url: string = URL_SERVICIOS;
	private socket: SocketIOClient.Socket;
	private URL_ASISTENCIA: string = this.url + '/asistencia';
	
	constructor( private  http: HttpClient, private storage: Storage ) { }
	
	registrarAsistencia( alumno: AlumnoModel, encrypted: string ): Observable<any> {
		console.log( encrypted );
		return from( this.storage.get('token') ).pipe( mergeMap ( token => {
			const url = `${this.URL_ASISTENCIA}?token=${ token }`;
			return this.http.post(url, { alumno, encrypted }, {});
		}));
	}

	connectToLoginSocket( codigoQR: any ) {
		this.socket = io(`${ this.url }/login`);
		this.socket.emit('codigoQREscaneado', codigoQR);
		this.socket.on('loginResult', (result) => {
			console.log('Resultado del LOGIN: ', result);
		});
	}



	disconnect() {
		if ( this.socket.connected ) {
			this.socket.disconnect();
		}
	}

}
