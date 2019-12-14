import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConversacionPage } from './conversacion.page';
import { FormsModule } from '@angular/forms';
import { AllGuard } from '../../guards/all.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ROLES } from '../../config/config';

const routes: Routes = [
	{
		path: '',
		component: ConversacionPage,
		canActivate: [AllGuard],
		data: {
			guards: [AuthGuard, RoleGuard],
			roles: [ROLES.ADMINISTRADOR, ROLES.ALUMNO, ROLES.PROFESOR]
		}
	}
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		RouterModule.forChild(routes),
		ComponentsModule,
		FormsModule
	],
	declarations: [
		ConversacionPage
	]
})
export class ConversacionPageModule {}
