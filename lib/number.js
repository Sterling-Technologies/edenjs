module.exports = function($) {
	var c = function() {
		this.__construct.apply(this, arguments);
	}, public = c.prototype = Object.create(Number.prototype);
	
	/* Public Properties
	-------------------------------*/
	/* Private Properties
	-------------------------------*/
	/* Loader
	-------------------------------*/
	c.load = function(number) {
		return new this(number);
	};
	
	c.isNumber = function(value) {
		return (typeof value == 'number');
	};
	
	/* Construct
	-------------------------------*/
	public.__construct = function(value) {
		this.number = value;
	};
	
	/* Public Methods
	-------------------------------*/
	public.getData = function() {
		return 'test';
	}
	
	return c;
};