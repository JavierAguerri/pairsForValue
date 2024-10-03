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
<p>Let's use a hashmap to track the frequency of each integer. Then we can iterate over the array to find matching pairs in the hashmap. This implementation achieves linear time complexity and also linear space complexity. See the implementation and some comments in the code. Other alternatives could involve sorting the array and iterating over it to find pairs more efficiently, but they wouldn't achieve linear time complexity.<p>
<p>

<p>The code includes some tests to assess the well functioning of the implemented solution. In order to execute them, follow these instructions:</p>
<ul>
<li>Install latest nvm</li>
<li>Use nvm to install node 20.17 and npm 10.8.2</li>
<li>In the terminal, run <code>npm install</code></li>
<li>To run the tests, you can choose which version of the algorithm you want to test:<br>
<code>npm run test:original</code><br>
<code>npm run test:hashmap</code><br>
</li>
</ul>