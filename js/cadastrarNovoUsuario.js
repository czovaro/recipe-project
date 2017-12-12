//Salva os dados de um usuario no armazenamento local do navegador
function saveUser() {
	if (typeof(Storage) !== "undefined"){
		//Cria um novo usuario com os dados do formulário.
		var newUser = new user(
			$("#nameField").val(),
			$("#birthDateField").val(),
			$("#cityField").val(),
			$("#stateField").val(),
			$("#phoneNumberField").val(),
			$("#emailField").val(),
			$("#passwordField").val());

        //Obtem o json com usuario salvo em cache
		var users = localStorage.getItem("users");

		var json;

        // Verifica se o json está sem dados.
		if (users === null){
			json = [];
		}else {
			json = JSON.parse(users);
		}
		// Salva o usuario como json no array de usuarios.
		json.push(JSON.parse(JSON.stringify(newUser)));
		//Salva a lista de usuarios na localStorage do navegador.
		localStorage.setItem("users", JSON.stringify(json));

		alert("Novo usuário cadastrado com sucesso!");
		
	} else {
		alert("Não é possivel salvar o usuário");
	}
}


$(function() {
	//Verifica se o email digitado ja tem um usuario associado.
	$.validator.addMethod("isNewUser",
		function(value, element){
			if (this.optional(element)){
				return true;
			}
            if (typeof(Storage) !== "undefined"){
            	var users = localStorage.getItem("users");
            	if (users === null){
            		return true;
            	} else {
            		var jsonArray = JSON.parse(users);

            		for(i=0; i<jsonArray.length; i++){
   						if(value === jsonArray[i].email){
   							return false;
   						}
					}
					return true;	
            	}//fim Else.

            }// fim if typeof
            return true;
		}, "Usuário já esta cadastrado!");

	//Valida o formato da data
	$.validator.addMethod(
		"dateBR",
		 function(value, element) {
            return this.optional(element) || /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value);
        },
        "Entre com uma data valida no formato dd/mm/yyyy");

	$.validator.addMethod(
		"ageCheck", 
		function(value, element){
			if (this.optional(element)){
				return true;
			}

			var dateOfBirth = value;
			var arr = dateOfBirth.split("/");
			var day = arr[0];
			var month = arr[1];
			var year = arr[2];
			var mydate = new Date();
			mydate.setFullYear(year, month-1, day);

			var maxDate = new Date();
			
			var age = maxDate.getYear() - mydate.getYear();
			return (age > 13);

		}, "Você deve ter pelo menos 13 anos para criar um usuário"
	);

	$.validator.addMethod(
		"lettersAndSpaceOnly",
		function(value, element){
			if (this.optional(element)){
				return true;
			}
			return (/^[a-zA-Z\s]+$/.test(value));
		}, " Apenas letras e espaço são aceitos nesse campo!"
	);

	$.validator.addMethod(
		"phoneNumberBR",
		function(value, element){
			if (this.optional(element)){
				return true;
			}
			return (/^(\()?\d{2}(\))?(-|\s)?\d{4}(-|\s)\d{4}$/.test(value));
		}, "Entre com o telefone no seguinte formato: (XX)XXXX-XXXX "
	);

	$.validator.addMethod(
		"passwordPattern",
		function(value, element){
			if (this.optional(element)){
				return true;
			}
			return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(value));
		}, "A senha deve conter pelo menos 1 letra maiúscula, 1 caracter especial do tipo !@#$%^&*()_+, 1 digito e 1 letra minúscula."
		);

	$("#login_form").validate({
		//Funcao chamada apos a validacao dos dados
		 submitHandler: function(form) {
    		saveUser();
    		form.submit();
  		},
		rules: {
			nameField: {
				required: true, 
				lettersAndSpaceOnly: true
			},
			birthDateField:{
				required: true,
				dateBR: true, 
				ageCheck: true
			},
			cityField:{
				required:true, 
				lettersAndSpaceOnly: true
			},
			stateField:{
				required:true
			},
			phoneNumberField:{
				required:true,
				phoneNumberBR:true
			},
			emailField:{
				required:true,
				email: true,
				isNewUser:true
			},
			passwordField:{
				required:true,
				minlength: 8,
				passwordPattern:true
			},
			passwordFieldConfirm:{
				equalTo: "#passwordField"
			}
		},
		messages: {
			nameField: {
				required:"Campo obrigatório!"
			},
			birthDateField:{
				required: "Campo obrigatório!"
			},
			cityField:{
				required: "Campo obrigatório!"
			},
			stateField:{
				required: "Campo obrigatório!"
			},
			phoneNumberField:{
				required: "Campo obrigatório!"
			},
			emailField:{
				required: "Campo obrigatório!",
				email: "Formato de e-mail inválido!"
			},
			passwordField:{
				required: "Campo obrigatório!",
				minlength: "A senha deve ter no minimo 8 caracteres!"
			},
			passwordFieldConfirm:{
				equalTo: "As senhas não são iguais!"
			}
		},

        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },

        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },   

        errorElement: 'span',

        errorClass: 'help-block',

        errorPlacement: function (error, element) {
        	if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
            	error.insertAfter(element.parent());
        	} else {
            	error.insertAfter(element);
        	}	
    	}
        
	});

	$("#birthDateField").datepicker({
    	format: "dd/mm/yyyy",
	});

});

