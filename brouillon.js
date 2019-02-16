function createGrid(x, y) {
  for (let columns = 0; columns < x; columns++) {
    for (let rows = 0; rows < y; rows++) {
      $("#grid").append("<div class='subgrid'></div>");
    };
  };
  //let width = $("#grid").width() + ($(".subgrid").css("margin"));
  //let width = $("#grid").outerWidth(true);
  //let height = $("#grid").outerHeight(true);
  //console.log(width +' '+height);
  //console.log($("#grid").height());
  $(".subgrid").width($("#grid").width()/x);
  $(".subgrid").height($("#grid").height()/y);
};

let array = [];
let turn = 0;

function createGrid2(x, y){
  $('body').prepend('<div>');
  $('div').attr('id', 'grid');
  $("#grid").append('<table>');
  for (let rows = 0; rows < y; rows++) {
    array[rows] = [];
    let tr = document.createElement('tr');
    for (let columns = 0; columns < x; columns++) {
      let td = document.createElement('td');
      td.setAttribute('id', rows+'-'+columns);
      tr.append(td);
      array[rows][columns] = 0;
    }
    $('table').append(tr); 
  }
  //for (let columns = 0; columns < x; columns++) {
    //$("tr").append("<td id='"+rows+"-"+columns+"'>");
  //}
  $('body').prepend('<div id="bar">');
  $('#bar').css({'color':'blue', 'text-align':'center'});
}


function play(){

  $("td").click(function(){
    let column = $(this).index();
    let len = array.length - 1;
    let row;
    turn += 1;
    for (row = len; row > -1; row--) {
      if (array[row][column] == 0) {
        if(turn%2 == 1){
        array[row][column] = 1;
        $(`#${row}-${column}`).addClass('player1');
        }
        if(turn%2 == 0){
          array[row][column] = 2;
          $(`#${row}-${column}`).addClass('player2');
        }
        break;
      }
    }
    if(row < 0){
      alert('Cette colonne est pleine!');
    }
    let joueur = $(`#${row}-${column}`).attr('class');

    if(joueur == 'player1'){
      $('#bar').text('Tour de : player2');
    }
    if(joueur == 'player2'){
      $('#bar').text('Tour de : player1');
    }
    let player = array[row][column];
    let count = 0;
    let win = 0;
    let maxRow = array.length;
    let maxCol = array[row].length;

    //CHECK HORIZONTAL
    for(i = 0; i < maxCol; i++){
      if(array[row][i] == player){
        count++;
        if(count >= 4){
          alert(player+' win ! END OF THE GAME');
          $('td').removeClass();
          $.each(array, function(row, column){
            $.each(column, function(key, value){
              column[key]= 0;
            });
          });
        }
      }
      else{
        count = 0;
      }
    }
  
    //CHECK VERTICAL
    for(i = 0; i < maxRow; i++){
      if(array[i][column] == player){
        count++;
        if(count >= 4){
          alert(player+' win ! END OF THE GAME');
          $('td').removeClass();
          $.each(array, function(row, column){
            $.each(column, function(key, value){
              column[key]= 0;
            });
          });
        }
      }
      else{
        count = 0;
      }
    }
    //CHECK HAUT GAUCHE VERS BAS DROIT / PARTIE GAUCHE DU PLATEAU OK
    // for( rowStart = 0; rowStart < maxRow - 4; rowStart++){
    //   count = 0;
    //   for( row = rowStart, col = 0; row < maxRow && col < maxCol; row++, col++ ){
    //       if(array[row][col] == player){
    //         count++;
    //         if(count >= 4){
    //           alert(player+' win ! END OF THE GAME');
    //           $('td').removeClass();
    //           $.each(array, function(row, column){
    //             $.each(column, function(key, value){
    //               column[key]= 0;
    //             });
    //           });
    //         }
    //       }
    //       else {
    //           count = 0;
    //       }
    //   }
    // }
    //CHECK HAUT GAUCHE VERS BAS DROIT / PARTIE DROITE DU PLATEAU OK
    // for( colStart = 1; colStart < maxCol - 4; colStart++){
    //   count = 0;
    //   for( row = 0, col = colStart; row < maxRow && col < maxCol; row++, col++ ){
    //       if(array[row][col] == player){
    //           count++;
    //           if(count >= 4){
    //             alert(player+' win ! END OF THE GAME');
    //             $('td').removeClass();
    //             $.each(array, function(row, column){
    //               $.each(column, function(key, value){
    //                 column[key]= 0;
    //               });
    //             });
    //           }
    //       }
    //       else {
    //           count = 0;
    //       }
    //   }
    // }
    //BAS GAUCHE VERS HAUT DROIT OK
    for (i=0; i<maxRow; i++){
      for (j=0; j<maxCol; j++){
          if (array[i][j] == player && array[i-1][j+1] == player && array[i-2][j+2] == player && array[i-3][j+3] == player){            
            console.log('premiere boucle');
            alert(player+' win ! END OF THE GAME');
          }
      }
    }

    //BAS DROIT VERS HAUT GAUCHE OK
    for (i=0; i<maxRow; i++){
      for (j=0; j<maxCol; j++){
          if (array[i][j] == player && array[i-1][j-1] == player && array[i-2][j-2] == player && array[i-3][j-3] == player){
            console.log('deuxieme boucle');
            alert(player+' win ! END OF THE GAME');
          }
      }
    }
    // //CHECK DIAGONALE BAS DROIT VERT HAUT GAUCHE OK
    // for(i = row+1, j=column+1; i<maxRow && j<maxCol; i++, j++){
    //   if(array[i][j] == player){
    //     count++;
    //     if(count >= 4){
    //       alert(player+' win ! END OF THE GAME');
    //       return 1;
    //     }
    //   }
    //   else{
    //     count = 0;
    //   }
    // }
    // count = 0;

    // for(i = row-1, j=column-1; i>= 0 && j>= 0; i--, j--){
    //   if(array[i][j] == player){
    //     count++;
    //     if(count >= 4){
    //       alert(player+' win ! END OF THE GAME');
    //       return 1;
    //     }
    //   }
    //   else{
    //     count = 0;
    //   }
    // }


    //DIAGONAL BAS GAUCHE VERS HAUT DROIT
    // for(i= column-1, j= row-1; i>=0, j>=0; i--, j--){
    //   if(array[j][i] == player){
    //     count++;
    //     if(count >= 4){
    //       alert(player+' win ! END OF THE GAME');
    //       return 1;
    //     }
    //   }
    //   else{
    //     count = 0;
    //   }
    // }
    // let rowIndex = $(this).parent().index();
    // let columnIndex = $(this).index();
    // console.log(array);
    // for(let i = columnIndex; i >= 0; i--){
      //   console.log(array[rowIndex][i]);
      //   if(array[rowIndex][i] == 0){
           //if(!$(this).hasClass("player1") && !$(this).hasClass("player2")){
          //       turn += 1;
          //       if(turn%2 == 0){
            //         array[rowIndex][i] = 1;
            //         $(this).addClass('player1');
            //       };
            //       if(turn%2 == 1){
              //         array[rowIndex][i] = 2;
              //         $(this).addClass('player2');
              //       };
              //     };
              //   }
              // }
    });
};

