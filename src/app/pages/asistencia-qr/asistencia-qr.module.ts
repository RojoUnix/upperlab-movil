import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AsistenciaQrPage } from './asistencia-qr.page';
import { AllGuard } from '../../guards/all.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ROLES } from '../../config/config';

const routes: Routes = [
	{
		path: '',
		component: AsistenciaQrPage,
		canActivate: [AllGuard],
		data: {
			guards: [AuthGuard, RoleGuard],
			roles: [ROLES.ALUMNO]
		}
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
