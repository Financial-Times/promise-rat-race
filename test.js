const expect = require('chai').expect;
const ratRace = require('./rat-race');

function delay (time, val, isError) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			if (isError) {
				rej(val);
			} else {
				res(val);
			}
		}, time)
	})
}

describe('promise-rat-race', () => {

	it('should resolve when fastest promise resolves', () => {
		const start = new Date();
		return ratRace([
			delay(20, 2),
			delay(30, 3),
			delay(10, 1),
			delay(40, 4)
		])
			.then(val => {
				expect(val).to.equal(1);
				expect(new Date() - start).to.be.most(19);
			})
	});

	it('should resolve on fastest resolve even if one or more others reject', () => {
		const start = new Date();
		return ratRace([
			delay(20, 2),
			delay(30, 3),
			delay(10, 1, true),
			delay(40, 4, true)
		])
			.then(val => {
				expect(val).to.equal(2);
				expect(new Date() - start).to.be.most(29);
			})
	});

	it('should reject with fastest reject (though waiting for others) if all reject', () => {
		const start = new Date();
		return ratRace([
			delay(20, 2, true),
			delay(30, 3, true),
			delay(10, 1, true),
			delay(40, 4, true)
		])
			.catch(err => {
				expect(err).to.equal(1);
				expect(new Date() - start).to.be.least(40);
			})
	});

	it('should work when a promise has already resolved', () => {
		const start = new Date();
		const resolved = Promise.resolve(0);
		return resolved
			.then(() => {
				return ratRace([
					resolved,
					delay(30, 3),
					delay(10, 1, true),
					delay(40, 4, true)
				])
					.then(val => {
						expect(val).to.equal(0);
						expect(new Date() - start).to.be.most(2);
					})
			});
	})


	it('should hang when any promise hangs', () => {
		let resolved = false;
		const hanging = new Promise(() => null);
		return ratRace([
			hanging,
			delay(30, 3),
			delay(10, 1, true),
			delay(40, 4, true)
		])
			.then(() => {
				resolved = true;
			})

		setTimeout(() => {
			expect(resolved).to.be.false;
		}, 300)
	});

});
