function getPairsForValueOptimizedWithHashMap(alist, avalue) {
  let ret = []; // resulting pairs
  let countMap = new Map(); // will hold the count of occurrences of each number in the list

  /* 
  The algorithm iterates over the list of numbers. For each number, it looks for the complement (target - number) in the countMap.
  If the complement is not there, the number is a candidate for forming a pair in next iterations, so its count in the map is increased, 
  because multiple occurrences of the number can make up several pairs.
  If the complement is in the countMap, a new pair is pushed into the result, and its count is decreased, 
  because the number has been already used in a pair and we want to avoid duplicates and reversed pairs.

  The algorithm has a linear time complexity and a linear space complexity also.
  */

  for (let num of alist) {
    let complement = avalue - num;
    if (countMap.has(complement)) {
      let count = countMap.get(complement);
      for (let i = 0; i < count; i++) {
        // Ensure the smaller number comes first for consistency
        if (num < complement) {
          ret.push([num, complement]);
        } else {
          ret.push([complement, num]);
        }
      }
    }
    // Increment the count for the current number
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  return ret;
}
  
module.exports = getPairsForValueOptimizedWithHashMap;