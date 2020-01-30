const Datastore = require("nedb");
const { setFileLocation } = require("../utils/file-operations");

module.exports = class Base {
	constructor(fileName) {
		this.db = new Datastore({
			filename: setFileLocation(fileName),
			autoload: true,
			timestampData: true,
		});
	}
	insert(obj) {
		return new Promise((res, rej) =>
			this.db.insert(obj, err => (err ? rej(err) : res())),
		);
	}

	find(obj={}) {
		return new Promise((res, rej) =>
			this.db.find(obj, (err, doc) => (err ? rej(err) : res(doc))),
		);
	}

	findOne(obj) {
		return new Promise((res, rej) => {
			this.db.findOne(obj, (err, doc) => (err ? rej(err) : res(doc)));
		});
	}

	update(target, changes, options = {}) {
		return new Promise((res, rej) =>
			this.db.update(target, { $set: changes }, options, err =>
				err ? rej(err) : res(),
			),
		);
	}

	remove(obj, opts={}) {
		return new Promise((res, rej) =>
			this.db.remove(obj, opts, err => (err ? rej(err) : res())),
		);
	}
};
