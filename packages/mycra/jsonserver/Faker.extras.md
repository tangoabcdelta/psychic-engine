## Faker.js random number between 2 values

    faker.random.number({
        'min': 10,
        'max': 50
    });

### From Fakerjs github

#### Whole Number faker.

    random.number(min,max)

#### Random number between 0 and "range".

    faker.random.number(100); //returns 92
    faker.random.number({min:5, max:10}); //returns 9

#### Decimal number faker. finance.amount(min,max,decimal places) Random number between "min" and "max" including decimals to X digits.

    faker.finance.amount(9000,10000,4); //returns 9948.8363
    Boolean faker. random.boolean()

    faker.random.boolean(); //returns true
#### Array Element faker.

   random.arrayElement(array[])

Selects a random element from an array of possible values.
This function is useful to create custom lists of possibilities.

    faker.random.arrayElement(["one","two","three","four"]); //returns "two"
    var phTyp = faker.random.arrayElement(["cell","work","home"]); //returns "work"
#### Object Element faker.

    random.objectElement(object{})

Selects a random element from an object, selects the value not the keys    
This function is useful to create custom lists of possibilities.

    faker.random.objectElement({one: 1, two: 2, three: 3}); //returns 3
