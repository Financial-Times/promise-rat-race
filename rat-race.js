'use strict';

module.exports = promises => {
	return new Promise((resolve, reject) => {
		let resolved = false;
		let firstError;
		Promise.all(promises.map(promise => {
			return promise
				.then(result => {
					if (!resolved) {
						resolve(result);
						resolved = true;
					}
				}, err => {
					firstError = firstError || err;
				})
		}))
			.then(() => {
				if (firstError && !resolved) {
					reject(firstError);
				}
			});
	});
};
