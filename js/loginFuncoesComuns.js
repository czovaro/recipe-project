
function user(name, birthDate, city, state, phoneNumber, email, pw) {
  this.name = name;
  this.birthDate = birthDate;
  this.city = city;
  this.state = state;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.pw = pw;
}



//Cria um novo alert com uma mensagem de sucesso
 function showAlert(message) {
          $("#alert").html("<strong>Successo!</strong> " + message);
          $("#alert").removeClass();
          $("#alert").addClass("alert");
          $("#alert").addClass("alert-success");
  		  $("#alert").show();
}

//Cria um novo alert com uma mensagem de error
 function showErrorAlert(message) {
          $("#alert").html("<strong>Erro!</strong> " + message);
          $("#alert").removeClass();
          $("#alert").addClass("alert");
          $("#alert").addClass("alert-danger");
  		  $("#alert").show();
}

// seta o login do usuario no botão login
function setUserLogged(){
	var loginButton = $("#novo_login p");
	var user = isUserLogged();
	if (user !== null && user.length>1){
		loginButton.html(user);
	}else {
		loginButton.html("Login");
	}
}


function isUserLogged(){
	if (typeof(Storage) !== "undefined"){
		return localStorage.getItem("loggedUser");
	} else {
		return null;
	}
}

$(function() {
	//Funcoes comuns a todos os formularios
	setUserLogged();

	$(".redirect_details").attr("href", "pagina6.html");

	$("#novo_login").click(function(){
		var user = isUserLogged;
		if (user !== null){
			$("#novo_login p").html("Login");	
			if (typeof(Storage) !== "undefined"){
				localStorage.setItem("loggedUser", "");
			}
		} 
	});
});

