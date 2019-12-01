import { Injectable, EventEmitter } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	
	private updateMenuEmitter: EventEmitter<void> = new EventEmitter();
	
	constructor( private menuCtrl: MenuController ) { }
	
	/**
	 * Mandarle al menú una notificación para que actualice sus datos.
	 */
	updateMenu() {
		this.updateMenuEmitter.emit();
	}

	getUpdateMenuEmitter(): EventEmitter<void> {
		return this.updateMenuEmitter;
	}


	/**
	 * Habilita o deshabilita el menu.
	 * 
	 * @param show Valor booleano para saber si se quiere mostrar o no.
	 */
	showMenu( show: boolean ) {
		this.menuCtrl.enable(show, 'first');
	}

}
