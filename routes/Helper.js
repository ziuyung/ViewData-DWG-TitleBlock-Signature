/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Xiaodong Liang 2015 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

var Helper = {

	newGuid: function () {

			var d = new Date().getTime();

			var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
				/[xy]/g,
				function (c) {
					var r = (d + Math.random() * 16) % 16 | 0;
					d = Math.floor(d / 16);
					return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
				});

			return guid;
	},

	Base64: {

			 // private property
			 _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

			 // public method for encoding
			 _encode : function (input) {
					  var output = "";
					  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
					  var i = 0;

					  input = Helper.Base64._utf8_encode(input);

					  while (i < input.length) {

							  chr1 = input.charCodeAt(i++);
							  chr2 = input.charCodeAt(i++);
							  chr3 = input.charCodeAt(i++);

							  enc1 = chr1 >> 2;
							  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
							  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
							  enc4 = chr3 & 63;

							  if (isNaN(chr2)) {
									   enc3 = enc4 = 64;
							  } else if (isNaN(chr3)) {
									   enc4 = 64;
							  }

							  output = output +
							  this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
							  this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

					  }

					  return output;
			 },
		
		encode : function(input){
			var output = this._encode(input);
			if(output.indexOf("+")>=0 || output.indexOf("/")>=0){
				// url save encode
				return output.replace(/\+/g, '-') // Convert '+' to '-'
					.replace(/\//g, '_') // Convert '/' to '_'
					.replace(/=+$/, ''); // Remove ending '='
			} else {
				// for old url works
				return output;
			}
		},

		 // public method for decoding
		 decode : function (input) {
				  var output = "";
				  var chr1, chr2, chr3;
				  var enc1, enc2, enc3, enc4;
				  var i = 0;

				  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

				  while (i < input.length) {

						  enc1 = this._keyStr.indexOf(input.charAt(i++));
						  enc2 = this._keyStr.indexOf(input.charAt(i++));
						  enc3 = this._keyStr.indexOf(input.charAt(i++));
						  enc4 = this._keyStr.indexOf(input.charAt(i++));

						  chr1 = (enc1 << 2) | (enc2 >> 4);
						  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
						  chr3 = ((enc3 & 3) << 6) | enc4;

						  output = output + String.fromCharCode(chr1);

						  if (enc3 != 64) {
								   output = output + String.fromCharCode(chr2);
						  }
						  if (enc4 != 64) {
								   output = output + String.fromCharCode(chr3);
						  }

				  }

				  output = Helper.Base64._utf8_decode(output);

				  return output;

		 },

		 // private method for UTF-8 encoding
		 _utf8_encode : function (string) {
				  string = string.replace(/\r\n/g,"\n");
				  var utftext = "";

				  for (var n = 0; n < string.length; n++) {

						  var c = string.charCodeAt(n);

						  if (c < 128) {
								   utftext += String.fromCharCode(c);
						  }
						  else if((c > 127) && (c < 2048)) {
								   utftext += String.fromCharCode((c >> 6) | 192);
								   utftext += String.fromCharCode((c & 63) | 128);
						  }
						  else {
								   utftext += String.fromCharCode((c >> 12) | 224);
								   utftext += String.fromCharCode(((c >> 6) & 63) | 128);
								   utftext += String.fromCharCode((c & 63) | 128);
						  }

				  }

				  return utftext;
		 },

		 // private method for UTF-8 decoding
		 _utf8_decode : function (utftext) {
				  var string = "";
				  var i = 0;
				  var c = c1 = c2 = 0;

				  while ( i < utftext.length ) {

						  c = utftext.charCodeAt(i);

						  if (c < 128) {
								   string += String.fromCharCode(c);
								   i++;
						  }
						  else if((c > 191) && (c < 224)) {
								   c2 = utftext.charCodeAt(i+1);
								   string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
								   i += 2;
						  }
						  else {
								   c2 = utftext.charCodeAt(i+1);
								   c3 = utftext.charCodeAt(i+2);
								   string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
								   i += 3;
						  }

				  }

				  return string;
		 }

	} 
};


module.exports =  Helper;