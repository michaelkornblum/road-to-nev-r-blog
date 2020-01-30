const Category = require('../../models/Category');
const { capitalize } = require('../../utils/string-operations');

const defaultRenderObject = {
	capitalize,
	pageTitle: 'categories',
	wasAdded: false,
	isEditing: false,
	wasEdited: false,
	isDeleting: false,
	wasDeleted: false,
	duplicateName: false,
	noFields: false,
};

const takeAction = key => async (req, res) => {
	try {
		const categories = await Category.find();
		const category = await Category.findOne({
			_id: req.query.id,
		});
		res.render('category/index', {
			...defaultRenderObject,
			categories,
			categoryName: category.name,
			categoryId: category._id,
			[key]: true,
		});
	} catch (err) {
		console.error(err);
	}
};

const actionTaken = key => async (req, res) => {
	try {
		const categories = await Category.find();
		const category = await Category.findOne({ name: req.query.name });
		res.render('category/index', {
			...defaultRenderObject,
			categories,
			categoryId: category._id,
			categoryName: req.query.name,
			[key]: true,
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getCategoryIndex = async (req, res) => {
	try {
		const categories = await Category.find();
		console.log(categories);
		res.render('category/index', {
			...defaultRenderObject,
			categories,
		});
	} catch (err) {
		console.error(err);
	}
};

exports.getEditCategory = takeAction('isEditing');
exports.getDeleteCategory = takeAction('isDeleting');

exports.getAddedCategory = actionTaken('wasAdded');
exports.getDuplicateCategory = actionTaken('duplicateName');
exports.getEditedCategory = actionTaken('wasEdited');
exports.getDeletedCategory = actionTaken('wasDeleted');
exports.getNoFields = actionTaken('noFields');
