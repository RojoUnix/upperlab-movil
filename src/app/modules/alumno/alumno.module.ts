import { ComponentsModule } from './../../components/components.module';
import { ListaTicketsComponent } from './../../components/lista-tickets/lista-tickets.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnoPage } from './alumno.page';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { TicketsPage } from '../../pages/tickets/tickets.page';
import { ConversacionPage } from '../../pages/conversacion/conversacion.page';
import { AsistenciaQrPage } from '../../pages/asistencia-qr/asistencia-qr.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AlumnoRoutingModule,
    ComponentsModule
  ],
  declarations: [
    AlumnoPage,
    AsistenciaQrPage,
    TicketsPage,
    ConversacionPage
  ]
})
export class AlumnoPageModule {}
