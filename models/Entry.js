const BaseClass = require('./Base');

class Entry extends BaseClass {
	find(obj = {}) {
		return new Promise((res, rej) =>
			this.db
				.find(obj)
				.sort({ updatedAt: -1 })
				.exec((err, doc) => (err ? rej(err) : res(doc))),
		);
	}
}

module.exports = new Entry('entries.db');
