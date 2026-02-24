// ==========================================
// CALCGROW INTELLIGENCE ENGINE v2.0 (PRO)
// ==========================================

// ⚠️ YOUR API KEY HERE
const YT_API_KEY = "AIzaSy..."; 

// --- UTILITY FUNCTIONS ---
const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

const formatMoney = (amount, symbol) => {
    return symbol + amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

const formatRange = (min, max, symbol) => {
    // If numbers are huge, use K/M abbreviation
    const simpleFmt = (n) => {
        if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n/1000).toFixed(1) + 'K';
        return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    };
    return `${symbol}${simpleFmt(min)} - ${symbol}${simpleFmt(max)}`;
};

// --- CORE ANALYTICS FUNCTION ---
async function analyzeChannel() {
    let input = document.getElementById('channelInput').value.trim();
    const btn = document.querySelector('.analyze-btn');
    const loaderBox = document.getElementById('loaderBox');
    const loaderBar = document.getElementById('loaderBar');
    const statusText = document.getElementById('statusText');

    if (!input) { alert("Please enter a channel name or handle!"); return; }

    // UI Loading State
    btn.disabled = true;
    btn.style.opacity = '0.7';
    loaderBox.style.display = 'block';
    loaderBar.style.width = '10%';
    statusText.innerText = "Connecting to YouTube API...";

    try {
        // STEP 1: Smart Search
        setTimeout(() => { loaderBar.style.width = '40%'; statusText.innerText = "Searching Channel..."; }, 500);

        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(input)}&key=${YT_API_KEY}&maxResults=1`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (searchData.items && searchData.items.length > 0) {
            const channelId = searchData.items[0].snippet.channelId;

            // STEP 2: Fetch Deep Stats
            setTimeout(() => { loaderBar.style.width = '70%'; statusText.innerText = "Analyzing Metrics..."; }, 800);
            
            const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YT_API_KEY}`;
            const statsRes = await fetch(statsUrl);
            const statsData = await statsRes.json();

            if (statsData.items && statsData.items.length > 0) {
                // Success
                loaderBar.style.width = '100%';
                statusText.innerText = "Data Retrieved Successfully!";
                
                setTimeout(() => {
                    updateUI(statsData.items[0]);
                    resetLoader();
                }, 800);
            } else {
                throw new Error("Stats not accessible");
            }
        } else {
            alert("Channel not found! Please check spelling.");
            resetLoader();
        }

    } catch (error) {
        console.error(error);
        alert("Connection Error. Please try again.");
        resetLoader();
    }
}

function resetLoader() {
    const btn = document.querySelector('.analyze-btn');
    const loaderBox = document.getElementById('loaderBox');
    
    btn.disabled = false;
    btn.style.opacity = '1';
    setTimeout(() => {
        loaderBox.style.display = 'none';
        document.getElementById('loaderBar').style.width = '0%';
        document.getElementById('statusText').innerText = "";
    }, 1000);
}

// --- UI UPDATE HANDLER ---
function updateUI(channel) {
    // Reveal Header
    document.getElementById('channelData').style.display = 'flex';
    
    // Set Basic Info
    document.getElementById('chName').innerText = channel.snippet.title;
    document.getElementById('chSubs').innerText = formatNumber(channel.statistics.subscriberCount);
    document.getElementById('chLogo').src = channel.snippet.thumbnails.high.url;

    // Smart View Estimation Algorithm
    let subs = parseInt(channel.statistics.subscriberCount);
    
    // Algorithm: Active channels get ~2-5% of subs as daily views
    // If very small channel (<10k subs), assume higher engagement (5-10%)
    let activityRatio = subs < 10000 ? 0.08 : 0.03; 
    let estimatedDailyViews = Math.floor(subs * activityRatio);

    // Caps for realism
    if (estimatedDailyViews < 500) estimatedDailyViews = 500;
    if (estimatedDailyViews > 50000000) estimatedDailyViews = 50000000;

    // Update Slider
    let slider = document.getElementById('viewSlider');
    slider.value = estimatedDailyViews;
    
    // Store Subs count globally for Brand Deal Calc
    window.currentSubs = subs;

    manualUpdate(estimatedDailyViews);
}

function manualUpdate(val) {
    document.getElementById('viewsVal').innerText = parseInt(val).toLocaleString();
    reCalculate();
}

// --- FINANCIAL ENGINE ---
function reCalculate() {
    let dailyViews = parseInt(document.getElementById('viewSlider').value);
    let baseRPM = parseFloat(document.getElementById('nicheSelect').value);
    let currency = document.getElementById('currencySelect').value;
    
    // Default Subs for manual mode if not fetched
    let subs = window.currentSubs || (dailyViews * 20); 

    // 1. Calculate Ad Revenue Range
    let minRPM = baseRPM * 0.8; 
    let maxRPM = baseRPM * 1.5;

    let minDailyUSD = (dailyViews / 1000) * minRPM;
    let maxDailyUSD = (dailyViews / 1000) * maxRPM;

    // 2. Calculate Brand Deal (Estimated)
    // Formula: $10 - $30 per 1,000 avg views (approx)
    let minDealUSD = (dailyViews / 1000) * 10;
    let maxDealUSD = (dailyViews / 1000) * 30;
    
    // Brand deal floor based on subs prestige
    if (subs > 100000) minDealUSD += 500; 

    // 3. Currency Conversion
    let rate = 1; 
    let symbol = "$";

    if (currency === "INR") { rate = 85; symbol = "₹"; }
    if (currency === "EUR") { rate = 0.92; symbol = "€"; }
    if (currency === "GBP") { rate = 0.79; symbol = "£"; }

    // 4. Update DOM
    const U = (val) => val * rate;

    // Main Card (Monthly)
    document.getElementById('monthlyRes').innerText = formatRange(U(minDailyUSD * 30), U(maxDailyUSD * 30), symbol);

    // Stats Grid
    document.getElementById('dailyRes').innerText = formatRange(U(minDailyUSD), U(maxDailyUSD), symbol);
    document.getElementById('weeklyRes').innerText = formatRange(U(minDailyUSD * 7), U(maxDailyUSD * 7), symbol);
    document.getElementById('yearlyRes').innerText = formatRange(U(minDailyUSD * 365), U(maxDailyUSD * 365), symbol);

    // Brand Deal Result
    document.getElementById('brandDealRes').innerText = formatRange(U(minDealUSD), U(maxDealUSD), symbol);
}

// --- SHARE FEATURE ---
function shareResult() {
    const channelName = document.getElementById('chName').innerText;
    const income = document.getElementById('monthlyRes').innerText;
    
    const text = `Check out the estimated earnings for ${channelName} on CalcGrow!\nMonthly: ${income}\nAnalyze here: https://calcgrow.github.io`;
    
    if (navigator.share) {
        navigator.share({
            title: 'CalcGrow Report',
            text: text,
            url: 'https://calcgrow.github.io'
        }).catch(console.error);
    } else {
        // Fallback for desktop
        alert("Copied to clipboard:\n" + text);
        navigator.clipboard.writeText(text);
    }
}

// Init
reCalculate();
