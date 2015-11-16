var operative = require('operative');

var cfUrl = '/base/node_modules/crossfilter2/crossfilter.js';

// URL.createObjectURL
// window.URL = window.URL || window.webkitURL;

// var blob;
// try {
// 	blob = new Blob([function() {}.toString()], {type: 'application/javascript'});
// } catch (e) { // Backwards-compatibility
//     window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
//     blob = new BlobBuilder();
//     blob.append(function() {}.toString());
//     blob = blob.getBlob();
// }
// var cfUrl = URL.createObjectURL(blob);

var opfilter = operative({
	"unpack": function unpackFunction(func, context) {
		var internal, evalStr = "";
		if(context) {
			evalStr += context;
		}
		evalStr += "internal = " + func;
		eval(evalStr);
		return internal;
	},
	"crossfilters": {},
	"crossfilterIndex": 0,
	"dimensions": {},
	"dimensionIndex": 0,
	"groupAlls": {},
	"groupAllIndex": 0,
	"dimensionGroupAlls": {},
	"dimensionGroupAllIndex": 0,
	"dimensionGroups": {},
	"dimensionGroupIndex": 0,
	"new": function(data) {
		this.crossfilters[this.crossfilterIndex] = crossfilter(data);
		var oldIndex = this.crossfilterIndex;
		this.crossfilterIndex++;
		this.deferred().fulfill(oldIndex);
	},
	"dimension": function(index, accessor) {
		var promise = this.deferred();
		this.dimensions[this.dimensionIndex] = this.crossfilters[index].dimension(this.unpack(accessor));
		var oldIndex = this.dimensionIndex;
		this.dimensionIndex++;
		promise.fulfill(oldIndex);
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
		this.dimensionGroupAlls[index].reduceSum(this.unpack(accessor));
		this.deferred().fulfill();
	},
	"dimension.groupAll.reduceCount": function(index) {
		this.dimensionGroupAlls[index].reduceCount();
		this.deferred().fulfill();
	},
	"dimension.groupAll.reduce": function(index, add, remove,initial) {
		this.dimensionGroupAlls[index].reduce(this.unpack(add), this.unpack(remove), this.unpack(initial));
		this.deferred().fulfill();
	},
	"dimension.groupAll.dispose": function(index) {
		this.dimensionGroupAlls[index].dispose();
		this.deferred().fulfill();
	},
	"dimension.filterRange": function(index, range) {
		this.dimensions[index].filterRange(range);
		this.deferred().fulfill();
	},
	"dimension.filterExact": function(index, value) {
		this.dimensions[index].filterExact(value);
		this.deferred().fulfill();
	},
	"dimension.filterFunction": function(index, func) {
		this.dimensions[index].filterFunction(this.unpack(func));
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
	"dimension.top": function(index, value) {
		var top = this.dimensions[index].top(value);
		this.deferred().fulfill(top);
	},
	"dimension.bottom": function(index, value) {
		var bottom = this.dimensions[index].bottom(value);
		this.deferred().fulfill(bottom);
	},
	"dimension.group": function(index, accessor) {
		this.dimensionGroups[this.dimensionGroupIndex] = this.dimensions[index].group(this.unpack(accessor));
		var oldIndex = this.dimensionGroupIndex;
		this.dimensionGroupIndex++;
		this.deferred().fulfill(oldIndex);
	},
	"dimension.group.top": function(index, value) {
		var top = this.dimensionGroups[index].top(value);
		this.deferred().fulfill(top);
	},
	"dimension.group.all": function(index) {
		var all = this.dimensionGroups[index].all();
		this.deferred().fulfill(all);
	},
	"dimension.group.size": function(index) {
		var size = this.dimensionGroups[index].size();
		this.deferred().fulfill(size);	
	},
	"dimension.group.reduce": function(index, add, remove,initial) {
		this.dimensionGroups[index].reduce(this.unpack(add), this.unpack(remove), this.unpack(initial));
		this.deferred().fulfill();
	},
	"dimension.group.order": function(index, accessor) {
		this.dimensionGroups[index].order(this.unpack(accessor));
		this.deferred().fulfill();
	},
	"dimension.group.orderNatural": function(index) {
		this.dimensionGroups[index].orderNatural();
		this.deferred().fulfill();
	},
	"dimension.group.reduceSum": function(index, accessor) {
		this.dimensionGroups[index].reduceSum(this.unpack(accessor));
		this.deferred().fulfill();
	},
	"dimension.group.reduceCount": function(index) {
		this.dimensionGroups[index].reduceCount();
		this.deferred().fulfill();
	},
	"dimension.group.dispose": function(index) {
		this.dimensionGroups[index].dispose();
		this.deferred().fulfill();
	},
	"groupAll": function(index) {
		var promise = this.deferred();
		this.groupAlls[this.groupAllIndex] = this.crossfilters[index].groupAll();
		var oldIndex = this.groupAllIndex;
		this.groupAllIndex++;
		promise.fulfill(oldIndex);
	},
	"groupAll.value": function(index) {
		var value = this.groupAlls[index].value();
		this.deferred().fulfill(value);
	},
	"groupAll.reduceSum": function(index, accessor) {
		this.groupAlls[index].reduceSum(this.unpack(accessor));
		this.deferred().fulfill();
	},
	"groupAll.reduceCount": function(index) {
		this.groupAlls[index].reduceCount();
		this.deferred().fulfill();
	},
	"groupAll.reduce": function(index, add, remove,initial) {
		this.groupAlls[index].reduce(this.unpack(add), this.unpack(remove), this.unpack(initial));
		this.deferred().fulfill();
	},
	"groupAll.dispose": function(index) {
		this.groupAlls[index].dispose();
		this.deferred().fulfill();
	},
	"add": function(index, data) {
		this.crossfilters[index].add(data);
		this.deferred().fulfill();
	},
	"size": function(index) {
		var size = this.crossfilters[index].size();
		this.deferred().fulfill(size);
	},
	"all": function(index) {
		var all = this.crossfilters[index].all();
		this.deferred().fulfill(all);
	},
	"remove": function(index) {
		this.crossfilters[index].remove();
		this.deferred().fulfill();
	}
}, [cfUrl]);

var cfFacade = function(data) {
	var cfIndex = opfilter.new(data);
	return {
		dimension: function(accessor) {
			var dimIndex = cfIndex.then(function(idx) { return opfilter["dimension"](idx, accessor.toString()); });
			return {
				dispose: function() {
					return dimIndex.then(function(idx) { return opfilter["dimension.dispose"](idx); })
				},
				groupAll: function() {
					var dimGaIndex = dimIndex.then(function(idx) { return opfilter["dimension.groupAll"](idx); });
					return {
						value: function() {
							return dimGaIndex.then(function(idx) { return opfilter["dimension.groupAll.value"](idx); });
						},
						reduceSum: function(accessor) {
							opfilter["dimension.groupAll.reduceSum"](dimGaIndex, accessor.toString());
							return this;
						},
						reduceCount: function() {
							opfilter["dimension.groupAll.reduceCount"](dimGaIndex);
							return this;
						},
						reduce: function(add, remove, initial) {
							opfilter["dimension.groupAll.reduce"](dimGaIndex, add.toString(), remove.toString(), initial.toString());
							return this;
						},
						dispose: function() {
							return opfilter["dimension.groupAll.dispose"](dimGaIndex);
						}
					}
				},
				group: function(accessor) {
					var dimGroupIndex = dimIndex.then(function(idx) { return opfilter["dimension.group"](idx, accessor.toString()); });
					return {
						top: function(value) {
							return opfilter["dimension.group.top"](dimGroupIndex, value);
						},
						all: function() {
							return opfilter["dimension.group.all"](dimGroupIndex);
						},
						size: function() {
							return opfilter["dimension.group.size"](dimGroupIndex);
						},
						reduceSum: function(accessor) {
							opfilter["dimension.group.reduceSum"](dimGroupIndex, accessor.toString());
							return this;
						},
						reduceCount: function() {
							opfilter["dimension.group.reduceCount"](dimGroupIndex);
							return this;
						},
						reduce: function(add, remove, initial) {
							opfilter["dimension.group.reduce"](dimGroupIndex, add.toString(), remove.toString(), initial.toString());
							return this;
						},
						order: function(accessor) {
							opfilter["dimension.group.order"](dimGroupIndex, accessor.toString());
							return this;
						},
						orderNatural: function() {
							opfilter["dimension.group.orderNatural"](dimGroupIndex);
							return this;
						},
						dispose: function() {
							return opfilter["dimension.group.dispose"](dimGroupIndex);
						}
					};
				},
				filterRange: function(range) {
					return opfilter["dimension.filterRange"](dimIndex, range);
				},
				filterExact: function(value) {
					return opfilter["dimension.filterExact"](dimIndex, value);
				},
				filterFunction: function(func) {
					return opfilter["dimension.filterFunction"](dimIndex, func.toString());
				},
				filterAll: function() {
					return opfilter["dimension.filterAll"](dimIndex);
				},
				filter: function(value) {
					return opfilter["dimension.filter"](dimIndex, value);
				},
				top: function(value) {
					return opfilter["dimension.top"](dimIndex, value);
				},
				bottom: function(value) {
					return opfilter["dimension.bottom"](dimIndex, value);
				}
			}	
		},
		groupAll: function() {
			var gaIndex = cfIndex.then(function(idx) { return opfilter.groupAll(idx); });
			
			return {
				value: function() {
					return gaIndex.then(function(idx) { return opfilter["groupAll.value"](idx); });
				},
				reduceSum: function(accessor) {
					gaIndex.then(function(idx) { opfilter["groupAll.reduceSum"](idx, accessor.toString()); });
					return this;
				},
				reduceCount: function() {
					gaIndex.then(function(idx) { opfilter["groupAll.reduceCount"](idx); });
					return this;
				},
				reduce: function(add, remove, initial) {
					gaIndex.then(function(idx) { opfilter["groupAll.reduce"](idx, add.toString(), remove.toString(), initial.toString()) });;
					return this;
				},
				dispose: function() {
					return gaIndex.then(function(idx) { return opfilter["groupAll.dispose"](idx); });
				}
			}
		},
		remove: function() {
			cfIndex.then(function(idx) { return opfilter.remove(idx); });
			return this;
		},
		add: function(data) {
			cfIndex.then(function(idx) { return opfilter.add(idx, data); });
			return this;
		},
		size: function() {
			return cfIndex.then(function(idx) { return opfilter.size(cfIndex); });
		},
		all: function() {
			return cfIndex.then(function(idx) { return opfilter.all(cfIndex); });
		}
	};
}

// var testing = operative({
// 	test: function() {
// 		this.deferred().fulfill("TESTING TESTING - THIS IS A RESULT");
// 	}
// })
// alert("TESTING TESTING 123");
// testing.test().then(function(d) { alert(d); })

module.exports = cfFacade;