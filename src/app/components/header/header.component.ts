import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { HeaderOption } from 'src/app/shared/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	
	@Input() titulo: string;
	@Input() buttonType: number;
	@Input() url: string;

	// changeHeaderSub: Subscription;
	// changeTitleSub: Subscription;
	
	constructor( public headerService: HeaderService ) { }
	
	ngOnInit() {

		// Establecer por defecto el botón del menú.
		// this.buttonType = this.headerService.menuButton;

		// this.changeHeaderSub = this.headerService.changeHeaderButtonEmitter().subscribe( (options: HeaderOption) => {
		// 	console.log('Cambiando Header Button. Options:');
		// 	console.log(options);
		// 	this.buttonType = options.buttonType;

		// 	if ( this.buttonType !== this.headerService.menuButton ) {
		// 		this.url = options.url;
		// 	}
		// });

		// // Subscripción para cambiar título del header.
		// this.changeTitleSub = this.headerService.changeTitleEmitter().subscribe( ( title: string ) => {
		// 	this.titulo = title;
		// });
	}

	ngOnDestroy(): void {
		// this.changeHeaderSub.unsubscribe();
		// this.changeTitleSub.unsubscribe();
	}
	
}
