import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'equipoEstado'
})
export class EquipoEstadoPipe implements PipeTransform {
	
	transform( estado: number ): string {
		switch (estado) {
			case 1:
				return 'Estable';
				break;
			case 2:
				return 'Incidencial';
				break;
			case 3:
				return 'Urgente';
				break;
		}
	}
	
}
