export const saveToken = (token) => {
	localStorage.token = token;
}

export const getToken = () => {
	return localStorage.token;
}

export const removeToken = () => {
	localStorage.removeItem('token');
}

export const random = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}