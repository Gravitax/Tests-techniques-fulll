const   short_fizzbuzz = (n) => {
    for (let i = 1; i <= n; i++) {
        let output = (i % 3 === 0 ? "Fizz" : "") + (i % 5 === 0 ? "Buzz" : "") || i;
        console.log(output);
    }
}

const   fizzbuzz = (n) => {
    for (let i = 1; i <= n; i++) {
        let result = "";

        if (i % 3 === 0)
            result += "Fizz";
        if (i % 5 === 0)
            result += "Buzz";
        if (result === "")
            result = i;
        console.log(result);
    }
}

const N = 100; // You can change this value to test with different numbers

// short_fizzbuzz(N);
fizzbuzz(N);
