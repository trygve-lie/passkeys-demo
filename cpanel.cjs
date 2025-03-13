async function loadApp() {
    await import('./server.js');
}

function loader() {
    Promise.resolve(loadApp());
};
loader();
