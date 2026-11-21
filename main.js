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

    // Temporarily displays the employees for testing
    console.log(this.employees);
  }
}

// ========================================
// IIFE
// Creates an instance of the Main class
// ========================================

(() => {
  new Main();
})();
