import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	
	private updateMenuEmitter: EventEmitter<void> = new EventEmitter();
	private showMenuEmitter: EventEmitter<boolean> = new EventEmitter();
	
	constructor() { }
	
	/**
	 * Mandarle al menú una notificación para que actualice sus datos.
	 */
	updateMenu() {
		this.updateMenuEmitter.emit();
	}

	getUpdateMenuEmitter(): EventEmitter<void> {
		return this.updateMenuEmitter;
	}


	showMenu( show: boolean ) {
		this.showMenuEmitter.emit( show );
	}

	getShowMenuEmitter(): EventEmitter<boolean> {
		return this.showMenuEmitter;
	}
	
}
