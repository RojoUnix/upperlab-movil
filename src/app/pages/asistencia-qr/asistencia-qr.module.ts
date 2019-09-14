import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AsistenciaQrPage } from './asistencia-qr.page';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

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
		RouterModule.forChild(routes)
	],
	declarations: [
		AsistenciaQrPage,
		ToolbarComponent
	]
})
export class AsistenciaQrPageModule {}
