// I never needed factorial() but I wrote it in case I was able to go through all possible squares more methodically than just generating a new square at random each time.

const factorial = (natural) => {
    let fact = 1
    for (let i=2; i<=natural; i++) {
        fact*=i
    }
    return fact
}
  
// makeRandomPermutation() sorts its one parameter, which is an array, randomly.

const makeRandomPermutation = (arrayOfNumbers) => {
    let randomPermutation = arrayOfNumbers.sort((a,b)=>{
        return (0.5-Math.random())
    })
    return randomPermutation
}
  
// makeSquareArray() makes its first parameter (which is an array) into an array of subarrays of length given by the second parameter.
  
const makeSquareArray = (array, width) => {
    let newArray = []
    let numberOfRows = Math.ceil(array.length/width)
    // Put arrays in newArray.
    for (let i=0; i<numberOfRows; i++) {
        let subArray = []
        for (let j=0; j<width; j++) {
            subArray.push(array[i*width+j])
        }
        newArray.push(subArray)
    }
    return newArray
}
  
// Returns true if square is magic, false otherwise.

const checkSquareIsMagic = (squareArray, magicSum) => {
    let width = squareArray.length
    // squareIsMagic will be changed to false when a row/col/diag is found that does not sum to magicSum.
    let squareIsMagic = true
    // Let's check whether the rows add to magicSum.
    for (let i=0; i<width && squareIsMagic; i++) {
        let row = squareArray[i]
        let rowSum = row.reduce((total,num)=>{return total+num})
        if (rowSum !== magicSum) {
            squareIsMagic = false
            console.log(`Sum of row ${row} is ${rowSum}, not ${magicSum}. The square is not magic.`)
        }
    }
    // Let's check whether the columns add to magicSum.
    for (let i=0; i<width && squareIsMagic; i++) {
        let col = []
        for (let j=0; j<width; j++) {
            col.push(squareArray[j][i])
        }
        let colSum = col.reduce((total,num)=>{return total+num})
        if (colSum !== magicSum) {
            squareIsMagic = false
            console.log(`Sum of column ${col} is ${colSum}, not ${magicSum}. The square is not magic.`)
        }
    }
    if (squareIsMagic) {
        // Let's check whether the top-left-to-bottom-right-diagonal sums to magicSum.
        let diag = []
        for (i=0; i<width; i++) {
            diag.push(squareArray[i][i])
        }
        let diagSum = diag.reduce((total,num)=>{return total+num})
        if (diagSum!==magicSum) {
            squareIsMagic = false
            console.log(`Sum of diagonal ${diag} is ${diagSum}, not ${magicSum}. The square is not magic.`)
        }
    }
    if (squareIsMagic) {
        // Let's check whether the top-right-to-bottom-left-diagonal sums to magicSum.
        diag = []
        for (i=0; i<width; i++) {
            diag.push(squareArray[i][width-i-1])
        }
        diagSum = diag.reduce((total,num)=>{return total+num})
        if (diagSum!==magicSum) {
            squareIsMagic = false
            console.log(`Sum of diagonal ${diag} is ${diagSum}, not ${magicSum}. The square is not magic.`)
        }
    }
    return squareIsMagic
}
  
// makeMagicSquare() should generate random squares from arrayOfNumbers, until it generates a square that is magic, which should be returned.

const makeMagicSquare = (width, magicSum, arrayOfNumbers) => {
    let permutation = makeRandomPermutation(arrayOfNumbers)
    let squareArray = makeSquareArray(permutation, width)
    while (!checkSquareIsMagic(squareArray, magicSum)) {
        permutation = makeRandomPermutation(arrayOfNumbers)
        squareArray = makeSquareArray(permutation, width)
    }
    return squareArray
}
  
// Assigning variables some possible values.
  
let width = 3

// arrayOfNumbers is the array of natural numbers up to and including the width squared.
let arrayOfNumbers = []
for (let i = 1; i <= width**2; i++) {
    arrayOfNumbers.push(i)
}

// magicSum is the number that every row, column, and main diagonal must sum to.
let magicSum = width*((width**2)+1)/2

// Console logs.

// console.log("The factorial of "+width+" squared is "+factorial(width**2))

// console.log(makeRandomPermutation(arrayOfNumbers))

// let square = makeSquareArray(arrayOfNumbers,width)
// console.log(square)

// console.log(checkSquareIsMagic(square,magicSum))

console.log(makeMagicSquare(width, magicSum, arrayOfNumbers))
