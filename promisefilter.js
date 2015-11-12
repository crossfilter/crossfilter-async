(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.promisefilter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var operative = (typeof window !== "undefined" ? window['operative'] : typeof global !== "undefined" ? global['operative'] : null);

var opfilter = operative({
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
	"dimension.groupAll.reduceCount": function(index) {
		this.dimensionGroupAlls[index].reduceCount();
		this.deferred().fulfill();
	},
	"dimension.groupAll.reduce": function(index, add, remove,initial) {
		this.dimensionGroupAlls[index].reduce(add, remove, initial);
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
		this.dimensions[index].filterFunction(func);
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
		this.dimensionGroups[this.dimensionGroupIndex] = this.dimensions[index].group(accessor);
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
		this.dimensionGroups[index].reduce(add, remove, initial);
		this.deferred().fulfill();
	},
	"dimension.group.order": function(index, accessor) {
		this.dimensionGroups[index].order(accessor);
		this.deferred().fulfill();
	},
	"dimension.group.orderNatural": function(index) {
		this.dimensionGroups[index].orderNatural();
		this.deferred().fulfill();
	},
	"dimension.group.reduceSum": function(index, accessor) {
		this.dimensionGroups[index].reduceSum(accessor);
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
		this.groupAlls[this.groupAllIndex] = this.crossfilters[index].groupAll();
		var oldIndex = this.groupAllIndex;
		this.groupAllIndex++;
		this.deferred().fulfill(oldIndex);
	},
	"groupAll.value": function(index) {
		var value = this.groupAlls[index].value();
		this.deferred().fulfill(value);
	},
	"groupAll.reduceSum": function(index, accessor) {
		this.groupAlls[index].reduceSum(accessor);
		this.deferred().fulfill();
	},
	"groupAll.reduceCount": function(index) {
		this.groupAlls[index].reduceCount();
		this.deferred().fulfill();
	},
	"groupAll.reduce": function(index, add, remove,initial) {
		this.groupAlls[index].reduce(add, remove, initial);
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
						reduceCount: function() {
							opfilter["dimension.groupAll.reduceCount"](dimGaIndex);
							return this;
						},
						reduce: function(add, remove, initial) {
							opfilter["dimension.groupAll.reduce"](dimGaIndex, add, remove, initial);
							return this;
						},
						dispose: function() {
							return opfilter["dimension.groupAll.dispose"](dimGaIndex);
						}
					}
				},
				group: function(accessor) {
					var dimGroupIndex = opfilter["dimension.group"](dimIndex, accessor);
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
							opfilter["dimension.group.reduceSum"](dimGroupIndex, accessor);
							return this;
						},
						reduceCount: function() {
							opfilter["dimension.group.reduceCount"](dimGroupIndex);
							return this;
						},
						reduce: function(add, remove, initial) {
							opfilter["dimension.group.reduce"](dimGroupIndex, add, remove, initial);
							return this;
						},
						order: function(accessor) {
							opfilter["dimension.group.order"](dimGroupIndex, accessor);
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
					return opfilter["dimension.filterFunction"](dimIndex, func);
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
			var gaIndex = opfilter.groupAll(cfIndex);
			
			return {
				value: function() {
					return opfilter["groupAll.value"](gaIndex);
				},
				reduceSum: function(accessor) {
					opfilter["groupAll.reduceSum"](gaIndex, accessor);
					return this;
				},
				reduceCount: function() {
					opfilter["groupAll.reduceCount"](gaIndex);
					return this;
				},
				reduce: function(add, remove, initial) {
					opfilter["groupAll.reduce"](gaIndex, add, remove, initial);
					return this;
				},
				dispose: function() {
					return opfilter["groupAll.dispose"](gaIndex);
				}
			}
		},
		remove: function() {
			
		},
		add: function(data) {
			opfilter.add(cfIndex, data)
			return this;
		},
		size: function() {
			return opfilter.size(cfIndex);
		},
		all: function() {
			return opfilter.all(cfIndex);
		}
	};
}

module.exports = cfFacade;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});