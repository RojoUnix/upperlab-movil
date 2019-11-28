// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const URL_SERVICIOS = 'http://localhost:3000'; // <- Probar tickets y solicitudes
export const URL_SERVICIOS = 'https://app-upperlab.herokuapp.com'; //<-- Probar con el sistema web
// export const URL_SERVICIOS = 'http://192.168.43.88:3000'; // <-- Probar Asistencia

// NG SERVE  | IONIC SERVE

// ng build --

export const environment = {
	production: false,
	firebaseConfig: {
		apiKey: 'AIzaSyCvV0k6yfJ2dmFVeCJOhfIhQBb6AiRutTs',
		authDomain: 'upperlab-e81d9.firebaseapp.com',
		databaseURL: 'https://upperlab-e81d9.firebaseio.com',
		projectId: 'upperlab-e81d9',
		storageBucket: 'upperlab-e81d9.appspot.com',
		messagingSenderId: '952741181232',
		appId: '1:952741181232:web:a1c4d0ef38a413e1'
	}
};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
