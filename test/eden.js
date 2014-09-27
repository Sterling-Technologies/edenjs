var assert = require('assert');
var eden = require('../eden');

describe('Eden Test Suite', function() {
	describe('Functional Tests', function() {
		it('should laod string', function() {
			assert.equal('dGVzdA==', eden('string').base64Encode('test'));
			assert.equal('dGVzdA==', eden().String().base64Encode('test'));
		});
	});
});