# getPairsForValue

<p>The getPairsForValue() function receives a list of integers and a value A and determines if there is any pair of numbers in the list whose sum is A. It then returns the list of all the pairs that meet that condition.</p>
<p>For example, given the list [1, 3, 5, 2, 4, 2] and the value 4, the function returns the list of pairs [(1, 3), (2, 2)].</p>
<p>In the case where there is no way to perform the sum, an empty list is returned.</p>
<p>The current implementation of the function is as follows:</p>

```javascript
    function getPairsForValue(alist, avalue) {
        let ret = [];
        for (let i = 0; i < alist.length; i++) {
            for (let j = 0; j < alist.length; j++) {
                if (alist[i] + alist[j] === avalue) {
                    ret.push([alist[i], alist[j]]);
                }
            }
        }
        return ret;
    }
```

## 1. Quirky values
<p><i>Identify which would be <b>valid</b> values of 'alist' and 'avalue' that cause the function not to behave according to its specification (or are ambiguous with respect to the specification of the function that appears in the statement).</i></p>

### Answer
<p>The mismatch between the specification and the actual behaviour of the function occurs because the algorithm iterates over all elements in both the outer and inner loops. This causes two issues:</p>
<ul>
<li>It duplicates pairs in reverse order, so for each pair it considers both (a,b) and (b,a). The specification is unclear about wether duplicates should be part of the output.</li>
<li>It considers each element with itself, so it includes pairs like (a, a). It does not seem very reasonable to output these results as those are not really existing pairs in the list.</li>
</ul>

## 2. Complexity issues
<p><i>The current implementation is not efficient. Indicate the order of complexity of the same.</i></p>

### Answer

##### Time complexity
<p>The time complexity of the original implementation is <b>O(n²)</b> because the function uses two nested loops. Therefore, for n elements in the outer loop, the inner loop iterates n times, leading to quadratic complexity.</p>

##### Space complexity
<p>The space complexity of the algorithm is <b>constant</b> because it uses only few variables and does not depend on the number of elements in the input array - those needed to store the values of indices i and j during iteration.</p>

## 3. Optimizing the function
<p><i>Implement a more efficient version that, if possible, does not have the problems we identified in exercise 1. Indicate the order of complexity of the new version.</i></p>

### Answer
<p>Let's consider two approaches. The first uses a hashmap to keep track of the frequency of each number and then iterates over the array to find a matching integer in the hashmap. The second approach involves sorting the list first and then using a two-pointer technique to find the matching pairs.</p>

<p><b>The hashmap implementation has a linear time complexity O(n)</b> compared to O(nlog n) of the sort+twoPointer approach. However, sort+twoPointer can achieve space complexity as good as O(1), while <b>the hashmap has linear space complexity</b>, so sort+twoPointer could be the preferred implementation in case we face memory constraints. Note that the output is not being considered in terms of space complexity as it is the same for both approaches, but it could be as high as O(n²) in worst case.<p> 

<p>Before discussing the sort+twoPointer option, it is worth mention that we could just sort the array with the built-in <code>Array.prototype.sort()</code> method. However, in this exercise, I want to demonstrate how to choose and implement a sorting algorithm based on the specific context and requirements.</p>

<p>The golden rule when dealing with sorting algorithms is to gather as much information as possible about the data to be sorted and the environment where the algorithm will run because there is no one-size-fits-all solution in this context. Some considerations:<p>
<ul>
    <li>The data are simple integers.</li>
    <li>We don't know if we are sorting small or large data sets.</li>
    <li>For the two-pointer approach to have O(1) space complexity, the sorting algorithm needs to be in-place. This rules out merge-based sorts.</li>
    <li>Sorting stability is not required here.</li>
    <li>We don’t know if the input will be partially sorted.</li>
    <li>We’re assuming single-thread execution, so parallel sorting isn’t considered.</li>
</ul>

<p>Heapsort is a good fit here because it provides in-place sorting with O(n log n) time complexity in the best, average, and worst cases. It’s a balanced choice given the lack of detailed information about the input.</p>

<p>The two-pointer approach to extract the matching pairs from the sorted array has linear time complexity and constant space complexity, so <b>the net performance for the sort+twoPointer approach is still O(nlog n) time complexity and O(1) space complexity</b>. As mentioned before, the approach to follow in a real scenario will depend on specific constrains. Also further optimizations can be made to the showcased implementations if more information is provided about the input data.</p>

<p>The code includes some tests to assess the well functioning of the implemented solution. In order to run them, follow these instructions:</p>
<ul>
<li>Download project</li>
<li>Install latest nvm</li>
<li>Use nvm to install node 20.17 and npm 10.8.2</li>
<li>Navigate to the project folder</li>
<li>In the terminal, run <code>npm install</code></li>
<li>To run the tests, you can choose which version of the algorithm and data set you want to test:<br>
<code>npm run test:original # standard data set</code><br>
<code>npm run test:sort # standard data set</code><br>
<code>npm run test:hashmap # standard data set</code><br>

<code>npm run test:sort:fewpairs # large data set with few pairs expected</code><br>
<code>npm run test:hashmap:fewpairs # large data set with few pairs expected</code><br>
<code>npm run test:sort:manypairs # large data set with many pairs expected</code><br>
<code>npm run test:hashmap:manypairs # large data set with many pairs expected</code><br>
You might not want to run these:<br>
<code>npm run test:original:fewpairs # large data set with few pairs expected</code><br>
<code>npm run test:original:manypairs # large data set with many pairs expected</code><br>
</li>
</ul>
<p>Compare the execution times between sort and hashmap approaches for large data sets using the auxiliary files <code>tmp/execution_algorithm_dataset.tmp</code>, where times are logged after each execution. It would be interesting to monitor memory usage for
each approach, but it is out of the scope of this exercise.</p>
