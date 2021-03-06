(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === 0){
      return [];
    }
    return n === undefined ? array[array.length - 1] : array.slice(-n)
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection) === true){
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i], i , collection);
      }
    } else {
      for(var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // -----w/o _.reduce------
    // var newArray = [];
    // _.each(collection, function(valu){
    //   if( test(valu) ){
    //     newArray.push(valu);
    //   }
    // })
    // return newArray;
    return _.reduce(collection, function(memo, valu){
      if(test(valu)){
        memo.push(valu);
      };
      return memo
    },[])
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var newArray = [];
    _.filter(collection, function(valu){
      if( !test(valu) ){
        newArray.push(valu)
      }
    })
    return newArray;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArray = []
    _.each(array, function(valu){
      if( _.indexOf(newArray, valu) === -1)
        newArray.push(valu);
    })
    return newArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    //-----w/o _.reduce----
    // var newArray = [];
    // _.each(collection, function(valu, key, collec){
    //   newArray.push( iterator(valu, key, collec) );
    // })
    // return newArray;
    return _.reduce(collection, function(memo, valu){
      memo.push( iterator(valu) );
      return memo;
    },[])
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    var firstAnalysis = true

    _.each(collection, function(valu){
      if(firstAnalysis && accumulator === undefined){
        accumulator = valu;
        firstAnalysis = false;
      } else {
        accumulator = iterator(accumulator, valu);
      }
    })
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if(iterator === undefined){
      // var iterator = _.identity();
      var iterator = function(memo){
        return _.identity(memo);
      };
    };
    return _.reduce ( collection, function(isTrue, valu){
        return isTrue && !!iterator(valu);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(iterator === undefined){
      var iterator = function(memo){
        return _.identity(memo);
      };
    };
    return !_.every(collection, function(valu){
      return !iterator(valu);
    })
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for(var i = 1; i < arguments.length; i++){
      for(var key in arguments[i]){
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i = 1; i < arguments.length; i++){
      for(var key in arguments[i]){
        if( obj[key] === undefined ){
          obj[key] = arguments[i][key]
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var alreadyDone = {};
    return function(){
      // var vari = Array.prototype.slice.call(arguments);
      var vari = JSON.stringify(arguments)
      if(alreadyDone[vari] === undefined){
        alreadyDone[vari] = func.apply(null, arguments);
      }
      return alreadyDone[vari];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // var args = []

    // for(var i = 2; i < arguments.length; i++){
    //   args.push(arguments[i])
    // }

    var args = Array.prototype.slice.call(arguments, 2)

    return setTimeout( function(){
      func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newArr = Array.prototype.slice.call(arguments[0]);

    for(var i = 0; i < newArr.length - 1; i++){
      var orig = newArr[i]
      var k = Math.ceil(Math.random() * newArr.length -1)

      newArr[i] = newArr[k]
      newArr[k] = orig
    }

    return newArr
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(valu){
        var method;
        if(typeof functionOrKey === 'string'){
          method = valu[functionOrKey];
        } else {
          method = functionOrKey
        }
        return method.apply(valu, args)
    })
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if(typeof iterator === 'string'){
      return collection.sort (function (a, b){
        return a[iterator] - b[iterator];
      });
    } else {
      return collection.sort(function (a,b){
        return iterator(a) - iterator(b);
      });
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  var copy = Array.prototype.slice.call(arguments);
  var order = copy.sort(function(a, b){
    return b.length - a.length
  })

  var tempArr = []
  for(var i = 0; i < order.length; i++){
    for(var j = 0; j < order[0].length; j++){
      if(Array.isArray(tempArr[j]) === false){
        tempArr.push([ order[i][j] ])
      } else {
        tempArr[j].push( (order[i][j]) )
      }
    }
  }
  return tempArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var result = [];

    return _.reduce(nestedArray, function(result, valu){
      if(Array.isArray(valu)){
        return result.concat(_.flatten(valu))
      }
      return result.concat(valu);
    }, result)
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var argumentsArray = Array.prototype.slice.call(arguments);
    var result = [];

    // iterating through elements of first array/argument
    for (var i = 0; i < argumentsArray[0].length; i++) {
      // iterating through all the other arrays/arguments

      for (var j = 1; j < argumentsArray.length; j++) {
        var isMatched = false;

        // iterating through elements of the other arrays/arguments
        for (var k = 0; k < argumentsArray[j].length; k++) {
          // value = elements in first array/argument
          // check = elements in the other array/arguments
          var value = argumentsArray[0][i];
          var check = argumentsArray[j][k];

          if (value === check) {
            isMatched = true;
          }
        }

        if (isMatched){
          result.push(value);
        }
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    //turn arguments into a true array
    var argumentsArray = Array.prototype.slice.call(arguments);
    //add all matching values into a single array (argumentsArray[0])
    var matched = _.intersection(argumentsArray[0], ...argumentsArray);

    //iterate thru our matched to remove all duplicated values
    return _.reduce(matched, function(result, valu){
      //checks result array for non-matching values
      if(_.indexOf(result, valu) === -1) {
        result.push(valu);
        return result;
      }
      //checks result array for matching values
      //removes matching value from result array
      else {
        var index = _.indexOf(result, valu);
        result.splice(index, 1);
        return result;
      }
    }, []);
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    //var timer and queued
    //function
      //when run first time: run immediatly, set wait time
      //when called a 2nd time within the wait time: queued function
      //when 1st is done: immediatly run queued function and reset wait time
    //

    //call intital function
    //isScheduled ==> boolean ==> default false
    //if (isScheduled) {
      //ignore subsequent calls
    //}
    //isQueued  ==> scheduled function (2nd call)
    //invoke function, schedule wait time (100ms)
      // if there is another invocation,
      //change boolean (F => T), calculate delay time
      //invoke after delay time

    //reset flags after 100ms (wait time)
    //calculate time left for 2nd call to invoke












    //100
  //   1st call (100ms) ==> immediate
  //   2nd call (@30ms) ==> invoked immediately after the remaining time (still need to wait 70ms, so schedule for 70ms),
  // ignore 3rd call b/c isScheduled flags are true
  //   all subsequent calls will simply return the value from 1st call
  // 100ms  2nd call returns?
  // 50ms   3rd call



  };
}());
