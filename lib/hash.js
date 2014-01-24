module.exports = function($) {
	var c = function() {
		this.__construct.apply(this, arguments);
	}, public = c.prototype = Object.create(Object.prototype);
	
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
		
		if(!this.isHash(value)) {
			value = {};
		}
		
		return new this(value);
	};
	
	c.isHash = function(value) {
		return toString.call(value) === '[object Object]'
			&& value.constructor === Object 
			&& !value.nodeType 
			&& !value.setInterval;
	};
	
	/* Construct
	-------------------------------*/
	public.__construct = function(value) {
		for(var key in value) {
			this.set(key, value[key]);
		}
	};
		
	/* Public Methods
	-------------------------------*/
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
		var key, args = $.args();
		
		//alter the callback casing 
		//for scopes and extra arguments
		callback = $.alter.apply($, args);
		
		//now parse through each item
		for(key in this) {
			if(typeof this[key] == 'function') {
				continue;
			}
			
			//if the callback is false
			if(callback(key, this[key]) === false) {
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
		var i, raw = {};
		
		this.each(function(key, value) {
			raw[key] = value;
		});
		
		return raw;
	};
	
	/**
	 * Get Type
	 *
	 * @return string
	 */
	public.getType = function() {
		return 'hash';
	};
	
	/**
	 * Returns true if the array has 
	 * given value
	 *
	 * @param mixed
	 * @param bool
	 */
	public.has = function(value) {
		return !this.each(function(key, test) {
			return !(test === value);
		});
	};
	
	/**
	 * Returns true if empty
	 * 
	 * @return bool
	 */
	public.isEmpty = function() {
		return this.size() === 0;
	};
	
	/**
	 * Returns a list of keys
	 *
	 * @return array
	 */
	public.keys = function() {
		var keys = $.load('array');
		
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
		this.each(function(key, row) {
			self[key] = callback.call(self, key, row);
		});
		
		return this;
	};
	
	/**
	 * Pushes a key to value
	 *
	 * @param scalar
	 * @return this
	 */
	public.set = function(key, value) {
		this[key] = value;
		return this;
	};
	
	/**
	 * Returns the size of the object
	 *
	 * @return number
	 */
	public.size = function() {
		var length = 0;
		
		this.each(function() {
			length++;
		});
		
		return length;
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
		var values = $.load('array');
		
		//now parse through each item
		this.each(function(key, value) {
			values.push(value);
		});
		
		return values;
	};
	
	return c;
};