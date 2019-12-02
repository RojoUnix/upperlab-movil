import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	
	constructor(private alertController: AlertController) { }
	
	
	
	/**
	 * Muestra un pop-up con la animación de carga para hacerle saber al usuario
	 * que el contenido está cargando y evitar que haga algo más. Para cerrar
	 * esta animación debe llamarse al método `cerrar()`.
	 * 
	 * @param mensaje Mensaje OPCIONAL que se muestra al usuario mientras carga.
	 * Si no se provee un mensjae se asignará por defecto a 'Cargando...'
	 * @return void
	 */
	
	async cargando(header: string = 'Cargando...', subHeader: string) {
		const alert = await this.alertController.create({
			header,
			subHeader
		});
		await alert.present();
		
	}
	
	/**
	 * Cierra el SweetAlert actual.
	 */
	cerrar() {
		// Swal.close();
	}
	
	/**
	 * Muestra un SweetAlert de confirmación de eliminación para preguntarle al
	 * usuario si está seguro de eliminar X información.
	 * 
	 * @param nombreElemento String para mostrarle al usuario qué elemento va
	 * a eliminar. Esto se muestra de la siguiente forma:  
	 * `'Eliminará permanentemente a {nombreElemento}'`
	 */
	// confirmarEliminacion(nombreElemento: string): Promise<Boolean> {
	// return Swal.fire({
	// 	title: '¿Está seguro de eliminar?',
	// 	html: `Eliminará permanentemente a <strong></strong>`,
	// 	type: 'warning',
	// 	showCancelButton: true,
	// 	cancelButtonColor: '#5A6268', // '#3085d6',
	// 	confirmButtonColor: '#d33',
	// 	cancelButtonText: 'No',
	// 	confirmButtonText: 'Sí',
	// 	reverseButtons: true,
	// 	focusCancel: true,
	// 	onBeforeOpen: () => {
	// 		Swal.getContent().querySelector('strong').textContent = nombreElemento;
	// 	}
	// });
	// }
	
	/**
	 * Muestra un SweetAlert de confirmación para preguntarle al usuario si
	 * está seguro de realizar alguna acción.
	 * 
	 * @param text Texto que se muestra como subtítulo del SweetAlert.
	 */
	async confirmarAccion(header: string, subHeader: string) {
		const alert = await this.alertController.create({
			header,
			subHeader,
			buttons: [{
				text: 'Aceptar',
				cssClass: 'primary',
				handler: (respuesta) => {
					respuesta(true)
				}
			},
			{
				text: 'Cancelar',
				cssClass: 'danger',
				handler: (respuesta) => {
					respuesta(false);
				}
			}]
		});
		await alert.present();
	}
	// confirmarAccion(text: string): Promise<Boolean> {
	// 	return Swal.fire({
	// 		title: '¿Está seguro?',
	// 		text,
	// 		type: 'warning',
	// 		showCancelButton: true,
	// 		cancelButtonColor: '#5A6268', // '#3085d6',
	// 		confirmButtonColor: '#d33',
	// 		cancelButtonText: 'No',
	// 		confirmButtonText: 'Sí',
	// 		reverseButtons: true,
	// 		focusCancel: true
	// 	});
	// }
	
	/**
	 * Muestra un SweetAlert de tipo `error`.
	 * 
	 * @param title Título del SweetAlert
	 * @param text Texto del SweetAlert
	 * @return Promise<SweetAlertResult>
	 */
	// error(title: string = 'Error', text: string): Promise<SweetAlertResult> {
	// 	return Swal.fire({
	// 		title,
	// 		text,
	// 		type: 'error'
	// 	});
	// }
	
	// Alertas
	async mostrarError(header: string, subHeader: string) {		
		const alert = await this.alertController.create({
			header,
			subHeader,
			buttons: [{
				text: 'Aceptar',
				cssClass: 'primary',
				handler: (blah) => {
					console.log('Alerta error');
				}
			}]
		});
		await alert.present();
	}
	
	
	/**
	 * Muestra un SweetAlert de tipo `success`.
	 * 
	 * @param title Título del SweetAlert
	 * @param text Texto del SweetAlert
	 * @return Promise<SweetAlertResult>
	 */
	async success(header: string, subHeader: string) {
		const alert = await this.alertController.create({
			header,
			subHeader,
			buttons: [{
				text: 'Aceptar',
				cssClass: 'primary',
				handler: (blah) => {
					console.log('Alerta error');
				}
			}]
		});
		await alert.present();
	}
	
}