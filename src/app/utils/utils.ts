
export function humanize( str: string ) {
	const frags = str.split('_');
	
	for (let i = 0; i < frags.length; i++) {
		
		frags[i] = frags[i].toLowerCase();
		if ( i === 0 ) {
			frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
		}
		
	}
	return frags.join(' ');
}


export function firstUC( str: string ) {
	str = str.toLowerCase();
	str = str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
	return str;
}


export function firstUCAllString( str: string ) {
	str = str.toLowerCase();
	const strArray: string[] = str.split(' ');
	console.log(strArray);
	const strArrayUpperCase: string[] = strArray.map( st => {
		return st.slice(0, 1).toUpperCase() + st.slice(1, st.length);
	});
	console.log(strArrayUpperCase);
	return strArrayUpperCase.join(' ');
}

export function sameDay( d1: Date, d2: Date ) {
	return d1.getFullYear() === d2.getFullYear() &&
	  d1.getMonth() === d2.getMonth() &&
	  d1.getDate() === d2.getDate();
}

