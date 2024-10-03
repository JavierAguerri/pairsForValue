function getPairsForValueOriginal(alist, avalue) {
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

module.exports = getPairsForValueOriginal;