import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'camelToString'
})
export class CamelToStringPipe implements PipeTransform {
	
	transform(str: string ): any {
		return str
			// insert a space between lower & upper
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			// space before last upper in a sequence followed by lower
			.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
			// uppercase the first character
			.replace(/^./, function(str){ return str.toUpperCase(); })
	}
}
