const heapSort = require('./resources/heapSort');

function getPairsForValueWithSorting(alist, avalue) {
    heapSort(alist);
    // alist.sort((a, b) => a - b);
    let ret = []; // Resulting pairs
    let l = 0; // Left pointer
    let r = alist.length - 1; // Right pointer

    while (l < r) {
        let sum = alist[l] + alist[r];

        if (sum === avalue) {
            if (alist[l] === alist[r]) {
                // All remaining elements between l and r are the same
                let count = r - l + 1;
                // Number of unique pairs is C(n, 2) = n * (n - 1) / 2
                let numberOfPairs = (count * (count - 1)) / 2;
                for (let i = 0; i < numberOfPairs; i++) {
                    ret.push([alist[l], alist[r]]);
                }
                break; // All possible pairs with these duplicates have been added
            } else {
                // Count duplicates for alist[l]
                let countLeft = 1;
                while (l + 1 < r && alist[l + 1] === alist[l]) {
                    countLeft++;
                    l++;
                }

                // Count duplicates for alist[r]
                let countRight = 1;
                while (r - 1 > l && alist[r - 1] === alist[r]) {
                    countRight++;
                    r--;
                }

                // Add all combinations of duplicates
                for (let i = 0; i < countLeft; i++) {
                    for (let j = 0; j < countRight; j++) {
                        ret.push([alist[l], alist[r]]);
                    }
                }

                // Move both pointers inward after processing duplicates
                l++;
                r--;
            }
        }
        else if (sum < avalue) {
            l++; // Need a larger sum, move left pointer to the right
        }
        else {
            r--; // Need a smaller sum, move right pointer to the left
        }
    }
    return ret;
}

module.exports = getPairsForValueWithSorting;