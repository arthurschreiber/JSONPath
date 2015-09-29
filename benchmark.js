var Benchmark = require('benchmark');

var JSONPath = require('.');

var obj = {
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
};

var paths = [
  '$.store.book[*].author',
  '$..author',
  '$.store.*',
  '$.store..price',
  '$..book[2]',
  '$..book[(@.length-1)]',
];

var memStart, memMax = memStart = process.memoryUsage().rss;

var bm = new Benchmark("JSONPath", {
  fn: function() {
    for (var j = 0; j < paths.length; j++) {
      JSONPath.eval(obj, paths[j]);
    }

    memMax = Math.max(memMax, process.memoryUsage().rss);
  }
});

bm.on("complete", function(event) {
  console.log(String(event.target))
  console.log("Memory:", (memMax - memStart)/1024/1024, "MiB")
});

bm.run({ "async": true });
