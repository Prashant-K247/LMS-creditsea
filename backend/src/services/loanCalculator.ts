export const calculateLoan =(principal: number, tenureDays: number)=>{
    const interestRate = 12;

    const simpleInterest =(principal * interestRate * tenureDays) / (365 * 100);

    const totalRepayment = principal + simpleInterest;

    return {
        interestRate,
        simpleInterest: Number(simpleInterest.toFixed(2)),
        totalRepayment:Number( totalRepayment.toFixed(2)),
    };
};