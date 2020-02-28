const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');

const writeFileSync = util.promisify(fs.writeFile);

function askManagerQuestions() {
    return inquirer.prompt([{

            //MANAGER QUESTIONS
            type: "input",
            name: "manager_name",
            message: "What is your manager’s name?"

        },
        {
            type: "input",
            name: "manager_id",
            message: "2. What is your manager’s id?"
        },
        {
            type: "input",
            name: "manager_email",
            message: "What is your manager’s email?"
        },
        {
            type: "list",
            name: "chooseTeamMember",
            choices: ["Manager", "Engineer", "Intern", "I don’t want to add any more team members"],
            message: "Which type of team member would you like to be?"
        },

    ])
}

function askInternQuestions() {
    return inquirer.prompt(internQuestions)
}
// INTERN QUESTIONS:
let internQuestions = [{
        type: "input",
        name: "intern_name",
        message: "What is your intern’s name?"

    },
    {
        type: "input",
        name: "intern_id",
        message: "2. What is your intern’s id?"
    },
    {
        type: "input",
        name: "intern_email",
        message: "What is your intern’s email?"
    },
    {
        type: "list",
        name: "chooseTeamMember",
        choices: ["Manager", "Engineer", "Intern", "I don’t want to add any more team members"],
        message: "Which type of team member would you like to be?"
    },
]

function askEngineerQuestions() {
    return inquirer.prompt(engineerQuestions)
}
// ENGINEER QUESTIONS:
let engineerQuestions = [{
        type: "input",
        name: "engineer_name",
        message: "What is your engineer’s name?"

    },
    {
        type: "input",
        name: "engineer_id",
        message: "2. What is your engineer’s id?"
    },
    {
        type: "input",
        name: "engineer_email",
        message: "What is your engineer’s email?"
    },
    {
        type: "list",
        name: "chooseTeamMember",
        choices: ["Manager", "Engineer", "Intern", "I don’t want to add any more team members"],
        message: "Which type of team member would you like to be?"
    },
]

function managerCard(answer) {
    return `      <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${answer.manager_name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${answer.manager_id}</h6>
      <p class="card-text">${answer.manager_email}</p>
    </div>
  </div>`
}

function internCard(answer) {
    return `      <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${answer.intern_name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${answer.intern_id}</h6>
      <p class="card-text">${answer.intern_email}</p>
    </div>
  </div>`
}

function engineerCard(answer) {
    return `      <div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${answer.engineer_name}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${answer.engineer_id}</h6>
  <p class="card-text">${answer.engineer_email}</p>
</div>
</div>`
}

function generateHTML(cards) {
    return `

    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <link rel="stylesheet" href="style.css">
      <title>OOP TEAM</title>
    </head>
    
    <body>
      <Header>
        <h1>My Team</h1>
       
      </Header> 
      ${cards}
      <style>
    body {
background-image: url('/assets/images/background-blur-clean-clear-531880.jpg');
}

header {
    background-color: #333;
    color: #fff;
    text-align: center;
    margin-bottom: 2%;
    padding: 2%;
    border: 10px ridge red;
}

.card {
    margin: auto;
    text-align: center;
    border: 5px ridge red;
    background-color: #333;
    margin-bottom: 2%;

}

.card-title {
    color: #fff;
    font-weight: bolder;
    font-size: 2.25rem;
}

.text-muted {
    color: red !important;

}

p {
    border-top: 5px ridge red;
    color: #fff;
}
  </style>

      <script src="app.js"></script>
    </body>
    
    </html>
`
}

let managerCardArray = []
let engineerCardArray = []
let internCardArray = []


function handleAnswers(answer) {
    //GENERATE CARDS
    if (answer.hasOwnProperty('manager_name')) {
        var managerCardHTML = managerCard(answer)
        managerCardArray.push(managerCardHTML)
    }
    if (answer.hasOwnProperty('engineer_name')) {
        console.log(answer);
        var engineerCardHTML = engineerCard(answer)
        engineerCardArray.push(engineerCardHTML)
    }

    if (answer.hasOwnProperty('intern_name')) {
        var internCardHTML = internCard(answer)
        internCardArray.push(internCardHTML)
    }


    //IF STATEMENT FOR CHOICE VALIDATION:
    if (answer.chooseTeamMember === 'Intern') {

        return askInternQuestions().then(handleAnswers)

    }
    if (answer.chooseTeamMember === 'Engineer') {
        return askEngineerQuestions().then(handleAnswers)
    }
    if (answer.chooseTeamMember === 'Manager') {
        return askManagerQuestions().then(handleAnswers)
    }
    if (answer.chooseTeamMember === 'I don’t want to add any more team members') {

        let html = "";
        // manager for loop
        for (var i = 0; i < managerCardArray.length; i++) {
            html += managerCardArray[i];
        }

        //engineer for loop
        for (var i = 0; i < engineerCardArray.length; i++) {
            html += engineerCardArray[i];
        }
        //intern for loop
        for (var i = 0; i < internCardArray.length; i++) {
            html += internCardArray[i];
        }

        return writeFileSync("team.html", generateHTML(html));
    }
}

askManagerQuestions()
    .then(handleAnswers)
    .catch(function (err) {
        console.log(err);
    });