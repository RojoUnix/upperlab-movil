import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AsistenciaQrPage } from './asistencia-qr.page';

const routes: Routes = [
	{
		path: '',
		component: AsistenciaQrPage
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
	declarations: [
		AsistenciaQrPage,
	]
})
export class AsistenciaQrPageModule {}
