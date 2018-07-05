# Proyecto Final de Desarrollo IX ##

## Pagina Web de los Ganchos ##


Por: Ramon Castro
     Manuel Fernandez
     Pedro Ramos 


## Copiar este repositorio  ##

Para hacer pruebas de manera local de este repostorio: 
* un servidor web que maneje los archivos estaticos: imagenes,css,javascript, por ejemplo: Apache , Nginx, etc.
* una parte restful que maneje las peticiones, para esta parte se usa [express](https://expressjs.com/), express se va a encargar de renderizar archivos escritos en [Pug](https://pugjs.org)
* una base de datos. Para las prueas se estara usado mongoDB junto con el modelador de datos [mongoose](http://mongoosejs.com/).

Para las pruebas locales se configuro nginx de manera que sirviera los archivos que se encuentran en
/var/www/html/public a traves de http://localhost:81 y que pasara todas las peticiones que recibiera hacia el puerto 80 al puerto 3022. esta configuracion esta copiada en public/

 
1. Clonar repositorio

``` 
git clone https://github.com/manuelf1804/ProyectoFinal.git

```
2. Instalar las dependencias

``` 
npm install 

```
3. mover los archivos estaticos al servidor web

``` 
gulp mover

```

4. Iniciar app.js, con node o nodemon 

``` 
nodemon

```

5. Conectarse al host local

``` 
http://localhost

```
## Copyright
* [Start Bootstrap - One Page Wonder](https://startbootstrap.com/template-overviews/one-page-wonder/)
Copyright 2013-2018 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-one-page-wonder/blob/gh-pages/LICENSE) license.
* [sufee-admin-dashboard](https://colorlib.com/polygon/sufee/)
Colorlib is the original author of the admin-dashboard template.
    