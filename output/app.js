const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');
const axios = require('inquirer');

const writeFileSync = util.promisify(fs.writeFile);

function promptUser() {
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


        // INTERN QUESTIONS:
        {
            type: "input",
            name: "inern_name",
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


        // ENGINEER QUESTIONS:
        {
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

    ]);
}

function generateReadme(response, answer, answersURL) {
    return `
        ${answer.manager_name}
            ${answer.manager_id}
                ${answer.manager_email}
                    ${answer.chooseTeamMember}

      ${answer.intern_name}
            ${answer.intern_id}
                ${answer.intern_email}
                       ${answer.chooseTeamMember}


         ${answer.engineer_name}
            ${answer.engineer_id}
                ${answer.engineer_email}
                            ${answer.chooseTeamMember}

}
        //IF STATEMENT FOR CHOICE VALIDATION:
        promptUser()
        .then(function(answer) {
          if (answer.chooseTeamMember === 'Manager') {
            nextQuestionSet === answer.inern_name || answer.engineer_name
          }
          if (answer.chooseTeamMember === 'Intern') {
         
          }
          if (answer.chooseTeamMember === 'Engineer') {
           
          }
          if (answer.chooseTeamMember === 'I don’t want to add any more team members') {
      
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      