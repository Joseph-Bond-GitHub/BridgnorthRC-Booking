// Plesk Node.js startup file. Plesk can only boot a plain-JS entry point,
// so this committed shim loads the compiled output in dist/.
require("./dist/server.js");
