import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AsistenciaService } from '../../services/asistencia.service';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from '../../services/header.service';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-asistencia-qr',
	templateUrl: './asistencia-qr.page.html',
	styleUrls: ['./asistencia-qr.page.scss'],
})
export class AsistenciaQrPage implements OnInit {
	
	
	constructor( private barcodeScanner: BarcodeScanner, public asistenciaService: AsistenciaService, private authService: AuthService, private storage: Storage, private headerService: HeaderService ) {}
	
	ngOnInit() {}
	

	// Entrará y lanzara la funcion de Scan
	ionViewWillEnter() {
		console.log('ionViewWillEnter() - AsistenciaQrPage');
		this.headerService.setMenuButton();
		this.headerService.setTitle('Registrar Asistencia');
		// this.scan();
	}

	ionViewWillLeave() {
		this.asistenciaService.disconnect();
	}
	
	
	// Regresa una promesa, abrira la camara, en barcoData vendra la información, el catch puede tener un error de cordoba. BarcodeData, cancelado, formato en el quee viene y el texto que viene en el codigo interno.
	async scan() {

		if ( !this.authService.alumno ) {
			await this.authService.consultarDatosUsuario();
		}

		const alumno = this.authService.alumno;
		
		console.log('Escanenando');
		
		const barcodeData = await this.barcodeScanner.scan();
		console.log('Barcode data', barcodeData);
		console.log('Alumno: ', alumno);
		
		console.log('Segunda función');

		if ( barcodeData ) {
			const codigoQR: any = JSON.parse( barcodeData.text );
			const data = {
				uuid: codigoQR.uuid,
				correo: '',
				contrasena: ''
			};
			
			this.storage.get('correo').then( correo => {
				data.correo = correo;
				return this.storage.get('contrasena');
			}).then( contrasena => {
				data.contrasena = contrasena;

				console.log('Data que estamos enviando: ');
				console.log(data);
	
				this.asistenciaService.connectToLoginSocket(data);
			});
			
		}
		
		// this.asistenciaService.registrarAsistencia( alumno, barcodeData.text ).subscribe(respuesta => {
		// 	console.log(respuesta);
		// 	if ( respuesta.status === 201 ) {
		// 		this.authService.alumno = new AlumnoModel( respuesta.alumno );
		// 		this.alertService.success('Éxito', respuesta.message);	
		// 	} else {
		// 		this.alertService.mostrarError('¡Atención!', respuesta.message);
		// 	}

		// }, err => { 
		// 	this.alertService.mostrarError('¡Errror!', err.error.message);
		// 	console.log('Error de Asistencia');
		// 	console.log(err);
		// });
	}
}
