(function($){
  $.fn.power4 = function(options){
      
      var settings = $.extend({
          x : 7,
          y : 6,
          player1 : 'Joueur 1',
          player2 : 'Joueur 2',
          colorp1 : 'red',
          colorp2 : 'yellow'
      }, options);

      let array = [];
      let turn = 0;
      let scorep1 = 0;
      let scorep2 = 0;

      function createGrid(x, y){
        if (settings.colorp1 == settings.colorp2){
          alert('Mettez deux couleurs différentes dans vos options pour pouvoir jouer!');
          return false;
        }
        $('body').prepend('<div>');
        $('div').attr('id', 'grid');
        $("#grid").append('<table>');

        for (let rows = 0; rows < y; rows++) {
          array[rows] = [];
          //let tr = document.createElement('tr');
          $('table').append('<tr>');
          for (let columns = 0; columns < x; columns++) {
            //let td = document.createElement('td');
            $('tr:last').append('<td id="'+rows+'-'+columns+'">');
            //$('td').attr('id', rows+'-'+columns)
            // td.setAttribute('id', rows+'-'+columns);
            // tr.append(td);
            array[rows][columns] = 0;
          }
          //$('table').append(tr); 
        }

        $('body').prepend('<div id="bar">');
        $('#bar').css({'color':'grey', 'display':'flex', 'justify-content':'center', 'font-family':'"Comic Sans MS", cursive, sans-serif'});
        $('table').css({'position': 'relative', 'font-size': 0, 'margin':'auto', 'padding': '5px', 'background-color': 'grey'});
        $('td').css({'margin':0, 'padding':0, 'outline':'1px solid grey', 'border-radius': '50%', 'background-color': 'white', 'cursor': 'pointer', 'width': '75px', 'height': '75px'});
        $('#bar').append('<p>');
        $('p').attr('id', 'tours');
        $('#bar').append('<button>');
        $('button').attr('id', 'cancel');
        $('button').css({'background-color':'transparent', 'cursor':'pointer', 'margin':'10px', 'border':'none','border':'1px solid grey', 'border-radius':'5px', 'padding':'10px', 'font-family':'"Comic Sans MS", cursive, sans-serif'});
        $('#cancel').text('Annuler le dernier coup');
        $('#cancel').hide();
        $('#bar').append('<p id="scorep1">');
        $('#bar').append('<p id="scorep2">');
      };

      function play(){
        $("td").click(function(){
          $('#cancel').show();
          let column = $(this).index();
          let len = array.length - 1;
          let row;
          turn += 1;
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
          //let lenCol = array[row].length;
          if(row < 0){
            alert('Cette colonne est pleine!');
          }
          // if(column == lenCol -1){
          //   alert('Partie nulle');
          // }
            // for (row = 0; row < len; row++) {
              // }
              
          $('#cancel').click(function(){
            if($(`#${row}-${column}`).hasClass('played')){
              $('#tours').text('Tour de : '+settings['player' + array[row][column]]);
              turn--;
              array[row][column] = 0;
              $(`#${row}-${column}`).css('background-color', 'white');
            }
          });
          checkWin(array, row, column);
        });
      };
        

      function checkWin(array, row, column){
        let player = array[row][column];
        let count = 0;
        let maxRow = array.length;
        let maxCol = array[row].length;
        //testNul();
        //CHECK HORIZONTAL
        for(i = 0; i < maxCol; i++){
          if(array[row][i] == player){
            count++;
            if(count >= 4){
              alert(settings['player' + player] +" a gagné");
              resetGrid();
              if(player == 1){
                scorep1++;
                $('#scorep1').text('Score de '+settings.player1+': '+scorep1);
              }
              if(player == 2){
                scorep2++;
                $('#scorep2').text('Score de '+settings.player2+': '+scorep2);
              }
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
              alert(settings['player' + player] +" a gagné");
              resetGrid();
              if(player == 1){
                scorep1++;
                $('#scorep1').text('Score de '+settings.player1+': '+scorep1);
              }
              if(player == 2){
                scorep2++;
                $('#scorep2').text('Score de '+settings.player2+': '+scorep2);
              }
            }
          }
          else{
            count = 0;
          }
        }
        //BAS GAUCHE VERS HAUT DROIT OK
        for (i=3; i<maxRow; i++){
          for (j=0; j<maxCol-3; j++){
            if (array[i][j] == player && array[i-1][j+1] == player && array[i-2][j+2] == player && array[i-3][j+3] == player){
              alert(settings['player' + player] +" a gagné !");            
              resetGrid();
              if(player == 1){
                scorep1++;
                $('#scorep1').text('Score de '+settings.player1+': '+scorep1);
              }
              if(player == 2){
                scorep2++;
                $('#scorep2').text('Score de '+settings.player2+': '+scorep2);
              }
            }
          }
        }
        //BAS DROIT VERS HAUT GAUCHE OK
        for (i=3; i<maxRow; i++){
          for (j=3; j<maxCol; j++){
            if (array[i][j] == player && array[i-1][j-1] == player && array[i-2][j-2] == player && array[i-3][j-3] == player){
              alert(settings['player' + player] +" a gagné !");
              resetGrid();
              if(player == 1){
                scorep1++;
                $('#scorep1').text('Score de '+settings.player1+': '+scorep1);
              }
              if(player == 2){
                scorep2++;
                $('#scorep2').text('Score de '+settings.player2+': '+scorep2);
              }
            }
          }
        }
      };
      
      function resetGrid(){
        $('td').css('background-color', 'white');
        $.each(array, function(row, column){
          $.each(column, function(key, value){
            column[key]= 0;
          });
        });
      };

      function testNul(){
        // $.each(array, function(row, column){
        //   $.each(column, function(key, value){
        //     if(column[key] != 0){
        //       alert('Partie nulle!');
        //     }
        //   });
        // });
      //   let maxRow = array.length;
      //   let maxCol = array[row].length;
      //   count = 0;
      //   for(i=0; i < maxCol; i++){
      //     if(array[i][j] != 0){
      //       count ++;
      //     }
      //     if(count == maxRow -1){
      //       return true;
      //     }
      //     else{
      //       return false;
      //     }
      //   } 
      // };
      // count =0;
      // for(i=0; i <maxCol; i++){
      //   if(testNul(i) == false){
      //     break;
      //   }
      //   if(i == maxCol -1){
      //     alert('Partie Nulle');
      //   }
      }

  $(document).ready(function(){
    createGrid(settings.x, settings.y);
    play();
  });
};
}(jQuery));
$('body').power4({x: 6, y: 6, player1 : "Marine", player2: 'Lauriane', colorp1: 'green', colorp2: 'pink'});