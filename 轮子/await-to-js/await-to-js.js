/**
 *
 * @param {Promise} promise
 * @param {Function} errHandle
 * @returns
 */
export const to = (promise, errHandle) => {
	return promise
		.then(res => {
			return [null, res]
		})
		.catch(err => {
			if (errHandle) {
				const parserError = Object.assign({}, err, errHandle)
				return [parserError, undefined]
			}
			return [err, undefined]
		})
}
