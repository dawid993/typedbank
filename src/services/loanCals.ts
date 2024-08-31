export interface LoanParams {
    interest: number,
    tenure: number,
    principal: number
}

export interface LoanInstallment {
    order: number,
    total: number,
    principal: number,
    interest: number
}

export interface LoanDetails {
    loanParams: LoanParams,
    loanInstallments: LoanInstallment[]
}

export function calculateEMI(loanParams: LoanParams) {
    const { interest, tenure, principal } = loanParams;

    const monthlyInterest = calculateMonthlyInterest(interest);
    return principal * monthlyInterest
        * ((Math.pow(1 + monthlyInterest, tenure)) / (Math.pow(1 + monthlyInterest, tenure) - 1))
}

const calculateMonthlyInterest = (interest: number) => interest / 12;

export function calculateEMISchedule(loanParams: LoanParams) {
    const emiInstallment = calculateEMI(loanParams);
    const { interest, tenure } = loanParams;
    const installments: LoanInstallment[] = [];
    const monthlyInterest = calculateMonthlyInterest(interest);

    let principal = loanParams.principal;

    for (let i = 1; i <= tenure; i++) {
        const interestPart = principal * monthlyInterest;
        const principalPart = emiInstallment - interestPart;
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

/*
* There is no need for function which calculates VMI installment because every installment
* is different.
*/
export function calculateVMISchedule(loanParams: LoanParams) {
    const { interest, tenure } = loanParams;
    const installments: LoanInstallment[] = [];

    let principal = loanParams.principal;

    const monthlyInterest = calculateMonthlyInterest(interest);
    const principalRate = principal / tenure;

    for (let i = 1; i <= tenure; i++) {
        const interestPart = principal * monthlyInterest;
        const installment = principalRate + interestPart;
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