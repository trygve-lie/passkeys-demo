// Cpanel does not cater well for ESM projects in the way
// that it does not keep package.json with it so we loose
// the config that the project is a ESM project.
//
// Cpanel does more or less only understand CommonJS modules.
//
// This little file is a CommonJS module with a small trick
// which loads ESM modules into a CommonJS module (which cpane
// understands).

async function loadApp() {
    await import('./server.js');
}

function loader() {
    Promise.resolve(loadApp());
};
loader();
