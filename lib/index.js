module.exports = function() {
	var c = function() {}, public = c.prototype;
	
	/* Properties
	-------------------------------*/
	var _cache = {};
	
	/* Loader
	-------------------------------*/
	public.__load = c.load = function() {
		if(!this.__instance) {
			this.__instance = new c();
		}
		
		if(arguments.length == 0) {
			return this.__instance;
		}
		
		var edenized = this.__instance.edenize(arguments[0]);
		
		if(edenized) {
			return edenized;
		}
		
		return this.__instance.load.apply(this.__instance, arguments);
	};
	
	/* Construct
	-------------------------------*/
	/* Utility Methods
	-------------------------------*/
	/**
	 * No operation
	 *
	 * @return void
	 */
	public.noop = function() {};
	
	/**
	 * Alters a function to bind 
	 * a scope and add extra arguments
	 *
	 * @param function*
	 * @param object* scope
	 * @param [mixed[,mixed..]]
	 * @return function
	 */
	public.alter = function(callback, scope) {
		//get arguments
		var self = this, args = this.args();
		
		//take the callback and the scope
		//out of the arguments
		callback 	= args.shift(),
		scope 		= args.shift();
		
		//we are returning a function
		return function() {
			//get the active arguments
			var i, original = self.args();
			
			//add the extra arguments to the
			//original list of arguments
			for(i = 0; i < args.length; i++) {
				original.push(args[i]);
			}
			
			//now call the intended function with bounded arguments
			return callback.apply(scope || this, original);
		};
	};
	
	/**
	 * Returns an array form of arguments
	 *
	 * @return array
	 */
	public.args = function() {
		return Array.prototype.slice.apply(arguments.callee.caller.arguments);
	};
	
	/**
	 * All edens have load methods
	 *
	 * @param mixed
	 * @return bool 
	 */
	public.isEden = function(value) {
		return value && typeof value.__load == 'function';
	};
	
	/**
	 * Attemps to edenize a value
	 * false will be returned if fail
	 *
	 * @param mixed
	 * @param array
	 * @return mixed
	 */
	public.edenize = function(value, types) {
		var i, type;
		types = types || [];
		
		//if it's any type of eden
		if(this.isEden(value)) {
			// and there's no type
			// or there's a getType
			// and type is in the valid type
			if(types.length === 0 
			|| (typeof value.getType == 'function'
			&& types.indexOf(value.getType()) !== -1)) {
				//return it
				return value;
			}
			
			return false;
		}
		
		//if array is a valid type
		if(types.length === 0 || types.indexOf('array') !== -1) {
			type = this.get('array');
			//if value is an array
			if(type.isArray(value)) {
				//edenize it
				return type.load(arguments[0]);
			}
		}
		
		//if hash is a valid type
		if(types.length === 0 || types.indexOf('hash') !== -1) {
			type = this.get('hash');
			//if value is an array
			if(type.isHash(value)) {
				//edenize it
				return type.load(arguments[0]);
			}
		}
		
		//we failed :(
		return false;
	};
	
	/* Class Methods
	-------------------------------*/
	/**
	 * Loads a file and calls it passing arguments
	 *
	 * @param [mixed[,mixed..]]
	 * @return object
	 */
	public.load = function() {
		//get arguments
		var args = this.args();
		
		//remove the key from the arguments
		var key = args.shift();
		
		var definition = this.get(key);
		
		//if there is a loader
		if(typeof definition.load == 'function') {
			//call that loader
			return definition.load.apply(definition, args);
		}
		
		//call that function
		return definition.apply(definition, args);
	};
	
	/**
	 * Loads a file
	 *
	 * @param string
	 * @return function
	 */
	public.get = function(key) {
		//if there is no cache with key set
		if(!_cache[key]) {
			//get the file, *it should be a function
			_cache[key] = require('./'+key+'.js').call(this, this);
		}
		
		return _cache[key];
	};
	
	/**
	 * Returns an inherited class definition
	 *
	 * @param object|function[,object|function..]
	 * @return function
	 */
	public.define = function() {
		var i, key, source, public, 
			self 		= this, 
			define 		= arguments.callee,
			parents 	= {}, 
			hasParents	= false,
			destination = function() {
				//if there is a constructor
				if(toString.call(this.__construct) === '[object Function]') {
					//call it blindly passing the arguments
					this.__construct.apply(this, arguments);
				}
			};
		
		//loop through the arguments
		for(i = 0; i < arguments.length; i++) {
			source = arguments[i];
			
			//if source is a function
			if(typeof source == 'function') {
				//if the source has empty prototype
				//it means that it is not a class 
				//and should be called
				//Note: constructor is always apart of a prototype object
				if(Object.getOwnPropertyNames(source.prototype).length <= 1) {
					//call it
					public = {};
					source = source(this, public);
					if(!source) {
						source = public;
					}
				//just give the prototype
				} else {
					source = Object.create(source.prototype);
				}
			}
			
			//if source is not an object
			if(typeof source != 'object') {
				//skip it
				continue;
			}
			
			//send source to destination
			for(key in source) {
				//if the source is a function and the destination is a function
				if(toString.call(source[key]) === '[object Function]'
				&& toString.call(destination.prototype[key]) === '[object Function]') {
					//remember the parent
					parents[key] = destination.prototype[key];
					hasParents = true;
				}
				
				destination.prototype[key] = source[key];
			}
		}
		
		//if there is a loader
		if(toString.call(destination.prototype.__load) === '[object Function]') {
			//set the loader
			destination.load = destination.prototype.__load;
		}
		
		destination.extend = function() {
			//make args into an array
			var args = Array.prototype.slice.apply(arguments);
			
			//unshift in the prototype
			args.unshift(this.prototype);
			
			//generate the class
			return define.apply(self, args);
		};
		
		//if it doesn't have parents
		if(!hasParents) {
			//there's no need to alter functions
			return destination;
		}
		
		//parse destination
		for(key in destination.prototype) {
			//if it's not a function
			if(toString.call(destination.prototype[key]) !== '[object Function]') {
				continue;
			}
			
			//We do it this way to capture closure variables that 
			//changes inside of a loop. Inside of the alter callback
			//we do not want to reference variables outside of the closure
			destination.prototype[key] = function(callback) {
				return function() {
					//remember the scope
					var self = this;
					
					//make the magic parent variable an object
					this.__parent = {};
					
					//again we need to set the parents up
					//everytime we call this method
					for(key in parents) {
						//the new callback simply applies
						//the original scope
						this.__parent[key] = function() {
							return parents[key].apply(self, arguments);
						};	
					}
					
					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					results = callback.apply(this, arguments);
					
					//remove parent
					delete this.__parent;
					
					return results;
				};
			} (destination.prototype[key]);
		}
		
		//and let it go
		return destination;
	};
	
	/* Private Methods
	-------------------------------*/
	/* Adaptor
	-------------------------------*/
	return c.load; 
}();