
# Building Myers Briggs Personality Test App with Vanillajs

The art of building is by all means the best way to sharpen your skills as a software engineer. Watching youtube tutorial videos, without spending more time practicing is not enough. You have to start with projects that will help you solidify the concept learned in videos and textbooks. This article is going to expose you to some beginner-level concepts to some advanced concepts in javascript. 

Some of the topics you will learn in this article are;

* Working with Javascript array
* Asynchronous programming in js
* Immediately Invoked Function Expression [https://developer.mozilla.org/en-US/docs/Glossary/IIFE] 
* Input and output operation with readline module
* String formatting 



## Project requirements

* Node version >= 0.7
* Javascript ES6
* Any IDE of your choice
* [Test questions](https://pdfcoffee.com/the-myers-test-pdf-free.html)


## How the personality test works

There are twenty questions in the downloaded pdf file. The questions are divided into four sections. Each section tests for a specific personality identity. Myers Briggs test for two identities in each section. The identities tested are;

* Introvert (I) or Extrovert (E)
* Sensing (S) or Intuition (N).
* Thinking (T) or Feeling (F).
* Judging (J) or Perceiving (P)

Each of the sections above contains five questions and twenty questions in all the sections. We compare which identity is more significant in each section, and we add them together to form the required combinations of identity by Myers Briggs. There are sixteen personality identities, you can read more here.


### Import the readline module

This is a module we would be using for I/O operations; I explained how it works in the section below. It might throw an error if node.js is not installed so you have to install node.js.

```javascript

const readline = require('readline');

```


### Creating arrays in Javascript

After this import, then make a list of questions that will be printed to the console.

This is a simple way of creating an array in javascript. Here we have a nested array.

```javascript

const questions = [

 ["expend energy, enjoy groups", "conserve energy, enjoy one-on-one"],

 ["interpret literally", "look for meaning and possibilities"],

 ["logical, thinking, questioning", "empathetic, feeling, accommodating"],

 ["organized, orderly", "flexible, adaptable"],

 ["more outgoing, think out loud", "more reserved, think to yourself"],

 ["practical, realistic, experiential", "imaginative, innovative, theoretical"],

 ["candid, straight forward, frank", "tactful, kind, encouraging"],

 ["plan, schedule", "unplanned, spontaneous"],

 ["seek many tasks, public activities, interaction with others", "seek private, solitary activities with quiet to concentrate"],

 ["standard, usual, conventional", "different, novel, unique"],

 ["firm, tend to criticize, hold the line", "gentle, tend to appreciate, conciliate"],

 ["regulated, structured”", "easygoing, “live” and “let live”"],

 ["external, communicative, express yourself", "internal, reticent, keep to yourself"],

 ["focus on here-and-now", "look to the future, global perspective, \"big picture\""],

 ["tough-minded, just", "tender-hearted, merciful"],

 ["active, initiate", "reflective, deliberate"],

 ["preparation, plan ahead", "go with the flow, adapt as you go"],

 ["facts, things, \"what is\"", "ideas, dreams, \"what could be\", philosophical"],

 ["matter of fact, issue-oriented", "sensitive, people-oriented, compassionate"],

 ["control, govern", "latitude, freedom"]

];


### How does readline read the user’s input asynchronously? 

For Javascript code to be used on the terminal or server without the web browser, it needs Node.js which allows it to run JavaScript code on a terminal in such a way that enables it to interact with a filesystem on a computer input stream and create a console/server-based app. This is achievable via Node.js modules, which behave asynchronously. 

In a typical Javascript console app, reading input from terminal or files while writing to console/terminal is handled by two modules in node.js;



* [Readline module](https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/)
* [Readline-sync module](https://www.npmjs.com/package/readline-sync)

In this article, I will be using readline module because it is inbuilt with node.js and doe not require any installation of any package. 

However, it has its disadvantage over readline-sync. You can decide to explore this module it in the future, and you are free to reshape this project to your taste using the readline-sync module. I will leave you with [resources](https://www.geeksforgeeks.org/how-to-take-input-in-node-js/) that will help you get this done.

The[ readline module](https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/) is imported from the first line and down below we make use of its instance which has two parameters; the input and output e.g the _process.stdin and [process.stdout](https://www.geeksforgeeks.org/node-js-process-stdout-property/). _The input can read data from files or listen to our keyboard; in our case, it is from our array of questions we created at the top. While the output helps us to write to the console or file, in our case, it's to the console.

These are handled asynchronously with the [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) that expects a promise.


### Its shortcoming: 

You need to call readline.question() and create a callback function every time you want to use it for input. The question method here belongs to the module. 

 

```javascript

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

```


### Using asynchronous programming and IIFE in Javascript

**_“An [IIFE ](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)(Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. - MDN”_**

We have many variables declared outside of this function, so using IIFE will reduce for the following reasons;



* Securing the variable scope
* Prevent global variable definition issues
* Protect private data

Before we got here, we have not started getting input and output; we only imported the module needed, and we also configured the module so that we can use it for our I/O operations below. That being set up, we want to read data from the array and output data to the console. 

Things we wanted to achieve with the function below are to;

* Print out Questions in sequential order  
* Get Options chosen by the user
* Validate the user’s option 
* Save the options to “responses”  as 0s or 1s, although we got As or Bs from the console
* Try and catch errors.

```javascript

(async () => {

 try{

     for (let ques of questions){

       let option = await prompt(`A. ${ques[0]} \nB. ${ques[1]}\n`)

      

       while(!['A', 'B'].includes(option.toUpperCase())){

         console.error("Option can only be 'A' or 'B'")

         option = await prompt("")

       }

       if(option.toUpperCase() === 'A'){

         responses.push(1)

       }else{

         responses.push(0)

       }

       console.log(`You selected: ${option}`)

      

   }

   rl.close()

 }catch(e){

   console.error(e.message)

   process.exit(1)

}

})()
```

### On close without error displays personality types in a table

After the whole input and output processing are done on the terminal, it closes without a bug. The rl.on close event belongs to the readline module for checking after the completion of the process, then the function below executes, and the personality identities are added and saved as strings. 

We dont want to print the personality test result as bare strings; in the next section, I will discuss how the table was created and the string formatting part of this function.

```javascript

//when done reading prompt process the responses and exit program

rl.on('close', () => {

 for(let i = 0; i &lt; 4; i++){

       let total = 0;

       for (let j = i; j &lt; responses.length; j += 4){

           total += responses[j];

       }

       optionsCount[i][0] = total;

       optionsCount[i][1] = 5 - total;

       if( total >= 3){

           personalityType += personality[i][0];

       }else {

           personalityType += personality[i][1];

       }

   }

  

   console.log("\nYour choice at a glance\n");

       console.log(`|${padText(" ", 5)} | ${padText("A")} | ${padText("B")}`.repeat(4));

       console.log("-".repeat(74));

       for (let i = 0; i &lt; responses.length; i += 4) {

           console.log(`|${padText(i+1, 5)} | ${padText(placeCheckmark(responses[i], 1))} | ${padText(placeCheckmark(responses[i], 2))} | ${padText(i+2)} | ${padText(placeCheckmark(responses[i+1], 1))} | ${padText(placeCheckmark(responses[i+1], 2))} | ${padText(i+3)} | ${padText(placeCheckmark(responses[i+2], 1))} | ${padText(placeCheckmark(responses[i+2], 2))} | ${padText(i+3)} | ${padText(placeCheckmark(responses[i+3], 1))} | ${padText(placeCheckmark(responses[i+3], 2))} |`);

       }

       console.log("-".repeat(74));

       console.log(`|TOTAL | ${padText(optionsCount[0][0])} | ${padText(optionsCount[0][1])} | ${padText(" ")} | ${padText(optionsCount[1][0])} | ${padText(optionsCount[1][1])} | ${padText(" ")} | ${padText(optionsCount[2][0])} | ${padText(optionsCount[2][1])} | ${padText(" ")} | ${padText(optionsCount[3][0])} | ${padText(optionsCount[3][1])} | ${padText(" ")}`);

       console.log("-".repeat(74));

       console.log(`|${padText(" ", 5)} | ${padText("E")} | ${padText("I")} | ${padText(" ")} | ${padText("S")} | ${padText("N")} | ${padText(" ")} | ${padText("T")} | ${padText("F")} | ${padText(" ")} | ${padText("J")} | ${padText("P")} |`);

       console.log("\nYour personality type is " + personalityType);

       console.log(`To read more on your personality type, visit: https://www.truity.com/personality-type/${personalityType}`);

 process.exit(0)

})

```


### The functions Used for constructing a table and placing marks.

The function placeCheckmark is used to place tick marks on every option picked. We are also using the padText function to space the gaps within each column in the table.

```javascript

function placeCheckmark(num, position){

 return (num == 1 && position == 1) || (num == 0 && position == 2) ? '\u2713' : "";

}

function padText(text, length = 3, start = true){

str = "" + text;

if(start) return str.padStart(length);

return str.padEnd(length);

}

```

## Conclusion
At the end of this article we succefully built an application that enables to know the type of personality we have using the test questions from Myers Briggs website. We learnt the usage of Javascript array, IIFE, asynchronous programming, I/O operation in javascript and lastly string formating. The link to this project can be found on my github[https://github.com/CaptainBKola/MyersBriggsJavascript]
Happy coding
