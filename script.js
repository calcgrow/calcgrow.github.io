// Function for YouTube Calculator
function calculateYoutube() {
    // Get values
    const views = document.getElementById('ytViews').value;
    const rpm = document.getElementById('ytRpm').value;

    // Logic: (Views / 1000) * RPM * 30 days
    if(views && rpm) {
        const daily = (views / 1000) * rpm;
        const monthly = daily * 30;
        
        // Show result formatted as Currency
        document.getElementById('ytResult').innerText = "$" + monthly.toFixed(2);
    } else {
        alert("Please enter valid views!");
    }
}
