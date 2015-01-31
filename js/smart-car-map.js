(function(){

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* ACCESS TOKEN */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
var at = 'pk.eyJ1IjoicHVibnViIiwiYSI6IndnRkk4TmMifQ.AHRI2kg9JgT2inAA6NHHhQ';
L.mapbox.accessToken = at;

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* MAP SETUP */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
var map    = L.mapbox.map( 'mapbox', 'pubnub.l2m2g85d' );
var poly   = L.polyline([]).addTo(map);
var ctrls  = document.getElementsByClassName("leaflet-control-container")[0];
var marker = L.marker( [0,0], {
    icon : L.mapbox.marker.icon({
        'marker-color': '#f86767'
    })
} ).addTo(map);

// REMOVE MAP CONTROLS
ctrls.parentNode.removeChild(ctrls)

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* DISPLAY VALUES */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
var displays = {};
displays.temperature = PUBNUB.$('car-stat-temperature');
displays.latitude    = PUBNUB.$('car-stat-latitude');
displays.longitude   = PUBNUB.$('car-stat-longitude');

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* ADD WAYPOINTS YO */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
function waypoint( lat, long ) {
    poly.addLatLng(L.latLng( lat, long ));
    marker.setLatLng(L.latLng( lat, long ));
    map.fitBounds(poly.getBounds());

    displays.latitude.innerHTML  = Math.floor(lat*1000)/1000;
    displays.longitude.innerHTML = Math.floor(long*1000)/1000;
}

PUBNUB.events.bind( 'map-waypoint', function(data) {
    if (!(data && data[0] && data[1])) {
        return console.error("YOU ADDED BAD LAT/LONG VALUES");
    }

    waypoint( data[0], data[1] );
} );

})();
