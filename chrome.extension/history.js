const API = "http://127.0.0.1:8000/scan/history";

const historyContainer = document.getElementById("history");
const statsContainer = document.getElementById("stats");
const clearBtn = document.getElementById("clear");

function renderStats(scans) {

    const total = scans.length;
    const safeCount = scans.filter(s => s.prediction === "Safe").length;
    const phishingCount = scans.filter(s => s.prediction === "Phishing").length;

    statsContainer.innerHTML = `
        <div class="stat">
            <div class="num">${total}</div>
            <div class="lbl">Total Scans</div>
        </div>

        <div class="stat safe">
            <div class="num">${safeCount}</div>
            <div class="lbl">Safe</div>
        </div>

        <div class="stat danger">
            <div class="num">${phishingCount}</div>
            <div class="lbl">Phishing</div>
        </div>
    `;
}

async function loadHistory() {

    historyContainer.innerHTML =
        '<div class="loading">Loading...</div>';

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Failed to fetch history.");
        }

        const scans = await response.json();

        console.log("History:", scans);

        if (!Array.isArray(scans) || scans.length === 0) {

            statsContainer.innerHTML = "";

            historyContainer.innerHTML = `
                <div class="loading">
                    No scan history found.
                </div>
            `;

            return;
        }

        renderStats(scans);

        historyContainer.innerHTML = "";

        scans.forEach(scan => {

            const isSafe = scan.prediction === "Safe";

            const item = document.createElement("div");

            item.className = "item";

            const date = scan.created_at
                ? new Date(scan.created_at).toLocaleString()
                : "Unknown";

            item.innerHTML = `
                <div class="badge ${isSafe ? "safe" : "phishing"}">
                    ${
                        isSafe
                        ? "✔"
                        : "⚠"
                    }
                </div>

                <div class="item-body">

                    <div class="url">
                        ${scan.url}
                    </div>

                    <div class="meta">

                        <span class="tag ${isSafe ? "safe" : "phishing"}">
                            ${scan.prediction}
                        </span>

                        <span class="time">
                            ${date}
                        </span>

                    </div>

                </div>
            `;

            historyContainer.appendChild(item);

        });

    }

    catch (err) {

        console.error(err);

        statsContainer.innerHTML = "";

        historyContainer.innerHTML = `
            <div class="loading">
                Unable to load history.
            </div>
        `;
    }
}

clearBtn.onclick = async () => {

    if (!confirm("Clear all scan history?"))
        return;

    try {

        const response = await fetch(API, {
            method: "DELETE"
        });

        const result = await response.json();

        alert(result.message);

        loadHistory();

    }

    catch (err) {

        console.error(err);

        alert("Unable to clear history.");

    }

};

loadHistory();