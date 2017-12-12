
	files = [];
	function SomenteNumero(e){
	    var tecla=(window.event)?event.keyCode:e.which;   
	    if((tecla>47 && tecla<58)) return true;
	    else{
	    	if (tecla==8 || tecla==0) return true;
		else  return false;
	    }
	}

	function updateSize() {
	  var nBytes = 0;
	  var oFiles = document.getElementById("uploadInput").files;
	  var  nFiles = oFiles.length;
	  files = [];
	  for (var nFileId = 0; nFileId < nFiles; nFileId++) {
	    nBytes += oFiles[nFileId].size;
	    files.push(oFiles[nFileId].name);
	  }
	  var sOutput = nBytes + " bytes";
	  // optional code for multiples approximation
	  for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
	    sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
	  }
	  
	  // end of optional code
	  document.getElementById("fileNum").innerHTML = nFiles;
	  document.getElementById("fileSize").innerHTML = sOutput;
	}


$(function() {

	$("#userNameField").html(isUserLogged());

	$.validator.addMethod(
		"requiredTextArea",
		function(value, element){
			if (value=== null || value.trim().length===0){
				return false;
			} else {
				return true;
			}
		}, "Campo obrigatório!"
	);
	
	$.validator.addMethod(
		"categoriaIsNull",
		function(value, element){
			var checked = false;
			$(".categoria").each(function(){
				if ($(this).is(":checked")){
					checked = true;
					return;
				}
			
			});
			return checked;
			
		}, "Escolha pelo menos uma categoria"
	);

	$.validator.addMethod(
		"lettersAndSpaceOnlyTextArea",
		function(value, element){
			return (/^[a-zA-Z\s]+$/.test(value));
		}, " Apenas letras e espaço são aceitos nesse campo!"
	);


	$("#receita_form").validate({
		 submitHandler: function(form) {
			saveRecipe();
    		form.submit();
  		},
  		rules: {
			nomeReceitaField: {
				required: true 
			},
			descricaoReceitaField:{
				requiredTextArea: true, 
				lettersAndSpaceOnlyTextArea: true
			},
			tempoField:{
				required:true
			},
			infoField:{
				requiredTextArea: true
			},
			porcaoField:{
				required:true
			},
			valornutriField:{
				required:true
			},
			cozimentoField:{
				required:true
			},
			categoriaField:{
				categoriaIsNull:true
			},
			ingNameField: {
				required: true
			},
			ingQtdField: {
				required:true
			}, 
			ingUnidField:{
				required:true
			}
				
		}, 
		messages: {
			nomeReceitaField: {
				required:"Campo obrigatório!"
			}, 
			descricaoReceitaField:{
				required: "Campo obrigatório!"
			},
			tempoField:{
				required: "Campo obrigatório!"
			},
			infoField:{
				required: "Campo obrigatório!"
			},
			porcaoField:{
				required: "Campo obrigatório!"
			},
			valornutriField:{
				required: "Campo obrigatório!"
			},
			cozimentoField:{
				required: "Campo obrigatório!"
			},
			ingNameField: {
				required: "Preencha todos os campos!"
			},
			ingQtdField: {
				required: ""
			}, 
			ingUnidField:{
				required: ""
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
	    	if (element.attr("name")==="ingNameField" || element.attr("name")==="ingQtdField" || element.attr("name")==="ingUnidField"){
	    		error.insertAfter($("#ingNameField").parent());
	    		return;
	    	}
	    	if (element.attr("name") === "categoriaField"){
	    		error.insertAfter($("#categoriaField").parent());
	    		return;
	    	} 
			if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
	            error.insertAfter(element.parent());
	        } else {
	            error.insertAfter(element);
	        }	
	    }
	});
});


			
function saveRecipe() {
	if (typeof(Storage) !== "undefined"){
		//Cria um nova receita com os dados do formulário.
		var newRecipe = new recipe(
			$("#userNameField").text(),
			$("#nomeReceitaField").val(),
			$("#descricaoReceitaField").val(),
			$("#tempoField").val(),
			$("#infoField").val(),
			$("#porcaoField").val(),
			$("#valornutriField").val(),
			$("#cozimentoField").val());
		
	      $(".categoria").each(function(){
				if ($(this).is(":checked")){		
					newRecipe.setCategories($(this).val());					
				}
		  });

		//Salva os ingredientes.
		var qtd = [];
		var unid = [];
		var name = [];

		$(".igdQtd").each(function() {
			qtd.push($(this).val());
		});

		$(".igdUnid").each(function() {
			unid.push($(this).val());
		});

		$(".igdName").each(function() {
			name.push($(this).val());
		});

		for (var i=0; i<qtd.length; i++){
			newRecipe.setIngredients(new ingredient(name[i], qtd[i], unid[i]));
		}

		if (files!==null && files.length>0){
			for(var i=0; i<files.length; i++){
				newRecipe.setImages(files[i]);
			}
		}

        //Obtem o json com as receitas salvas em cache
		var recipes = localStorage.getItem("recipes");

		var json;

        // Verifica se o json está sem dados.
		if (recipes === null || recipes.length===0){
			json = [];
		}else {
			 json = JSON.parse(recipes);
		}
		// Salva a receita como json no array de receitas
		json.push(JSON.parse(JSON.stringify(newRecipe)));
		//Salva a lista de receitas na localStorage do navegador.
		localStorage.setItem("recipes", JSON.stringify(json));

		alert("Nova receita cadastrada com sucesso!");
		alert(JSON.stringify(json));
	} else {
		alert("Não é possivel salvar a receita");
	}
}