const db = require('./db/database.js');
const inquirer = require('inquirer');
require('console.table');

function options() {
  inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'Welcome to the employee database. What would you like to do?',
    choices: ['View All Employees']
  })
  .then(function(res) {
    switch(res.choice){
      case 'View All Employees':
        viewAllEmployees();
        break;
      default: 
        break;
    }
  })
};

function viewAllEmployees() {
  var query = `SELECT * FROM employee`;
  db.query(query, function(err, res) {
    if(err) throw err;
    console.log(res.length + ' employess found!');
    console.table('All Employees', res);
    options();
  })
}

options();