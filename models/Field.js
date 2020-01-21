const BaseClass = require("./Base");

class Field extends BaseClass {
	find(obj={}) {
		return new Promise((res, rej) =>
			this.db.find(obj).sort({position: 1}).exec((err, doc) =>
				err ? rej(err) : res(doc)
			)
		);
	}
}

module.exports = new Field("fields.db");
