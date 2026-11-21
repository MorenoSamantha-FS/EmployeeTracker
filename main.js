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
          console.log("Add Employee - selected");
          break;
        case "2":
          console.log("Remove Employee - selected");
          break;
        case "3":
          console.log("Edit Employee - selected");
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
