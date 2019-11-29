import { ComponentsModule } from './../../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConversacionAlumnoPage } from './conversacion-alumno.page';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: ConversacionAlumnoPage
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
	declarations: [ConversacionAlumnoPage]
})
export class ConversacionAlumnoPageModule {}
