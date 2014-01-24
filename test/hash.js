!function() {
	var eden = require('eden');
	var unit = eden().get('unit');
	var test = unit.extend(function($, public) {
		/* Public Properties
		-------------------------------*/
		public.TEST1 	= 'Combine with Keys';
		public.TEST2 	= 'Combine with Keys Length';
		public.TEST3 	= 'Combine with Values';
		public.TEST4 	= 'Combine with Values Length';
		public.TEST5 	= 'Each extra argument';
		public.TEST6 	= 'Each scope override';
		public.TEST7 	= 'Each key';
		public.TEST8 	= 'Each value';
		public.TEST9 	= 'Get length';
		public.TEST10 	= 'Get key';
		public.TEST11 	= 'Get type';
		public.TEST12 	= 'Has true';
		public.TEST13 	= 'Has false';
		public.TEST14 	= 'Empty';
		public.TEST15 	= 'Keys';
		public.TEST16 	= 'Keys length';
		public.TEST17 	= 'Map';
		public.TEST18 	= 'To Query';
		public.TEST19 	= 'To String';
		public.TEST20 	= 'Keys';
		public.TEST21 	= 'Keys length';
	
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
			this.__parent.__construct();
			this.hash = eden({test1: 6, test2: 7, test3: 9, test4: [1,2,3,4,5]});
		};
		
		/* Public Methods
		-------------------------------*/
		public.testEach = function() {
			var hash = this.hash, scope = { foo: 'bar' };
			this.hash.each(function(key, value, extra, unit) {
				unit.assertSame('another', extra, unit.TEST5);
				unit.assertSame('bar', this.foo, unit.TEST6);
				unit.assertHasKey(key, hash, unit.TEST7);
				unit.assertSame(hash[key], value, unit.TEST8);
			}, scope, 'another', this);
		};
		
		public.testGet = function() {
			var hash = this.hash.get();
			this.assertSame(5, hash.test4.length, this.TEST9);
			this.assertSame(7, hash.test2, this.TEST10);
		};
		
		public.testGetType = function() {
			this.assertSame('hash', this.hash.getType(), this.TEST11);
		};
		
		public.testHas = function() {
			this.assertTrue(this.hash.has(6), this.TEST12);
			this.assertFalse(this.hash.has(8), this.TEST13);
		};
		
		public.testIsEmpty = function() {
			this.assertFalse(this.hash.isEmpty(), this.TEST14);
		};
		
		public.testKeys = function() {
			var keys = this.hash.keys();
			this.assertSame('test2', keys[1], this.TEST15);
			this.assertCount(4, keys, this.TEST16);
		};
		
		public.testMap = function() {
			this.hash.map(function(key, value) {
				if(typeof value != 'number') {
					return value;
				}
				
				return value + 1;
			});
			
			this.assertSame(8, this.hash.test2, this.TEST17);
		};
		
		public.testToQuery = function(prefix) {
			this.assertSame(
			'test1=7&test2=8&test3=10&test4[0]=1&test4[1]=2&test4[2]=3&test4[3]=4&test4[4]=5', 
			this.hash.toQuery(), this.TEST18);
		};
		
		public.testToString = function() {
			this.assertSame(
			'{"test1":7,"test2":8,"test3":10,"test4":[1,2,3,4,5]}', 
			this.hash.toString(), this.TEST19);
		};
		
		public.testValues = function() {
			var values = this.hash.values();
			this.assertSame(8, values[1], this.TEST20);
			this.assertCount(4, values, this.TEST21);
		};
		
		/* Private Methods
		-------------------------------*/
	});
	
	unit.cli.call(test, 'array');
}();