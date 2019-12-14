import { Component, OnInit, Input } from '@angular/core';
import { MensajeInterface } from '../../models/ticket.model';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
	
	@Input() propio: boolean;
	@Input() mensaje: MensajeInterface;
	@Input() siguiente: boolean;
	@Input() anterior: boolean;
	
	constructor() { }
	
	ngOnInit() {}
	
}
