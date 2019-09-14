import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AsistenciaService } from '../../services/asistencia.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-asistencia-qr',
	templateUrl: './asistencia-qr.page.html',
	styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQrPage implements OnInit {
	
	constructor( private barcodeScanner: BarcodeScanner, public asistenciaService: AsistenciaService, private authService: AuthService) { }
	
	ngOnInit() {
		
		
	}
	
	// Entrará y lanzara la funcion de Scan
	ionViewWillEnter() {
		
		this.scan();
	}
	
	
	// Regresa una promesa, abrira la camara, en barcoData vendra la información, el catch puede tener un error de cordoba. BarcodeData, cancelado, formato en el quee viene y el texto que viene en el codigo interno.
	async scan() {
		let matricula = this.authService.usuario.email;
		matricula = matricula.split('@')[0];
		
		console.log('Escanenando');
		
		const barcodeData = await this.barcodeScanner.scan();
		console.log('Barcode data', barcodeData);
		console.log('Matricula: ', matricula);
		
		console.log('Segunda función');
		
		this.asistenciaService.registrarAsistencia( matricula, 'Texto literal' ).then(respuesta => {
			console.log(respuesta);
		}).catch( err => { 
			console.log('Error de Asistencia');
			console.log(err);
		});
	}
}
