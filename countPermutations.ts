/*
 * Complete the 'countPerms' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

function countPerms(n) {
    // Write your code here

    const mod = 1e9 + 7;
    
    let countA = 1, countE = 1, countI = 1, countO = 1, countU = 1; 
    
    for (let i = 1; i < n; ++i) {
        const newA = (countE + countI + countU) % mod;
        const newE = (countA + countI) % mod;
        const newI = (countE + countO) % mod;
        const newO = countI;
        const newU = (countI + countO) % mod;
        
        countA = newA;
        countE = newE;
        countI = newI;
        countO = newO;
        countU = newU; 
    }
    return (countA + countE + countI + countO + countU) % mod;
}
