var request = require('supertest')("http://localhost:8089");
var app = require('../app.js');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
