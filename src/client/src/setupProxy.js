const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy(
        '/api', 
        { 
            target: /*'https://pamw-backend.herokuapp.com'*/'http://pamw_just_dev_backend:8080', 
            changeOrigin: true 
        }
    ));
    app.use(proxy(
        '/app',
        {
            target: /*'https://pamw-appp.herokuapp.com'*/'http://pamw_just_dev_app:4000',
            changeOrigin: true
        }
    ));
}