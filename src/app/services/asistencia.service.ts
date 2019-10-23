import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AsistenciaService {
	private URL_ASISTENCIA: string = URL_SERVICIOS + '/asistencia';
	
	constructor( private  http: HttpClient, private storage: Storage ) { }
	
	async registrarAsistencia( matricula: string, codigoQR: string ): Promise<any> {
		const token = await this.storage.get('token');
		console.log(token);
		const url = `${this.URL_ASISTENCIA}?token=${ token }`;
		return this.http.post(url, { matricula, codigoQR }, {});
	}

}
