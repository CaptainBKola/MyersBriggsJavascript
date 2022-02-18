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


const personalityTypes = {
  "ISTJ": {"title": "The Traditionalist", "percentage": "13.7%", "description": ["Dutiful", "Practical", "Logical", "Methodical"], "site": "http://www.personalitypage.com/html/ISTJ.html"},
  "ISFJ": {"title": "The Protector", "percentage": "12.7%", "description": ["Dutiful", "Practical", "Supportive", "Meticulous"], "site": "http://www.personalitypage.com/html/ISFJ.html"},
  "INFJ": {"title": "The Guide", "percentage": "1.7%", "description": ["Devoted", "Innovative", "Idealistic", "Compassionate"], "site": "http://www.personalitypage.com/html/INFJ.html"},
  "INTJ": {"title": "The Visionary", "percentage": "1.4%", "description": ["Independent", "Innovative", "Analytical", "Purposeful"], "site": "http://www.personalitypage.com/html/INTJ.html"},
  "ISTP": {"title": "The Problem-Solver", "percentage": "6.4%", "description": ["Expedient", "Practical", "Objective", "Adaptable"], "site": "http://www.personalitypage.com/html/ISTP.html"},
  "ISFP": {"title": "The Harmonizer", "percentage": "6.1%", "description": ["Tolerant", "Realistic", "Harmonious", "Adaptable"], "site": "http://www.personalitypage.com/html/ISFP.html"},
  "INFP": {"title": "The Humanist", "percentage": "3.2%", "description": ["Insightful", "Innovative", "Idealistic", "Adaptable"], "site": "http://www.personalitypage.com/html/INFP.html"},
  "INTP": {"title": "The Conceptualizer", "percentage": "2.4%", "description": ["Questioning", "Innovative", "Objective", "Abstract"], "site": "http://www.personalitypage.com/html/INTP.html"},
  "ESTP": {"title": "The Activist", "percentage": "5.8%", "description": ["Energetic", "Practical", "Pragmatic", "Spontaneous"], "site": "http://www.personalitypage.com/html/ESTP.html"},
  "ESFP": {"title": "The Fun-Lover", "percentage": "8.7%", "description": ["Spontaneous", "Practical", "Friendly", "Harmonious"], "site": "http://www.personalitypage.com/html/ESFP.html"},
  "ENFP": {"title": "The Enthusiast", "percentage": "6.3%", "description": ["Optimistic", "Innovative", "Compassionate", "Versatile"], "site": "http://www.personalitypage.com/html/ENFP.html"},
  "ENTP": {"title": "The Entrepreneur", "percentage": "2.8%", "description": ["Risk-Taking", "Innovative", "Outgoing", "Adaptable"], "site": "http://www.personalitypage.com/html/ENTP.html"},
  "ESTJ": {"title": "The Coordinator", "percentage": "10.4%", "description": ["Organized", "Practical", "Logical", "Outgoing"], "site": "http://www.personalitypage.com/html/ESTJ.html"},
  "ESFJ": {"title": "The Supporter", "percentage": "12.6%", "description": ["Friendly", "Practical", "Loyal", "Organized"], "site": "http://www.personalitypage.com/html/ESFJ.html"},
  "ENFJ": {"title": "The Developer", "percentage": "2.8%", "description": ["Friendly", "Innovative", "Supportive", "Idealistic"], "site": "http://www.personalitypage.com/html/ENFJ.html"},
  "ENTJ": {"title": "The Reformer", "percentage": "2.9%", "description": ["Determined", "Innovative", "Strategic", "Outgoing"], "site": "http://www.personalitypage.com/html/ENTJ.html"}
};


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

   
//when done reading prompt process the responses and exit program 
rl.on('close', () => {
	console.log(responses)

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

    console.log(optionsCount)
    console.log(personalityType)
    console.log("Title: ", personalityTypes[personalityType].title)
    console.log("Description: ", personalityTypes[personalityType].description.join(", "))
    console.log("Site: ", personalityTypes[personalityType].site)
    

	process.exit(0)
})



