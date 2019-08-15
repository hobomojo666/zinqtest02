function graphReady(){
var startingBalance = parseFloat(document.getElementById("demo").innerHTML.replace(/,/g, ''));
var paymentFreq = document.getElementById("exampleFormControlSelect1").value
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
var time = Number(document.getElementById("formGroupLoan").value)
var interestPercentRate = Number(document.getElementById("formGroupInterest").value)/100
var interest = interestPercentRate*startingBalance;
var beforeRepayment = parseFloat(document.getElementById("monthlyRepayment").innerHTML.replace(/,/g, '')) 
var repayment = beforeRepayment * paymentFrequencyNumber
var closingBalance = startingBalance - repayment + interest;

var timeArray = []
var startingBalanceArray = []
var interestArray=[]
var repaymentArray=[]
var closingBalanceArray=[]
console.log(time)
for(i=0;i<(time+1);i++){
    
    timeArray.push(i)
    startingBalanceArray.push(startingBalance);
    interestArray.push(interest);
    repaymentArray.push(repayment);
    if ( closingBalance < 0 ){
        closingBalanceArray.push(0);
    }
    else{
        closingBalanceArray.push(closingBalance);
    }
    startingBalance = closingBalance
    interest = startingBalance * interestPercentRate
    closingBalance = startingBalance - repayment + interest

}
console.log(timeArray)
console.log(startingBalanceArray)
console.log(interestArray)
console.log(repaymentArray)
console.log(closingBalanceArray)


if(document.getElementById("formGroupLoan").value == "" || document.getElementById("formGroupInterest").value == ""){
    alert("To see the graph Please enter Term of Loan and Interest Rate in the forms");
}

else { 
    Highcharts.chart('container', {
        chart: {
            type: 'area'
        },
        accessibility: {
            description: 'An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
        },
        title: {
            text: 'Zinq Model'
        },
        subtitle: {
            text: 'Tailored for you.'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
            
        },
        yAxis: {
            title: {
                text: 'Loan Amount'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            formatter:function(){
                return 'Year ' + this.x + '<br>' + Math.round((this.x/time)*100) +'% paid off ' + (100-((this.x/time)*100)) + "% to go.Great work!<br><br>" +"Estimated monthly repayment: $" + beforeRepayment      ;
              }
           
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [ {
            name: 'Time',
            data: startingBalanceArray
         }]
        });
    }


}


