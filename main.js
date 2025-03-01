$(document).ready(function () {
  // jQuery methods go here...
  var LIST	=	$('.bl-list');
  var LEAVE = $('.bl-leave');
  var ROW_TEMPLATE	=	$('.bl-row')[0].outerHTML;
  var ITEM_TEMPLATE = $(".bl-item")[0].outerHTML;
  var lastAddedId = 3;
  

  // Add new product
  function	addItem(title)	{
    var node	=	$(ROW_TEMPLATE);	//Create	new	HTML	node
        var node1 = $(ITEM_TEMPLATE);
        node.find(".bl-product").text(title);	//Set	product	title
        node1.find("#item").text(title);

        lastAddedId++;
        node.attr('id', lastAddedId);
        node1.attr('id', lastAddedId);
     
      
        LIST.append(node);	//Add	to	the	end	of	the	list
        LEAVE.append(node1);
  }
  //  Add by click
  $(".bl-add").click(function(){
      var title = $("#text").val()
      if(title){
        addItem(title);
        $("#text").val('');
        $("#text").focus();
    }
  } );
  $("#text").keypress(function(e){
    if(e.keyCode === 13)
    {
      var title = $("#text").val()
      if(title){
        addItem(title);
        $("#text").val('');
        $("#text").focus();
      }
    }
  } );
  // Delete action
  $( "div.bl-list" ).on( "click", ".bl-buttons .bl-cross", function() {
    var node= $(this).parents('.bl-row');
    var id = node.attr('id');

    $(".bl-leave").find("#"+id).remove();
    node.remove();
  });

  // Buy action
  $( "div.bl-list" ).on( "click", ".bl-buttons .bl-buy", function() {
    var node= $(this).parents('.bl-row');
    var id = node.attr('id');
    var TEMPLATE = $(".bl-leave").find("#"+id)[0].outerHTML;
    var COPY = $(TEMPLATE);
    $(".bl-bb").append(COPY);
    $(".bl-leave").find("#"+id).css("display","none");
    node.find(".bl-buy").text("Не куплено");
    node.addClass("missing");
  });

  // Buy(+class"missing") action
  $( "div.bl-list" ).on( "click", ".missing .bl-buttons .bl-buy", function() {
    var node= $(this).parents('.bl-row');
    var id = node.attr('id');
    $(".bl-bb").find("#"+id).remove();
    $(".bl-leave").find("#"+id).css("display","inline-block");
    node.find(".bl-buy").text("Куплено");
    node.removeClass("missing");
  });

  // Increase number of product 
  $( "div.bl-list" ).on( "click", ".bl-count .bl-plus", function() {
    var node= $(this).parents('.bl-count');
    var i = parseInt(node.find(".bl-label").text())+1;
    var id = node.parents('.bl-row').attr('id');
    $(".bl-bought").find("#"+id).find(".bl-amount").text(i);
    node.find(".bl-label").text(i);
    if(parseInt(node.find(".bl-label").text())==2) $(node.find(".bl-minus")).css({"background-color":"#db2828","box-shadow":"0px 3px #bf2728"});
  });

  // Degrease number of product 
  $( "div.bl-list" ).on( "click", ".bl-count .bl-minus", function() {
    var node= $(this).parents('.bl-count');
    var i = parseInt(node.find(".bl-label").text());
    if(i>1) {
      var id = node.parents('.bl-row').attr('id');
      $(".bl-bought").find("#"+id).find(".bl-amount").text(i-1);
      node.find(".bl-label").text(i-1);
    }
    if(i==2) $(this).css({"background-color":"#ee9e9e","box-shadow":"0px 3px #ee9e9e"});
  });

  // Change name of the product
  $( "div.bl-list" ).on( "click", ".bl-product", function() {
    if ($('input', this).length == 0) {
        if($(this).parent(".bl-row.missing").length==0){
            var name = $(this).text().trim();
            var parent = $(this);
            $(this).html('<input class="input-name">');
            $('input', this).css("width","100%")
            $('input', this).val(name).focus().focusout(
            function() {
              var name = $(this).val();
              parent.text(name);
              var id = parent.parent().attr('id');
              $(".bl-bought").find("#"+id).find("#item").text(name);
            }
          );
        }
    }
  });

} );