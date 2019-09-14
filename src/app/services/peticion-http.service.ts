import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PeticionHttpService {
	
	constructor( private http: HTTP) { }
	
	public peticionHttp(){
		return this.http.get('www.google.com.mx', {}, {});
	}
}
