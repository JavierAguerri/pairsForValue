const fs = require('fs');
const path = require('path');

const getHrTimeInMs = (hrtime) => hrtime[0] * 1000 + hrtime[1] / 1e6;

const getFunctionByName = (functionName) => {
    switch (functionName) {
        case 'getPairsForValueOriginal':
            return require('../src/getPairsForValueOriginal');
        case 'getPairsForValueOptimizedWithSorting':
            return require('../src/getPairsForValueOptimizedWithSorting');
        case 'getPairsForValueOptimizedWithHashMap':
            return require('../src/getPairsForValueOptimizedWithHashMap');
        default:
            throw new Error(`Unknown function: ${functionName}`);
    }
};

const functionName = process.env.FUNCTION_TO_TEST;
const getPairsForValue = getFunctionByName(functionName);

let testData;
switch (process.env.DATA_SET) {
    case 'largeTestDataWithFewPairs':
        testData = require('./resources/largeTestDataWithFewPairs');
        break;
    case 'largeTestDataWithManyPairs':
        testData = require('./resources/largeTestDataWithManyPairs');
        break;
    default:
        testData = require('./resources/testData');
}


test.each(testData)('aList = %j, aValue = %i, expected = %j', (aList, aValue, expectedResult) => {
    const startTime = process.hrtime();
    const actualResultTmp = getPairsForValue(aList, aValue);
    const elapsedHrTime = process.hrtime(startTime);
    const executionTimeMs = getHrTimeInMs(elapsedHrTime);

    const actualResult = normalizePairs(actualResultTmp);
    // const logFilePathResult = path.join(__dirname, '../tmp', 'resultingPairs.log');
    // fs.writeFileSync(logFilePathResult, JSON.stringify(actualResult), 'utf8');

    // the file reflects the execution time of the last test in the data set, but we have only one in the large data sets, so it is fine
    const logFilePathTime = path.join(__dirname, '../tmp', 'execTime_'+functionName+'_'+process.env.DATA_SET+'.log');
    fs.writeFileSync(logFilePathTime, JSON.stringify(executionTimeMs)+" ms", 'utf8');
    expect(actualResult).toStrictEqual(expectedResult);
});


function normalizePairs(pairs) {
    return pairs
        .map(pair => pair.slice().sort((a, b) => a - b))
        .sort((a, b) => {
            if (a[0] !== b[0]) {
                return a[0] - b[0];
            }
            return a[1] - b[1];
        });
}
