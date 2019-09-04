'use strict';

var env = process.env.NODEJSENV || 'localhost';
var app = require('express')();
var compression = require('compression');
var http = require('http');
var fs = require('fs');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var cors = require('./helper/cors.js');
var config = require('./config/config.js'); // Environment variable "NODEJSENV" should be set to 'prod' or 'qa' or 'dev' or 'localhost'
const logger = require('./helper/logger');
var auth = require("./helper/auth");
// if (env == 'qa' || env == 'prod') require('newrelic');

var env = process.env.NODEJSENV || 'localhost';
logger.info("STARTING FOR ENVIRONMENT: " + env);

//and we are wide open when it comes to CORS
app.use(cors.allowCrossDomain);

// swaggerRouter configuration
var options = {
    swaggerUi: '/swagger.json',
    controllers: './controllers',
    useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./definitions/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Update the doc location to match wherever we are deploying to.
swaggerDoc.host = config.swaggerDocHost;
swaggerDoc.schemes = [config.swaggerDocScheme];


// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Attach our own objects to the request, so the service call handlers have those available
    app.use(function (req, res, next) {
        req.ph = {};
        next();
    });

    app.use(middleware.swaggerSecurity({ Bearer: auth.verifyToken }));

    // If the auth function above failed, we don't want to display the swagger auth error message, we want to send our own.
    app.use(function (req, res, next) {
        if (req.ph.hasOwnProperty('response') && req.ph.response.code == -1) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Error: Access Denied" }));
        } else next();
    });    

    // Use gzip compression on responses
    app.use(compression());

    // Attach our own objects to the request, so the service call handlers have those available
    app.use(function (req, res, next) {
        req.ph = {};
        req.ph.config = config;
        next();
    });

    // Validate Swagger requests, but not on production where hopefully everything has been well tested and we want to avoid spending
    // the time to reparse and validate every response.
    app.use(middleware.swaggerValidator({
        validateResponse: (env != "prod")
    }));

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    if (env != "prod") {
        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi());
    }

    // Start the server
    http.createServer(app).listen(config.serverPort, function () {
        console.log('Server is listening on port %d (http://localhost:%d)', config.serverPort, config.serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', config.serverPort);
    });
});
