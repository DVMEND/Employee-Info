const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];


 const start = () => 
    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "What type of employee do you want to add?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Done adding employees"
            ],
        },
   
    ])
    .then(answers => {
        if (answers.employeeType == 'Manager') {
            console.log("helo")
            createManager()
        }
        else if(answers.employeeType == 'Engineer') {
            createEngineer()
        }
        else if (answers.employeeType == 'Intern'){
            createIntern()
        }
        else
        buildTeam();
        return 
    });



     function createManager() {
       inquirer.prompt ([
            {
            type: "input",
            name: "managerName",
            message: "What is the manager's name?",

            },

            {
            type: "input",
            name: "managerId",
            message: "What is the manager's ID?"
            },

            {
            type: "input",
            name: "managerEmail",
            message: "What is the manager's email?"

            },

            {
            type: "input",
            name: "managerTele",
            message: "What is the manager's telephone number?"
            },

    ])
    .then(answers => {
      const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerTele)
        teamMembers.push(manager);
        start();

    
    })};

    function createEngineer(){
        inquirer.prompt ([
            {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?"
            },

            {
            type: "input",
            name: "engineerId",
            message: "What is the engineer's Id?"
            },

            {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?"
            },

            {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's Github username?"
            }
        ])
        .then(answers => {
            const engineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer)
            start();
        })
    };

    function createIntern() {
        inquirer.prompt([
            {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
            },

            {
            type: "input",
            name: "internId",
            message: "What is the intern's Id?"
            },

            {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?"
            },

            {
            type: "input",
            name: "internSchool",
            message: "Which school did the intern attend?"
            }
        ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern)
            start();
        })
    };
   
function buildTeam(){
    //create the output directory if the output path doesn't exist yet
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    

}

start();