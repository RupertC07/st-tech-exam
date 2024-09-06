//Machine Problem 1
//Summation thru array

const sumThruReduce = (ls) => {
    const res = ls.reduce((leftIndex, rightIndex) => leftIndex + rightIndex, 0);
    return res;
};

const sumThruLoop = (ls) => {
    let res = 0;
    for (let i = 0; i < ls.length; i++) {
        res += ls[i];
    }
    return res;
};

const partsSums = (ls) => {
    if (ls && ls.length > 0) {
        const res = [];
        let sum = sumThruReduce(ls); // sum using the reduce function
        // let sum = sumThruLoop(ls); // or sum using the loop function
        res.push(sum); // Push the initial sum

        // Calculate the remaining sums by subtracting each element from the total
        for (let i = 0; i < ls.length; i++) {
            sum -= ls[i]; // Subtract the current element from the sum
            res.push(sum); // Push the updated sum to the result array
        }

        return res; // Return the result array instead of the final sum
    } else {
        return [0];
    }
};

console.log(partsSums([1, 2, 3, 4, 5, 6]));
// Output: [21, 20, 18, 15, 11, 6, 0]

console.log(
    partsSums([744125, 935, 407, 454, 430, 90, 144, 6710213, 889, 810, 2579358])
);
// Output: [10037855, 9293730, 9292795, 9292388, 9291934, 9291504, 9291414, 9291270, 2581057, 2580168, 2579358, 0]
