/* ===============================
   YouTube Channel Analyzer Logic
   =============================== */
// ================================
// YouTube Channel Analyzer (Phase-1)
// ================================

// Utility: format numbers
function formatNumber(num) {
  return num.toLocaleString();
}

// Extract channel identifier from URL / handle
function extractChannel(input) {
  input = input.trim();

  if (input.includes("youtube.com")) return input;
  if (input.startsWith("@")) return "https://www.youtube.com/" + input;

  return "https://www.youtube.com/@" + input;
}

// Main Analyzer (mock + logic-ready)
function analyzeChannel() {
  const input = document.getElementById("channelInput").value;
  if (!input) {
    alert("Enter Channel URL or Handle");
    return;
  }

  const channelURL = extractChannel(input);

  // ⚠️ Phase-1: Estimated / Smart Logic (API later)
  const subs = Math.floor(Math.random() * 900000 + 10000);
  const viewsPerMonth = subs * 12;
  const rpm = subs > 100000 ? 6 : 3;

  const monthly = (viewsPerMonth / 1000) * rpm;
  const daily = monthly / 30;
  const yearly = monthly * 12;

  // Output
  document.getElementById("channelLink").href = channelURL;
  document.getElementById("subs").innerText = formatNumber(subs);
  document.getElementById("rpm").innerText = "$" + rpm;
  document.getElementById("daily").innerText = "$" + daily.toFixed(2);
  document.getElementById("monthly").innerText = "$" + monthly.toFixed(2);
  document.getElementById("yearly").innerText = "$" + yearly.toFixed(2);

  document.getElementById("result").style.display = "block";
}
