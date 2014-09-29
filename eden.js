var eden = module.exports = require('eden-class').extend(function() {
	/* Require
	-------------------------------*/
	/* Constants
	-------------------------------*/
	/* Public.Properties
	-------------------------------*/
	/* Protected Properties
	-------------------------------*/
	/* Private Properties
	-------------------------------*/
	/* Magic
	-------------------------------*/
	this.___get = function(name) {
		//if it starts with a capital letter
		if(/^[A-Z]/g.test(name)) {
			//its probably a class
			return function() {
				var args = this.args();
				
				args.unshift(name.toLowerCase());
				
				return this.load.apply(this, args);
			};
		}
	};
	
	/* Public.Methods
	-------------------------------*/
	/**
	 * No operation
	 *
	 * @return void
	 */
	this.noop = function() {};
	
	/**
	 * Turns off argument test.
	 * argument testing is a performance gain
	 * though it helps with stablizing your code
	 *
	 * @return this
	 */
	this.noArgumentTesting = function() {
		this.argument().turnOff();
		return this;
	};
	
	/**
	 * Returns an array form of arguments
	 *
	 * @return array
	 */
	this.args = function() {
		return Array.prototype.slice.apply(arguments.callee.caller.caller.arguments);
	};
	
	/**
	 * Loads a file and calls it passing arguments
	 *
	 * @param [mixed[,mixed..]]
	 * @return object
	 */
	this.load = function() {
		//argument 1 must be a string
		this.argument().test(1, 'string');
		
		var args = this.args();
		
		return this.get(args.shift()).apply(null, args);
	};
	
	/**
	 * Returns the classified definition
	 *
	 * @param string
	 * @return function
	 */
	this.get = function(name) {
		return require('eden-'+name);
	};
	
	/* Protected.Methods
	-------------------------------*/
	/* Private Methods
	-------------------------------*/
}).register('eden');

var instance = null, container = eden.get();

container.load = function() {
	//first instantiate
	if(instance === null) {
		var definition = function() {};
		definition.prototype = container.prototype;
		
		instance = new definition();
		
		if(typeof instance.__construct === 'function') {
			instance.__construct.call(instance);
		}
	}
	
	//if there are arguments
	if(arguments.length) {
		return instance.load.apply(instance, arguments);
	}
	
	return instance;
};