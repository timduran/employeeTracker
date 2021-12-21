const db = require('./db/database.js');
const inquirer = require('inquirer');
const { add } = require('lodash');
require('console.table');

function options() {
  inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'Welcome to the employee database. What would you like to do?',
    choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add Employee']
  })
  .then(function(res) {
    switch(res.choice){
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'View All Roles':
        viewAllRoles();
      case 'View All Departments':
        viewAllDepartments();
      case 'Add Employee':
        addEmployee();
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

function viewAllRoles() {
  var query = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;`

  db.query(query, function(err, res) {
    if(err) throw err;
    console.log(res.length + ' roles found!');
    console.table('All Roles', res);
    options();
  })
}

function  viewAllDepartments() {
  var query = `SELECT department.id, department.name FROM department;`

  db.query(query, function (err, res) {
      if(err) throw err;
       console.log(res.length + ' Departments Found!');
       console.table('All Departments', res);
       options();
  })
}

// Ask the user for the employees first and last name
// Ask for the role of that employee
// Query the insert into the database;

function addEmployee() {
  var query = `SELECT * FROM role`;
  db.query(query, function (err, res) {
    
  inquirer.prompt([
    {
      name: 'firstName',
      message: 'What is the employees first name?'
    },
    {
      name: 'lastName',
      message: 'What is the employees last name?'
    }
  ])
  .then(res => {
    var firstName = res.firstName;
    var lastName = res.lastName;
    db.query(query, function (err, res) {
      if (err) throw err;

      let roleChoices = res.map(({id, title}) => ({
        name: title,
        value: id
      }));
      inquirer.prompt({
      type: 'list',
      name: 'roleId',
      message: 'What will the employee role be?',
      choices: roleChoices
      }).then(function(res) {
        let roleId = res.roleId;
        var query = `SELECT * FROM employee`;
        db.query(query, function (err, res) {
          if (err) throw err;
          const managerChoices = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }));

          managerChoices.unshift({ name: 'None', value: null });

          inquirer.prompt({
            type: 'list',
            name: 'managerId',
            message: 'Who is the employees manager?',
            choices: managerChoices
          }).then(res => {
            var employee = {
              manager_id: res.managerId,
              role_id: roleId,
              first_name: firstName,
              last_name: lastName
            };
            db.query(`INSERT INTO employee SET ?`, employee)
          })
          .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
        })
        options();
      })
    })
  })
})
}

options();