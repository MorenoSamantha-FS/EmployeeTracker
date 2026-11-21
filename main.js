"use strict";

// ========================================
// EMPLOYEE CLASS
// Base class for shared employee information
// ========================================

class Employee {}

// ========================================
// PARTTIME CLASS
// Inherits from Employee
// ========================================

class PartTime extends Employee {}

// ========================================
// MANAGER CLASS
// Inherits from Employee
// ========================================

class Manager extends Employee {}

// ========================================
// MAIN CLASS
// Controls the Employee Tracker application
// ========================================

class Main {}

// ========================================
// IIFE
// Creates an instance of the Main class
// ========================================

(() => {
  new Main();
})();
