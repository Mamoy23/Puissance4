function createGrid(x, y) {
  for (var columns = 0; columns < x; columns++) {
    for (var rows = 0; rows < y; rows++) {
      $("#grid").append("<div class='subgrid'></div>");
    };
  };
  //var width = $("#grid").width() + ($(".subgrid").css("margin"));
  //var width = $("#grid").outerWidth(true);
  //var height = $("#grid").outerHeight(true);
  //console.log(width +' '+height);
  //console.log($("#grid").height());
  $(".subgrid").width($("#grid").width()/x);
  $(".subgrid").height($("#grid").height()/y);
};

function createGrid2(x, y){
  var array = [];
  $("#grid").append('<table></table>');
  for (var rows = 0; rows < y; rows++) {
    array[rows] = [];
    $("table").append("<tr></tr>");
    for (var columns = 0; columns < x; columns++) {
      array[rows][columns] = 0;
    }
  }
  for (var columns = 0; columns < x; columns++) {
    $("tr").append("<td></td>");
  }
  console.log(array);
}

$(document).ready(function(){
  createGrid2(6, 6);
  var count = 0;
  $("td").click(function(){
    console.log(count);
    if(!$(this).hasClass("player1") && !$(this).hasClass("player2")){
      count += 1;
      if(count%2 == 0){
        $(this).addClass('player1');
      };
      if(count%2 == 1){
        $(this).addClass('player2');
      };
    };
  });
});