import { Injectable, EventEmitter } from '@angular/core';
import { HeaderOption } from '../shared/interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class HeaderService {
	
	private changeHeaderButton: EventEmitter<HeaderOption> = new EventEmitter();
	private changeTitle: EventEmitter<string> = new EventEmitter();

	// Desde aquí se controlan los valores para cada botón:
	menuButton: number = 1;
	backButton: number = 2;

	constructor() { }

	/**
	 * Cambiar el botón del menú de hamburguesa por el botón de retroceder.
	 * 
	 * @param url Url para el botón de retroceder.
	 */
	setBackButton( url: string ) {
		this.changeHeaderButton.emit( {buttonType: this.backButton, url} );
	}

	/**
	 * Establecer el botón del menú de hamburguesa.
	 */
	setMenuButton() {
		this.changeHeaderButton.emit( {buttonType: this.menuButton, url: null} );
	}

	changeHeaderButtonEmitter(): EventEmitter<HeaderOption> {
		return this.changeHeaderButton;
	}


	/**
	 * Cambiar el título del header.
	 * 
	 * @param title Título que se desea establecer en el header.
	 */
	setTitle( title: string ) {
		this.changeTitle.emit( title );
	}

	changeTitleEmitter(): EventEmitter<string> {
		return this.changeTitle;
	}
}
