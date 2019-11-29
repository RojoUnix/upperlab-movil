import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPage } from './admin.page';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AdminRoutingModule,
		ComponentsModule
	],
	declarations: [
		AdminPage
	]
})
export class AdminPageModule {}
