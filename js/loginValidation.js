function userExist(){
	if (typeof(Storage) !== "undefined"){
		var users = localStorage.getItem("users");
		var email = $("#emailField").val();
		var pw = $("#passwordField").val();

		if (users === null){
			return false;
		} else {
			var jsonArray = JSON.parse(users);

			for(i=0; i<jsonArray.length; i++){
				if(email === jsonArray[i].email && pw === jsonArray[i].pw){
					localStorage.setItem("loggedUser",jsonArray[i].name);
					return true;
				}
			}
			return false;	
            	}//fim Else.

            }// fim if typeof
            return false;
        }

$(function() {
	$("#login_form").validate({
		 submitHandler: function(form) {
    		var check = userExist();
			if (check === true){
				alert("Login efetuado com sucesso!");
				form.submit();
			}else {
				alert("Usuário ou senha incorreto! Não foi possivel efetuar login no sistema!");
			}
  		},
  		rules: {
			emailField: {
				required: true, 
				email: true
			}, 
			passwordField:{
				required: true
			}
		}, 
		messages: {
			emailField: {
				required:"Campo obrigatório!",
				email:"Entre com um email valido!"
			},
			passwordField:{
				required: "Campo obrigatório!"
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
});



