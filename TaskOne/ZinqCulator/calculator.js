var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var termOfLoan = document.getElementById("formGroupLoan");
var interestRate = document.getElementById("formGroupInterest");
var paymentFrequency = document.getElementById("exampleFormControlSelect1");
var monthlyRepaymentDOM = document.getElementById("monthlyRepayment");
var totalLoanDOM = document.getElementById("totalLoan");


var frequency = { 
  "weekly":52.17857,
  "fortnightly":26.08929,
  "monthly":12,
  "quarterly":4,
  "half year":2,
  "year":1
}

for( key in frequency){
  if(paymentFrequency.value.toString().toLowerCase()==key){
    var paymentFrequencyNumber = frequency[key]
  }
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


var loanAmount1 = slider.value;
output.innerHTML = formatNumber(loanAmount1);
var r = interestRate.value;
var m = paymentFrequencyNumber;
var n = termOfLoan.value;




interestRate.addEventListener('input', function()
{
    var r = interestRate.value;
    var n = termOfLoan.value;
    for( key in frequency){
      if(paymentFrequency.value.toString().toLowerCase()==key){
        var paymentFrequencyNumber = frequency[key]
      }
    }
    var m = paymentFrequencyNumber;
  
    if(r == ""){
      monthlyRepaymentDOM.innerHTML = ""
      totalLoanDOM.innerHTML = ""
      }
    else{
      if(n == ""){
        monthlyRepaymentDOM.innerHTML = ""
        totalLoanDOM.innerHTML = ""
      }
      else{
      var nom = ((r/100)/m) * loanAmount1
      var den = 1-Math.pow((1+((r/100)/m)),-m*n)
      var monthlyRepayment = (nom/den).toFixed(2);
      var left = (monthlyRepayment/((r/100)/m))
      var right = Math.pow((1+((r/100)/m)),m*n) -1;
      var totalCostLoan = (left * right).toFixed(2);
      monthlyRepaymentDOM.innerHTML = formatNumber(monthlyRepayment)
      totalLoanDOM.innerHTML = formatNumber(totalCostLoan)
      }
    }
    console.log(n)
});


paymentFrequency.addEventListener('input', function()
{
  var r = interestRate.value;
  var n = termOfLoan.value;
  if(r == ""){
    monthlyRepaymentDOM.innerHTML = ""
    totalLoanDOM.innerHTML = ""
    }else{
      if(n == ""){
        monthlyRepaymentDOM.innerHTML = ""
        totalLoanDOM.innerHTML = ""
      }
      else{
  for( key in frequency){
    if(paymentFrequency.value.toString().toLowerCase()==key){
      var paymentFrequencyNumber = frequency[key]
    }
  }
    var m = paymentFrequencyNumber
    var nom = ((r/100)/m) * loanAmount1
    var den = 1-Math.pow((1+((r/100)/m)),-m*n)
    var monthlyRepayment = (nom/den).toFixed(2);
    var left = (monthlyRepayment/((r/100)/m))
    var right = Math.pow((1+((r/100)/m)),m*n) -1;
    var totalCostLoan = (left * right).toFixed(2);
    monthlyRepaymentDOM.innerHTML = formatNumber(monthlyRepayment)
    totalLoanDOM.innerHTML = formatNumber(totalCostLoan)
    console.log(m)
}
}
    
});
termOfLoan.addEventListener('input', function()
{ 
    var n = termOfLoan.value;
    var r = interestRate.value;
    for( key in frequency){
      if(paymentFrequency.value.toString().toLowerCase()==key){
        var paymentFrequencyNumber = frequency[key]
      }
    }
    var m = paymentFrequencyNumber;
    if(n == ""){
    monthlyRepaymentDOM.innerHTML = ""
    totalLoanDOM.innerHTML = ""
    }
    else{
      if(r == ""){
        monthlyRepaymentDOM.innerHTML = ""
        totalLoanDOM.innerHTML = ""
      }
      else{
        var nom = ((r/100)/m) * loanAmount1
        var den = 1-Math.pow((1+((r/100)/m)),-m*n)
        var monthlyRepayment = (nom/den).toFixed(2);
        var left = (monthlyRepayment/((r/100)/m))
        var right = Math.pow((1+((r/100)/m)),m*n) -1;
        var totalCostLoan = (left * right).toFixed(2);
        monthlyRepaymentDOM.innerHTML = formatNumber(monthlyRepayment)
        totalLoanDOM.innerHTML = formatNumber(totalCostLoan)
      }
   
    }
    console.log(n)
});


slider.oninput = function() {
  output.innerHTML = formatNumber(this.value);
  var n = termOfLoan.value;
  var r = interestRate.value;
  for( key in frequency){
    if(paymentFrequency.value.toString().toLowerCase()==key){
      var paymentFrequencyNumber = frequency[key]
    }
  }
  var m = paymentFrequencyNumber;
  
  if(n == ""){
    monthlyRepaymentDOM.innerHTML = ""
    totalLoanDOM.innerHTML = ""
    }
    else{
      if(r == ""){
        monthlyRepaymentDOM.innerHTML = ""
        totalLoanDOM.innerHTML = ""
      }
      else{
        var loanAmount1 = this.value
  var nom = ((r/100)/m) * loanAmount1
var den = 1-Math.pow((1+((r/100)/m)),-m*n)
var monthlyRepayment = (nom/den).toFixed(2);
var left = (monthlyRepayment/((r/100)/m))
var right = Math.pow((1+((r/100)/m)),m*n) -1;
var totalCostLoan = (left * right).toFixed(2)
console.log(monthlyRepayment)
monthlyRepaymentDOM.innerHTML = formatNumber(monthlyRepayment)
totalLoanDOM.innerHTML = formatNumber(totalCostLoan)
console.log(m,r,n)
      }
   
    }
  
}