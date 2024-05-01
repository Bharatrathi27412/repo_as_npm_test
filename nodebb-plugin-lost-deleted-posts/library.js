'use strict';

const controllers = require('nodebb-plugin-lost-deleted-posts/lib/controllers');

const plugin = {};

plugin.init = function (params, callback) {
	const router = params.router;
	const hostMiddleware = params.middleware;
	// const hostControllers = params.controllers;

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/lost-deleted-posts', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/lost-deleted-posts', controllers.renderAdminPage);

	callback();
};

plugin.filteredTopics = function ({tids, topics, fields, keys}) {
	const removeDeletedTopics = topics.filter(topic => !topic.deleted);

	return({tids, topics:removeDeletedTopics, fields, keys})
}


module.exports = plugin;
