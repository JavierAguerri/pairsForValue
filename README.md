# getPairsForValue

<p>The getPairsForValue () function receives a list of integers and a value A and determines if there is any pair of numbers in the list whose sum is A. It then returns the list of all the pairs that meet that condition.</p>
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
<p>This mismatch between the specification and the actual behaviour of the function happens because the algorithm does iterate over the same element in both the outer and the inner loop. This has two effects:</p>
<ul>
<li>For each pair, it considers both (a,b) and (b,a)</li>
<li>It considers each element with itself</li>
</ul>
<p>So there are several types of inputs that can lead to unexpected or ambiguous results:</p>
<ul>
<li>Any pair which meets the condition will be output twice but in reversed order: (a,b) and (b,a)</li>
<li>Any element in the list which, once added to itself matches the value A will produce and output (a,a)</li>
</ul>
<p>See and execute the tests provided for a demo on the behaviour of the original function.</p>

## 2. Way complex!
<p><i>The current implementation is not efficient. Indicate the order of complexity of the same.</i></p>

### Answer

##### Time complexity
<p>The order of time complexity of the original implementation is <b>O(n²)</b>, because it has a loop which iterates over each element of the provided array, and for each of the elements in that outer loop, it iterates again over all elements in the array. So for n elements in the outer loop it iterates n times again in the inner loop thus having quadratic complexity.</p>

##### Space complexity
<p>The space complexity of the algorithm is <b>constant</b> because it always takes 2 variables - those needed to store the values of indices i and j during the iterations.</p>

## 3. Time to optimize
<p>Implement a more efficient version that, if possible, does not have the problems we identified in exercise 1. Indicate the order of complexity of the new version.</p>

### Answer
<p>Let's consider two approaches. The first one uses a hashmap to account for the frequency of each integer and then iterate over the array to find a pairing integer in the hashmap. The second involves to sort the list of integers first and later use a two-pointer approach to identify the matching pairs. </p>

<p>The hashmap implementation has linear time complexity compared to O(nlog n) of the sort+sweep approach. However, sort+sweep can achieve space complexity as good as O(1), whereas the hashmap has linear space complexity, so sort+sweep could be the preferred implementation in case we face memory constrains.<p>

<p>One comment before discussing the sort+sweep option. In order to sort the array we could just use the built-in sort method in the Array type in JavaScript, as built-in. However, in this exercise I will showcase the knowledge about how to choose and implement a sorting algorithm based on the context.</p>

<p>The golden rule when dealing with sorting algorithms is to gather as much information as possible about the data to be sorted and the environment where the algorithm will run because there is no one-size-fits-all solution in this context. Some considerations:<p>
<ul>
    <li>The data are plain integers. We don't know if we are sorting small or large data sets.</li>
    <li>In order to achieve constant space complexity in sort+sweep the sorting algorith has to be in-place. This rules out merge-based algorithms.</li>
    <li>Sorting stability is not required.</li>
    <li>Input is not guaranteed to be at least partially sorted.</li>
    <li>Only one thread is being executed, so we are not analyzing here the prospects of improved performance with parallel sorting.</li>
</ul>

<p>The sorting choice for this implementation of sort+sweep is <b>heapsort</b> because it gives us constant space complexity and it has a good space complexity for best, average and worst case. It is a well balanced algorithm for a wide range of scenarios which is suitable in this case as we have not much information about the input data.</p>

<p>The two-pointer approach to extract the matching pairs from the sorted array has linear time complexity and constant space complexity, so the net performance for the sort+sweep approach is still O(nlog n) time complexity and O(1) space complexity. As mentioned before, the approach to follow in a real scenario will depend on specific constrains. Also further optimizations can be made to the analyzed implementations if more information is provided about the input data.</p>


## Execute the tests
<ul>
<li>Install latest nvm</li>
<li>Use nvm to install node 20.17 and npm 10.8.2</li>
<li>In the terminal, execute <code>npm install</code></li>
<li>In order to run the tests, you can choose which algorith version you want to test:<br>
<code>npm run test:original</code><br>
<code>npm run test:sort</code><br>
<code>npm run test:hashmap</code><br>
</li>
</ul>