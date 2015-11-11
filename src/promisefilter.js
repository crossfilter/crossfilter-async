var operative = require('operative');
var crossfilter = require('crossfilter2');

var opfilter = operative({
	"crossfilters": {},
	"crossfilterIndex": 0,
	"dimensions": {},
	"dimensionIndex": 0,
	"groupAlls": {},
	"groupAllIndex": 0,
	"new": function(data) {
		this.crossfilters[this.crossfilterIndex] = crossfilter(data);
		var oldIndex = this.crossfilterIndex;
		this.crossfilterIndex++;
		this.deferred().fulfill(oldIndex);
	},
	"dimension": function(accessor) {
		this.dimensions[this.dimensionIndex] = this.crossfilter.dimension(accessor);
		var oldIndex = this.dimensionIndex;
		this.dimensionIndex++;
		this.deferred().fulfill(oldIndex);
	},
	"dimension.dispose": function(index) {
		this.dimensions[index].dispose();
		this.deferred().fulfill();
	},
	"groupAll": function(index) {
		this.groupAlls[this.groupAllIndex] = this.crossfilters[index].groupAll();
		var oldIndex = this.groupAllIndex;
		this.groupAllIndex++;
		this.deferred().fulfill(oldIndex);
	},
	"groupAll.value": function(index) {
		var value = this.groupAlls[index].value();
		this.deferred().fulfill(value);
	},
	"add": function(index, data) {
		this.crossfilters[index].add(data);
		this.deferred().fulfill();
	}
}, ['./node_modules/crossfilter2/crossfilter.min.js']);

var cfFacade = function(data) {
	var cfIndex = opfilter.new(data);
	return {
		dimension: function(accessor) {
			var dimIndex = opfilter.dimension(accessor);
			
			return {
				dispose: function() {
					opfilter["dimension.dispose"](dimIndex);
				}
			}	
		},
		groupAll: function() {
			var gaIndex = opfilter.groupAll(cfIndex);
			
			return {
				value: function() {
					return opfilter["groupAll.value"](gaIndex);
				}
			}
		},
		remove: function() {
			
		},
		add: function(data) {
			return opfilter.add(cfIndex, data);
		}
	};
}
	

cfFacade.bisect = crossfilter.bisect;
cfFacade.heap = crossfilter.heap;

module.exports = cfFacade;