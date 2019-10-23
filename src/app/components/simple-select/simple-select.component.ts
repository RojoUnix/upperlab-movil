import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
	selector: 'app-simple-select',
	templateUrl: './simple-select.component.html',
	styleUrls: ['./simple-select.component.scss'],
})
export class SimpleSelectComponent implements OnInit {
	@Input() formulario: FormGroup;
	@Input() small: boolean;
	@Input() label: string;
	@Input() labelAcentuado: string;
	@Input() type: string;
	@Input() generoMasculino: boolean;
	@Input() plural: boolean;
	@Input() required: boolean;
	@Input() sentObservable: Observable<boolean>;
	placeholder: string;
	private eventsSubscription: any;
	sent: boolean = false;
	
	constructor() { }
	
	ngOnInit() {
		
		
		let articulo: string;
		
		if ( this.generoMasculino && !this.plural ) {
			articulo = 'el';
		} else if ( this.generoMasculino && this.plural ) {
			articulo = 'los';
		} else if ( this.plural ) {
			articulo = 'las';
		} else {
			articulo = 'la';
		}
		
		this.placeholder = 'Ingrese ' + articulo  + ' ' + ( this.labelAcentuado || this.label);
		
		this.eventsSubscription = this.sentObservable.subscribe( status => {
			console.log('Status: ');
			console.log(status);
			this.sent = status;
		});
		
	}
	
	
	inputInvalido() {
		const validacion1 =  this.formulario.get(this.label.toLowerCase()).invalid && this.formulario.get(this.label.toLowerCase()).dirty;
		const validacion2 =  this.formulario.get(this.label.toLowerCase()).invalid && this.sent;
		
		return validacion1 || validacion2;
	}
	
	inputErrores() {
		
		if ( this.required ) {
			const validacion1 =  (this.formulario.controls[this.label.toLowerCase()].errors || {}).required && this.formulario.get(this.label.toLowerCase()).dirty;
			const validacion2 =  (this.formulario.controls[this.label.toLowerCase()].errors || {}).required && this.sent;
			
			return validacion1 || validacion2;
		}
		return false;
	}
	
	ngOnDestroy() {
		this.eventsSubscription.unsubscribe();
	}
}
