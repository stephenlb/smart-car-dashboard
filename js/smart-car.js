(function(){

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* SIMULATION VALUES */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
var r = +new Date;
function simvalue(chart) {
    return ({
        tachometer : { columns: [['data', rnd( 2000, 12000 )]] },
        mph        : { columns: [['data', rnd( 1, 120 )]] }
    })[chart] || console.log("Chart does not exist: '"+chart+"'");
}

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* TCP SOCKET */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
PUBNUB({
    subscribe_key : 'demo-36'
}).subscribe({
    channel : 'smart-car',
    message : receiver
});

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* CHARTS */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
var charts = {};
function receiver(message) {
    console.log(message);
}

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* SIMULATION */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
setInterval( simulate, 500 );
function simulate() {
    PUBNUB.each( charts, function( name, chart ) {
        chart.load(simvalue(name));
    } );
}
function rnd( min, max ) {
    return Math.floor(min + Math.random()*(max-min));
}

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* TACHOMETER */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
charts.tachometer = c3.generate({
    bindto : PUBNUB.$('car-stat-chart-tachometer'),
    color  : { pattern: ['#729fcf'] },
    size   : { height: 280 },
    data   : {
        columns: [ ['data', 6000] ],
        type: 'gauge'
    },
    gauge: {
        min: 0,
        max: 12000,
        units: 'rpm',
        width: 20,
        label: { format: function(value, ratio) { return value } },
    }
});

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* MPH */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
charts.mph = c3.generate({
    bindto : PUBNUB.$('car-stat-chart-mph'),
    color  : { pattern: ['#ddd'] },
    size   : { height: 280 },
    data   : {
        columns: [ ['data', 25] ],
        type: 'gauge'
    },
    gauge: {
        min: 0,
        max: 160,
        units: 'mph',
        width: 160,
        label: { format: function(value, ratio) { return value } },
    }
});




})();
