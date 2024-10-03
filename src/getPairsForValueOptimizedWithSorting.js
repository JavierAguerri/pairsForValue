const heapSort = require('./resources/heapSort');

function getPairsForValueWithSorting(alist, avalue) {
    heapSort(alist);
    // alist.sort((a, b) => a - b);

    // two-pointer approach
    let ret = [];
    let l = 0; // Left pointer
    let r = alist.length - 1; // Right pointer
    while (l < r) {
        let sum = alist[l] + alist[r];
        if (sum === avalue) {
            if (alist[l] === alist[r]) {
                // All remaining elements between l and r are the same
                let count = r - l + 1;
                let numberOfPairs = (count * (count - 1)) / 2; // Number of unique pairs is C(n, 2) = n * (n - 1) / 2
                for (let i = 0; i < numberOfPairs; i++) {
                    ret.push([alist[l], alist[r]]);
                }
                break;
            } else {
                let countLeft = 1;
                while (l + 1 < r && alist[l + 1] === alist[l]) {
                    countLeft++;
                    l++;
                }
                let countRight = 1;
                while (r - 1 > l && alist[r - 1] === alist[r]) {
                    countRight++;
                    r--;
                }
                for (let i = 0; i < countLeft; i++) {
                    for (let j = 0; j < countRight; j++) {
                        ret.push([alist[l], alist[r]]);
                    }
                }
                l++;
                r--;
            }
        }
        else if (sum < avalue) {
            l++;
        }
        else {
            r--;
        }
    }
    return ret;
}

module.exports = getPairsForValueWithSorting;