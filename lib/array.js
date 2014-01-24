module.exports = function($) {
	var c = function() {
		this.__construct.apply(this, arguments);
	}, public = c.prototype = Object.create(Array.prototype);
	
	/* Public Properties
	-------------------------------*/
	/* Private Properties
	-------------------------------*/
	/* Loader
	-------------------------------*/
	public.__load = c.load = function(value) {
		//if it's any type of eden
		if($.isEden(value)) {
			//return it to prevent
			//recursiveness
			return value;
		}
		
		if(!this.isArray(value)) {
			value = [];
		}
		
		return new this(value);
	};
	
	c.isArray = function(value) {
		return value instanceof Array;
	};
	
	/* Construct
	-------------------------------*/
	public.__construct = function(value) {
		this.push.apply(this, value);
	};
		
	/* Public Methods
	-------------------------------*/
	/**
	 * Combines a list of keys and values into an object
	 *
	 * @param array
	 * @return object
	 */
	public.combineWithKeys = function(keys) {
		var object = $.load('hash');
		
		keys = $.edenize(keys, ['array', 'hash']);
		
		keys.each(function(i, key, values) {
			if(values[i]) {
				object.set(key, values[i]);
			}
		}, keys, this);
		
		return object;
	};
	
	/**
	 * Combines a list of keys and values into an object
	 *
	 * @param array
	 * @return object
	 */
	public.combineWithValues = function(values) {
		var object = $.load('hash');
		
		this.each(function(i, key) {
			if(values[i]) {
				object.set(key, values[i]);
			}
		});
		
		return object;
	};
	
	/**
	 * Custom for each loop that handles 
	 * scopes and extra arguments
	 *
	 * @param function
	 * @param [mixed[,mixed..]]
	 * @return bool
	 */
	public.each = function(callback) {
		//get the dynamic arguments
		var i, args = $.args();
		
		//alter the callback casing 
		//for scopes and extra arguments
		callback = $.alter.apply($, args);
		
		//now parse through each item
		for(i = 0; i < this.length; i++) {
			//if the callback is false
			if(callback(i, this[i]) === false) {
				//stop the loop and return false
				return false;
			}
		}
		
		//the loop passed
		//return all good
		return true;
	};
	
	/**
	 * Returns the raw array
	 *
	 * @return array
	 */
	public.get = function() {
		var raw = [];
		
		this.each(function(key, value) {
			raw[key] = value
		});
		
		return raw;
	};
	
	/**
	 * Get Type
	 *
	 * @return string
	 */
	public.getType = function() {
		return 'array';
	};
	
	/**
	 * Returns true if the array has 
	 * given value
	 *
	 * @param mixed
	 * @param bool
	 */
	public.has = function(value) {
		return this.indexOf(value) !== -1;
	};
	
	/**
	 * Join array elements with a string
	 *
	 * @param string
	 * @param array
	 * @return string
	 */
	public.implode = function(delimeter) {
		var string = '';
		for(var i = 0; i < this.length; i++) {
			string += this[i]+delimeter;
		}
		
		return string;
	}
	
	/**
	 * Checks if a value exists in an array
	 *
	 * @param string
	 * @param array
	 * @return boolean
	 */
	public.in_array = function(needle) {
		if(!needle) {
			throw new Error('in_array() expects 1 string parameter');
		}
		
		for(var i = 0; i < this.length; i++) {
			if(this[i] == needle) return true;
		}
		
		return false;
	}
	
	/**
	 * Returns true if empty
	 * 
	 * @return bool
	 */
	public.isEmpty = function() {
		return this.length === 0;
	};
	
	/**
	 * Returns a list of keys
	 *
	 * @return array
	 */
	public.keys = function() {
		var keys = c.load();
		
		//now parse through each item
		this.each(function(key) {
			keys.push(key);
		});
		
		return keys;
	};
	
	/**
	 * Custom map loop that handles 
	 * scopes and extra arguments
	 *
	 * @param function
	 * @param [mixed[,mixed..]]
	 * @return this
	 */
	public.map = function(callback) {
		//get the dynamic arguments
		var self = this, args = $.args();
		
		//take the object out of the original arguments
		object = args.shift();
		
		//alter the callback casing 
		//for scopes and extra arguments
		callback = $.alter(callback, args);
		
		//now parse through each item
		this.each(function(key, value) {
			self[key] = callback.call(self, key, value);
		});
		
		return this;
	};
	
	/**
	 * Converts array to query string
	 *
	 * @return string
	 */
	public.toQuery = function(prefix) {
		var value, query = [];
		
		this.each(function(key, value) {
			if(prefix) {
				key = prefix + '[' + key + ']';
			}
			
			var edenized = $.edenize(value, ['hash', 'array']);
			
			if(edenized) {
				query.push(edenized.toQuery(key));
				return;
			}
			
			query.push(key + '=' + encodeURIComponent(value));
		}, this);
		
		return query.join('&');
	};
	
	/**
	 * Converts array to string
	 *
	 * @return string
	 */
	public.toString = function() {
		return JSON.stringify(this.get());
	};
	
	/**
	 * Returns a list of values
	 *
	 * @return array
	 */
	public.values = function() {
		var values = c.load();
		
		//now parse through each item
		this.each(function(key, value) {
			values.push(value);
		});
		
		return values;
	};
	
	return c;
};