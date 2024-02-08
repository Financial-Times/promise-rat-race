> [!WARNING]<br />
> promise-rat-race has been deprecated as of **2024-02-08**, no further security patches will be applied. **This libary should not be used in new projects**, please use [`Promise.any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) instead.

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

## Notes on maintenance
This used to be maintained by the ft.com team. It's now stable and shouldn't need any attention, so has been unhooked from all our build and maintenance tooling. Speak to someone in the team if any changes are needed
