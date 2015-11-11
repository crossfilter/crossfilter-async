/* global promisefilter */
describe("bisect", function() {
  var bisect;
  beforeEach(function() {
    bisect = promisefilter.bisect;
  });
  
  it("is the same as bisect.right", function() {
    expect(bisect).toEqual(bisect.right);
  });
});

describe("bisect.left", function() {
    var bisect;
    beforeEach(function() {
      bisect = promisefilter.bisect.left;
    });
    
    it("finds the index of an exact match", function() {
      var array = [1, 2, 3];
      expect(bisect(array, 1, 0, 3)).toEqual(0);
      expect(bisect(array, 2, 0, 3)).toEqual(1);
      expect(bisect(array, 3, 0, 3)).toEqual(2);
    })
    
    it("finds the index of the first match", function() {
      var array = [1, 2, 2, 3];
      expect(bisect(array, 1, 0, 4)).toEqual(0);
      expect(bisect(array, 2, 0, 4)).toEqual(1);
      expect(bisect(array, 3, 0, 4)).toEqual(3);
    });
    
    it("finds the insertion point of a non-exact match", function() {
      var array = [1, 2, 3];
      expect(bisect(array, 0.5, 0, 3)).toEqual(0);
      expect(bisect(array, 1.5, 0, 3)).toEqual(1);
      expect(bisect(array, 2.5, 0, 3)).toEqual(2);
      expect(bisect(array, 3.5, 0, 3)).toEqual(3);
    });
    
    it("observes the lower bound", function() {
      var array = [1, 2, 3, 4, 5];
      expect(bisect(array, 0, 2, 5)).toEqual(2);
      expect(bisect(array, 1, 2, 5)).toEqual(2);
      expect(bisect(array, 2, 2, 5)).toEqual(2);
      expect(bisect(array, 3, 2, 5)).toEqual(2);
      expect(bisect(array, 4, 2, 5)).toEqual(3);
      expect(bisect(array, 5, 2, 5)).toEqual(4);
      expect(bisect(array, 6, 2, 5)).toEqual(5);
    });
    
    it("observes the lower and upper bounds", function() {
      var array = [1, 2, 3, 4, 5];
      expect(bisect(array, 0, 2, 3)).toEqual(2);
      expect(bisect(array, 1, 2, 3)).toEqual(2);
      expect(bisect(array, 2, 2, 3)).toEqual(2);
      expect(bisect(array, 3, 2, 3)).toEqual(2);
      expect(bisect(array, 4, 2, 3)).toEqual(3);
      expect(bisect(array, 5, 2, 3)).toEqual(3);
      expect(bisect(array, 6, 2, 3)).toEqual(3);
    });
    
    it("large arrays", function() {
      var array = [],
          i = 1 << 30;
      array[i++] = 1;
      array[i++] = 2;
      array[i++] = 3;
      array[i++] = 4;
      array[i++] = 5;
      expect(bisect(array, 0, i - 5, i)).toEqual(i - 5);
      expect(bisect(array, 1, i - 5, i)).toEqual(i - 5);
      expect(bisect(array, 2, i - 5, i)).toEqual(i - 4);
      expect(bisect(array, 3, i - 5, i)).toEqual(i - 3);
      expect(bisect(array, 4, i - 5, i)).toEqual(i - 2);
      expect(bisect(array, 5, i - 5, i)).toEqual(i - 1);
      expect(bisect(array, 6, i - 5, i)).toEqual(i - 0);
    });
});

