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
        $("#grid").append('<table id="table">');

        for (let rows = 0; rows < y; rows++) {
          $('#table').append('<tr>');
          array[rows] = [];
          for (let columns = 0; columns < x; columns++) {
            $('tr:last').append('<td>');
            array[rows][columns] = 0;
          }
        }
      };

      function styleSheet(){
        $('body').prepend('<div id="bar">');
        $('body').prepend('<audio id="song">');
        $('audio').append('<source src="you-win-sound-effect-5.mp3" type="audio/mpeg">');
        $('body').css({
          'font-size': '25px',
          'font-family': '"Indie Flower", cursive',
          'color':'#444444'
        });
        $('#bar').css({
          'display':'flex',
          'justify-content':'center',
          'align-items':'center',
        });
        $('#table').css({
          'position': 'relative',
          'font-size': 0,
          'margin':'auto',
          'padding': '5px',
          'background-color': '#444444',
          'border-collapse': 'collapse',
          'outline': '5px solid #444444',
          'opacity':0.85
        });
        $('td').css({
          'margin':0,
          'padding':0,
          'border-radius': '50%',
          'outline': '1px solid #444444',
          'background-color': 'white',
          'cursor': 'pointer',
          'width': '75px',
          'height': '75px',
        });
        $('#bar').append('<p>');
        $('p').attr('id', 'tours');
        $('#tours').text(settings.player1+' commence');
        $('#bar').append('<button>');
        $('button').attr('id', 'cancel');
        $('button').css({
          'background-color':'transparent',
          'cursor':'pointer',
          'margin':'25px 10px',
          'border':'none',
          'border':'1px solid #444444',
          'border-radius':'50%',
          'padding':'10px',
          'color':'#444444'
        });
        $('#cancel').append('<i class="fas fa-undo"></i>');
        $('#cancel').attr('title', 'Annuler le dernier coup');
        $('#cancel').mouseover(function(){
          $('#cancel').css({
            'background-color':'#d63737cf',
            'color':'white'
          });
        });
        $('#cancel').mouseleave(function(){
            $('#cancel').css({
              'background-color':'#fcfcfc',
              'color':'#444444'
            });
        });
        $('#cancel').hide();
        $('#grid').append('<table id="score">');
        $('#score').append('<caption>');
        $('#score').css({
          'margin':'auto',
          'text-align':'center',
          'border-spacing':'20px 2px',
          'border':'1px solid #444444',
          'background-color':'rgba(12, 140, 12, 0.44)',
          'border-radius': '4%'
        });
        $('caption').text('Victoires');
        $('caption').css({'margin-top': '35px', 'font-size':'30px'});
        $('#score').append('<tr>'+'<tr>');
        $('#score tr:first').append('<td id="player1">' + '<td id="player2">');
        $('#player1').text(settings.player1);
        $('#player2').text(settings.player2);
        $('#player1, #player2').css({'padding-top':'15px'});
        $('#score tr:last').append('<td id="scorep1">' + '<td id="scorep2">');
        $('#scorep1, #scorep2').css({'font-size': '40px'});
        $('#scorep1').text(scorep1);
        $('#scorep2').text(scorep2);
        $('#table td').mouseover(function(){
          $(this).css({
            'background-color':settings.colorp1
          });
        });
        $('#table td').mouseleave(function(){
            $(this).css({
              'background-color':'white'
            });
        });
      };
      
      function play(){
        $("td").click(function(){
          $('#cancel').show();
          $(this).css({
            'background-color':'white',
          });
          let column = $(this).index();
          let len = array.length - 1;
          let row;
          turn += 1;
          for (row = len; row > -1; row--) {
            $('.played').removeClass('played');
            if (array[row][column] == 0) {
              $('#table').append('<div id="'+row+'-'+column+'" class="pion">');
              $(`#${row}-${column}`).css({
                'width': '75px',
                'height':'75px',
                'border-radius': '50%',
                'position':'absolute',
              });
              $(`#${row}-${column}`).addClass('played');
              if(turn%2 == 1){
                $('#table td').mouseover(function(){
                  $(this).css({
                      'background-color':settings.colorp2,
                    });
                });
                $(`#${row}-${column}`).css({
                  'background-color': settings.colorp1,
                  'top': ($(`#${row}-${column}`).height()*$(this).parent().index())+'px',
                  'left':($(`#${row}-${column}`).width()*column)+'px'
                });
                $(`#${row}-${column}`).animate({
                  'top': ($(`#${row}-${column}`).height()*row)+'px'
                }, 250);
                array[row][column] = 1;
                $('#tours').text('Au tour de '+settings.player2);
              }
              if(turn%2 == 0){
                $('#table td').mouseover(function(){
                  $(this).css({
                      'background-color':settings.colorp1,
                    });
                });
                $(`#${row}-${column}`).css({
                  'background-color': settings.colorp2,
                  'top': ($(`#${row}-${column}`).height()*$(this).parent().index())+'px',
                  'left':($(`#${row}-${column}`).width()*column)+'px'
                });
                $(`#${row}-${column}`).animate({
                  'top': ($(`#${row}-${column}`).height()*row)+'px'
                }, 250);
                array[row][column] = 2;
                $('#tours').text('Au tour de '+settings.player1);
              }
              break;
            }
          }
              
          $('#cancel').click(function(){
            if($(`#${row}-${column}`).hasClass('played')){
              $('#tours').text('Au tour de '+settings['player' +array[row][column]]);
              turn--;
              $(`#${row}-${column}`).remove();
              $('#cancel').hide();
              let resetColor = settings['colorp'+array[row][column]];
              $('#table td').mouseover(function(){
                $(this).css({
                  'background-color':resetColor,
                });
              });
              array[row][column] = 0;
            }
          });

          setTimeout(function(){
            checkWin(array, row, column);
          }, 270);
        });
      };
        
      function checkWin(array, row, column){
        let player = array[row][column];
        let count = 0;
        let maxRow = array.length;
        let maxCol = array[row].length;

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

        for (i=3; i<maxRow; i++){
          for (j=0; j<maxCol-3; j++){
            if (array[i][j] == player && array[i-1][j+1] == player && array[i-2][j+2] == player && array[i-3][j+3] == player){  
              resetGrid(player, 1);
            }
          }
        }

        for (i=3; i<maxRow; i++){
          for (j=3; j<maxCol; j++){
            if (array[i][j] == player && array[i-1][j-1] == player && array[i-2][j-2] == player && array[i-3][j-3] == player){
              resetGrid(player, 1);
            }
          }
        }

        let _null = 1;
        $.each(array, function(row, column){
          $.each(column, function(key, value){
            if(column[key] == 0){
              _null = 0;
            }
          });
        });
        if(_null == 1){
          alert('Partie nulle');
          resetGrid(player, 0);
        }
      };
      
      function resetGrid(player, isWin){
        $.each(array, function(row, column){
          $.each(column, function(key, value){
            column[key]= 0;
          });
        });
        if(isWin == 1){
          if(player == 1){
            scorep1++;
            $('#scorep1').text(scorep1);
            $('#tours').text(settings.player2+' commence');
          }
          if(player == 2){
            scorep2++;
            $('#scorep2').text(scorep2);
            $('#tours').text(settings.player1+' commence');
          }
          $('#song')[0].play().catch(function(){});
          alert(settings['player' + player] +" a gagné");
        }
        else{
          if(player == 1){
            $('#tours').text(settings.player2+' commence');
          }
          if(player == 2){
            $('#tours').text(settings.player1+' commence');
          }
        }
        $('div.pion').remove();
        $('#cancel').hide();
      };

  $(document).ready(function(){
    createGrid(settings.x, settings.y);
    styleSheet();
    play();
  });
};
}(jQuery));
$('body').power4({x: 6, y: 6, player1 : "Ismaiiil", colorp1:'red', player2: 'Nicolas', colorp2: 'yellow'});