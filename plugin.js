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
            $('tr:last').append('<td>');
            //$('td').attr('id', rows+'-'+columns)
            // td.setAttribute('id', rows+'-'+columns);
            // tr.append(td);
            array[rows][columns] = 0;
          }
          //$('table').append(tr); 
        }

        $('body').prepend('<div id="bar">');
        $('body').css({
          'font-size': '25px',
          'font-family': '"Indie Flower", cursive',
          'color':'#444444'
        });
        $('#bar').css({
          'color':'grey', 
          'display':'flex',
          'justify-content':'center',
        });
        $('table').css({
          'position': 'relative',
          'font-size': 0,
          'margin':'auto',
          'padding': '5px',
          'background-color': 'grey',
          'border-collapse': 'collapse',
          'outline': '5px solid grey'
        });
        $('td').css({
          'margin':0,
          'padding':0,
          'border-radius': '50%',
          'outline': '1px solid grey',
          'background-color': 'white',
          'cursor': 'pointer',
          'width': '75px',
          'height': '75px'
        });
        $('#bar').append('<p>');
        $('p').attr('id', 'tours');
        $('#tours').text(settings.player1+' commence');
        $('#bar').append('<button>');
        $('button').attr('id', 'cancel');
        $('button').css({
          'background-color':'transparent',
          'cursor':'pointer',
          'margin':'10px',
          'border':'none',
          'border':'1px solid grey',
          'border-radius':'5px',
          'padding':'10px',
          'color':'grey'
        });
        $('#cancel').text('Annuler le dernier coup');
        $('#cancel').hide();
        $('#bar').append('<p id="scorep1">' + '<p id="scorep2">');
        $('#scorep1, #scorep2').css({'padding': '3px'});
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
              $('table').append('<div id="'+row+'-'+column+'" class="pion">');
              $(`#${row}-${column}`).css({'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'top': 0});
              $(`#${row}-${column}`).addClass('played');
              if(turn%2 == 1){
                $(`#${row}-${column}`).css({'background-color': settings.colorp1, 'left':($(`#${row}-${column}`).width()*column)+'px'});
                $(`#${row}-${column}`).animate({'top': $(`#${row}-${column}`).height()*row+'px'}, 300);
                array[row][column] = 1;
                $('#tours').text('Au tour de : '+settings.player2);
                //$('#tours').css('color', settings.colorp2);
                
              }
              if(turn%2 == 0){
                $(`#${row}-${column}`).css({'background-color': settings.colorp2, 'left':($(`#${row}-${column}`).width()*column)+'px'});
                $(`#${row}-${column}`).animate({'top': $(`#${row}-${column}`).height()*row+'px'}, 300);
                array[row][column] = 2;
                $('#tours').text('Au tour de : '+settings.player1);
                //$('#tours').css({'color': settings.colorp1});
              }
              break;
            }
          }

        //   if(column == 2){
        //     $('#pion').css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'161px'});
        //     $('#pion').animate({'top':parseInt($('table').height())-parseInt($('#pion').height())+3+'px'});
    
        //   }
        //   if(column == 1){
        //     $('#pion').css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute', 'left':'86px'});
        //     $('#pion').animate({'top':parseInt($('table').height())-(parseInt($('#pion').height())*2)+3+'px'});
        //   }
        //   $('#pion').css({'background-color': settings.colorp1, 'width': '75px', 'height':'75px', 'border-radius': '50%', 'position':'absolute'});
        //   $('#pion').animate({'top':parseInt($('table').height())-parseInt($('#pion').height())+3+'px'});
        //   setInterval(function(){$(`#${row}-${column}`).css({'background-color': settings.colorp1})}, 400);
        //   console.log(parseInt($('table').height())-(parseInt($('#pion').height())*2)+3+'px');
        // }
              
          $('#cancel').click(function(){
            if($(`#${row}-${column}`).hasClass('played')){
              $('#tours').text('Tour de : '+settings['player' + array[row][column]]);
              turn--;
              array[row][column] = 0;
              //$(`#${row}-${column}`).css('background-color', 'white');
              $(`#${row}-${column}`).remove();
            }
          });
          setTimeout(function(){
            checkWin(array, row, column);
          }, 310);
        });
      };
        
      function checkWin(array, row, column){
        let player = array[row][column];
        let count = 0;
        let maxRow = array.length;
        let maxCol = array[row].length;

        //CHECK HORIZONTAL
        for(i = 0; i <= maxCol; i++){
          if(array[row][i] == player){
            count++;
            if(count >= 4){
              resetGrid(player, 1);
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
              resetGrid(player, 1);
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
              console.log('bas gauche');   
              resetGrid(player, 1);
            }
          }
        }
        //BAS DROIT VERS HAUT GAUCHE OK
        for (i=3; i<maxRow; i++){
          for (j=3; j<maxCol; j++){
            if (array[i][j] == player && array[i-1][j-1] == player && array[i-2][j-2] == player && array[i-3][j-3] == player){
              console.log('bas droit');
              resetGrid(player, 1);
            }
          }
        }

        let $null = 1;
        $.each(array, function(row, column){
          $.each(column, function(key, value){
            if(column[key] == 0){
              $null = 0;
            }
          });
        });
        if($null == 1){
          alert('Partie nulle');
          resetGrid(player, 0);
        }
      };
      
      function resetGrid(player, isWin){
        //$('td').css('background-color', 'white');
        //$('.pion').remove();
        //$('.pion').parentNode.removeChild('.pion');
        $.each(array, function(row, column){
          $.each(column, function(key, value){
            column[key]= 0;
          });
        });
        if(isWin == 1){
          if(player == 1){
            scorep1++;
            $('#scorep1').text('Score de '+settings.player1+': '+scorep1);
          }
          if(player == 2){
            scorep2++;
            $('#scorep2').text('Score de '+settings.player2+': '+scorep2);
          }
          alert(settings['player' + player] +" a gagné");
        }
        $('div.pion').remove();
      };

      // function checkNull(player){
      //   let $null = 1;
      //   $.each(array, function(row, column){
      //     $.each(column, function(key, value){
      //       if(column[key] == 0){
      //         $null =0;
      //       }
      //     });
      //   });
      //   if($null == 1){
      //     alert('Partie nulle');
      //     resetGrid(player);
      //   }
      // }

  $(document).ready(function(){
    createGrid(settings.x, settings.y);
    play();
  });
};
}(jQuery));
$('body').power4({x: 6, y: 6, player1 : "Marine", player2: 'Lauriane', colorp1: 'purple', colorp2: 'pink'});