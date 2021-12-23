const db = require('./db/database.js');
const inquirer = require('inquirer');
const { add } = require('lodash');
require('console.table');

function options() {
  inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'Welcome to the employee database. What would you like to do?',
    choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee Role']
  })
    .then(function (res) {
      switch (res.choice) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Update Employee Role':
          // updateRole();
          console.log('write role')
          break;
        default:
          break;
      }
    })
};

function viewAllEmployees() {
  var query = `SELECT * FROM employee`;
  db.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + ' employess found!');
    console.table('All Employees', res);
    options();
  })
}

function viewAllRoles() {
  var query = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;`

  db.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + ' roles found!');
    console.table('All Roles', res);
    options();
  })
}

function viewAllDepartments() {
  var query = `SELECT department.id, department.name FROM department;`

  db.query(query, function (err, res) {
    if (err) throw err;
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

          let roleChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: 'What will the employee role be?',
            choices: roleChoices
          }).then(function (res) {
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

function addRole() {
  var query = `SELECT * FROM role`;
  db.query(query, function (err, res) {

    inquirer.prompt([
      {
        name: 'questionRule',
        message: 'What is the employees role?'
      }
    ])
      .then(res => {
        var questionRule = res.questionRule;
        db.query(query, function (err, res) {
          if (err) throw err;
          let roleChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          inquirer.prompt({
            type: 'list',
            name: 'department_id',
            message: 'What will the department be?',
            choices: roleChoices
          }).then(function (res) {
            let roleId = res.department_id;
            var query = `SELECT * FROM department`;
            db.query(query, function (err, res) {
              if (err) throw err;
              const managerChoices = res.map(({ id, questionRule }) => ({
                name: `${questionRule}`,
                value: id
              }));
              managerChoices.unshift({ name: 'None', value: null });

              inquirer.prompt({
                type: 'list',
                name: 'departmentid',
                message: 'Who is the role manager?',
                choices: managerChoices
              }).then(res => {
                var employee = {
                  manager_id: res.managerId,
                  role_id: roleId,
                  department_id: departmentid,
                };
                db.query(`INSERT INTO role SET ?`, role)
              })
                .then(() => console.log(`Added ${department_id} to the database`))
            })
            options();
          })
        })
      })
  })
}

function addDepartment() {
  var query = `SELECT * FROM employee`;
  db.query(query, function (err, res) {

    inquirer.prompt([
      {
        name: 'nameDepartment',
        message: 'What is the departments name?'
      }
    ])
      .then(res => {
        var nameDepartment = res.nameDepartment;
        db.query(query, function (err, res) {
          if (err) throw err;

          let roleChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          inquirer.prompt({
            type: 'list',
            name: 'nameId',
            choices: roleChoices
          }).then(function (res) {
            let roleId = res.nameid;
            var query = `SELECT * FROM department`;
            db.query(query, function (err, res) {
              if (err) throw err;
              const managerChoices = res.map(({ id, nameDepartment, }) => ({
                name: `${nameDepartment}`,
                value: id
              }));
              managerChoices.unshift({ name: 'None', value: null });

              inquirer.prompt({
                type: 'list',
                name: 'managerId',
                message: 'Who is the department manager?',
                choices: managerChoices
              }).then(res => {
                var employee = {
                  manager_id: res.nameId,
                  name_Id: nameId,
                  name_department: nameDepartment,
                };
                db.query(`INSERT INTO department SET ?`, department)
              })
                .then(() => console.log(`Added ${nameDepartment} to the database`))
            })
            options();
          })
        })
      })
  })
}

function addUpdate() {
  var query = `SELECT * FROM role`;
  db.query(query, function (err, res) {
    inquirer.prompt([
      {
        name: 'updateall',
        message: 'What do you want to update?'
      }
    ])
      .then(res => {
        var updateall = res.updateall;
        db.query(query, function (err, res) {
          if (err) throw err;

          let roleChoices = res.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: 'What update do you want on role?',
            choices: roleChoices
            let roleId = res.roleId;
            var query = `SELECT * FROM employee`;
            db.query(query, function (err, res) {
              if (err) throw err;
              const managerChoices = res.map(({ id, update_all }) => ({
                name: `${update_id}`,
                value: id
              }));

              managerChoices.unshift({ name: 'None', value: null });
              inquirer.prompt({
                type: 'list',
                name: 'departmentId',
                message: 'what update do you want on department?',
                choices: managerChoices
              }).then(res => {
                var employee = {
                  manager_id: res.managerId,
                  role_id: roleId,
                  update_all: updateall,
                };
                db.query(`INSERT INTO employee SET ?`, employee)
              })
                .then(() => console.log(`Added ${updateall} to the database`))
            })
            options();
          })
        })
      })
  })
}


options();
