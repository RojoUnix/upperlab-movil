import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaTicketsComponent } from './lista-tickets/lista-tickets.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SimpleSelectComponent } from './simple-select/simple-select.component';
import { CamelToStringPipe } from './pipes/camel-to-string.pipe';
import { DotdotdotPipe } from './pipes/dotdotdot.pipe';
import { EquipoEstadoPipe } from './pipes/equipo-estado.pipe';
import { MessageComponent } from './message/message.component';
import { MenuDetallesComponent } from './menu-detalles/menu-detalles.component';


@NgModule({
	declarations: [
		CamelToStringPipe,
		EquipoEstadoPipe,
		DotdotdotPipe,
		HeaderComponent,
		ListaTicketsComponent,
		MenuComponent,
		MenuDetallesComponent,
		ChatComponent,
		MessageComponent,
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
		MenuDetallesComponent,
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
