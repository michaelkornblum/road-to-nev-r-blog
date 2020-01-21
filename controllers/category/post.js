const Category = require("../../models/Category");
const {camelCase} = require("../../utils/string-operations");

exports.postAddCategory = async (req, res) => {
	try {
		const category = await Category.findOne(
			{name: camelCase(req.body.name)}
		);
		if (category) {
			res.redirect(`/category/duplicate?name=${category.name}`);
		} else {
			await Category.insert({name: camelCase(req.body.name)});
			res.redirect(`/category/added?name=${camelCase(req.body.name)}`);
		}
	} catch (err){
		console.error(err);
	}
};

exports.postEditCategory = async(req, res) => {
	try {
		await Category.update(
			{_id: req.params.id}, 
			{name: camelCase(req.body.name)}
		);
		res.redirect(`/category/edited?name=${camelCase(req.body.name)}`);
	} catch(err) {
		console.error(err);
	}
};

exports.postDeleteCategory = async(req, res) => {
	try {
		const category = await Category.findOne({_id: req.params.id});
		await Category.remove({_id: req.params.id});
		res.redirect(`/category/deleted?name=${category.name}`);
	} catch (err) {
		console.error(err);
	}
};