import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPage } from './admin.page';
import { AdminRoutingModule } from './admin-routing.module';
import { TicketsAdminPage } from 'src/app/pages/tickets-admin/tickets-admin.page';
import { ConversacionPage } from './pages/conversacion/conversacion.page';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AdminRoutingModule,
		ComponentsModule
	],
	declarations: [
		AdminPage,
		TicketsAdminPage,
		ConversacionPage
	]
})
export class AdminPageModule {}
