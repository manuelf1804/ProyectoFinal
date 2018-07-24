# Proyecto Final de Desarrollo IX ##

## Pagina Web de los Ganchos ##


Por: Ramon Castro
     Manuel Fernandez
     Pedro Ramos 


## Copiar este repositorio para pruebas y/o hacer cambios  ##

Para hacer pruebas de manera local de este repostorio: 
* un servidor web que maneje los archivos estaticos: imagenes,css,javascript, por ejemplo: Apache , Nginx, etc.
* una parte RESTful que maneje las peticiones, para esta parte se usa [express](https://expressjs.com/), express se va a encargar de renderizar archivos escritos en [Pug](https://pugjs.org)
* una base de datos. Para las prueas se estara usado mongoDB junto con el modelador de datos [mongoose](http://mongoosejs.com/).

Para las pruebas locales se configuro nginx de manera que sirviera los archivos que se encuentran en
/var/www/html/public a traves de http://localhost:81 y que pasara todas las peticiones que recibiera hacia el puerto 80 al puerto 3022. esta configuracion esta copiada en public/

 
1. Clonar repositorio

``` 
git clone https://github.com/manuelf1804/ProyectoFinal.git
```

2. Configurar Mongo
````
$ mongo 
> use losganchos;
> load('rutaRepositorio/ProyectoFinal/database/myscript.js');
````

3. Instalar las dependencias y demas

``` 
npm install
npm install -g gulp nodemon
```

4. 
Opcion 1 (recomendado): 

Mover el archivo default en config/ a /etc/nginx/sites-enabled
esto permitira a nginx servir las carpetas y archivos de /var/www/html/ como localhost:81

Opcion 2: 

Configurar apache para servir el directorio public (copiado a otra ruta del disco duro) como localhost:81

Opcion 3: 

Modificar app.js para servir la carpeta public del respositorio como una ruta estatica, modificar tambien los url de _template.pug y index.pug para reconocer esta nueva direccion estatica 

5. Mover archivos publicos e iniciar nodemon
(si se usaron las opcion 1 del paso anterior o la carpeta que localhost:81 reconce es /var/www/html, de igual forma de puede configurar gulpfile.js con la ruta que se localhost:81 reconoce eso es para la opcion 2).

``` 
$ npm run dev
```

En el caso de haber elegido la opcion 3: ejectuar directamente, desde la carpeta del respositio : 
``` 
$ nodemon 
```

4. Conectarse al host
``` 
http://localhost o http://localhost:3022 (dependiendo del paso 4)

```
## Copyright of Templates
* [Start Bootstrap - One Page Wonder](https://startbootstrap.com/template-overviews/one-page-wonder/)
Copyright 2013-2018 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-one-page-wonder/blob/gh-pages/LICENSE) license.
* [sufee-admin-dashboard](https://colorlib.com/polygon/sufee/)
Colorlib is the original author of the admin-dashboard template.
    