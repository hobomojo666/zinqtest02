var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var cashback = document.getElementById("cashback");
var trailling = document.getElementById("trailling");

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

var loanAmount1 = slider.value;
output.innerHTML = formatNumber(loanAmount1);
var upFrontComm = Math.round(loanAmount1 * 0.006 - 1318 );
var traillingCom = Math.round(loanAmount1 * 0.03616027 - 3062.6 );
cashback.innerHTML = formatNumber(upFrontComm);
trailling.innerHTML = formatNumber(traillingCom);

slider.oninput = function() {
  output.innerHTML = formatNumber(this.value);
  var upFrontComm = Math.round(this.value * 0.006 - 1318 );
  var traillingCom = Math.round(this.value * 0.03616027 - 3062.6 );
  cashback.innerHTML = formatNumber(upFrontComm);
  trailling.innerHTML = formatNumber(traillingCom);
}

