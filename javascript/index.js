


function serveripclick(){
document.getElementById("main-menu").classList.replace("show", "hide");
document.getElementById("server-menu").classList.replace("hide", "show");
console.log("serveripclick");
}

function getserverip(ip){
document.getElementById("server-menu").classList.replace("show", "hide");
document.getElementById("main-menu").classList.replace("hide", "show");
CopyToClipboard(ip);
console.log("getserverip");

}


async function CopyToClipboard(id){
	var copyText = document.getElementById(id);
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(copyText.value);
	console.log("CopyToClipboard");
	document.getElementById("server-ip").classList.replace("hide", "show");
	document.getElementById("server-ip-text").innerText = 'Copyed to clipboard:\n' + copyText.value;
	await new Promise(r => setTimeout(r, 5000));
	document.getElementById("server-ip").classList.replace("show", "hide");
}