$(document).ready(function(){
  createGrid2(7, 6);
  play();
});

for (row = len; row > -1; row--) {
  $('#pion').hide();
  $('.played').removeClass('played');
  if (array[row][column] == 0) {
    $(`#${row}-${column}`).addClass('played');
    if(turn%2 == 1){
      array[row][column] = 1;
      $('#tours').text('Tour de : '+settings.player2);
      //$('#tours').css('color', settings.colorp2);
      $('table').prepend('<div id="pion">');
      if(column == 2){
        $('#pion').css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'161px'});
        $('#pion').animate({'top':parseInt($('table').height())-parseInt($('#pion').height())+3+'px'});

      }
      if(column == 1){
        $('#pion').css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'86px'});
        $('#pion').animate({'top':parseInt($('table').height())-(parseInt($('#pion').height())*2)+3+'px'});
      }
      $('#pion').css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute'});
      $('#pion').animate({'top':parseInt($('table').height())-parseInt($('#pion').height())+3+'px'});
      setInterval(function(){$(`#${row}-${column}`).css({'background-color': settings.colorp1})}, 400);
      console.log(parseInt($('table').height())-(parseInt($('#pion').height())*2)+3+'px');
    }
    if(turn%2 == 0){
      array[row][column] = 2;
      $(`#${row}-${column}`).css('background-color', settings.colorp2);
      $('#tours').text('Tour de : '+settings.player1);
      //$('#tours').css({'color': settings.colorp1});
    }
    break;
  }
}

for (row = len; row > -1; row--) {
  $('.played').removeClass('played');
  if (array[row][column] == 0) {
    $(`#${row}-${column}`).addClass('played');
    if(turn%2 == 1){
      array[row][column] = 1;
      $(`#${row}-${column}`).css({'background-color': settings.colorp1});
      $('#tours').text('Tour de : '+settings.player2);
      //$('#tours').css('color', settings.colorp2);
      
    }
    if(turn%2 == 0){
      array[row][column] = 2;
      $(`#${row}-${column}`).css('background-color', settings.colorp2);
      $('#tours').text('Tour de : '+settings.player1);
      //$('#tours').css({'color': settings.colorp1});
    }
    break;
  }
}
column = 0;
let left;
switch(column){
  case 0 : 
  left = 7;
  break;
  case 1 : 
  left =+ 2;
  break;
  case 2: 
  left =+ 2;

}
let numPion = 0;
let pxSup = 1;
let left =5;
for (row = len; row > -1; row--) {
  numPion += 1;
  pxSup += 2;
  for(column = 0; column <= maxCol; column++){
    left += 2;
  }
}

if(column == 0 && row == 5){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'7px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-(parseInt($(`#${row}-${column}`).height())*1)+3+'px'},250);
  //$('#pion').remove();
}
if(column == 0 && row == 4){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'7px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-(parseInt($(`#${row}-${column}`).height())*2)+1+'px'});
}
if(column == 0 && row == 3){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'7px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-(parseInt($(`#${row}-${column}`).height())*3)-1+'px'});
}
if(column == 0 && row == 2){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'7px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-(parseInt($(`#${row}-${column}`).height())*4)-3+'px'});
}
if(column == 0 && row == 1){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'7px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-(parseInt($(`#${row}-${column}`).height())*5)-5+'px'});
}
if(column == 0 && row == 0){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'7px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-(parseInt($(`#${row}-${column}`).height())*6)-7+'px'});
}
if(column == 1 && row == 4){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':$(`#${row}-${column}`).width()+9+'px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-(parseInt($(`#${row}-${column}`).height())*2)+1+'px'});
  //$(`#${row}-${column}`).remove();
}
if(column == 2 && row == 5){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':($(`#${row}-${column}`).width()*2)+11+'px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-parseInt($(`#${row}-${column}`).height()*1)+3+'px'}); 
}
if(column == 3 && row == 5){
  $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':($(`#${row}-${column}`).width()*3)+13+'px'});
  $(`#${row}-${column}`).animate({'top':parseInt($('table').height())-parseInt($(`#${row}-${column}`).height()*1)+3+'px'}); 
}