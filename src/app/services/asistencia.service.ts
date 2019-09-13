import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { URL_SERVICIOS } from '../config/config';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class AsistenciaService {
	private URL_ASISTENCIA = URL_SERVICIOS + '/asistencia';

	constructor(private  http: HTTP/* private storage: Storage */) { }

	registrarAsistenciap(){	
		console.log('Funcion 1');
		console.log(this.URL_ASISTENCIA);	
	}

	// registrarAsistencia( matricula: string, codigoQR:string ): Promise<any> {
	// 	console.log('Obteniendo token');
		
	// 	// const token = this.storage.get('token');
	// 	const token = 'token';
	// 	const url = `${this.URL_ASISTENCIA}?token=${ token }`;
	// 	console.log(url);
	// 	console.log(matricula, codigoQR);
				
	// 	return this.http.post(url, {matricula: matricula, codigoQR:codigoQR}, {});
	// }
	
}
