import { calculateAge } from "../utils/calculateAge.js";

interface BREInput {
    pan: string;
    dob: Date;
    monthlySalary: number;
    employmentMode: string;
}
export const runBRE = (data: BREInput)=>{
    const panRegex =/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(data.pan)) {
        return {passed: false, reason: "Invalid PAN format"};
    }

    const age = calculateAge(data.dob);

    if (age < 23 || age > 50) {
        return {passed: false, reason:"Age must be between 23 and 50"};
    }

    if (data.monthlySalary < 25000) {
        return {passed: false, reason:"salary must be at >= ₹25,000"};
    }

    if (data.employmentMode==="UNEMPLOYED") {
        return {passed: false, reason: "you should be employed to get a loan"};
    }

    return {passed: true,};
};