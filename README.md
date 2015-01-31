# Smart Car Dashboard Output

Your car's live data feed in realtime displayed in a dashboard.


### Update All

You can update everything in a single call or one at a time.

```javascript
PUBNUB({
    publish_key   : 'demo-36',
    subscribe_key : 'demo-36'
}).publish({
    channel : 'smart-car',
    message : {
        tachometer  : 4000,
        mph         : 60,
        temperature : 60,
        lat         : 37.7833074,
        long        : -122.3992261
    }
})
```

### Add Lat/Long WayPoint

You can add a waypoint with the following command.

```javascript
// Starting Waypoint
PUBNUB({
    publish_key   : 'demo-36',
    subscribe_key : 'demo-36'
}).publish({
    channel : 'smart-car',
    message : {
        lat  : 37.7833074,
        long : -122.3992261
    }
})

// Add a Second Waypoint
PUBNUB({
    publish_key   : 'demo-36',
    subscribe_key : 'demo-36'
}).publish({
    channel : 'smart-car',
    message : {
        lat  : 37.7830000,
        long : -122.3999999
    }
})
```
