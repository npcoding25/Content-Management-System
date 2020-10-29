const mysql = require('mysql')
const inquirer = require('inquirer')
require('console.table')
// const console.table = require('console.table')
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

// at top INIT DB connection
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "<Nathan95>",
    database: "dbEmployees"
});

async function main() {

    const employees = await db.query('SELECT employees.first_name, employees.last_name, roles.title, roles.salary FROM employees, roles WHERE employees.role_id = roles.role_id')
    console.table(employees)

    promptAnswers = await inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'What would you like to do?',
            choices: [ "Add a department", "Add a role", "Add an employee", "View by department", "View by role", "View by employee", "Update employee role" ]
        }
    ])
    choice = promptAnswers.choices

    if(choice == "Add a department") {
        promptAnswers = await inquirer.prompt([
            {
                name: 'department',
                message: 'What is the name of the new department?'
            }
        ])

        await db.query('INSERT INTO departments (title) VALUES (?)', [promptAnswers.department])
    }

    if(choice == "Add a role") {
        promptAnswers = await inquirer.prompt([
            {
                name: 'role',
                message: 'What is the new role called?'
            },
            {
                name: 'salary',
                message: 'What is the starting salary of the new role?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'What department does the new role belong in?',
                choices: [ `` ]
            }
        ])

        await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)', [promptAnswers.role, promptAnswers.salary, promptAnswers.department])
    }
    main()
}
main()