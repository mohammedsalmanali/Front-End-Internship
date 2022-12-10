$(document).ready(function () {
    var image = document.getElementById('display').outerHTML;
    $('#display').hide();
    $('#danger').hide();

    function showInput(number) {
      $('#displayBox').html('');
        for (var index = 0; index < number; index++) {
          $('#displayBox').append(image);
        }
    }

    $("#generateButton").click(function () {
         var number = parseInt($('#textBox').val(), 10);
         if (isNaN(number) || (number < 1 || number > 100)) {
            
            $('#danger').html('Confirm Your Entry').show();
            $("#textBox").attr("style", "border-color: red!important");
            return false;
        }  
        showInput(number);
        $('#danger').html('Confirm Your Entry').hide();
        $("#textBox").attr("style", "border-color: ");
    });
});
