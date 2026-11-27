// Plesk Node.js startup file. Plesk can only boot a plain-JS entry point,
// Plesk requires a javascript file to start the app, app.js is the convention
// This line loads the compiled output for the server side code
//  manually uploaded to dist/. during deployment
require("./dist/server.js");
