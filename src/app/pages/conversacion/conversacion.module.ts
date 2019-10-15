import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConversacionPage } from './conversacion.page';

const routes: Routes = [
	{
		path: '',
		component: ConversacionPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		RouterModule.forChild(routes),
		ComponentsModule
	],
	declarations: [
		ConversacionPage
	]
})
export class ConversacionPageModule {}
