			YUI().use("node", "event", "io", "json-parse", function (Y) {
			
				Y.on("domready", function (e) {
										
					Y.one("#toxml").on("click", function(e) {
						var xotree = new XML.ObjTree();
						var json = eval("(" + Y.one("#json").get("value") + ")");
						Y.one("#xml").set("value", formatXml(xotree.writeXML(json))); 
					});
					
					Y.one("#save").on("click", function(e) {
						var cfg = {
							method: "POST",
							sync: true,
							headers: {"Content-Type": "application/json" },
							data: "{ 'xml': '" + Base64.encode(Y.one("#xml").get("value")) + 
								"', 'json': '" + Base64.encode(Y.one("#json").get("value")) + "'}"
						};
						var response = Y.io("/backend/share/save", cfg);
						if (response.status == 200) {
							var base = window.location.href.split('#')[0];
							base = base.split('?')[0];
							var url = base + "?save=" + response.responseText;
							Y.one("#saveurl").setHTML(url);
							Y.one("#saveurl").set("href", url);
							Y.one("#savewrap").removeClass("hide");
						} else if (response.status == 400) {
							alert(response.responseText);
						} else {
							alert("Internal Server Error: " + response.responseText);
						}
					});
	
					var save = getParameterByName("save");
					if (save != undefined) {
						var cfg = {	sync: true };
						var response = Y.io("/backend/share/retrieve?name=" + save, cfg);
						if (response.status == 200) {
							var data = Y.JSON.parse(response.responseText);
							Y.one("#xml").set("value", Base64.decode(data.xml));
							Y.one("#json").set("value", Base64.decode(data.json));
						}
					}
					
				});
				
			});
	
			var formatXml = function (xml) {
		        var reg = /(>)(<)(\/*)/g;
		        var wsexp = / *(.*) +\n/g;
		        var contexp = /(<.+>)(.+\n)/g;
		        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
		        var pad = 0;
		        var formatted = '';
		        var lines = xml.split('\n');
		        var indent = 0;
		        var lastType = 'other';
		        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
		        var transitions = {
		            'single->single': 0,
		            'single->closing': -1,
		            'single->opening': 0,
		            'single->other': 0,
		            'closing->single': 0,
		            'closing->closing': -1,
		            'closing->opening': 0,
		            'closing->other': 0,
		            'opening->single': 1,
		            'opening->closing': 0,
		            'opening->opening': 1,
		            'opening->other': 1,
		            'other->single': 0,
		            'other->closing': -1,
		            'other->opening': 0,
		            'other->other': 0
		        };

		        for (var i = 0; i < lines.length; i++) {
		            var ln = lines[i];
		            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
		            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
		            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
		            var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
		            var fromTo = lastType + '->' + type;
		            lastType = type;
		            var padding = '';

		            indent += transitions[fromTo];
		            for (var j = 0; j < indent; j++) {
		                padding += '\t';
		            }
		            if (fromTo == 'opening->closing')
		                formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
		            else
		                formatted += padding + ln + '\n';
		        }

		        return formatted;
		    };

