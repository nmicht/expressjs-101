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
