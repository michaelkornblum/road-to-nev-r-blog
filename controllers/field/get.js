const Category = require("../../models/Category");
const Field = require("../../models/Field");
const {capitalize} = require("../../utils/string-operations");

const fieldTypes = [
	"boolean",
	"date",
	"hidden",
	"image",
	"link",
	"list",
	"number",
	// markdown
	// object,
	// relation,
	"string",
	"text",
];

const defaultRenderObj = {
	capitalize,
	fieldTypes,
	pageTitle: "Fields",
	wasAdded: false,
	willEdit: false,
	isEditing: false,
	wasEdited: false,
	wasConfigured: false,
	wasMoved: false,
	isDeleting: false,
	wasDeleted: false,
	duplicateName: false,
};

const takeAction = key => async (req, res) => {
	try {
		const field = await Field.findOne({_id: req.query.id});
		const category = await Category.findOne({_id: field.categoryId});
		const fields = await Field.find({categoryId: field.categoryId});
		res.render("field/index", {
			...defaultRenderObj,
			category,
			fields,
			fieldId: req.query.id,
			fieldName: field.name,
			[key]: true
		});
	} catch(err) {
		console.error(err);
	}
};

const actionTaken = key => async (req, res) => {
	try {
		const category = await Category.findOne({_id: req.query.categoryId});
		const fields = await Field.find({categoryId: req.query.categoryId});
		res.render("field/index", {
			...defaultRenderObj,
			category,
			fields,
			fieldName: req.query.name,
			[key]: true
		});
	} catch(err) {
		console.error(err);
	}
};

exports.getFieldIndex = async (req, res) => {
	try {
		const category = await Category.findOne({_id: req.query.categoryId});
		const fields = await Field.find({categoryId: req.query.categoryId});
		res.render("field/index", {...defaultRenderObj, category, fields});
	} catch (err) {
		console.error(err);
	}
};

exports.getFieldSettings = async (req, res) => {
	try {
		const field = await Field.findOne({_id: req.query.id});
		const category = await Category.findOne({_id: field.categoryId});
		res.render("field/settings", {
			pageTitle: "Field Settings",
			mode: req.query.mode,
			category,
			field
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getAddedField = actionTaken("wasAdded");
exports.getEditedField = actionTaken("wasEdited");
exports.getConfiguredField = actionTaken("wasConfigured");
exports.getDeletedField = actionTaken("wasDeleted");
exports.getDuplicateName = actionTaken("duplicateName");
exports.getMovedField = actionTaken("wasMoved");

exports.getWillEditField = takeAction("willEdit");
exports.getEditField = takeAction("isEditing");
exports.getDeleteField = takeAction("isDeleting");