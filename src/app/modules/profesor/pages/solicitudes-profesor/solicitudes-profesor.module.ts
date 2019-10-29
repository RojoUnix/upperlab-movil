import { ComponentsModule } from './../../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SolicitudesProfesorPage } from './solicitudes-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesProfesorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [SolicitudesProfesorPage]
})
export class SolicitudesProfesorPageModule {}
