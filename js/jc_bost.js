const doc 	= document; const $ = (tg) => {const trg = doc.querySelector(tg); return trg}; const $$ = (tg) => {const trg = doc.querySelectorAll(tg); return trg};

const ajax = {
	GET : (cf) => {const xhr = new XMLHttpRequest(); xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (cf.response == "print") {
					cf.target.innerHTML = xhr.responseText;
				} else if ( cf.response == "alert") {
					alert(xhr.responseText);
				};
			};
		};
		let sn = ""; if (!cf.send){console.log("!No Data Send")}else{sn = "?" + cf.send};
		xhr.open('GET', cf.url + sn, true);
		xhr.send();
	},
	POST : (cf) => {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (cf.response == "print") {
					cf.target.innerHTML = xhr.responseText;
				}
				else if ( cf.response == "alert") {
					alert(xhr.responseText);
				};
			};
		};
		xhr.open('POST', cf.url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(cf.send);
	},
	UPLOAD : (cf) => {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (cf.response == true) {
					console.log(xhr.responseText);
				}
				else if (cf.response == "print") {
					cf.target.innerHTML = xhr.responseText;
				}
				else if ( cf.response == "alert") {
					alert(xhr.responseText);
				};
			};
		};
		const form 	= new FormData();
		const input = cf.send;
		const file 	= input.files[0];
		const index = cf.send.getAttribute('name');

		form.append(index, file);

		xhr.open('POST', cf.url, true);
		xhr.send(form);
	}
}
