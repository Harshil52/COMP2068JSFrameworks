// Importing the connect and url packages
const connect = require("connect");
const url = require("url");

const app = connect();

app.use((req, res) => {

    const {method, x, y} = url.parse( req.url, true ).query;
    const equation = calculate( method, parseInt(x), parseInt(y) );
    res.end(equation);
    
} );

function calculate(method, x, y){

    let result;
    let operator;

    // using if, else if and else for determining the method
    if( method == 'add' )
    {
        result = x + y;
        operator = '+';
    }
    else if( method == 'subtract' )
    {
        result = x - y;
        operator = '-';
    }
    else if( method == 'multiply' )
    {
        result = x * y;
        operator = '*';
    }
    else if( method == 'divide' )
    {
        result = x/y;
        operator = '/';
    }
    else
    {
        return `Error: ${method} is not valid. Please enter a valid method from: add, subtract, multiply, divide`;
    }

    // returning the final equation
    return `${x} ${operator} ${y} = ${result}`;

}


app.listen(3000, () => {
    console.log('Server running on : http://localhost:3000/lab3?method=add&x=20&y=5');
});


