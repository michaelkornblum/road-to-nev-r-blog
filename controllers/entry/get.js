const Category = require('../../models/Category');
const Field = require('../../models/Field');
const Entry = require('../../models/Entry');
const moment = require('moment');

const { stringToArray } = require('../../utils/string-operations');

const defaultRenderObj = {
	pageTitle: 'entries',
	stringToArray,
	moment,
	isAdding: false,
	isEditing: false,
	isDeleting: false,
	wasSaved: false,
	wasDeleted: false,
	duplicateName: false,
};

const getKeys = (...keys) =>
	keys.reduce((acc, key) => {
		return { ...acc, [key]: true };
	}, {});

const editAction = (pageTitle, ...keys) => async (req, res) => {
	try {
		const entry = await Entry.findOne({ _id: req.query.id });
		const category = await Category.findOne({ _id: entry.categoryId });
		const fields = await Field.find({ categoryId: category._id });
		const extObject = getKeys(...keys);
		res.render('entry/edit', {
			...defaultRenderObj,
			...extObject,
			pageTitle,
			category,
			fields,
			entry,
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getEditEntry = editAction('entry saved', 'isEditing');
exports.getSavedEntry = editAction('entry saved', 'isEditing', 'wasSaved');

exports.getEntryIndex = async (req, res) => {
	try {
		await Entry.remove({ duplicateName: true }, { multi: true });
		const fields = await Field.find({ categoryId: req.query.categoryId });
		const category = await Category.findOne({ _id: req.query.categoryId });
		if (fields.length) {
			const entries = await Entry.find({
				categoryId: req.query.categoryId,
			});
			res.render('entry/index', {
				...defaultRenderObj,
				category,
				entries,
			});
		} else {
			res.redirect(`/category/no-fields?name=${category.name}`);
		}
	} catch (err) {
		console.error(err);
	}
};

exports.getAddEntry = async (req, res) => {
	try {
		const category = await Category.findOne({ _id: req.query.categoryId });
		const fields = await Field.find({
			categoryId: req.query.categoryId,
		});
		const extObject = getKeys('isAdding');
		res.render('entry/edit', {
			...defaultRenderObj,
			...extObject,
			pageTitle: 'new entry',
			category,
			fields,
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getDuplicateEntry = editAction(
	'duplicate entry',
	'isEditing',
	'duplicateName',
);

exports.getDeleteEntry = async (req, res) => {
	try {
		// await Entry.remove({ duplicateName: true }, { multi: true });
		const entry = await Entry.findOne({ _id: req.query.id });
		const entries = await Entry.find({ categoryId: entry.categoryId });
		const category = await Category.find({ _id: entry.categoryId });
		const extObj = getKeys('isDeleting');
		res.render('entry/index', {
			...defaultRenderObj,
			...extObj,
			entry,
			entries,
			category,
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getDeletedEntry = async (req, res) => {
	try {
		const category = await Category.findOne({ _id: req.query.categoryId });
		const entries = await Entry.find({ categoryId: req.query.categoryId });
		const extObj = getKeys('wasDeleted');
		res.render('entry/index', {
			...defaultRenderObj,
			...extObj,
			entries,
			category,
			entryTitle: req.query.title,
		});
	} catch (err) {
		console.error(err);
	}
};
