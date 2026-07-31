const params =
new URLSearchParams(
window.location.search
);


const url =
params.get("url");


const reason =
params.get("reason");



document.getElementById("url")
.innerText=url;



document.getElementById("reason")
.innerText=
reason ||
"Suspicious activity detected";



document.getElementById("back")
.onclick=()=>{

history.back();

};



document.getElementById("continue")
.onclick=()=>{


window.location.href=url;


};