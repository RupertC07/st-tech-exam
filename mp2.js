//Expenses vs. Eranings Calculation Program

const calculateEarnings = (dailyExpenses, expeditions) => {
    let totalEarnings = 0;
    let totalDays = expeditions.length; // Directly getting the total number of expeditions as total days

    expeditions.forEach((expedition) => {
        const [hoursStr, path, priceStr] = expedition.split(" ");
        const hours = parseInt(hoursStr);
        const price = parseFloat(priceStr);

        const bottlesPerLoop = (path.match(/B/g) || []).length;
        console.log(bottlesPerLoop);
        const fullLoops = Math.floor(hours / path.length);
        const remainingHours = hours % path.length;

        const partialPath = path.slice(0, remainingHours);
        const bottlesInPartialLoop = (partialPath.match(/B/g) || []).length;

        const totalBottles = fullLoops * bottlesPerLoop + bottlesInPartialLoop;
        const earningsForTheDay = totalBottles * price;
        totalEarnings += earningsForTheDay;
    });

    // console.log(totalEarnings);

    const averageEarnings = totalEarnings / totalDays;

    if (averageEarnings > dailyExpenses) {
        const extraPerDay = (averageEarnings - dailyExpenses).toFixed(2);
        return `Good earnings. Extra money per day: ${extraPerDay}`;
    } else {
        const totalExpenses = (dailyExpenses * totalDays).toFixed(2);
        const moneyNeeded = (totalExpenses - totalEarnings).toFixed(2);
        return `Hard times. Money needed: ${moneyNeeded}`;
    }
};

// Example usage
console.log(calculateEarnings(500, ["8 ABMRB 24.50"]));
