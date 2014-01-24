module.exports = function() {
	return this.define(function($, public) {
		/* Public Properties
		-------------------------------*/
		public.ssl 		= false;
		public.body 	= null;
		public.headers 	= {};
		public.options 	= {};
		public.error	= $.noop;
		
		/* Private Properties
		-------------------------------*/
		/* Loader
		-------------------------------*/
		public.__load = function() {
			return new this();
		};
		
		/* Construct
		-------------------------------*/
		public.construct = function(host) {
			this.setHost(host);
		};
		
		/* Public Methods
		-------------------------------*/
		/**
		 * Sets authentication
		 *
		 * @param string
		 * @param string
		 * @return this
		 */
		public.setAuthentication = function(user, password) {
			this.options.auth = user+':'+password;
			return this;
		};
		
		/**
		 * Sets the request body
		 *
		 * @param string
		 * @return this
		 */
		public.setBody = function(body) {
			this.body = body;
			return this;
		};
		
		/**
		 * Sets the headers hash
		 *
		 * @param string|object
		 * @param mixed
		 * @return this
		 */
		public.setHeaders = function(key, value) {
			if($.load('valid').isObject(key)) {
				this.headers = key;
				return this;
			}
			
			this.headers[key] = value;
			
			return this;
		};
		
		/**
		 * Sets the URL host
		 *
		 * @param string
		 * @return this
		 */
		public.setHost = function(host) {
			this.options.hostname = host;
			return this;
		};
		
		/**
		 * Sets the method IE GET, POST, PUT, DELETE
		 *
		 * @param string
		 * @return this
		 */
		public.setMethod = function(method) {
			this.options.method = method.toUpperCase();
			return this;
		};
		
		/**
		 * Sets the url path
		 *
		 * @param string
		 * @return this
		 */
		public.setPath = function(path) {
			this.options.path = path;
			return this;
		};
		
		/**
		 * Sets the port
		 *
		 * @param int
		 * @return this
		 */
		public.setPort = function(port) {
			this.options.port = port;
			return this;
		};
		
		/**
		 * Use HTTPS
		 *
		 * @return this
		 */
		public.useSSL = function() {
			this.ssl = true;
			return this;
		};
		
		/**
		 * Sets the error handler
		 *
		 * @param function
		 * @return this
		 */
		public.onError = function(callback) {
			this.error = callback;
			return this;
		};
		
		/**
		 * Sends off the request
		 *
		 * @param function
		 * @param string
		 * @return this
		 */
		public.send = function(callback, encoding) {
			var resource = this.ssl ? require('https') : require('http');
			
			callback = callback || $.noop;
			encoding = encoding || 'utf8';
			
			var request = resource.request(this.options, function(response) {
				var data = '';
				
				response.setEncoding(encoding);
				
				response.on('data', function(chunk) {
					data += chunk;
				});
				
				response.on('end', function() {
					callback(data, 
						response.statusCode, 
						response.headers);
				});
			});
			
			request.on('error', this.error);
			
			if(this.body && this.body.length) {
				request.write(this.body);
			}
			
			request.end();
			
			return this;
		};
		
		/* Private Methods
		-------------------------------*/
	});
};