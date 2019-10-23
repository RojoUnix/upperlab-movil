import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlumnoPage } from './alumno.page';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { TicketsPage } from '../../pages/tickets/tickets.page';
import { AsistenciaQrPage } from './pages/asistencia-qr/asistencia-qr.page';
import { ConversacionAlumnoPage } from './pages/conversacion-alumno/conversacion-alumno.page';
import { FormsModule } from '@angular/forms';
import { SolicitudPage } from './solicitud/solicitud.page';


@NgModule({
	declarations: [
		AlumnoPage,
		AsistenciaQrPage,
		TicketsPage,
		ConversacionAlumnoPage,
		SolicitudPage
	],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		AlumnoRoutingModule,
		ComponentsModule
	],
	providers:[]
	
})
export class AlumnoPageModule {}
