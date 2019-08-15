var slider = document.getElementById("ageRange");
var output = document.getElementById("demo");
var result = document.getElementById("result");
var ageRange;

function formatNumber(num) {
  console.log(num);
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function getAge(dateString,d2) {
  year = dateString.substr(0,4)
  month = dateString.substr(5,2)
  day = dateString.substr(8,2)
  d1 = new Date(year, month, day)
  d2 = d2 || new Date();
  var diff = d2.getTime() - d1.getTime();
  console.log("age" , diff / (1000 * 60 * 60 * 24 * 365.25))
  return diff / (1000 * 60 * 60 * 24 * 365.25);
}

function convertBoolean(string) {
  return string === "Yes" ? true : false;
}

slider.oninput = function() {
  output.innerHTML = this.value;
  ageRange = this.value;
};

var rate = 1.05 / 1.03 - 1;
var discountFactor = 1 / (1 + rate);
var TPD_Expenses = 80000;
var traumaCoverExpenses = 80000;
var lifeCoverExpenses = 20000;

function LifeFutureIncomeSpouse(age, partner, futureIncomeScaling) {
  // a bit suspect here
  var result;
  if (age > 64 || !partner) {
    result = 0;
  } else {
    result =
      futureIncomeScaling *
      ((1 - Math.pow(discountFactor, 65 - age)) / (1 - discountFactor));
  }
  return result;
}

function FutureIncomeScaling(grossIncome) {
  return 0.5 * grossIncome;
}

function ChildrenExpenseScaling(grossIncome) {
  return 0.1 * grossIncome;
}

function TraumaChildrenExpenseScaling(grossIncome) {
  return 0.05 * grossIncome;
}

function LifeCoverDebts(totalLiabilities, totalAsset) {
  return Math.max(totalLiabilities - totalAsset, 0);
}

function DeppAgnYears(dependants, youngestDependants) {
  return 0.5 * dependants * Math.max(25 - youngestDependants, 0);
}

function LifeFutureIncomeChildren(childrenExpenseScaling, deppAgnYears) {
  return childrenExpenseScaling * deppAgnYears;
}

function TPD_FutureIncome(isSmoking, lifeFutureIncomeSpouse) {
  if (isSmoking) {
    return lifeFutureIncomeSpouse;
  } else {
    return 0.9 * lifeFutureIncomeSpouse;
  }
}

function TraumaFutureIncomeChildren(dependants, traumaChildrenExpenseScaling) {
  return dependants * traumaChildrenExpenseScaling;
}

function TempIncomeSupportSpouse(age, futureIncomeScaling) {
  if (age > 64) {
    return 0;
  } else {
    return 0.5 * futureIncomeScaling;
  }
}

function LifeCover(
  lifeCoverDebts,
  lifeFutureIncomeSpouse,
  lifeFutureIncomeChildren
) {
  var aggregate =
    lifeCoverExpenses +
    lifeCoverDebts +
    lifeFutureIncomeChildren +
    lifeFutureIncomeSpouse;
  return Math.round(Math.max(aggregate, 30000), 2);
}

function TPD_Cover(
  grossIncome,
  tpd_coverDebts,
  tpd_futureincome,
  tpd_futureincomechildren
) {
  var result;
  var aggregate =
    TPD_Expenses + tpd_coverDebts + tpd_futureincome + tpd_futureincomechildren;
  if (grossIncome > 1000000) {
    result = 0;
  } else if (aggregate >= 5000000) {
    result = 5000000;
  } else {
    result = Math.round(Math.max(aggregate, 50000), 2);
  }
  return result;
}

function TraumaCover(
  traumaCoverExpenses,
  tempIncomeSupportSpouse,
  traumaFutureIncomeChildren
) {
  var aggregate =
    traumaCoverExpenses + tempIncomeSupportSpouse + traumaFutureIncomeChildren;
  if (aggregate > 2000000) {
    return 2000000;
  } else {
    return Math.round(Math.max(aggregate, 100000), 2);
  }
}

function IP_Cover(age, grossIncome) {
  var calc = (0.75 * grossIncome) / 12;
  if (age > 64) {
    return 0;
  } else if (calc >= 60000) {
    return 60000;
  } else {
    return Math.round(Math.max(calc, 500), 2);
  }
}

function calculate() {
  var smoke = document.querySelector('input[name="radSmoke"]:checked').value;
  smoke = convertBoolean(smoke);
  var partner = document.querySelector('input[name="radPartner"]:checked')
    .value;
  partner = convertBoolean(partner);
  var grossIncome = document.querySelector('input[name="grossincome"]').value;
  var dependants = document.querySelector('input[name="dependants"]').value;
  var totalAsset = document.querySelector('input[name="totalassets"]').value;
  var totalLiabilities = document.querySelector(
    'input[name="totalliabilities"]'
  ).value;
  var age = getAge(document.querySelector('input[name="dateofbirth"]').value);
  var futureIncomeScaling = FutureIncomeScaling(grossIncome);
  var childrenExpenseScaling = ChildrenExpenseScaling(grossIncome);
  var traumaChildrenExpenseScaling = TraumaChildrenExpenseScaling(grossIncome);
  var deppAgnYears = DeppAgnYears(dependants, ageRange);
  var lifeFutureIncomeSpouse = LifeFutureIncomeSpouse(
    age,
    partner,
    futureIncomeScaling
  );
  var lifeFutureIncomeChildren = LifeFutureIncomeChildren(
    childrenExpenseScaling,
    deppAgnYears
  );
  var TPDFutureIncome = TPD_FutureIncome(smoke, lifeFutureIncomeSpouse);
  var lifeCoverDebts = LifeCoverDebts(totalLiabilities, totalAsset);
  var lifeCover = LifeCover(
    lifeCoverDebts,
    lifeFutureIncomeSpouse,
    lifeFutureIncomeChildren
  );

  var TPDFutureIncomeChildren = TPD_FutureIncome(
    smoke,
    lifeFutureIncomeChildren
  );

  var TPDCover = TPD_Cover(
    grossIncome,
    lifeCoverDebts,
    TPDFutureIncome,
    TPDFutureIncomeChildren
  );

  var tempIncomeSupportSpouse = TempIncomeSupportSpouse(
    age,
    futureIncomeScaling
  );

  var traumaFutureIncomeChildren = TraumaFutureIncomeChildren(
    dependants,
    traumaChildrenExpenseScaling
  );

  var traumaCover = TraumaCover(
    traumaCoverExpenses,
    tempIncomeSupportSpouse,
    traumaFutureIncomeChildren
  );

  var ipCover = IP_Cover(age, grossIncome);

  result.innerText = `LifeCover: ${lifeCover}\nTPD_Cover: ${TPDCover}\nTraumaCover: ${traumaCover}\nIPCover: ${ipCover}`;
}
