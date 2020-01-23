const Field = require("../../models/Field");
const {camelCase} = require("../../utils/string-operations");

const moveField = difference => async (req, res) => {
	try {
		const field = await Field.findOne({_id: req.params.id});
		const target = await Field.findOne({
			categoryId: field.categoryId,
			position: field.position + difference
		});
		await Field.update({_id: req.params.id}, {
			position: field.position + difference
		});
		await Field.update({_id: target._id}, {position: field.position});
		res.redirect(`/field/moved?name=${field.name}&categoryId=${field.categoryId}`);
	} catch (err) {
		console.error(err);
	}
};

exports.postMoveUpField = moveField(-1);
exports.postMoveDownField = moveField(+1);

exports.postAddField = async (req, res) => {
	try {
		const fieldExists = await Field.findOne({
			name: camelCase(req.body.name), 
			categoryId: req.params.categoryId
		});
		if (fieldExists) {
			res.redirect(`/field/duplicate?name=${fieldExists.name}&categoryId=${fieldExists.categoryId}`);
		} else {
			const fields = await Field.find({categoryId: req.params.categoryId});
			await Field.insert({
				name: camelCase(req.body.name),
				categoryId: req.params.categoryId,
				type: req.body.type,
				position: fields.length + 1
			});
			const field = await Field.findOne({name: camelCase(req.body.name)});
			res.redirect(`/field/settings?id=${field._id}&mode=adding`);
		}
	} catch(err) {
		console.error(err);
	}
};

exports.postEditField = async (req, res) => {
	try {
		await Field.update({_id: req.params.id}, {
			name: camelCase(req.body.name), 
			type: req.body.type
		});
		res.redirect(`/field/settings?id=${req.params.id}&mode=editing`);
	} catch(err) {
		console.error(err);
	}
};

exports.postConfigField = async (req, res) => {
	try {
		const field = await Field.findOne({_id: req.params.id});
		await Field.update({_id: req.params.id}, {config: req.body});
		switch (req.params.mode) {
		case "adding":
			res.redirect(`/field/added?name=${field.name}&categoryId=${field.categoryId}`);
			break;
		case "editing":
			res.redirect(`/field/edited?name=${field.name}&categoryId=${field.categoryId}`);
			break;
		default:
			res.redirect(`/field/configured?name=${field.name}&categoryId=${field.categoryId}`);
		}
	} catch (err) {
		console.error(err);
	}
};

exports.postDeleteField = async (req, res) => {
	try {
		const field = await Field.findOne({_id: req.params.id});
		const remainingFields = await Field.find({
			categoryId: field.categoryId,
			position: {$gt: field.position}
		});
		if (remainingFields.length) {
			remainingFields.forEach(async (remainingField, index, array) => {
				await Field.update({_id: remainingField._id}, {
					position: remainingField.position - 1
				});
				if (index === array.length - 1) {
					await Field.remove({_id: req.params.id});
					res.redirect(
						`/field/deleted?name=${field.name}&categoryId=${field.categoryId}`
					);
				}
			});
		} else {
			await Field.remove({_id: req.params.id});
			res.redirect(
				`/field/deleted?name=${field.name}&categoryId=${field.categoryId}`
			);
		}
	} catch (err) {
		console.error(err);
	}
};