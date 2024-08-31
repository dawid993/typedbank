"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loanCals_1 = require("./services/loanCals");
var x = (0, loanCals_1.calculateEMI)({ interest: 0.06, tenure: 120, principal: 100000 });
var y = (0, loanCals_1.calculateEMISchedule)({ interest: 0.06, tenure: 120, principal: 100000 });
console.log(x);
console.log(y);
