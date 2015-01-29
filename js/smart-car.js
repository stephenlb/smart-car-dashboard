(function(){

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* SIMULATION VALUES */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

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
function receiver(charts) {
    console.log(charts);
    PUBNUB.each( charts, function( name, value ) {
        if (!charts[name]) return;
        charts[name].load(simvalue(name));
    } );
}

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* SIMULATION */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
//setInterval( simulate, 1000 );
function simulate() {
    PUBNUB.each( charts, function( name, chart ) {
        chart.load(simvalue(name));
    } );
}
function rnd( min, max ) {
    return Math.floor(min + Math.random()*(max-min));
}
var r = +new Date;
function simvalue(chart) {
    return ({
        tachometer : { columns: [['data', rnd( 2000, 12000 )]] },
        mph        : { columns: [['data', rnd( 1, 120 )]] }
    })[chart] || console.log("Chart does not exist: '"+chart+"'");
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
    color  : { pattern: ['#efefef'] },
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
