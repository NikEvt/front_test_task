$(document).ready(function() {
    
    var editor = CodeMirror.fromTextArea(document.getElementById('htmlEditor'), {
        mode: "xml",
        htmlMode: true,
        lineNumbers: true,
        theme: "monokai",
        autoCloseTags: true,
        matchBrackets: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        }
    });

    editor.on('change', function() {
        var htmlCode = editor.getValue();
        $('#htmlOutput').html(htmlCode);

        $('#htmlOutput').find('p, h1, h2, h3, h4, h5, h6, div, span, a, li').attr('contenteditable', 'true');
    });

    var timer;

    $('#htmlOutput').on('input', 'p, h1, h2, h3, h4, h5, h6, div, span, a, li', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            var updatedHtml = $('#htmlOutput').html();
            editor.setValue(updatedHtml);
        }, 1000);
    });
});