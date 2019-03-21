/**
 * Main
 */

const config = require('./config/config.js');
const app = require('./config/app.js');


console.log('Running', config.app.name+'@'+config.app.version);
console.log('Port:', config.server.port);

/* Create application db users index. */
config.databases.application.collection(config.dep_preferences.MongoDB.users_collection).createIndex({
	email: 1
}, {
	unique: true
});

/**
 * Handle database (Mongo) connection events.
 * The Mongo connection is created in the config.js file. 
 */
config.databases.application.on('connected', () => {
	console.log('MongoDB - Application DB connection established.');
});

config.databases.session.on('connected', () => {
	console.log('MongoDB - Session DB connection established.');
});

config.databases.application.on('error', () => {
	// Mongoose will log the error.
	return process.exit(1);
});

config.databases.session.on('error', () => {
	// Mongoose will log the error.
	return process.exit(1);
});


// Listen on the server.  
app.listen(config.server.port, (err) => {
	if (err) {
		console.log('FATAL ERROR:', err);
		return process.exit(1);
	}
});


// Export for testing.
module.exports = app;