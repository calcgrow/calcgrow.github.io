function calculatePercentage() {
  let value = document.getElementById("value").value;
  let percent = document.getElementById("percent").value;

  if (value === "" || percent === "") {
    document.getElementById("result").innerText = "Please enter both values";
    return;
  }

  let result = (value * percent) / 100;
  document.getElementById("result").innerText =
    percent + "% of " + value + " = " + result;
}
function calculateGST() {
  let price = document.getElementById("gstPrice").value;
  let gst = document.getElementById("gstPercent").value;

  if(price === "" || gst === "") {
    document.getElementById("gstResult").innerText = "Please enter both values";
    return;
  }

  let gstAmount = (price * gst) / 100;
  let total = parseFloat(price) + parseFloat(gstAmount);

  document.getElementById("gstResult").innerText =
    "GST: " + gstAmount + " | Total Price: " + total
    ;
}
// EMI Calculator
function calculateEMI() {
  let p = document.getElementById("emiPrincipal").value;
  let r = document.getElementById("emiRate").value;
  let n = document.getElementById("emiMonths").value;
  
  if(p=="" || r=="" || n=="") {
    document.getElementById("emiResult").innerText = "Please enter all values"; return;
  }
  
  let monthlyRate = r / 12 / 100;
  let emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  document.getElementById("emiResult").innerText = "Monthly EMI: " + emi.toFixed(2);
}

// SIP Calculator
function calculateSIP() {
  let p = document.getElementById("sipAmount").value;
  let r = document.getElementById("sipRate").value;
  let t = document.getElementById("sipYears").value;

  if(p=="" || r=="" || t=="") {
    document.getElementById("sipResult").innerText = "Please enter all values"; return;
  }

  let monthlyRate = r / 12 / 100;
  let months = t * 12;
  let maturity = p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  
  document.getElementById("sipResult").innerText = "Maturity Amount: " + maturity.toFixed(2);
}

// Age Calculator
function calculateAge() {
  let dob = document.getElementById("dob").value;
  if(dob === "") {
    document.getElementById("ageResult").innerText = "Please select date"; return;
  }
  
  let birthDate = new Date(dob);
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  document.getElementById("ageResult").innerText = "You are " + age + " years old";
}

// YouTube Calculator
function calculateYouTube() {
  let views = document.getElementById("ytViews").value;
  // Avg CPM assumption $1 per 1000 views (approx)
  let earnings = (views / 1000) * 1; 
  document.getElementById("ytResult").innerText = "Est. Daily Earnings: $" + earnings.toFixed(2);
}

// Instagram Calculator
function calculateInsta() {
  let followers = document.getElementById("instaFollowers").value;
  // Rough estimate logic
  let earnings = (followers * 0.01); 
  document.getElementById("instaResult").innerText = "Est. Earnings per post: $" + earnings.toFixed(2);
}

// Adsense Calculator
function calculateAdsense() {
  let impressions = document.getElementById("adsenseImpressions").value;
  let ctr = document.getElementById("adsenseCTR").value;
  let cpc = document.getElementById("adsenseCPC").value;
  
  let clicks = (impressions * ctr) / 100;
  let earnings = clicks * cpc;
  
  document.getElementById("adsenseResult").innerText = "Est. Earnings: $" + earnings.toFixed(2);
}

// Salary Calculator
function calculateSalary() {
  let ctc = document.getElementById("ctc").value;
  let monthly = ctc / 12;
  document.getElementById("salaryResult").innerText = "Monthly Gross: " + monthly.toFixed(2);
}

// Income Tax Calculator (Basic Slabs)
function calculateTax() {
  let income = document.getElementById("income").value;
  let tax = 0;
  
  // Simplified New Regime Slabs for estimation
  if(income > 300000 && income <= 600000) tax = (income - 300000) * 0.05;
  else if(income > 600000 && income <= 900000) tax = 15000 + (income - 600000) * 0.10;
  else if(income > 900000 && income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
  else if(income > 1200000 && income <= 1500000) tax = 90000 + (income - 1200000) * 0.20;
  else if(income > 1500000) tax = 150000 + (income - 1500000) * 0.30;
  
  document.getElementById("taxResult").innerText = "Est. Annual Tax: " + tax.toFi
    xed(2);
}
