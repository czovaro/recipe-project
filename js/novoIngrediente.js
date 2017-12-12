$(document).ready(function() {
    var max_fields      = 30; //maximo de ingredientes
    var wrapper         = $(".input_fields_wrap"); 
    var add_button      = $(".add_field_button"); 
    
    var x = 1; 
    $(add_button).click(function(e){ //add quando clica no botão
        e.preventDefault();
        if(x < max_fields){ 
            x++; 

            var el = $("<div></div>");

            var name = $("<input/>");
            name.attr("type", "text");
            name.attr("name","ingNameField");
            name.attr("placeholder", "Nome do ingrediente");
            name.attr("id", "ingNameField");
            name.addClass("ingClass");
            name.addClass("igdName");
            name.appendTo(el);

            var qtd = $("<input/>");
            qtd.attr("type", "number");
            qtd.attr("name","ingQtdField");
            qtd.attr("placeholder", "Quantidade");
            qtd.addClass("ingClass");
            qtd.addClass("igdQtd");
            qtd.appendTo(el);

            var unid = $("<input/>");
            unid.attr("type", "text");
            unid.attr("name","ingUnidField");
            unid.attr("placeholder", "Unidade");
            unid.addClass("ingClass");
            unid.addClass("igdUnid");
            unid.appendTo(el);

            var remove = $("<a/>");
            remove.attr("href","######");
            remove.addClass("remove_field");
            remove.addClass("ingClass");
            remove.text("Remover");
            remove.appendTo(el);

            el.appendTo(wrapper);
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //remove quando clicar no link
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});
