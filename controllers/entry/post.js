const Entry = require('../../models/Entry');

exports.postAddEntry = async (req, res) => {
	try {
		const entryExists = await Entry.findOne({
			title: req.body.title.trim(),
		});
		if (entryExists) {
			await Entry.insert({
				...req.body,
				categoryId: req.params.categoryId,
				duplicateName: true,
			});
			const duplicateEntry = await Entry.findOne({
				categoryId: req.params.categoryId,
				duplicateName: true,
			});
			res.redirect(`/entry/duplicate?id=${duplicateEntry._id}`);
		} else {
			await Entry.insert({
				...req.body,
				title: req.body.title.trim(),
				categoryId: req.params.categoryId,
			});
			const entry = await Entry.findOne({ title: req.body.title.trim() });
			res.redirect(`/entry/saved?id=${entry._id}`);
		}
	} catch (err) {
		console.error(err);
	}
};

exports.postEditEntry = async (req, res) => {
	try {
		const entry = await Entry.findOne({ _id: req.params.id });
		const duplicateEntry = await Entry.findOne({
			_id: { $ne: req.params.id },
			categoryId: entry.categoryId,
			title: req.body.title.trim(),
		});
		if (duplicateEntry) {
			res.redirect(`/entry/duplicate?id=${req.params.id}`);
		} else {
			await Entry.update(
				{ _id: req.params.id },
				{
					...req.body,
					title: req.body.title.trim(),
					categoryId: entry.categoryId,
					duplicateName: false,
				},
			);
			res.redirect(`/entry/saved?id=${req.params.id}`);
		}
	} catch (err) {
		console.error(err);
	}
};

exports.postDeleteEntry = async (req, res) => {
	try {
		const entry = await Entry.findOne({ _id: req.params.id });
		await Entry.remove({ _id: req.params.id });
		res.redirect(
			`/entry/deleted?categoryId=${entry.categoryId}&title=${entry.title}`,
		);
	} catch (err) {
		console.error(err);
	}
};
