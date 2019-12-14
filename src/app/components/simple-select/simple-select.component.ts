import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectOptions } from '../../shared/interfaces/interfaces';


@Component({
	selector: 'app-simple-select',
	templateUrl: './simple-select.component.html',
	styleUrls: ['./simple-select.component.css']
})
export class SimpleSelectComponent implements OnInit, OnDestroy {
	
	@Input() formulario: FormGroup;
	@Input() small: boolean = false;
	@Input() label: string;
	@Input() labelAcentuado: string;
	@Input() sinLabel: boolean = false;
	@Input() placeholder: string;
	@Input() opciones: SelectOptions;
	@Input() opcionGeneroMasculino: boolean;
	@Input() required: boolean = true;
	@Input() formularioEnviado$: Observable<boolean>;
	@Output() cambioDeOpcion: EventEmitter<void> = new EventEmitter();


	private eventsSubscription: any;
	sent: boolean = false;
	
	constructor() { }
	
	ngOnInit() {
		if ( this.formularioEnviado$ ) {
			this.eventsSubscription = this.formularioEnviado$.subscribe( status => {
				this.sent = status;
			});
		}
	}


	selectInvalido() {

		const validacion1 =  this.formulario.get(this.label).invalid && this.formulario.get(this.label).dirty;
		const validacion2 =  this.formulario.get(this.label).invalid && this.sent;

		return validacion1 || validacion2;
	}

	selectErrores() {

		if ( this.required ) {
			const validacion1 =  (this.formulario.controls[this.label].errors || {}).required && this.formulario.get(this.label).dirty;
			const validacion2 =  (this.formulario.controls[this.label].errors || {}).required && this.sent;
	
			return validacion1 || validacion2;
		}

		return false;
	}
	
	ngOnDestroy() {
		if ( this.eventsSubscription ) {
			this.eventsSubscription.unsubscribe();
		}
	}
}
