(function(){

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* ACCESS TOKEN */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
var at = 'pk.eyJ1IjoicHVibnViIiwiYSI6IndnRkk4TmMifQ.AHRI2kg9JgT2inAA6NHHhQ';
L.mapbox.accessToken = at;

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* MAP SETUP */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
var map      = L.mapbox.map( 'mapbox', 'pubnub.l2m2g85d' );
var polyline = L.polyline([]).addTo(map);

map.setView([37.7833074,-122.3992261], 17);

})();
