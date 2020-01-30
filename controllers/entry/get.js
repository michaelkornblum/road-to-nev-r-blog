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

exports.getDuplicateEntry = async (req, res) => {
	try {
		const entry = await Entry.findOne({ _id: req.query.id });
		const category = await Category.findOne({ _id: entry.categoryId });
		const fields = await Field.find({ categoryId: category._id });
		const extObject = getKeys('isEditing', 'duplicateName');
		res.render('entry/edit', {
			...defaultRenderObj,
			...extObject,
			pageTitle: 'duplicate entry',
			category,
			fields,
			entry,
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getEditEntry = async (req, res) => {
	try {
		const entry = await Entry.findOne({ _id: req.query.id });
		const category = await Category.findOne({ _id: entry.categoryId });
		const fields = await Field.find({ categoryId: category._id });
		const extObject = getKeys('isEditing');
		res.render('entry/edit', {
			...defaultRenderObj,
			...extObject,
			pageTitle: 'entry saved',
			category,
			fields,
			entry,
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getSavedEntry = async (req, res) => {
	try {
		const entry = await Entry.findOne({ _id: req.query.id });
		const category = await Category.findOne({ _id: entry.categoryId });
		const fields = await Field.find({ categoryId: category._id });
		const extObject = getKeys('isEditing', 'wasSaved');
		res.render('entry/edit', {
			...defaultRenderObj,
			...extObject,
			pageTitle: 'entry saved',
			category,
			fields,
			entry,
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getDeleteEntry = async (req, res) => {
	try {
		await Entry.remove({ duplicateName: true }, { multi: true });
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
