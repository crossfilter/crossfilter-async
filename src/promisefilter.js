var operative = require('operative');
var crossfilter = require('crossfilter2');

var opfilter = operative({
	"crossfilters": {},
	"crossfilterIndex": 0,
	"dimensions": {},
	"dimensionIndex": 0,
	"groupAlls": {},
	"groupAllIndex": 0,
	"dimensionGroupAlls": {},
	"dimensionGroupAllIndex": 0,
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
	"dimension.groupAll": function(index) {
		this.dimensionGroupAlls[this.dimensionGroupAllIndex] = this.dimensions[index].groupAll();
		var oldIndex = this.dimensionGroupAllIndex;
		this.dimensionGroupAllIndex++;
		this.deferred().fulfill(oldIndex);
	},
	"dimension.groupAll.value": function(index) {
		var value = this.dimensionGroupAlls[index].value();
		this.deferred().fulfill(value);
	},
	"dimension.groupAll.reduceSum": function(index, accessor) {
		this.dimensionGroupAlls[index].reduceSum(accessor);
		this.deferred().fulfill();
	},
	"dimension.groupAll.reduce": function(index, add, remove,initial) {
		this.dimensionGroupAlls[index].reduce(add, remove, initial);
		this.deferred().fulfill();
	},
	"dimension.filterRange": function(index, range) {
		this.dimensions[index].filterRange(range);
		this.deferred().fulfill();
	},
	"dimension.filterAll": function(index) {
		this.dimensions[index].filterAll();
		this.deferred().fulfill();
	},
	"dimension.filter": function(index, value) {
		this.dimensions[index].filter(value);
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
	},
	"size": function(index) {
		var size = this.crossfilters[index].size();
		this.deferred().fulfill(size);
	}
}, ['./node_modules/crossfilter2/crossfilter.min.js']);

var cfFacade = function(data) {
	var cfIndex = opfilter.new(data);
	return {
		dimension: function(accessor) {
			var dimIndex = opfilter.dimension(accessor);
			
			return {
				dispose: function() {
					return opfilter["dimension.dispose"](dimIndex);
				},
				groupAll: function() {
					var dimGaIndex = opfilter["dimension.groupAll"](dimIndex);
					return {
						value: function() {
							return opfilter["dimension.groupAll.value"](dimGaIndex);
						},
						reduceSum: function(accessor) {
							opfilter["dimension.groupAll.reduceSum"](dimGaIndex, accessor);
							return this;
						},
						reduce: function(add, remove, initial) {
							opfilter["dimension.groupAll.reduce"](dimGaIndex, add, remove, initial);
							return this;
						}
					}
				},
				filterRange: function(range) {
					return opfilter["dimension.filterRange"](dimIndex, range);
				},
				filterAll: function() {
					return opfilter["dimension.filterAll"](dimIndex);
				},
				filter: function(value) {
					return opfilter["dimension.filter"](dimIndex, value);
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
		},
		size: function() {
			return opfilter.size(cfIndex);
		}
	};
}
	

cfFacade.bisect = crossfilter.bisect;
cfFacade.heap = crossfilter.heap;

module.exports = cfFacade;