export const stripHtml = (html) => {
    // Create a new div element
    var tempElement = document.createElement("div");
    // Set the HTML content with the providen
    tempElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return tempElement.textContent || tempElement.innerText || "";
}

export const scrollTop = () => {
	document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export const removeData = (key) => {
	sessionStorage.removeItem(key);
}

export const getData = (key) => {
	let data = sessionStorage.getItem(key);

	if(data)
		return JSON.parse(data);
	else
		return null;
}

export const saveData = (key, data) => {
	sessionStorage.setItem(key, JSON.stringify(data));
}