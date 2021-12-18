use employeeTracker_db;

INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Marketing'),
  ('Human Resources'),
  ('Accounting');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 100000, 1),
  ('Marketing Manager', 90000, 2),
  ('Sales Person', 60000, 2),
  ('Human Resources Manager', 90000, 3),
  ('Office Assistant', 60000, 3),
  ('Accountant', 70000, 4),
  ('Accountant Manager', 90000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Timothy', 'Duran', 1, NULL),
  ('Jaden', 'Duran', 7, NULL),
  ('Seyla', 'Brown', 4, NULL),
  ('Lily', 'Duran', 2, NULL),
  ('William', 'Duran', 3, 2),
  ('Ava', 'Brown', 6, 6),
  ('Cash', 'Brown', 5, 4)
