import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfesorRoutingModule } from './profesor.routing.module';
import { ProfesorPage } from './profesor.page';
import { SolicitudesProfesorPage } from './pages/solicitudes-profesor/solicitudes-profesor.page';
import { LevantarSolicitudProfesorComponent } from './pages/levantar-solicitud-profesor/levantar-solicitud-profesor.component';


@NgModule({
  declarations: [
    ProfesorPage,
    SolicitudesProfesorPage,
    LevantarSolicitudProfesorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProfesorRoutingModule,
    ComponentsModule
  ],
  providers:[]
})
export class ProfesorPageModule { }