describe("bisect.by(value).left", function() {
    var bisect;
    beforeEach(function() {
      bisect = promisefilter.bisect.by(function(d) { return d.value; }).left;
    });
    
    it("finds the index of an exact match", function() {
      var array = [{value: 1}, {value: 2}, {value: 3}];
      expect(bisect(array, 1, 0, 3)).toEqual(0);
      expect(bisect(array, 2, 0, 3)).toEqual(1);
      expect(bisect(array, 3, 0, 3)).toEqual(2);
    });
    it("finds the index of the first match", function() {
      var array = [{value: 1}, {value: 2}, {value: 2}, {value: 3}];
      expect(bisect(array, 1, 0, 4)).toEqual(0);
      expect(bisect(array, 2, 0, 4)).toEqual(1);
      expect(bisect(array, 3, 0, 4)).toEqual(3);
    });
    it("finds the insertion point of a non-exact match", function() {
      var array = [{value: 1}, {value: 2}, {value: 3}];
      expect(bisect(array, 0.5, 0, 3)).toEqual(0);
      expect(bisect(array, 1.5, 0, 3)).toEqual(1);
      expect(bisect(array, 2.5, 0, 3)).toEqual(2);
      expect(bisect(array, 3.5, 0, 3)).toEqual(3);
    });
    it("observes the lower bound", function() {
      var array = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];
      expect(bisect(array, 0, 2, 5)).toEqual(2);
      expect(bisect(array, 1, 2, 5)).toEqual(2);
      expect(bisect(array, 2, 2, 5)).toEqual(2);
      expect(bisect(array, 3, 2, 5)).toEqual(2);
      expect(bisect(array, 4, 2, 5)).toEqual(3);
      expect(bisect(array, 5, 2, 5)).toEqual(4);
      expect(bisect(array, 6, 2, 5)).toEqual(5);
    });
    it("observes the lower and upper bounds", function() {
      var array = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];
      expect(bisect(array, 0, 2, 3)).toEqual(2);
      expect(bisect(array, 1, 2, 3)).toEqual(2);
      expect(bisect(array, 2, 2, 3)).toEqual(2);
      expect(bisect(array, 3, 2, 3)).toEqual(2);
      expect(bisect(array, 4, 2, 3)).toEqual(3);
      expect(bisect(array, 5, 2, 3)).toEqual(3);
      expect(bisect(array, 6, 2, 3)).toEqual(3);
    });
    it("large arrays", function() {
      var array = [],
          i = 1 << 30;
      array[i++] = {value: 1};
      array[i++] = {value: 2};
      array[i++] = {value: 3};
      array[i++] = {value: 4};
      array[i++] = {value: 5};
      expect(bisect(array, 0, i - 5, i)).toEqual(i - 5);
      expect(bisect(array, 1, i - 5, i)).toEqual(i - 5);
      expect(bisect(array, 2, i - 5, i)).toEqual(i - 4);
      expect(bisect(array, 3, i - 5, i)).toEqual(i - 3);
      expect(bisect(array, 4, i - 5, i)).toEqual(i - 2);
      expect(bisect(array, 5, i - 5, i)).toEqual(i - 1);
      expect(bisect(array, 6, i - 5, i)).toEqual(i - 0);
    });
});

describe("bisect.right", function() {
    var bisect;
    beforeEach(function() {
      bisect = promisefilter.bisect.right;
    });
    it("finds the index after an exact match", function() {
      var array = [1, 2, 3];
      expect(bisect(array, 1, 0, 3)).toEqual(1);
      expect(bisect(array, 2, 0, 3)).toEqual(2);
      expect(bisect(array, 3, 0, 3)).toEqual(3);
    });
    it("finds the index after the last match", function() {
      var array = [1, 2, 2, 3];
      expect(bisect(array, 1, 0, 4)).toEqual(1);
      expect(bisect(array, 2, 0, 4)).toEqual(3);
      expect(bisect(array, 3, 0, 4)).toEqual(4);
    });
    it("finds the insertion point of a non-exact match", function() {
      var array = [1, 2, 3];
      expect(bisect(array, 0.5, 0, 3)).toEqual(0);
      expect(bisect(array, 1.5, 0, 3)).toEqual(1);
      expect(bisect(array, 2.5, 0, 3)).toEqual(2);
      expect(bisect(array, 3.5, 0, 3)).toEqual(3);
    });
    it("observes the lower bound", function() {
      var array = [1, 2, 3, 4, 5];
      expect(bisect(array, 0, 2, 5)).toEqual(2);
      expect(bisect(array, 1, 2, 5)).toEqual(2);
      expect(bisect(array, 2, 2, 5)).toEqual(2);
      expect(bisect(array, 3, 2, 5)).toEqual(3);
      expect(bisect(array, 4, 2, 5)).toEqual(4);
      expect(bisect(array, 5, 2, 5)).toEqual(5);
      expect(bisect(array, 6, 2, 5)).toEqual(5);
    });
    it("observes the lower and upper bounds", function() {
      var array = [1, 2, 3, 4, 5];
      expect(bisect(array, 0, 2, 3)).toEqual(2);
      expect(bisect(array, 1, 2, 3)).toEqual(2);
      expect(bisect(array, 2, 2, 3)).toEqual(2);
      expect(bisect(array, 3, 2, 3)).toEqual(3);
      expect(bisect(array, 4, 2, 3)).toEqual(3);
      expect(bisect(array, 5, 2, 3)).toEqual(3);
      expect(bisect(array, 6, 2, 3)).toEqual(3);
    });
    it("large arrays", function() {
      var array = [],
          i = 1 << 30;
      array[i++] = 1;
      array[i++] = 2;
      array[i++] = 3;
      array[i++] = 4;
      array[i++] = 5;
      expect(bisect(array, 0, i - 5, i)).toEqual(i - 5);
      expect(bisect(array, 1, i - 5, i)).toEqual(i - 4);
      expect(bisect(array, 2, i - 5, i)).toEqual(i - 3);
      expect(bisect(array, 3, i - 5, i)).toEqual(i - 2);
      expect(bisect(array, 4, i - 5, i)).toEqual(i - 1);
      expect(bisect(array, 5, i - 5, i)).toEqual(i - 0);
      expect(bisect(array, 6, i - 5, i)).toEqual(i - 0);
    });
});

