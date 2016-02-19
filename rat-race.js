'use strict';

module.exports = promises => {
	const start = Date.now();
	function resolver (promise) {
		return promise.then(data => {
				const taken = Date.now()-start;
				return { state: 'resolve', data, taken };
			}, data => {
				return { state: 'reject', data };
			});
	}
	return Promise.all(promises.map(promise => resolver(promise)))
		.then(results => {
			const candidates = results.filter(result => result.state === 'resolve');
			if (candidates.length > 0) {
				return candidates.sort((a, b) => {
						if (a.taken < b.taken) {
							return -1;
						}
						if (a.taken > b.taken) {
							return 1;
						}
						return 0;
					})[0].data;
			}
			return Promise.reject(results.map(result => result.data));
		});
};
