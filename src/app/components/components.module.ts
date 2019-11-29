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
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SimpleSelectComponent } from './simple-select/simple-select.component';
import { CamelToStringPipe } from './pipes/camel-to-string.pipe';
import { DotdotdotPipe } from './pipes/dotdotdot.pipe';
import { EquipoEstadoPipe } from './pipes/equipo-estado.pipe';


@NgModule({
	declarations: [
		CamelToStringPipe,
		EquipoEstadoPipe,
		DotdotdotPipe,
		HeaderComponent,
		ListaTicketsComponent,
		MenuComponent,
		NuevoTicketPage,
		ChatComponent,
		SolicitudComponent,
		SolicitudesComponent,
		SimpleSelectComponent
	],
	providers: [
		
	],

	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule
	],
	exports: [
		CamelToStringPipe,
		DotdotdotPipe,
		EquipoEstadoPipe,
		IonicModule,
		MenuComponent,
		HeaderComponent,
		SimpleSelectComponent,
		ListaTicketsComponent,
		SolicitudComponent,
		SolicitudesComponent,
		ChatComponent,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
})
export class ComponentsModule { }
