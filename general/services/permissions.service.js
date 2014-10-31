angular.module('General')
	.factory('general.Permissions', [function () {
		var items = [
			{'label':'Basic Level 1',
			'value':0x0001
			},
			{'label':'Basic Level 2',
			'value':0x0002
			},
			{'label':'User Level 1',
			'value':0x0004
			},
			{'label':'User Level 2',
			'value':0x0008
			},
			{'label':'Staff Level ',
			'value':0x0010
			},
			{'label':'Staff Level 2',
			'value':0x0020
			},
			{'label':'Team Level 1',
			'value':0x0040
			},
			{'label':'Team Level 2',
			'value':0x0080
			},
			{'label':'Department Level 1',
			'value':0x0100
			},
			{'label':'Department Level 2',
			'value':0x0200
			},
			{'label':'Management Level 1',
			'value':0x0400
			},
			{'label':'Management Level 2',
			'value':0x0800
			},
			{'label':'Admin Level 1',
			'value':0x1000
			},
			{'label':'Admin Level 2',
			'value':0x2000
			},
			{'label':'Super Admin Level 1',
			'value':0x4000
			},
			{'label':'Super Admin Level 2',
			'value':0x8000
			}
		];
		items.calculate = function(read,write){
			var r = 0;
			var w = 0;
			for(var i=0;i<read.length;i++){
				r = r | read[i].value;
			}
			for(var i=0;i<write.length;i++){
				w = w | write[i].value;
			}
			var sum = (w << 16) | r;
			return sum;
		};

		items.inverse = function(p){
			var read = [];
			var write = [];
			for(var i=0;i<16;i++){
				if (((p >> i) & 0x1) != 0){
					read.push(items[i]);
				}
			}
			for(var i=16;i<32;i++){
				if (((p >> i) & 0x1) != 0){
					write.push(items[i-16]);
				}
			}
			return [read,write];
		}
		
		return items;
	}])