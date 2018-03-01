module.exports = function check(str, bracketsConfig) {

    var strBrackets = str;
    strBrackets = strBrackets.replace(/ /g, '').replace(/\'/g, '');
    strBracketsLength = strBrackets.length;

    console.log("strBrackets = " + strBrackets);
    console.log("strBracketsLength = " + strBracketsLength);

    //----------------------//
    //--- Config Section ---//
    //----------------------//

    var strConfInit = bracketsConfig;
    var strConf = strConfInit.replace(/ /g, '');
    strConfArray = strConf.replace('[[\'', '').replace('\']]', '').replace(/\],\[/g, ',').replace(/\'/g, '').split(",");
    strConfArrayLength = strConfArray.length;
    numberOfBracketsTypes = strConfArrayLength / 2;

    console.log("strConf = " + strConf);
    console.log("strConfArray = " + strConfArray);
    console.log("strConfArrayLength = " + strConfArrayLength);
    console.log("numberOfBracketsTypes = " + numberOfBracketsTypes);

    // Initialization of Arrays for Opening and Closing Brackets
    var bracketsStart = [numberOfBracketsTypes];
    var bracketsEnd = [numberOfBracketsTypes];

    // Filling the Arrays of Closing and Opening Brackets
    for (i = 0; i < strConfArrayLength; i++) {
        if (i % 2 === 0) {
            bracketsStart[i / 2] = strConfArray[i];
        } else {
            bracketsEnd[Math.floor(i / 2)] = strConfArray[i];
        }
    }
    console.log("bracketsStart = " + bracketsStart);
    console.log("bracketsEnd = " + bracketsEnd);

    //------------------------//
    //--- Main Calculation ---//
    //------------------------//

    var i, j, currentSymbol, currentBracketNumber, sameBracketFlag, stackOfBracketNumbers = [];

    for (i = 0; i < strBracketsLength; i++) {
        currentSymbol = strBrackets[i];

        currentBracketNumber = -1;
        sameBracketFlag = -1;

        for (j = 0; j < numberOfBracketsTypes; j++) {
            if (currentSymbol.localeCompare(bracketsStart[j]) == 0) {
                currentBracketNumber = j;
                if (bracketsEnd[j].localeCompare(bracketsStart[j]) == 0) {
                    console.log("The same Opening and Closing brackets found: bracketsStart[" + j + "] = " + bracketsStart[j]);
                    console.log("The same Opening and Closing brackets found: bracketsEnd[" + j + "] = " + bracketsEnd[j]);
                    sameBracketFlag = 1;
                }
                break;
            }
        }
        if (sameBracketFlag > 0) {
            if (currentBracketNumber == stackOfBracketNumbers[stackOfBracketNumbers.length - 1]) {
                stackOfBracketNumbers.pop();
                console.log("The same bracket is considered as Closing and will be removed from stack and go to next symbol");
                continue;
            } else {
                console.log("The same bracket is considered as Opening and it will be added to the stack");
            }
        }
        if (currentBracketNumber >= 0) {
            stackOfBracketNumbers.push(currentBracketNumber);
            console.log("Opening bracket is added to stack = " + currentSymbol + ". Stack Length = " + stackOfBracketNumbers.length);
        } else {

            currentBracketNumber = -1;
            for (j = 0; j < numberOfBracketsTypes; j++) {
                if (currentSymbol.localeCompare(bracketsEnd[j]) == 0) {
                    currentBracketNumber = j;
                    console.log("Closing bracket found = " + currentSymbol);
                    break;
                }
            }
            if (currentBracketNumber == -1) {
                console.log("Not bracket symbol found. Go to next symbol");
                continue;
            }
            if (currentBracketNumber == stackOfBracketNumbers[stackOfBracketNumbers.length - 1]) {
                stackOfBracketNumbers.pop();
                console.log("Correct. Remove from stack. Stack Length = " + stackOfBracketNumbers.length);
            } else {
                console.log("Wrong bracket found inside. Return false!!!!!");
                return false;
            }
        }
    }

    stackOfBracketNumbersLength = stackOfBracketNumbers.length;
    console.log("stackOfBracketNumbersLength = " + stackOfBracketNumbersLength);
    if (stackOfBracketNumbersLength === 0) {
        console.log("Result: true");
        return true;
    } else {
        console.log("Result: false");
        return false;
    }
}