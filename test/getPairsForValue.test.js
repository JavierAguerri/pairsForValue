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
const testData = require('./resources/testData');

test.each(testData)('aList = %j, aValue = %i, expected = %j', (aList, aValue, expectedResult) => {
    const actualResult = getPairsForValue(aList, aValue);
    console.log(`Function: ${functionName}, Input list: ${aList}, Target value: ${aValue}, Expected result: ${JSON.stringify(expectedResult)}, Actual result: ${JSON.stringify(actualResult)}`);
    expect(actualResult).toStrictEqual(expectedResult);
});
