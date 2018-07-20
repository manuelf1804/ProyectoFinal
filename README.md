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
2. Instalar las dependencias y demas

``` 
npm install
npm install -g gulp nodemon

```
3. Mover archivos publicos e iniciar nodemon

``` 
npm run dev

```
esto ejecutara gulp mover y despues nodemon. 
gulp mover, mueve los archivos de la carpeta publica a /var/www/public, se recomienda configurar nginx para elevar /var/www como http://localhost:81, y que nginx mande las rutas de http://localhost:80 hacia el puerto 3022, esto configuracion se puede realizar copiando el archivo default public/ a /etc/nginx/sites-enabled.

de no querer hacer esta configuracion de nginx entonces modificar app.js para reconocer la carpeta public como una ruta estatica

4. Conectarse al host

``` 
http://localhost o http://localhost:3022 (dependiendo del paso 3)

```
## Copyright
* [Start Bootstrap - One Page Wonder](https://startbootstrap.com/template-overviews/one-page-wonder/)
Copyright 2013-2018 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-one-page-wonder/blob/gh-pages/LICENSE) license.
* [sufee-admin-dashboard](https://colorlib.com/polygon/sufee/)
Colorlib is the original author of the admin-dashboard template.
    