function mascara(telefone){ 
	if(telefone.value.length == 0)
     telefone.value = '(' + telefone.value; //quando começamos a digitar, o script irá inserir um parênteses no começo do campo.
	if(telefone.value.length == 3)
      telefone.value = telefone.value + ') '; //quando o campo já tiver 3 caracteres (um parênteses e 2 números) o script irá inserir mais um parênteses, fechando assim o código de área.
 
	if(telefone.value.length == 9)
     telefone.value = telefone.value + '-'; //quando o campo já tiver 8 caracteres, o script irá inserir um tracinho, para melhor visualização do telefone.
  
}

function Lcadstro(){
	

	var senha = form1.senha.value;
	var senha2 = form1.csenha.value;
	document.getElementById("resp").innerHTML = "Senhas diferentes."
	
	if(senha != senha2){
		
		document.getElementById("resp").style.display="block";
	
	}
	
	else {
		document.getElementById("resp").style.display="none";
	}

}
	
function ValidaData(){
	var data = form1.datepicker.value;
	var res = data.split("/");
	var ano1 = res[2];
	var ano = parseInt(ano1);

	document.getElementById("resp").innerHTML = "";
	document.getElementById("resp").style.display="block";
	
	if(ano >= 2001){
			document.getElementById("resp").innerHTML = "Você deve ter mais de 13 anos.";
			document.getElementById("resp").style.display="block";
			document.getElementById("btn_cad_login").disabled = true;
	}
	
	if(ano < 2001){
			document.getElementById("resp").style.display="none";
			document.getElementById("btn_cad_login").disabled = false;
	}
	

}

function Finaliza(){
	if($('form')[0].checkValidity()) {
		alert("Não aceitamos novos cadastros!");
		window.parent.document.getElementById("dinamic").setAttribute("src", "SITE/recentes.html");
	}
}