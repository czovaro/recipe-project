
function comment(name, email, message, rating) {
  this.name = name;
  this.email = email;
  this.message = message;
  this.rating = rating;
}

function userExist(){
	if (typeof(Storage) !== "undefined"){
		var users = localStorage.getItem("users");
		var email = $("#emailField").val();
		var pw = $("#passwordField").val();

		if (users === null){
			return null;
		} else {
			var jsonArray = JSON.parse(users);

			for(i=0; i<jsonArray.length; i++){
				if(email === jsonArray[i].email && pw === jsonArray[i].pw){
					return jsonArray[i].name;
				}
			}
			return null;	
        }//fim Else.
     }// fim if typeof
     return null;
}

function exportRecipe(){

	var newRecipe = new recipe(
		$("#recipeAuthor").text(), 
		$("#recipeName").text(),
		$("#recipeDescription").text(), 
		$("#recipeCookingTime").text(),
		$("#recipeInstructions").text(),
		$("#recipePortion").text(),
		$("#recipeNutritionValue").text(),
		$("#recipeBakingMethod").text());

	//Salva as categorias 
	$(".recipeCategory").each(function() {
		newRecipe.setCategories($(this).text());
	});

	//Salva os ingredientes.
	var qtd = [];
	var unid = [];
	var name = [];

	$(".igdQtd").each(function() {
		qtd.push($(this).text());
	});

	$(".igdUnid").each(function() {
		unid.push($(this).text());
	});

	$(".igdName").each(function() {
		name.push($(this).text());
	});

	for (var i=0; i<qtd.length; i++){
		newRecipe.setIngredients(new ingredient(name[i], qtd[i], unid[i]));
	}

	//Salva as imagens 
	$(".recipeImage").each(function() {
		newRecipe.setImages($(this).attr("src"));
	});

	if (typeof(Storage) !== "undefined"){
		localStorage.setItem("exportRecipe", JSON.stringify(newRecipe));
	} else {
		localStorage.setItem("exportRecipe", null);
	}

}

// Adiciona um novo comentario a lista de comentarios no formulario.
function addComentaryToHTML(newComment){
	//  Cria o primeiro nó dos comentarios.
	var el = $("<a></a>");
	el.attr("href", "####");
	el.addClass("list-group-item");

	// Cria o titulo 
	var title = $("<h4></h4>");
	title.html(newComment.name);
	title.addClass("list-group-item-heading");
	title.appendTo(el);

	// Cria o comentario
	var comment =$("<p></p>");
	comment.html(newComment.message);
	comment.addClass("list-group-item-text");
	comment.appendTo(el);

	// Cria Nota
	var rating =$("<p></p>");
	rating.html("Nota: ");
	rating.addClass("list-group-item-text");

	for (var i = 0; i<5; i++){
		var newRating =$("<i></i>");
		newRating.addClass("fa");
		if (i<newComment.rating){
			newRating.addClass("fa-star");
		}else {
			newRating.addClass("fa-star-o");
		}
		newRating.appendTo(rating);
	}
	rating.appendTo(el);

	//Adiciona o html com o comentario a lista de comentarios.
	var list = $("#clist");
	el.appendTo(list);

}
//Limpa os campos 
function clearFields(){
	$("#passwordField").val("");
	$("#comentField").val("");
}

$(function() {
	$.validator.addMethod(
		"requiredTextArea",
		function(value, element){
			var coment = $("#comentField").val();
			if (coment=== null || coment.trim().length===0){
				return false;
			} else {
				return true;
			}
		}, "Campo obrigatório!"
	);

	$("#coments_form").validate({
		//Funcao chamada apos a validacao dos dados
		 submitHandler: function(form) {
		 	var user = userExist();
		 	if (user!==null){
		 		alert("Comentario cadastrado com sucesso.");
		 		var newComment = new comment(
		 			user,
		 			$("#emailField").val(),
		 			$("#comentField").val(),
		 			$("#ratingField").val());
		 		addComentaryToHTML(newComment);
		 		clearFields();
		 	} else {
		 		alert("Login não encontrado! É necessário estar logado para fazer login no sistema.");
		 	}	
  		},
		rules: {
			emailField:{
				required:true,
				email: true
			},
			passwordField:{
				required: true
			},
			comentField:{
				requiredTextArea: true
			}
		},
		messages: {
			emailField:{
				required: "Campo obrigatório!",
				email: "Formato de e-mail inválido!"
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

	$("#recipe-export").click(function(){
		exportRecipe();
	});

});
