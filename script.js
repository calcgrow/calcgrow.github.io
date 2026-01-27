// Navigation Functions
function openCalc(id) {
  // Hide Menu
  document.getElementById('mainMenu').style.display = 'none';
  // Show Selected Calculator
  document.getElementById(id).style.display = 'block';
}

function goHome() {
  // Hide all sections
  let sections = document.querySelectorAll('.container');
  sections.forEach(sec => sec.style.display = 'none');
  // Show Menu
  document.getElementById('mainMenu').style.display = 'grid';
}

// --- Calculator Logic Starts Below ---

function calculatePercentage() {
  let val = document.getElementById("value").value;
  let per = document.getElementById("percent").value;
  if(val=="" || per=="") { alert("Enter values"); return; }
  document.getElementById("result").innerText = (val * per) / 100;
}

function calculateGST() {
  let p = document.getElementById("gstPrice").value;
  let g = document.getElementById("gstPercent").value;
  if(p=="" || g=="") { alert("Enter values"); return; }
  let amt = (p * g) / 100;
  let tot = parseFloat(p) + parseFloat(amt);
  document.getElementById("gstResult").innerText = "GST: " + amt + " | Total: " + tot;
}

function calculateEMI() {
  let p = document.getElementById("emiPrincipal").value;
  let r = document.getElementById("emiRate").value;
  let n = document.getElementById("emiMonths").value;
  if(p=="" || r=="" || n=="") return;
  let mr = r / 12 / 100;
  let emi = (p * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
  document.getElementById("emiResult").innerText = "EMI: " + emi.toFixed(2);
}

function calculateSIP() {
  let p = document.getElementById("sipAmount").value;
  let r = document.getElementById("sipRate").value;
  let t = document.getElementById("sipYears").value;
  if(p=="" || r=="" || t=="") return;
  let mr = r / 12 / 100;
  let m = t * 12;
  let mat = p * ((Math.pow(1 + mr, m) - 1) / mr) * (1 + mr);
  document.getElementById("sipResult").innerText = "Maturity: " + mat.toFixed(2);
}

function calculateAge() {
  let dob = document.getElementById("dob").value;
  if(!dob) return;
  let b = new Date(dob);
  let n = new Date();
  let age = n.getFullYear() - b.getFullYear();
  if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) age--;
  document.getElementById("ageResult").innerText = "Age: " + age + " Years";
}

function calculateYouTube() {
  let v = document.getElementById("ytViews").value;
  document.getElementById("ytResult").innerText = "Est. Earnings: $" + ((v/1000)*1).toFixed(2);
}

function calculateInsta() {
  let f = document.getElementById("instaFollowers").value;
  document.getElementById("instaResult").innerText = "Est. Earnings: $" + (f*0.01).toFixed(2);
}

function calculateAdsense() {
  let i = document.getElementById("adsenseImpressions").value;
  let c = document.getElementById("adsenseCTR").value;
  let p = document.getElementById("adsenseCPC").value;
  let earn = ((i*c)/100) * p;
  document.getElementById("adsenseResult").innerText = "Revenue: $" + earn.toFixed(2);
}

function calculateSalary() {
  let ctc = document.getElementById("ctc").value;
  document.getElementById("salaryResult").innerText = "Monthly: " + (ctc/12).toFixed(2);
}

function calculateTax() {
  let inc = document.getElementById("income").value;
  let tax = 0;
  if(inc > 300000) tax = (inc - 300000) * 0.05; // Simplified
  document.getElementById("taxResult").innerText = "Est. Tax: " + tax.toFixed(2);
}
