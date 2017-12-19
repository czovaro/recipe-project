var req;

/**
 * sendRequest(url, callback, params, HttpMethod)
 * Envia requisição assíncrona ao servidor.
 * @param url Endereço invocado pela requisição.
 * @param callback Função de tratamento do retorno da requisição.
 * @param params Parâmetros a serem enviados (opcional).
 * @param HttpMethod Método HTTP a ser utilizado na requisição (opcional).
 */
function sendRequest(url, callback, params = null, HttpMethod = null) {
	if(!HttpMethod) {
		HttpMethod = "GET";
	}
	req = initXMLHTTPRequest();
	if(req) {
		req.onreadystatechange = callback;
		req.open(HttpMethod, url, true);
		req.setRequestHeader("ContentType", "application/x-www-form-urlencoded");
		req.send(params);
	}
}

/**
 * initXMLHTTPRequest()
 * Instancia um objeto de requisição http.
 * @return Objeto de requisição http.
 */
function initXMLHTTPRequest() {
	var xRequest = null;
	if(window.XMLHttpRequest) {
		xRequest = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		xRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xRequest;
}

function checkLogin() {
	if(req.readyState == 4) {
		var xml = req.responseXML;
		xml.getElementsByTagName('user');
		xml.forEach(function(e) {
			if(e.getAttribute('login') == $('input[name="email"]').val()) {
				if(e.getElementsByTagName('password')[0] == $('input[name="senha"]')) {
					alert("Login realizado com sucesso!");
					window.parent.document.getElementById('dinamic').setAttribute('src', 'SITE/recentes.html');
					return;
				}
			}
		});
		alert("Usuário ou senha incorretos");
	}
}

function  Finaliza() {
	sendRequest("../resources/users.xml", checkLogin);
}