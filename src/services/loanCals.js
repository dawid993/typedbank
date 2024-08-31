"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEMI = calculateEMI;
exports.calculateEMISchedule = calculateEMISchedule;
exports.calculateVMISchedule = calculateVMISchedule;
function calculateEMI(loanParams) {
    var interest = loanParams.interest, tenure = loanParams.tenure, principal = loanParams.principal;
    var monthlyInterest = calculateMonthlyInterest(interest);
    return principal * monthlyInterest
        * ((Math.pow(1 + monthlyInterest, tenure)) / (Math.pow(1 + monthlyInterest, tenure) - 1));
}
var calculateMonthlyInterest = function (interest) { return interest / 12; };
function calculateEMISchedule(loanParams) {
    var emiInstallment = calculateEMI(loanParams);
    var interest = loanParams.interest, tenure = loanParams.tenure;
    var installments = [];
    var monthlyInterest = calculateMonthlyInterest(interest);
    var principal = loanParams.principal;
    for (var i = 1; i <= tenure; i++) {
        var interestPart = principal * monthlyInterest;
        var principalPart = emiInstallment - interestPart;
        principal -= principalPart;
        installments.push({
            order: i,
            total: emiInstallment,
            principal: principalPart,
            interest: interestPart
        });
    }
    return installments;
}
var validateRoundParam = function (round) {
    if (round < 0) {
        throw new Error('Round param cannot be lower than 0. Is: ' + round);
    }
};
/*
* There is no need for function which calculates VMI installment because every installment
* is different.
*/
function calculateVMISchedule(loanParams) {
    var interest = loanParams.interest, tenure = loanParams.tenure;
    var installments = [];
    var principal = loanParams.principal;
    var monthlyInterest = calculateMonthlyInterest(interest);
    var principalRate = principal / tenure;
    for (var i = 1; i <= tenure; i++) {
        var interestPart = principal * monthlyInterest;
        var installment = principalRate + interestPart;
        principal -= principalRate;
        installments.push({
            order: i,
            total: installment,
            principal: principalRate,
            interest: interestPart
        });
    }
    return installments;
}
