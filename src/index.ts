import { calculateEMI, calculateEMISchedule } from "./services/loanCals";

let x = calculateEMI({ interest: 0.06, tenure: 120, principal: 100000 });
let y = calculateEMISchedule({ interest: 0.06, tenure: 120, principal: 100000 });
console.log(x);
console.log(y);
