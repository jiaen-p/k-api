# k-api

## Rest api

Este proyecto usa Node.js y MongoDB. Tiene un solo endpoint `/notas`

Para la creacion del endpoint se ha usado Express, con los siguientes métodos http:

### Get

- Para obtener informacion, devuelve todas las notas si no se pasa ningun parametro.

- En el caso de que se desee consultar una sola nota, se tiene que pasar en el query `id:<id del objeto deseado>`, o puede añadir el query al final del link por ejemplo `http://localhost:3000/notas?id=<id del objeto deseado>`

- En el caso de que se desee consultar todas las notas marcadas como favoritas, se tiene que pasar en el query `fav: true`, o `http://localhost:3000/notas?fav=true`

### Post

- Para crear notas, se manda en formato JSON, tiene que tener la siguiente estructura `{ "notas":[ {"nota":"<texto>"}, {"nota": "<texto>"}, ...] }`

### Put

- Para marcar una nota como favorita solo hay que pasar el id de la nota por el metodo put como parametro `id:<numero de id del objeto deseado>` o `http://localhost:3000/notas?id=<id del objeto deseado>`

## Instruciones

Antes de empezar, el proyecto asume que existe una base de datos de MongoDB en la maquina local en el puerto predefinido con credenciales predefinidos. Puede modificar la url en el archivo index.ts en la linea 11 sustituyendo la url por una válida.

- `git clone "<url del proyecto>"` para clonarlo
- `npm install` en la raiz de la carpeta
- `tsc *.ts` para compilar los archivos ts
- `node index.js` para inicializar el servidor en el puerto 3000

## Unit testing

Se ha configurado los archivos para realizar comprobaciones de que funcione los endpoints independientemente de la base de datos con el paquete mokgoose para simular la base de datos de mongodb. Se ha usado Mocha para realizar todo el test con la ayuda de chai y supertest, para comparar respuestas y realizar peticiones respectivamente.

### Para realizar el test

- `tsc ./test/*.ts` para compilar los archivos ts
- `npm run test` para ejecutar la prueba
