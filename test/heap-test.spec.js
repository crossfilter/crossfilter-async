describe("heap", function() {
  var heap;
  beforeEach(function() {
    heap = promisefilter.heap;
  });
  
  it("children are greater than or equal to parents", function() {
    var array = [6, 5, 3, 1, 8, 7, 2, 4],
        n = array.length;
    expect(heap(array, 0, n)).toEqual(array);
    expect(array[0]).toEqual(1);
    for (var i = 1; i < n; ++i) expect(array[i]).toBeGreaterThan(array[i - 1 >> 1]);
  });
  it("creates a heap from a subset of the array", function() {
    var array = [6, 5, 3, 1, 8, 7, 2, 4],
        n = 6;
    expect(heap(array, 0, n)).toEqual(array);
    expect(array[0]).toEqual(1);
    for (var i = 1; i < n; ++i) expect(array[i]).toBeGreaterThan(array[i - 1 >> 1]);
  });

  describe("sort", function() {
    it("sorts an existing heap in descending order", function() {
      var array = [1, 4, 2, 5, 8, 7, 3, 6],
          n = array.length;
      heap.sort(array, 0, n);
      expect(array).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
    });
    it("sorts a two-element heap in descending order", function() {
      var array = [1, 4],
          n = array.length;
      heap.sort(array, 0, n);
      expect(array).toEqual([4, 1]);
    });
  });
});
