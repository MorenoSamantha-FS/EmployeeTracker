"use strict";

// ========================================
// EMPLOYEE CLASS
// Base class for shared employee information
// ========================================

class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
}

// ========================================
// PARTTIME CLASS
// Inherits from Employee
// ========================================

class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "PartTime";
  }

  // Function to calculate annual salary for part-time employees
  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}

// ========================================
// MANAGER CLASS
// Inherits from Employee
// ========================================

class Manager extends Employee {
  constructor(name, age, payRate) {
    super(name, age);
    this.payRate = payRate;
    this.employeeType = "Manager";
  }

  // Function to calculate annual salary for managers and deduct required $1000
  calculatePay() {
    this.annualSalary = this.payRate * 40 * 52 - 1000;
  }
}

// ========================================
// MAIN CLASS
// Controls the Employee Tracker application
// ========================================

class Main {
  // Runs when a new instance of Main is created
  constructor() {
    // Creates an array to store employees
    this.employees = [];

    // Adds 3 starting employees
    const employee1 = new PartTime("Mike", 14, 15, 20);
    const employee2 = new PartTime("Will", 14, 18, 25);
    const employee3 = new Manager("Hopper", 35, 25);

    // Calculates the pay for each employee
    employee1.calculatePay();
    employee2.calculatePay();
    employee3.calculatePay();

    // Adds the employees to the array
    this.employees.push(employee1, employee2, employee3);

    // Display the starter employees when the application starts
    this.display();

    //Open the menu after displaying the starting employees
    this.menu();
  }

  // ========================================
  // DISPLAY METHOD
  // Shows all employees in the console
  // ========================================
  display() {
    console.log("===== EMPLOYEE TRACKER =====");
    this.employees.forEach((employee, index) => {
      // Managers use a standard 40-hour work week
      const hours = employee.employeeType === "Manager" ? 40 : employee.hours;
      console.log(
        `${index + 1}. ${employee.name} | ` +
          `Age: ${employee.age} | ` +
          `Salary: $${employee.annualSalary} | ` +
          `Hours: ${hours} | ` +
          `Pay Rate: $${employee.payRate} | ` +
          `Type: ${employee.employeeType}`,
      );
    });
  }

  // ========================================
  // ADD METHOD
  // Creates a new employee from user input
  // ========================================

  add() {
    // Prompt the user for employee details
    const type = prompt(
      "What type of employee?\n" +
        "1. Part-Time\n" +
        "2. Manager\n\n" +
        "Enter a number (1-2):",
    );

    // Exit without creating if 'Cancel' is clicked
    if (type === null) {
      return;
    }

    // Validate user input
    if (type !== "1" && type !== "2") {
      alert("Please select a valid option - 1 or 2.");
      return;
    }

    // Prompt user for employee information
    const input = prompt(
      "Enter the employee's name, age, pay rate, and weekly hours\n" +
        "separated by commas.\n\n" +
        "For managers, weekly hours are not reuired as they are always full time.",
    );

    // Exit if the user cancels
    if (input === null) {
      return;
    }

    // Split user input into appropriate pieces
    const details = input.split(",");

    // Remove spaces from the name
    const name = details[0]?.trim();

    // Convert user input text into numbers
    const age = Number(details[1]);
    const payRate = Number(details[2]);
    const hours = Number(details[3]);

    // Validate input
    if (
      !name ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !Number.isFinite(payRate) ||
      payRate <= 0 ||
      (type === "1" && (!Number.isFinite(hours) || hours <= 0))
    ) {
      alert("Please enter complete and valid data for this employee.");
      return;
    }

    // Create new employee object
    let newEmployee;

    if (type === "1") {
      newEmployee = new PartTime(name, age, payRate, hours);
    } else {
      newEmployee = new Manager(name, age, payRate);
    }

    // Calculate the new employee's annual salary
    newEmployee.calculatePay();

    //Add new employee to the array
    this.employees.push(newEmployee);

    // Show updated list
    this.display();
  }

  // ========================================
  // REMOVE METHOD
  // Removes an employee by name
  // ========================================

  remove() {
    // Prompt user to remove an employee
    const name = prompt("Enter the name of the employee to remove:");

    // Exit without changes if Cancel is clicked
    if (name === null) {
      return;
    }

    //Remove extra spaces from the user input
    const searchName = name.trim().toLowerCase();

    // Make sure the user input is a name
    if (!searchName) {
      alert("Please enter an employee name.");
      return;
    }

    // Save original number of eployees
    const originalCount = this.employees.length;

    // Filter out and keep employees whose names do not match search input
    this.employees = this.employees.filter((employee) => {
      return employee.name.toLowerCase() !== searchName;
    });

    // Check if it was removed
    if (this.employees.length === originalCount) {
      alert("Employee not found. Please try again.");
      return;
    }

    // Confirm removal
    console.log(`${name.trim()} has been removed.`);

    // Update employee list
    this.display();
  }

  // ========================================
  // EDIT METHOD
  // Updates an employee's hourly pay rate
  // ========================================

  edit() {
    // Show current employee list for user selection
    this.display();

    // Prompt user for employee to edit
    const selection = prompt(
      "Enter the number of the employee you want to edit:",
    );

    // Exit without changes if Cancel is clicked
    if (selection === null) {
      return;
    }

    // Convert user input to a number
    const employeeNumber = Number(selection);

    // Validate user input for employee number
    if (
      !Number.isInteger(employeeNumber) ||
      employeeNumber < 1 ||
      employeeNumber > this.employees.length ||
      selection.trim() === ""
    ) {
      alert("Please enter a valid employee number.");
      return;
    }

    // Adjust for index and array value mis-match
    const employee = this.employees[employeeNumber - 1];

    // Prompt user for new hourly pay rate
    const input = prompt(`Enter the new hourly pay rate for ${employee.name}:`);

    // Exit without changes if Cancel is clicked
    if (input === null) {
      return;
    }

    // Convert user input pay to a number
    const newPayRate = Number(input);

    // Validate new pay rate
    if (
      input.trim() === "" ||
      !Number.isFinite(newPayRate) ||
      newPayRate <= 0
    ) {
      alert("Please enter a valid hourly pay rate.");
      return;
    }

    // Update selected employee's pay rate
    employee.payRate = newPayRate;

    // Recalculate annual salary
    employee.calculatePay();

    // Confirm change and display updated list
    console.log(
      `${employee.name}'s pay rate updated to $${newPayRate} per hour.`,
    );
    this.display();
  }

  // ========================================
  // MENU METHOD
  // Displays options and handles user choices
  // ========================================
  menu() {
    // Keep showing the menu until the user chooses to exit
    let running = true;
    while (running) {
      // Prompt the user for a selection
      const choice = prompt(
        "EMPLOYEE TRACKER\n\n" +
          "1. Add Employee\n" +
          "2. Remove Employee\n" +
          "3. Edit Employee\n" +
          "4. Display Employees\n" +
          "5. Exit\n\n" +
          "Enter a number (1-5):",
      );

      // Call the method
      switch (choice) {
        case "1":
          this.add();
          break;
        case "2":
          this.remove();
          break;
        case "3":
          this.edit();
          break;
        case "4":
          this.display();
          break;
        case "5":
        case null:
          running = false;
          console.log("Employee Tracker - closed.");
          break;
        default:
          alert("Please enter a number from 1-5.");
      }
    }
  }
}

// ========================================
// IIFE
// Creates an instance of the Main class
// ========================================

(() => {
  new Main();
})();
