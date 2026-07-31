const API = "http://127.0.0.1:8000/scan/";

const domain = document.getElementById("domain");
const status = document.getElementById("status");
const statusSub = document.getElementById("statusSub");
const scanBtn = document.getElementById("scan");
const ringWrap = document.getElementById("ringWrap");

let currentUrl = "";

function setState(state) {
  // state: "checking" | "safe" | "phishing" | "offline"
  ringWrap.className = "ring-wrap " + (state === "offline" ? "phishing" : state);
  status.className = "status-label " + (state === "offline" ? "phishing" : state);
}

async function scanCurrentSite() {

  status.innerText = "Checking...";
  statusSub.innerText = "Analyzing site signals";
  setState("checking");

  try {

    const response = await fetch(API, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        url: currentUrl
      })

    });

    const result = await response.json();

    if (result.prediction === "Phishing") {

      status.innerText = "Phishing";
      statusSub.innerText = "This site shows risky signals";
      setState("phishing");

    } else {

      status.innerText = "Safe";
      statusSub.innerText = "No threats detected";
      setState("safe");

    }

  }

  catch (err) {

    status.innerText = "Offline";
    statusSub.innerText = "Could not reach LinkGuard server";
    setState("offline");

  }

}

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  (tabs) => {

    currentUrl = tabs[0].url;

    try {

      const hostname = new URL(currentUrl).hostname;

      domain.innerText = hostname;

    }

    catch {

      domain.innerText = currentUrl;

    }

    scanCurrentSite();

  }
);

scanBtn.addEventListener("click", scanCurrentSite);

document
  .getElementById("history")
  .addEventListener(
    "click",
    () => {

      chrome.tabs.create({

        url: chrome.runtime.getURL(
          "history.html"
        )

      });

    });