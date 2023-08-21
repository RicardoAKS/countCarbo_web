/**
 *
 * Script do layout
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    var chatControl = function() {



    }

    var convertDateTime = function(datetime) {

        var stringDate = datetime.split(" ");
        var date = stringDate[0];
        var time = stringDate[1];

        date = date.split("-");

        stringDate = date[2] + "/" + date[1] + "/" + date[0] + " às " + time + "h";

        return stringDate;
    }


    $(document).ready(function() {

        chatControl();

    });


})($, PATH, Helpers);