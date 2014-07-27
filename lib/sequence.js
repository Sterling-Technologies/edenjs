module.exports = function($) {
	return this.define(function(public) {
		/* Public Properties
		-------------------------------*/
		public.stack 	= [];
		public.working 	= false;
		public.args 	= [];
		
		/* Private Properties
		-------------------------------*/
		/* Loader
		-------------------------------*/
		public.__load = function() {
			return new this();
		};
		
		/* Construct
		-------------------------------*/
		public.__construct = function() {
			this.stack 		= [];
			this.args 		= [];
		};
		
		/* Public Methods
		-------------------------------*/
		public.setScope = function(scope) {
			this.scope = scope;
			return this;
		};
		
		public.then = function(callback) {
			//Argument Testing
			$.load('argument').test(1, 'function');
			
			this.stack.push(callback);
			
			if(!this.working) {
				this.working = true;
				_next.apply(this, this.args);
			}
			
			return this;
		};
		
		/* Private Methods
		-------------------------------*/
		var _next = function() {
			if(!this.stack.length) {
				this.working = false;
				this.args = $.args();
				return;
			}
			
			var callback = this.stack.shift(), args = $.args();
			// next.each([arg1 + 1, arg2 + 1], arg1, arg2);
			//.then(function(i, file, next) {});
			var next = arguments.callee.bind(this);
			
			next.each = (function() {
				if(!this.stack.length) {
					//if there's nothing in queue
					//do nothing
					return;
				}
				
				var unshift = null;
				var stack 	= [];
				var args	= $.args();
				var list 	= args.shift();
				var queued 	= this.stack.shift();
				
				for(var key in list) {
					stack.push(queued.bind(this.scope || next, key, list[key]));
				}
				
				while(unshift = stack.pop()) {
					this.stack.unshift(unshift);
				}
				
				//now auto call next
				next.apply(next, args);
			}).bind(this);
			
			args.push(next);
			
			//async call
			process.nextTick(function() {
				callback.apply(this.scope || callback, args);
			}.bind(this));
		};
	});
};