describe("bisect.by(value).right", function() {
    var bisect;
    beforeEach(function() {
      bisect = promisefilter.bisect.by(function(d) { return d.value; }).right;
    });
    it("finds the index after an exact match", function() {
      var array = [{value: 1}, {value: 2}, {value: 3}];
      expect(bisect(array, 1, 0, 3)).toEqual(1);
      expect(bisect(array, 2, 0, 3)).toEqual(2);
      expect(bisect(array, 3, 0, 3)).toEqual(3);
    });
    it("finds the index after the last match", function() {
      var array = [{value: 1}, {value: 2}, {value: 2}, {value: 3}];
      expect(bisect(array, 1, 0, 4)).toEqual(1);
      expect(bisect(array, 2, 0, 4)).toEqual(3);
      expect(bisect(array, 3, 0, 4)).toEqual(4);
    });
    it("finds the insertion point of a non-exact match", function() {
      var array = [{value: 1}, {value: 2}, {value: 3}];
      expect(bisect(array, 0.5, 0, 3)).toEqual(0);
      expect(bisect(array, 1.5, 0, 3)).toEqual(1);
      expect(bisect(array, 2.5, 0, 3)).toEqual(2);
      expect(bisect(array, 3.5, 0, 3)).toEqual(3);
    });
    it("observes the lower bound", function() {
      var array = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];
      expect(bisect(array, 0, 2, 5)).toEqual(2);
      expect(bisect(array, 1, 2, 5)).toEqual(2);
      expect(bisect(array, 2, 2, 5)).toEqual(2);
      expect(bisect(array, 3, 2, 5)).toEqual(3);
      expect(bisect(array, 4, 2, 5)).toEqual(4);
      expect(bisect(array, 5, 2, 5)).toEqual(5);
      expect(bisect(array, 6, 2, 5)).toEqual(5);
    });
    it("observes the lower and upper bounds", function() {
      var array = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];
      expect(bisect(array, 0, 2, 3)).toEqual(2);
      expect(bisect(array, 1, 2, 3)).toEqual(2);
      expect(bisect(array, 2, 2, 3)).toEqual(2);
      expect(bisect(array, 3, 2, 3)).toEqual(3);
      expect(bisect(array, 4, 2, 3)).toEqual(3);
      expect(bisect(array, 5, 2, 3)).toEqual(3);
      expect(bisect(array, 6, 2, 3)).toEqual(3);
    });
    it("large arrays", function() {
      var array = [],
          i = 1 << 30;
      array[i++] = {value: 1};
      array[i++] = {value: 2};
      array[i++] = {value: 3};
      array[i++] = {value: 4};
      array[i++] = {value: 5};
      expect(bisect(array, 0, i - 5, i)).toEqual(i - 5);
      expect(bisect(array, 1, i - 5, i)).toEqual(i - 4);
      expect(bisect(array, 2, i - 5, i)).toEqual(i - 3);
      expect(bisect(array, 3, i - 5, i)).toEqual(i - 2);
      expect(bisect(array, 4, i - 5, i)).toEqual(i - 1);
      expect(bisect(array, 5, i - 5, i)).toEqual(i - 0);
      expect(bisect(array, 6, i - 5, i)).toEqual(i - 0);
    });
});