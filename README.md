# Las bases para trabajar

1. Iniciamos el repositorio con `npm init`
2. Creamos el archivo .gitignore y agregamos node_modules para ser ignorado.

## Dependencias para estándares de desarrollo

2. Instalamos paquetes de desarrollo como ESLint y la configuración de
AirBnb.

```
npm install eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

3. Creamos los archivos `.eslintrc` y `.editorconfig` para mantener un estándar de trabajo.

## ExpressJS

4. Instalamos expressjs, así como body-parser para el proceso de los requests.

```
npm install express body-parser
```

5. Creamos el archivo app.js

6. Instalamos dotenv para facilitar la inyección de variables de desarrollo.

```
npm install dotenv
```

7. Creamos nuestro archivo `.sample-env` con las variables de entorno requeridas para el proyecto y agregamos en el `.gitignore` el archivo `.dotenv`

8. Actualizamos nuestro archivo `app.js` para utilizar las variables de entorno y el puerto definido.

9. Instalamos nodemon para facilitar el reload de nuestro servidor ante los cambios de nuestro código.

```
npm install nodemon
```

# Estructura del proyecto

10. Creamos los folders para los módulos del proyecto teniendo controladores, modelos, middlewares y rutas.

## Organización de rutas

11. Las rutas de cada módulo del API se deben mantener por separado, y el archivo index de rutas solo debe entregar el conjunto de todas las rutas.  
En el archivo `index.js` instanciamos el router y agregamos la ruta base.

12. En `app.js` debemos cargar todas las rutas haciendo require de routes y agregando el router con `app.use(router)`.

13. Agregamos el body-parser en `app.js` como un middleware para toda la aplicación y con ello poder procesar los requests como json.

14. En el archivo index.js de routes cargamos las rutas de un módulo en específico, en este caso, de usuarios.

15. En users.js de routes creamos cada ruta requerida, y cargamos el controlador que se hará cargo de la lógica.

## Controladores

16. En el archivo `index.js` de los controladores exportamos la clase UserCtrl que tendrá todos los métodos encargados de la lógica para el manejo de usuarios.

17. Creamos la clase `UserCtrl` con todos los métodos que vayamos a utilizar. Es importante hacer binding de `this` por cada método para no perder el contexto al ejecutarlo en el router.

18. Agregamos los métodos necesarios para obtener todos los elementos, un elemento, eliminar, etc.  
*Nota: De momento hemos metido datos hardcodeados y manipulado el arreglo de elementos por cuestión práctica. Mas adelante cambiaremos la lógica para conectar a la base de datos*

## Middlewares

Los middlewares se utilizan para realizar acciones de proceso y validación antes de llegar al controlador.  
En este caso, haremos un middleware para validar las entradas de la petición.

19. Crear la clase Validator e incluir métodos estáticos para validar distintos tipos de cadenas e inputs.  
Se puede tener un set de reglas regex que podrán ser utilizadas en el resto de los métodos.

20. A nuestro validator le crearemos un método que debe recibir los parámetros de todo middleware: `req`, `res` y `next` pero que además recibirá un set de reglas que serán definidas en la ruta.

21. Iterar por cada una de las reglas definidas y ejecutar los métodos definidos en las reglas.

Ejemplo de reglas en la ruta
```
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      email: 'email,required',
    },
  });
}, usersCtrl.create);
```

Y nuestro método validate iterará sobre cada uno.

22. El index de los controladores debe exportar el módulo de validator

23. En el archivo de rutas debemos cargar los middlewares y agregar las validaciones que se desean en cada ruta.

## Manejador de errores con middleware

Agregar un manejador de errores es muy sencillo, lo importante es usar crear un middleware y agregarlo al router con un `use`. El método del middleware recibe los cuatro argumentos, de otro modo, no funcionará.  

En este caso el validador lanza un `next` con un objeto de error formateado a nuestro gusto, y el errorHandler que hemos recibido se encarga de lanzar la respuesta de error con el codigo y el formato del json.

24. Crear un middleware que recibe `err`, valida su contenido, define las cabeceras y manda el response con el json procesado con los datos del error.

25. En cualquier middleware que se desee lanzar un error, en el `next` se tiene que mandar ya sea un objeto Error con todo el stack trace o un objeto cualquier con todos los datos.

## Conexión a la base de datos

Existen [muchos paquetes en node](http://expressjs.com/es/guide/database-integration.html) para la conexión a la base de datos.
En este caso usaremos [mysql](https://github.com/felixge/node-mysql/) pero además, haremos una abstracción para la manipulación de la base de datos.

26. Crear una clase para la manipulación de la base de datos, con un constructor que realiza la conexion y la exportación será de una instancia para de esta manera lograr un singleton.

27. En nuestra clase DB agregamos metodos para las diferentes acciones que queramos ejecutar en la base de datos.  
Como estamos usando mysql debemos escapar los queries con `?` para valores y con `??` para campos, tablas, etc.

28. Dado que obtener datos de la base de datos es un proceso asincrono, lo ideal es que esto regrese un promise y con ello, podremos manipularlo desde donde lo mandemos a llamar.

## Modelos

Un modelo es un objeto que representa una tabla de la base de datos generalmente, de modo que haremos tantos modelos como sean necesarios y dentro de estos meteremos métodos para la manipulación de la base de datos en específico para ese modelo.

29. Crearemos nuestra clase para los usuarios con un constructor para definir todos sus atributos.

20. Agregamos un metodo para acceder a la base de datos y procesar los resultados creando instancias del modelo en cuestion.  
Es importante que el metodo sea estático para no requerir una instancia cuando aun no tenemos un usuario, pero queremos obtenerlo de la base de datos.

21. Método para crear nuevos recursos, en la base de datos un `insert` que permite mandar el recurso completo

22. En el modelo, un método estático `create` que manda a ejecutar el método de la base de datos, y en caso de recibir un `insertId` en la respuesta, crea el objeto User para regresarlo al controlador, en caso contrario, regresa un arreglo vacio.

23. En el controlador, manda a llamar el método create del modelo y manda la respuesta con un código 201.

## Manejo de errores de la base de datos

24. En nuestra clase que maneja la base de datos agregamos métodos para procesar los errores y devolver un objeto de acuerdo a nuestro diseño.
En este caso solo he agregado un método para manipular mensajes de error con entradas duplicadas, pero se pueden procesar distintos mensajes y crear un formato estandarizado para nuestra aplicación.

25. Todos los métodos que estan recibiendo promises deben manejarlas a través de `try-catch`. En este caso lo aplicamos en el modelo y en el controlador.
