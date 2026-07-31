const API = "http://127.0.0.1:8000/scan/";


chrome.webNavigation.onBeforeNavigate.addListener(async (details)=>{


    if(details.frameId !== 0)
        return;


    const url = details.url;


    if(
        url.startsWith("chrome://") ||
        url.startsWith("chrome-extension://")
    ){
        return;
    }



    console.log(
        "Checking:",
        url
    );


    try{


        const response = await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                url:url
            })

        });



        const result = await response.json();


        console.log(
            "Result:",
            result
        );



        if(
            result.prediction &&
            result.prediction.toLowerCase() === "phishing"
        ){


            console.log(
                "Blocking phishing URL"
            );


            const warning =
                chrome.runtime.getURL(
                    "warning.html"
                )
                +
                "?url="
                +
                encodeURIComponent(url)
                +
                "&reason="
                +
                encodeURIComponent(
                    result.reason ||
                    "Suspicious website detected"
                );


            chrome.tabs.update(
                details.tabId,
                {
                    url: warning
                }
            );


        }


    }
    catch(err){

        console.log(
            "ERROR:",
            err
        );

    }


});