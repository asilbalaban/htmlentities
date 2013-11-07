$(document).ready(function(){
    // set textarea's width & height
    var totalHeight = $(window).height();
    var totalWidth = $(window).width();
    $('.box').height((totalHeight/2)-10);
    $('.box').width(totalWidth-5); 

    // add line numbers
    $(".box").linedtextarea();

    var escape = document.createElement('textarea');
    function escapeHTML(html) {
        escape.innerHTML = html;
        return escape.innerHTML;
    }

    function unescapeHTML(html) {
        escape.innerHTML = html;
        return escape.value;
    }    

    // encode
    $('#input').bind('input propertychange', function() {
        var input = escapeHTML( $('#input').val() );
        $('#output').val(input);
    })     

    // decode
    $('#output').bind('input propertychange', function() {
        var output = unescapeHTML ( $('#output').val() );
        $('#input').val( output );
    })  

    // handle tab key
    $("textarea").keydown(function(e) {
        if(e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var $this = $(this);
            var value = $this.val();

            // set textarea value to: text before caret + tab + text after caret
            $this.val(value.substring(0, start)
                        + "\t"
                        + value.substring(end));

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            e.preventDefault();
        }
    });    
});     