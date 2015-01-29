# Smart Car Dashboard Output

Your car's live data feed in realtime displayed in a dashboard.

```javascript
PUBNUB({
    publish_key   : 'demo-36',
    subscribe_key : 'demo-36'
}).publish({
    channel : 'smart-car',
    message : {
        tachometer : 4000,
        mph        : 60
    }
})
```
