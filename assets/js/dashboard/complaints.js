/**
 *
 * Willen
 *
 * Script referente as operações de anúncios
 *
 * @author Willen L. Carneiro
 *
 **/
 ;
 (function ($) {

    const setHeight = function(){

        $.each($('table tbody tr'), (key, tr) => {

            $.each($(tr).children('td'), (k, td) => {

                if($(td).children('div').length == 1){

                    $(td).children('div').css({
                        'height': $(td).height()
                    });

                }

            });

        });

        $(window).on('resize', function(){

            $.each($('table tbody tr'), (key, tr) => {

                $.each($(tr).children('td'), (k, td) => {
    
                    if($(td).children('div').length == 1){
    
                        $(td).children('div').css({
                            'height': $(td).height()
                        });
    
                    }
    
                });
    
            });

        })

    }

    const sortTable = function(){
        $('table img').each(function () {
            $(this).before('<span style="display:none">1</span>');
        });
        $('table .verify:checked').each(function () {
            $(this).before('<span style="display:none">1</span>');
        });
        $('table .verify:not(:checked)').each(function () {
            $(this).before('<span style="display:none">0</span>');
        })
        $("#tableComplaints").tablesorter({
            sortList: [[3,1], [8,0]],
        });
    }

    const verified = function(){
        $(document).on('change', '.verify', function(){
            dataId = $(this).attr('data-id');
            if(this.checked){
                check = 1;
                $.ajax({
                    url: PATH + "/userVerified",
                    data: {
                        userId: dataId,
                        check: check,
                    },
                    type: 'POST',
                    dataType: 'HTML'
                }).done((res) => {
                })
            }else{
                check = 0;
                $.ajax({
                    url: PATH + "/userVerified",
                    data: {
                        userId: dataId,
                        check: check,
                    },
                    type: 'POST',
                    dataType: 'HTML'
                }).done((res) => {
                })
            }
        })
    }
 
    $(document).ready(function () {
        setHeight();
        sortTable();
        verified();
    });
 
 })($);