const readline = require('readline');

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



    function placeCheckmark(num, position){
        return (num == 1 && position == 1) || (num == 0 && position == 2) ? '\u2713' : "";
    }

    function padText(text, length = 3, start = true){
      str = "" + text;

      if(start) return str.padStart(length);

      return str.padEnd(length);
    }


const personality = [["E", "I"], ["S", "N"], ["T", "F"], ["J", "P"]];
let personalityType = "";
const optionsCount = [[0,0], [0,0], [0,0], [0,0]];
const responses = [];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));


(async () => {
  try{
      for (let ques of questions){

        let option = await prompt(`A. ${ques[0]} \nB. ${ques[1]}\n`)
        
        while(!['A', 'B'].includes(option.toUpperCase())){
          console.error("%c Option can only be 'A' or 'B'", "color: #F00")
          option = await prompt("")
        }

        if(option.toUpperCase() === 'A'){
          responses.push(1)
        }else{
          responses.push(0)
        }
        console.log(`You selected: ${option.toUpperCase()}\n`)
        
    }
    rl.close()
  }catch(e){
    console.error(e.message)
    process.exit(1)
}
})()

   
//when done reading prompt process the responses and exit program 
rl.on('close', () => {
	

	for(let i = 0; i < 4; i++){
        let total = 0;
        for (let j = i; j < responses.length; j += 4){
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
        console.log(`|${padText(" ", 5)} |${padText("A")} | ${padText("B")}`.repeat(4));
        console.log("-".repeat(74));

        for (let i = 0; i < responses.length; i += 4) {
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



