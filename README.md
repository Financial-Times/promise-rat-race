# promise-rat-race
Like `Promise.race()`, but doesn't care about the losers.

Returns a promise that resolves as soon as one promise in an array of promises resolves
and only rejects (with the first error returned) if *all* the promises reject

``` javascript
require('promise-rat-race')([
	promise1,
	promise2,
	promise3
])
```

**Currently no tests, and only loosely maintained - use at your own risk... or submit a PR with tests etc. :)**
