/**
 * Student Dto
 * @param {string}    first_name      - first name of the student
 * @param {string}    last_name       - last name of the student
 * @param {number}    age             - age of the student
 * @param {number}    roll_number     - roll number of the student
 * @param {string}    email           - email id of the student
 */

export interface StudentDtoInterface {
  first_name: string;
  last_name: string;
  age: number;
  roll_number: number;
  email: string;
}
