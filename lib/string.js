module.exports = function($) {
	var c = function() {
		this.__construct.apply(this, arguments);
	}, public = c.prototype = Object.create(String.prototype);
	
	/* Public Properties
	-------------------------------*/
	/* Private Properties
	-------------------------------*/
	/* Loader
	-------------------------------*/
	c.load = function(string) {
		return new this(string);
	};
	
	c.isString = function(value) {
		return (typeof value == 'string');
	};
	
	/* Construct
	-------------------------------*/
	public.__construct = function(value) {
		this.string = value;
	};
	
	/* Public Methods
	-------------------------------*/
	/**
	 * Returns a string with backslashes before characters
	 * that are listed in charlist parameter.
	 *
	 * @param string
	 * @param string
	 * @return string
	 */
	public.addcslashes = function(charlist, regex) {
		var list	= [];
		var chunk	= [];
		
		//if regex, means that the charlist is a regex pattern
		if(regex) {
			var reg = new RegExp(charlist, 'g');
			var list = 'hellow world'.match(reg);
		} else {
			//convert the charlist to array
			for(var c = 0; c < charlist.length; c++) {
				list.push(charlist.charAt(c));
			}
		}
		
		//if empty list, return false
		if(!list || list.length < 1) {
			return false;
		}
		
		//convert string to array
		for(var i = 0; i < this.string.length; i++) {
			//if the string has the character in the charlist
			//let's add backslashes
			for(var x = 0; x < list.length; x++) {
				if(this.string.charAt(i) == list[x]) {
					var data = '\\'+this.string.charAt(i);
					break;
				} else {
					//if not, the just pass the string
					var data = this.string.charAt(i);
				}
			}
			
			//push the character to array
			chunk.push(data);
		}
		
		//lets bring back the string with the backslashes
		//based on the charlist
		var string = '';
		for(var x = 0; x < chunk.length; x++) string += chunk[x];
		
		//return the final string
		return string;
	}
	
	/**
	 * Returns a string with backslashes before characters
	 * that need to be escaped.
	 *
	 * @return string
	 */
	public.addslashes = function() {
		return this.string.replace(/\'/g, "\\\'").
			replace(/\"/g, "\\\"").
			replace(/\\/g, '\\').
			replace(/\n/g, '\\\\n').
			replace(/\t/g, '\\\\t').
			replace(/\f/g, '\\\\f').
			replace(/\r/g, '\\\\r');
	}
	
	/**
	 * Split a string by passed string delimeter
	 *
	 * @param string
	 * @param numeric
	 * @return string
	 */
	public.explode = function(delimeter, limit) {
		var newString = this.string.split(delimeter);
		if (limit) {
			newString.push(newString.splice(limit-1).join(delimeter));
		}
		
		return newString;
	}
	
	/**
	 * Returns the translation table used by 
	 * htmlspecialchars() and htmlentities()
	 *
	 * @param string
	 * @param string
	 * @return string
	 */
	public.get_html_translation_table = function(table, quote_style) {
		var entities				= {},
			hash_map				= {},
			constMappingTable 		= {},
			constMappingQuoteStyle 	= {},
			useTable 				= {},
			useQuoteStyle 			= {},
			decimal 				= 0,
			symbol					= '';
		
		// Translate arguments
		constMappingTable[0] 		= 'HTML_SPECIALCHARS';
		constMappingTable[1] 		= 'HTML_ENTITIES';
		constMappingQuoteStyle[0] 	= 'ENT_NOQUOTES';
		constMappingQuoteStyle[2] 	= 'ENT_COMPAT';
		constMappingQuoteStyle[3] 	= 'ENT_QUOTES';
		
		useTable = !isNaN(table) ? constMappingTable[table] 
			: table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
		
		useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] 
			: quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';
		
		//check the used table
		if (useTable !== 'HTML_SPECIALCHARS' 
		&& useTable !== 'HTML_ENTITIES') {
			throw new Error("Table: " + useTable + ' not supported');
			return false;
		}
		
		entities['38'] = '&amp;';
		
		if (useTable === 'HTML_ENTITIES') {
			entities['160'] = '&nbsp;';
			entities['161'] = '&iexcl;';
			entities['162'] = '&cent;';
			entities['163'] = '&pound;';
			entities['164'] = '&curren;';
			entities['165'] = '&yen;';
			entities['166'] = '&brvbar;';
			entities['167'] = '&sect;';
			entities['168'] = '&uml;';
			entities['169'] = '&copy;';
			entities['170'] = '&ordf;';
			entities['171'] = '&laquo;';
			entities['172'] = '&not;';
			entities['173'] = '&shy;';
			entities['174'] = '&reg;';
			entities['175'] = '&macr;';
			entities['176'] = '&deg;';
			entities['177'] = '&plusmn;';
			entities['178'] = '&sup2;';
			entities['179'] = '&sup3;';
			entities['180'] = '&acute;';
			entities['181'] = '&micro;';
			entities['182'] = '&para;';
			entities['183'] = '&middot;';
			entities['184'] = '&cedil;';
			entities['185'] = '&sup1;';
			entities['186'] = '&ordm;';
			entities['187'] = '&raquo;';
			entities['188'] = '&frac14;';
			entities['189'] = '&frac12;';
			entities['190'] = '&frac34;';
			entities['191'] = '&iquest;';
			entities['192'] = '&Agrave;';
			entities['193'] = '&Aacute;';
			entities['194'] = '&Acirc;';
			entities['195'] = '&Atilde;';
			entities['196'] = '&Auml;';
			entities['197'] = '&Aring;';
			entities['198'] = '&AElig;';
			entities['199'] = '&Ccedil;';
			entities['200'] = '&Egrave;';
			entities['201'] = '&Eacute;';
			entities['202'] = '&Ecirc;';
			entities['203'] = '&Euml;';
			entities['204'] = '&Igrave;';
			entities['205'] = '&Iacute;';
			entities['206'] = '&Icirc;';
			entities['207'] = '&Iuml;';
			entities['208'] = '&ETH;';
			entities['209'] = '&Ntilde;';
			entities['210'] = '&Ograve;';
			entities['211'] = '&Oacute;';
			entities['212'] = '&Ocirc;';
			entities['213'] = '&Otilde;';
			entities['214'] = '&Ouml;';
			entities['215'] = '&times;';
			entities['216'] = '&Oslash;';
			entities['217'] = '&Ugrave;';
			entities['218'] = '&Uacute;';
			entities['219'] = '&Ucirc;';
			entities['220'] = '&Uuml;';
			entities['221'] = '&Yacute;';
			entities['222'] = '&THORN;';
			entities['223'] = '&szlig;';
			entities['224'] = '&agrave;';
			entities['225'] = '&aacute;';
			entities['226'] = '&acirc;';
			entities['227'] = '&atilde;';
			entities['228'] = '&auml;';
			entities['229'] = '&aring;';
			entities['230'] = '&aelig;';
			entities['231'] = '&ccedil;';
			entities['232'] = '&egrave;';
			entities['233'] = '&eacute;';
			entities['234'] = '&ecirc;';
			entities['235'] = '&euml;';
			entities['236'] = '&igrave;';
			entities['237'] = '&iacute;';
			entities['238'] = '&icirc;';
			entities['239'] = '&iuml;';
			entities['240'] = '&eth;';
			entities['241'] = '&ntilde;';
			entities['242'] = '&ograve;';
			entities['243'] = '&oacute;';
			entities['244'] = '&ocirc;';
			entities['245'] = '&otilde;';
			entities['246'] = '&ouml;';
			entities['247'] = '&divide;';
			entities['248'] = '&oslash;';
			entities['249'] = '&ugrave;';
			entities['250'] = '&uacute;';
			entities['251'] = '&ucirc;';
			entities['252'] = '&uuml;';
			entities['253'] = '&yacute;';
			entities['254'] = '&thorn;';
			entities['255'] = '&yuml;';
		}
	
		if (useQuoteStyle !== 'ENT_NOQUOTES') {
			entities['34'] = '&quot;';
		}
		if (useQuoteStyle === 'ENT_QUOTES') {
			entities['39'] = '&#39;';
		}
		
		entities['60'] = '&lt;';
		entities['62'] = '&gt;';
	
		// ascii decimals to real symbols
		for (decimal in entities) {
			symbol = String.fromCharCode(decimal);
			hash_map[symbol] = entities[decimal];
		}
	
		return hash_map;
	}
	
	/**
	 * Convert all applicable characters to HTML entities
	 *
	 * @param string
	 * @param string
	 * @param string
	 * @return string
	 */
	public.htmlentities = function(quote_style, charset, double_encode) {
		var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style);
		var symbol = '';
		
		this.string = (this.string == null) ? '' : this.string + '';
	
		if(!hash_map) return false;
	
		if(quote_style && quote_style === 'ENT_QUOTES') {
			hash_map["'"] = '&#039;';
		}
	
		if ( !! double_encode || double_encode == null) {
			for (symbol in hash_map) {
				if (hash_map.hasOwnProperty(symbol)) {
					this.string = this.string.split(symbol).join(hash_map[symbol]);
				}
			}
		} else {
			this.string = this.string.replace(
				/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g,
				function(ignore, text, entity) {
					for (symbol in hash_map) {
						if (hash_map.hasOwnProperty(symbol)) {
							text = text.split(symbol).join(hash_map[symbol]);
						}
					}
					
					return text + entity;
			});
		}
	
		return this.string;
	}
	
	/**
	 * Convert special characters to HTML entities
	 *
	 * @param string | int
	 * @param string
	 * @param boolean
	 * @return string
	 */
	public.htmlspecialchars = function(quote_style, charset, double_encode) {
		var optTemp 	= 0,
			i 			= 0,
			noquotes	= false;
		
		if (typeof quote_style === 'undefined'
		|| quote_style === null) {
			quote_style = 2;
		}
		
		this.string = this.string.toString();
		if (double_encode !== false) {
			// Put this first to avoid double-encoding
			this.string = this.string.replace(/&/g, '&amp;');
		}
		
		//convert the greater than and less than symbol
		this.string = this.string.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		
		//options
		var OPTS = {
			'ENT_NOQUOTES': 0,
			'ENT_HTML_QUOTE_SINGLE': 1,
			'ENT_HTML_QUOTE_DOUBLE': 2,
			'ENT_COMPAT': 2,
			'ENT_QUOTES': 3,
			'ENT_IGNORE': 4
		};
		
		if (quote_style === 0) noquotes = true;
		
		// Allow for a single string or an array of string flags
		if (typeof quote_style !== 'number') {
			quote_style = [].concat(quote_style);
			for (i = 0; i < quote_style.length; i++) {
				// Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
				if (OPTS[quote_style[i]] === 0)
					noquotes = true;
				else if (OPTS[quote_style[i]])
					optTemp = optTemp | OPTS[quote_style[i]];
			}
			
			quote_style = optTemp;
		}
		
		if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
			this.string = this.string.replace(/'/g, '&#039;');
		}
		
		if (!noquotes) {
			this.string = this.string.replace(/"/g, '&quot;');
		}
		
		return this.string;
	}
	
	/**
	 * Convert special HTML entities back to characters
	 *
	 * @param string
	 * @param string
	 * @return string
	 */
	public.htmlspecialchars_decode = function(quote_style) {
		var optTemp		= 0,
			i 			= 0
			noquotes	= false;
		
		if(typeof quote_style === 'undefined') quote_style = 2;
		
		this.string = this.string.toString()
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>');
		
		var OPTS = {
			'ENT_NOQUOTES': 0,
			'ENT_HTML_QUOTE_SINGLE': 1,
			'ENT_HTML_QUOTE_DOUBLE': 2,
			'ENT_COMPAT': 2,
			'ENT_QUOTES': 3,
			'ENT_IGNORE': 4
		};
		
		//if quote_style is equal to 0
		if (quote_style === 0) noquotes = true;
		
		// Allow for a single string or an array of string flags
		if (typeof quote_style !== 'number') {
			quote_style = [].concat(quote_style);
			for (i = 0; i < quote_style.length; i++) {
				// Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
				if (OPTS[quote_style[i]] === 0) {
					noquotes = true;
				} else if (OPTS[quote_style[i]]) {
					optTemp = optTemp | OPTS[quote_style[i]];
				}
			}
			quote_style = optTemp;
		}
		
		if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
			// PHP doesn't currently escape if more than one 0, but it should
			this.string = this.string.replace(/&#0*39;/g, "'"); 
			// string = string.replace(/&apos;|&#x0*27;/g, "'");
			// This would also be useful here, but not a part of PHP
		}
		
		if (!noquotes) this.string = this.string.replace(/&quot;/g, '"');
		
		// Put this in last place to avoid escape being double-decoded
		return this.string.replace(/&amp;/g, '&');
	}
	
	/**
	 * Convert all HTML entities to their applicable characters
	 *
	 * @param string
	 * @return string
	 */
	public.html_entity_decode = function(quote_style) {
		var histogram 	= {},
			symbol 		= '',
			tmp_str 	= '',
			entity 		= '';
		
		tmp_str 	= this.string.toString();
		histogram 	= this.get_html_translation_table('HTML_ENTITIES', quote_style);
		
		if (histogram === false) return false;
	
		// &amp; must be the last character when decoding!
		delete(histogram['&']);
		histogram['&'] = '&amp;';
	
		for (symbol in histogram) {
			entity = histogram[symbol];
			tmp_str = tmp_str.split(entity).join(symbol);
		}
	
		return tmp_str;
	}
	
	/**
	 * Lowercase the first letter of the string
	 *
	 * @return string
	 */
	public.lcfirst = function() {
		var first = this.string.charAt(0).toLowerCase();
		return first + this.string.substr(1);
	}
	
	/**
	 * Calculate the md5 hash of a string
	 *
	 * @return string
	 */
	public.md5 = function() {
		var str = this.string;
		var xl;
		var rotateLeft = function (lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		};

		var addUnsigned = function (lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 	= (lX & 0x80000000);
			lY8 	= (lY & 0x80000000);
			lX4 	= (lX & 0x40000000);
			lY4 	= (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		};
	
		var _F = function (x, y, z) { return (x & y) | ((~x) & z); };
		var _G = function (x, y, z) { return (x & z) | (y & (~z)); };
		var _H = function (x, y, z) { return (x ^ y ^ z); };
		var _I = function (x, y, z) { return (y ^ (x | (~z))); };

		var _FF = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var _GG = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var _HH = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var _II = function (a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var convertToWordArray = function (str) {
			var lWordCount;
			var lMessageLength = str.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = new Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] 
					| (str.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			
			return lWordArray;
		};

		var wordToHex = function (lValue) {
			var wordToHexValue = "",
			wordToHexValue_temp = "",
			lByte, lCount;
			
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				wordToHexValue_temp = "0" + lByte.toString(16);
				wordToHexValue = wordToHexValue + wordToHexValue_temp.
					substr(wordToHexValue_temp.length - 2, 2);
			}
		
			return wordToHexValue;
		};

		var x = [],
		k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
		S12 = 12,
		S13 = 17,
		S14 = 22,
		S21 = 5,
		S22 = 9,
		S23 = 14,
		S24 = 20,
		S31 = 4,
		S32 = 11,
		S33 = 16,
		S34 = 23,
		S41 = 6,
		S42 = 10,
		S43 = 15,
		S44 = 21;
		
		str = this.utf8_encode(str);
		x = convertToWordArray(str);
		a = 0x67452301;
		b = 0xEFCDAB89;
		c = 0x98BADCFE;
		d = 0x10325476;
		xl = x.length;
		
		for (k = 0; k < xl; k += 16) {
			AA = a;
			BB = b;
			CC = c;
			DD = d;
			a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
			d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
			c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
			b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
			a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
			d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
			c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
			b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
			a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
			d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
			c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
			b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
			a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
			d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
			c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
			b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
			a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
			d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
			c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
			b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
			a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
			d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
			c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
			b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
			a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
			d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
			c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
			b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
			a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
			d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
			c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
			b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
			a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
			d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
			c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
			b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
			a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
			d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
			c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
			b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
			a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
			d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
			c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
			b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
			a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
			d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
			c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
			b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
			a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
			d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
			c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
			b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
			a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
			d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
			c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
			b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
			a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
			d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
			c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
			b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
			a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
			d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
			c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
			b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
			a = addUnsigned(a, AA);
			b = addUnsigned(b, BB);
			c = addUnsigned(c, CC);
			d = addUnsigned(d, DD);
		}

		var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

		return temp.toLowerCase();
	}
	
	/**
	 * Calculate the sha1 hash of a string
	 *
	 * @return string
	 */
	public.sha1 = function() {
		function rotate_left(n,s) {
			var t4 = ( n<<s ) | (n>>>(32-s));
			return t4;
		};
 
		function lsb_hex(val) {
			var str="";
			var i;
			var vh;
			var vl;
		
			for( i=0; i<=6; i+=2 ) {
				vh = (val>>>(i*4+4)) & 0x0f;
				vl = (val>>>(i*4)) & 0x0f;
				str += vh.toString(16) + vl.toString(16);
			}
			
			return str;
		};
 
		function cvt_hex(val) {
			var str="";
			var i;
			var v;
			
			for( i=7; i>=0; i-- ) {
				v = (val>>>(i*4))&0x0f;
				str += v.toString(16);
			}
			
			return str;
		};

		var blockstart;
		var i, j;
		var W = new Array(80);
		var H0 = 0x67452301;
		var H1 = 0xEFCDAB89;
		var H2 = 0x98BADCFE;
		var H3 = 0x10325476;
		var H4 = 0xC3D2E1F0;
		var A, B, C, D, E;
		var temp;
 
		msg = this.utf8_encode(this.string);
 
		var msg_len 	= msg.length;
		var word_array 	= new Array();
		
		for( i=0; i<msg_len-3; i+=4 ) {
			j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
			msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
			word_array.push( j );
		}
 
		switch( msg_len % 4 ) {
			case 0:
				i = 0x080000000;
				break;
			case 1:
				i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
				break;
			case 2:
				i = msg.charCodeAt(msg_len-2)<<24 
					| msg.charCodeAt(msg_len-1)<<16 | 0x08000;
				break;
			case 3:
				i = msg.charCodeAt(msg_len-3)<<24 
					| msg.charCodeAt(msg_len-2)<<16 
					| msg.charCodeAt(msg_len-1)<<8
					| 0x80;
				break;
		}
 
		word_array.push(i);
		while((word_array.length % 16) != 14 ) word_array.push(0);
		word_array.push( msg_len>>>29 );
		word_array.push( (msg_len<<3)&0x0ffffffff );
		
		for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
			for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
			for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
		
			A = H0;
			B = H1;
			C = H2;
			D = H3;
			E = H4;
 
			for( i= 0; i<=19; i++ ) {
				temp = (rotate_left(A,5) + ((B&C) | (~B&D)) 
					+ E + W[i] + 0x5A827999) & 0x0ffffffff;
					
				E = D;
				D = C;
				C = rotate_left(B,30);
				B = A;
				A = temp;
			}
 
			for( i=20; i<=39; i++ ) {
				temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] 
					+ 0x6ED9EBA1) & 0x0ffffffff;
					
				E = D;
				D = C;
				C = rotate_left(B,30);
				B = A;
				A = temp;
			}
 
			for( i=40; i<=59; i++ ) {
				temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) 
					+ E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
					
				E = D;
				D = C;
				C = rotate_left(B,30);
				B = A;
				A = temp;
			}
 
			for( i=60; i<=79; i++ ) {
				temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] 
					+ 0xCA62C1D6) & 0x0ffffffff;
					
				E = D;
				D = C;
				C = rotate_left(B,30);
				B = A;
				A = temp;
			}
 
			H0 = (H0 + A) & 0x0ffffffff;
			H1 = (H1 + B) & 0x0ffffffff;
			H2 = (H2 + C) & 0x0ffffffff;
			H3 = (H3 + D) & 0x0ffffffff;
			H4 = (H4 + E) & 0x0ffffffff;
    	}
 
		var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 
		return temp.toLowerCase();
	}
	
	/**
	 * Inserts HTML line breaks before all newlines in a string
	 *
	 * @param boolean
	 * @return string
	 */
	public.nl2br = function(is_xhtml) {
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined')
			? '<br />' : '<br>';

 		return this.string.
			replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}
	
	/**
	 * Return a formatted string
	 *
	 * @param string
	 * @return string
	 */
	public.sprintf = function(format) {
        // Check for format definition
        if ( typeof format != 'string' ) {
            throw "sprintf: The first arguments need to be a valid format string.";
        }
		
        var r = new RegExp( /%(\+)?([0 ]|'(.))?(-)?([0-9]+)?(\.([0-9]+))?([%bcdfosxX])/g );

        var parts      = [];
        var paramIndex = 1;
		
        while ( part = r.exec( format ) ) {
            // Check if an input value has been provided, for the current
            // format string (no argument needed for %%)
            if ( ( paramIndex >= arguments.length ) && ( part[8] != '%' ) ) {
                throw "sprintf: At least one argument was missing.";
            }

            parts[parts.length] = {
                /* beginning of the part in the string */
                begin: part.index,
                /* end of the part in the string */
                end: part.index + part[0].length,
                /* force sign */
                sign: ( part[1] == '+' ),
                /* is the given data negative */
                negative: ( parseFloat( arguments[paramIndex] ) < 0 ) ? true : false,
                /* padding character (default: <space>) */
                padding: ( part[2] == undefined )
                         ? ( ' ' ) /* default */
                         : ( ( part[2].substring( 0, 1 ) == "'" ) 
                             ? ( part[3] ) /* use special char */
                             : ( part[2] ) /* use normal <space> or zero */
                           ),
                /* should the output be aligned left?*/
                alignLeft: ( part[4] == '-' ),
                /* width specifier (number or false) */
                width: ( part[5] != undefined ) ? part[5] : false,
                /* precision specifier (number or false) */
                precision: ( part[7] != undefined ) ? part[7] : false,
                /* type specifier */
                type: part[8],
                /* the given data associated with this part converted to a string */
                data: ( part[8] != '%' ) ? String ( arguments[paramIndex++] ) : false
            };
        }
		
        var newString = "";
        var start = 0;
		
        // Generate our new formated string
        for( var i=0; i<parts.length; ++i ) {
            // Add first unformated string part
            newString += format.substring( start, parts[i].begin );
            
            // Mark the new string start
            start = parts[i].end;

            // Create the appropriate preformat substitution
            // This substitution is only the correct type conversion. All the
            // different options and flags haven't been applied to it at this
            // point
            var preSubstitution = "";
            switch ( parts[i].type ) {
                case '%':
                    preSubstitution = "%";
                	break;
                case 'b':
                    preSubstitution = Math.abs(parseInt( parts[i].data ) ).
						toString( 2 );
                	break;
                case 'c':
                    preSubstitution = String.fromCharCode(
						Math.abs( parseInt( parts[i].data ) ) );
                	break;
                case 'd':
                    preSubstitution = String( Math.abs( parseInt( parts[i].data ) ) );
                	break;
                case 'f':
                    preSubstitution = ( parts[i].precision == false )
						? (String((Math.abs(parseFloat(parts[i].data)))))
						: (Math.abs(parseFloat(parts[i].data)).toFixed(parts[i].precision));
                	break;
                case 'o':
                    preSubstitution = Math.abs(parseInt(parts[i].data)).toString(8);
                	break;
                case 's':
					//Cut if precision is defined
                    preSubstitution = parts[i].data.
						substring(0, parts[i].precision 
							? parts[i].precision 
							: parts[i].data.length );
                	break;
                case 'x':
                    preSubstitution = Math.abs(parseInt(parts[i].data))
						.toString(16).toLowerCase();
                	break;
                case 'X':
                    preSubstitution = Math.abs(parseInt(parts[i].data))
						.toString(16).toUpperCase();
                	break;
                default:
                    throw 'sprintf: Unknown type "' +
						parts[i].type + '" detected. This should never happen. Maybe the regex is wrong.';
            }

            // The % character is a special type and does not need further processing
            if ( parts[i].type ==  "%" ) {
                newString += preSubstitution;
                continue;
            }

            // Modify the preSubstitution by taking sign, padding and width
            // into account

            // Pad the string based on the given width
            if ( parts[i].width != false ) {
                // Padding needed?
                if ( parts[i].width > preSubstitution.length ) {
                    var origLength = preSubstitution.length;
                    for( var j = 0; j < parts[i].width - origLength; ++j ) {
                        preSubstitution = ( parts[i].alignLeft == true ) 
                        	? ( preSubstitution + parts[i].padding )
                            : ( parts[i].padding + preSubstitution );
                    }
                }
            }

            // Add a sign symbol if neccessary or enforced, but only if we are
            // not handling a string
            if ( parts[i].type == 'b' 
              || parts[i].type == 'd' 
              || parts[i].type == 'o' 
              || parts[i].type == 'f' 
              || parts[i].type == 'x' 
              || parts[i].type == 'X' ) {
				if ( parts[i].negative == true ) {
					preSubstitution = "-" + preSubstitution;
				} else if ( parts[i].sign == true ) {
                    preSubstitution = "+" + preSubstitution;
                }
            }

            // Add the substitution to the new string
            newString += preSubstitution;
        }

        // Add the last part of the given format string, which may still be there
        newString += format.substring( start, format.length );

        return newString;
    };
	
	/**
	 * Returns a string with backslashes stripped off.
	 *
	 * @return string
	 */
	public.stripslashes = function() {
		return this.string.replace(/\\'/g,'\'').
			replace(/\\"/g,'"').
			replace(/\\0/g,'\0').
			replace(/\\\\/g,'\\');
	}
	
	/**
	 * Capitalize the first letter of the string
	 *
	 * @return string
	 */
	public.ucfirst = function() {
		return this.string.charAt(0).
			toUpperCase()+this.string.slice(1);
	}
	
	/**
	 * Uppercase the first character of each word in a string
	 *
	 * @return string
	 */
	public.ucwords = function() {
		return this.string.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();
		});
	}
	
	/**
	 * Encodes an ISO-8859-1 string to UTF-8
	 *
	 * @param string
	 * @return string
	 */
	public.utf8_encode = function(argString) {
		if (argString === null || typeof argString === 'undefined') {
			return '';
		}

		var string = (argString + '');
		var utftext = '',
		start, end, stringl = 0;

		start = end = 0;
		stringl = string.length;
		
		for (var n = 0; n < stringl; n++) {
			var c1 = string.charCodeAt(n);
			var enc = null;

			if (c1 < 128) {
				end++;
			} else if (c1 > 127 && c1 < 2048) {
				enc = String.fromCharCode(
				(c1 >> 6) | 192, (c1 & 63) | 128);
			} else if (c1 & 0xF800 != 0xD800) {
				enc = String.fromCharCode(
				(c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
			} else { // surrogate pairs
				if (c1 & 0xFC00 != 0xD800) {
					throw new RangeError('Unmatched trail surrogate at ' + n);
				}
				
				var c2 = string.charCodeAt(++n);
				if (c2 & 0xFC00 != 0xDC00) {
					throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
				}
				
				c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
				enc = String.fromCharCode((c1 >> 18) | 240, 
					((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
			}
			
			if (enc !== null) {
				if (end > start) {
					utftext += string.slice(start, end);
				}
				
				utftext += enc;
				start = end = n + 1;
			}
		}

		if (end > start) {
			utftext += string.slice(start, stringl);
		}

		return utftext;
	}
	
	return c;
};