

$(function() { 
   

	if (typeof(Storage) !== "undefined"){
		var newRecipe = JSON.parse(localStorage.getItem("exportRecipe"));
		//Mostra o json salvo
		$("#json").html(JSON.stringify(newRecipe, null, ' '));

	} else {
		$("Seu navegador não possui o recurso localStorage! Não é possivel recuperar a receita!");
	}

});
