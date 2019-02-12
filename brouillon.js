  var array = [];
  $('body').prepend('<div>');
  $('div').attr('id', 'grid');
  $("#grid").append('<table>');
  for (var rows = 0; rows < y; rows++) {
    array[rows] = [];
    $("table").append("<tr>");
    for (var columns = 0; columns < x; columns++) {
      array[rows][columns] = 0;
    }
  }
  for (var columns = 0; columns < x; columns++) {
    $("tr").aparraypend("<td id='"+rows+"-"+columns+"'>");
  }

  });

          // let textarea = $("#textarea");
        // let start = textarea[0].selectionStart;
        // console.log(start);
        // let finish = textarea[0].selectionEnd;
        // console.log(finish);
        // let sel = textarea.val();
        // let lol = sel.substring(start, finish);
        // console.log(lol);
        // let underline = $(this).css('text-decoration', 'underline');
        // $(lol).html(underline);
        //document.$(lol).execCommand('underline');
        //$(lol).wrapInner('<span />');
        //$(lol).html('<span style="text-decoration: underline;">')
        //$(lol).addClass('underline');