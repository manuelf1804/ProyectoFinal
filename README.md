# Proyecto Final de Desarrollo IX ##

## Pagina Web de la Lavenderia sin Nombre ##


Por: Ramon Castro
     Manuel Fernandez
     Pedro Ramos 


## Como descargar tu propia copia del servidor  ##

    La pagina web se alimenta de tres partes: 
    * un servidor web que maneje los archivos estaticos(imagenes,css,javascript cuya funcion no es interactuar con el servidor), por ejemplo: Apache , Nginx, etc.
    * una parte restful que maneje las peticiones, para esta parte se usa [express](https://expressjs.com/), express se va a encargar de renderizar archivos escritos en [Pug](https://pugjs.org)
    * una base de datos. Para las prueas se estara usado mongoDB junto con el modelador de datos [mongoose](http://mongoosejs.com/).

    Asi que se pide que antes de iniciar las pruebas se tenga instalado tanto express, como mongodb y mongoose. La decision del servidor estatico no hace mucha diferancia, aunque se recomienda nginx. Si desea usar otro servidor web
    Si desea modificar archivos .pug tambien debe tener instalado pug 
 
 1. Clonar repositorio

    ``` 
    git clone https://github.com/manuelf1804/ProyectoFinal.git

    ```
 2. Dentro de nuestra carpeta

    ``` 
    npm install

    ```
 3. usar gulp
    
    ``` 
    gulp

    ```

 4. Iniciar app.js, con node o nodemon 
 
    ``` 
    node app.js

    ```
 5. Conectarse al puerto 3022 local 

    