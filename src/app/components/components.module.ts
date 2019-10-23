import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaTicketsComponent } from './lista-tickets/lista-tickets.component';
import { NuevoTicketPage } from '../pages/nuevo-ticket/nuevo-ticket.page';


@NgModule({
	declarations: [
		HeaderComponent,
		ListaTicketsComponent,
		MenuComponent,
		NuevoTicketPage,
		ChatComponent
	],
	exports:[
		IonicModule,
		MenuComponent,
		HeaderComponent,
		ListaTicketsComponent,
		ChatComponent,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
	]
})
export class ComponentsModule { }
