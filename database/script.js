db.usuario.insertOne({
    username:'manuelf1804',
    password:'manumanu',
    nombre:{first:'Manuel',last:'Fernandez'},
    rol:'admin',
    direccion:'Punta',
    edad:22,
    correo:'manfer1804@gmail.com',
    activo:true,  
})
db.servicio.insertMany([
    {nombre:'Planchado',
     abri:'pln',
     precio:1.00,
     activo:true
    },
    {
    nombre:'Lavado',
    abri:'lv',
    precio:1.50,
    activo:true
    },
    {
    nombre:'Lavado en seco',
    abri:'lvs',
    precio:2.00,
    abrev:'lvs',
    activo:true
    },
    {
    nombre:'Quitar Manchas',
    abri:'qtm',
    precio:3.00,
    activo:true
}]);




