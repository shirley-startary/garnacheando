var plantillaRestaurates = '<article class="row restaurante" data-latitude="__latitude__" data-longitude="__longitude__">' +
        '<div class="card-panel hoverable grey lighten-5 z-depth-1">' +
          '<div class="row valign-wrapper">' +
            '<div class="col s3">' +
              '<img src="__foto__" alt="Contact" class="circle responsive-img">' +
            '</div>' +
            '<div class="col s9">' +
            	'<h5 class="name">__nombre__</h5>' +
              '<span class="black-text">' +
                'Telefono: __numero__' +
              '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
	'</article>';

var restaurantes = [
  {

    "nombre":"Tortas de Chilaquiles",
    "foto":"img/tortasChilaquil.jpg",
    "ubicacion":{latitude:19.4084909,
      longitude:-99.1765471
    }
  },
  {
    "nombre":"Los tacos del chavo",
    "foto":"img/tacosDelchavo.jpg",
    "ubicacion":{
      latitude:19.4372679,
      longitude:-99.1616254
    }
  },
  {
    "nombre":"Las Gorditas de Lucy",
    "foto":"img/gorditaLucy.jpg",
    "ubicacion":{
      latitude:19.4455874,
      longitude:-99.1597356
    }
  },
  {
    "nombre":"Las Tortas de la 7",
    "foto":"img/tortadela7.jpg",
    "ubicacion":{
      latitude:19.4705617,
      longitude:-99.1453105
    }
  },
  {
    "nombre":"Don kebab",
    "foto":"img/donkebab.jpg",
    "ubicacion":{
      latitude:19.4194246,
      longitude:-99.1750884
    }
  }
];

var cargarPagina = function(){
  $("#search-form").submit(filtrarRestaurantes);
  obtenerUbicacion()
  mostrarRestaurantes(restaurantes);
  $("#search").keyup(filtrarRestaurantes);
}

var filtrarRestaurantes = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#search").val().toLowerCase();
	var restaurantesFiltrados = restaurantes.filter(function (restaurante) {
		return restaurante.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
	});
	mostrarRestaurantes(restaurantesFiltrados);
};

var mostrarRestaurantes = function (restaurantes) {
	var plantillaFinal = "";
	restaurantes.forEach(function (restaurante) {
		plantillaFinal += plantillaRestaurates.replace("__nombre__", restaurante.nombre)
			.replace("__numero__", restaurante.numero)
			.replace("__foto__", restaurante.foto)
      .replace("__latitude__",restaurante.ubicacion.latitude)
      .replace("__longitude__",restaurante.ubicacion.longitude);
	});
	$(".restaurantes").html(plantillaFinal);
  $(".restaurante").click(function(){
  var lat =$(this).data("latitude");
  var lng =$(this).data("longitude");
  console.log(lat);
  console.log(lng);
  var objeto={
    lat:lat,
    lng:lng
  }
  console.log(objeto);

  mostrarMapa(objeto);
});
};


var obtenerUbicacion = function(e){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(mostrarPosicion);
  }else {
    alert("actualiza tu navegador")
  }

}
var mostrarPosicion = function(posicion){
  var lat = posicion.coords.latitude;
  var lng = posicion.coords.longitude;
  var coordenadas ={
    lat:lat,
    lng:lng
  }
  mostrarMapa(coordenadas);
}
var mostrarMapa =function(coordenadas){
  console.log(coordenadas);
  var map= new google.maps.Map($('#map')[0],{
  zoom:15,
  center:coordenadas
  });
  var marker= new google.maps.Marker({
    position:coordenadas,
    map:map
  });
}

$(document).ready(cargarPagina);
