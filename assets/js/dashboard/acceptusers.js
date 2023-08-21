/**
 *
 * Alan e Ricardo
 *
 * Script referente as operações de anúncios
 *
 * @author Alan de Souza
 * @author Ricardo A. Klos
 *
 **/
;
(function ($, PATH, Helpers) {
    var swiper, timeout;
    const swiperOptions = {
        // Optional parameters
        direction: 'horizontal',
        loop: false,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },

        effect: "cards"
    };

    const openProfile = function () {

        $('.btn-avaliation').click(function () {

            let id = $(this).attr('data-id')
            $('.swiper-wrapper').html("");
            swiper.update();

            $('#loader-overlay').fadeIn(500, () => {
                $.ajax({
                    url: PATH + '/getUser',
                    type: 'POST',
                    dataType: 'JSON',
                    async: false,
                    data: {
                        id: id
                    },
                    complete: function (response) {

                        $.each(response.responseJSON.user.images, (k, image) => {
                            $('.swiper-wrapper').append(`
                                <div class="swiper-slide">
                                    <img src="${PATH}/assets/photos/${image.userid}/${image.media}" class="swiper-lazy" />
                                </div>
                            `)

                            if(response.responseJSON.user.images.length == k+1){
                                swiper.update();
                                swiper.slideTo(0, 0, false);
                            }
                        });

                        $('#userid').val(id);

                        $('#modal-avaliation span.details-name').html(response.responseJSON.user.username)
                        $('#modal-avaliation span.details-age').html(response.responseJSON.user.age)
                        $('#modal-avaliation span.details-email').html(response.responseJSON.user.email)
                        $('#modal-avaliation span.details-phone').html(response.responseJSON.user.phone)
                        $('#modal-avaliation span.details-gender').html(response.responseJSON.user.sex)
                        $('#modal-avaliation span.details-hairColor').html(response.responseJSON.user.hairColor)
                        $('#modal-avaliation span.details-eyeColor').html(response.responseJSON.user.eyeColor)
                        $('#modal-avaliation span.details-childrens').html(response.responseJSON.user.childrens)
                        $('#modal-avaliation span.details-maritalStatus').html(response.responseJSON.user.maritalStatus)
                        $('#modal-avaliation span.details-smoke').html(response.responseJSON.user.smoke)
                        $('#modal-avaliation span.details-drink').html(response.responseJSON.user.drink)
                        $('#modal-avaliation span.details-academicFormation').html(response.responseJSON.user.academicFormation)
                        $('#modal-avaliation span.details-profession').html(response.responseJSON.user.profession)
                        $('#modal-avaliation span.details-height').html(response.responseJSON.user.height ? response.responseJSON.user.height + "m" : "")
                        $('#modal-avaliation span.details-preferences').html(response.responseJSON.user.preference)
                        $('#modal-avaliation span.details-description').html(response.responseJSON.user.bio)

                        if(response.responseJSON.user.city && response.responseJSON.user.initials) $('#modal-avaliation span.details-location').html(response.responseJSON.user.city + ' - ' + response.responseJSON.user.initials)

                        $('#modal-avaliation form select').val('1');
                        $('#loader-overlay').fadeOut(1000);

                    }
                })

            });

        })

    }

    const saveGrades = function(){

        $(document).on('click', '.btn-save-grade#save', function(){

            swal({
                type: "question",
                title: "Salvar as Notas?",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'SIM',
                cancelButtonColor: "#6c757d",
                cancelButtonText: 'NÃO'
            }).then(function(res){
                if(res.value){

                    let formData = new FormData($('form#grades')[0]);
                    
                    $('#loader-overlay').fadeIn(500, () => {
                        $.ajax({
                            url: PATH + '/saveGrade',
                            dataType: 'json',
                            type: 'POST',
                            contentType: false,
                            cache: false,
                            processData: false,
                            async: false,
                            data: formData
                        }).done(function(res){

                            $('#loader-overlay').fadeOut(1000);

                            if(res.response){

                                let id     = $('form#grades').find('input#userid').val();
                                let grades = $(`tr#${id}`).find('.avaliation-status span').text();

                                $(`tr#${id}`).find('.avaliation-status span').removeClass("text-danger").addClass("text-success").text(parseInt(grades) + 1);

                                swal({
                                    type: "success",
                                    title: "Sucesso!",
                                    text: "Notas salvas com sucesso, quer fechar o modal?",
                                    showConfirmButton: true,
                                    showCancelButton: true,
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'SIM',
                                    cancelButtonColor: "#6c757d",
                                    cancelButtonText: 'NÃO'
                                }).then((res) => {
                                    if(res.value){
                                        $('#modal-avaliation').modal("hide");
                                    }
                                })
                            }else{
                                swal({
                                    type: "error",
                                    title: "Ops",
                                    text: "Ocorreu algum erro ao salvar",
                                    showConfirmButton: true,
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'CONTINUAR',
                                })
                            }
                        })
                    });

                }
            })

        });

    }

    let pagination = isNaN(window.location.href.split("/").reverse()[0].replace(/[^0-9]/g, "")) || window.location.href.split("/").reverse()[0].replace(/[^0-9]/g, "") == "" ? 1 : parseInt(window.location.href.split("/").reverse()[0].replace(/[^0-9]/g, ""));

    const seeMore = function(){
        $(document).on('click', '.see-more', function(){
            page = $(this).attr('data-page');
            $.ajax({
                url: PATH + "/dashboard/approve-users/" + (parseInt(page) + 1),
                dataType: "HTML",
            }).done((res) => {
                $('tbody').append($(res).find('tbody').html());
                $('.update-pages').html($(res).find('.update-pages').html());
                openProfile();
                $(this).attr('data-page', parseInt(page) + 1);
            })
        })
    }

    const blockUser = function(){
        
        $(document).on('click', '.btn-block', async function(){
            const id = $(this).data('id');

            var { value: blockValues } = await swalBlock(id);

            if (blockValues) {

                if(blockValues.id != "" && blockValues.type != "" && blockValues.justify != ""){
                    
                    $('#loader-overlay').fadeIn(500, () => {
                        $.ajax({
                            url: PATH + "/blockUser",
                            data: blockValues,
                            type: "POST",
                            dataType: "JSON"
                        }).done((res) => {

                            $('#loader-overlay').fadeOut(0);

                            if(res.response){
                                $(this).removeClass("btn-block").addClass("btn-unlock");
                                $(this).text("DESBLOQUEAR");

                                if(blockValues.type == "all_block"){
                                    $(this).attr('all_block', '1');
                                }else{
                                    $(this).attr('photo_block', '1');
                                }

                                swal({
                                    type: 'success',
                                    title: 'Sucesso!',
                                    text: "Usuário bloqueado com sucesso!",
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'CONTINUAR',
                                })
                            }else{
                                swal({
                                    type: 'error',
                                    title: 'Erro!',
                                    text: "Ocorreu algum erro ao bloquear o usuário!",
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'CONTINUAR',
                                })
                            }
                        })
                    });

                }
            }

        });

        $(document).on('click', '.btn-unlock', function(){
            const id        = $(this).data('id');
            var all_block   = $(this).attr('all_block');
            var photo_block = $(this).attr('photo_block');
            var name        = $(this).parents("tr").find('td')[2].innerText.trim().split(" ");

            if(name.length >= 2){
                name = `${name[0]} ${name[1]}`; 
            }else{
                name = name[0];
            }

            swal({
                type: "question",
                title: `Desbloquear ${name}?`,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'SIM',
                cancelButtonColor: "#cc1b5b",
                cancelButtonText: 'NÃO',
            }).then((res) => {
                if(res.value){
                    var type = "";

                    if(all_block == "1"){
                        type = "all_block";
                    }
        
                    if(photo_block == "1"){
                        type = "photo_block";
                    }

                    $('#loader-overlay').fadeIn(500, () => {
                        $.ajax({
                            url: PATH + "/blockUser",
                            data: {
                                id: id,
                                type: type,
                                justify: "",
                                status: 0
                            },
                            type: "POST",
                            dataType: "JSON"
                        }).done((res) => {

                            $('#loader-overlay').fadeOut(0);

                            if(res.response){
                                $(this).removeClass("btn-unlock").addClass("btn-block");
                                $(this).text("BLOQUEAR");

                                if(type == "all_block"){
                                    $(this).attr('all_block', '0');
                                }else if(type == "photo_block"){
                                    $(this).attr('photo_block', '0');
                                }

                                swal({
                                    type: 'success',
                                    title: 'Sucesso!',
                                    text: "Usuário desbloqueado com sucesso!",
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'CONTINUAR',
                                })
                            }else{
                                swal({
                                    type: 'error',
                                    title: 'Erro!',
                                    text: "Ocorreu algum erro ao desbloquear o usuário!",
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'CONTINUAR',
                                })
                            }

                        });

                    });
                }
            })
            
        });

    }

    const swalBlock = async function(id, type = "", justify = ""){

        return await swal({
            type: 'warning',
            title: "Bloquear Usuário!",
            html: `
                <div class="p-3">
                    <input type="text" hidden name="id" value="${id}" />
                    <div class="form-group text-left">
                        <label for="type_block" class="gilroy">Tipo de Bloqueio:</label>
                        <select name="type_block" id="type_block" class="form-control gilroy">
                            <option class="gilroy" value="">Selecione o tipo de bloqueio</option>
                            <option class="gilroy" ${type == "photo_block" ? "selected" : ""} value="photo_block">Bloquear até trocar a foto</option>
                            <option class="gilroy" ${type == "all_block"   ? "selected" : ""} value="all_block">Bloquear até um administrador desbloqueá-lo</option>
                        </select>
                    </div>

                    <div class="form-group text-left">
                        <label for="justify" class="gilroy">Motivo do bloqueio: <br> <small class="gilroy">será enviado para o usuário</small></label>
                        <textarea class="form-control gilroy" rows="4" name="justify" id="justify">${justify}</textarea>
                    </div>
                </div>
            `,
            preConfirm: async () => {

                if($('select[name="type_block"]').val() == ""){

                    var type    = $('select[name="type_block"]').val();
                    var justify = $('textarea[name="justify"]').val();

                    await swal({
                        type: "warning",
                        title: "Bloquear Usuário",
                        text: "Selecione o tipo de bloqueio",
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'CONTINUAR',
                        cancelButtonColor: "#cc1b5b",
                        cancelButtonText: 'CANCELAR',
                    }).then(async (res) => {
                        if(res.value){
                            return await swalBlock(id, type, justify);
                        }else{
                            return { id: "", type: "", justify: "" };
                        }
                    })

                }

                if($('textarea[name="justify"]').val() == ""){

                    var type    = $('select[name="type_block"]').val();
                    var justify = $('textarea[name="justify"]').val();

                    await swal({
                        type: "warning",
                        title: "Bloquear Usuário",
                        text: "Digite o motivo do bloqueio!",
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'CONTINUAR',
                        cancelButtonColor: "#cc1b5b",
                        cancelButtonText: 'CANCELAR',
                    }).then(async (res) => {
                        if(res.value){
                            return await swalBlock(id, type, justify);
                        }else{
                            return { id: "", type: "", justify: "" };
                        }
                    })
                }

                return {
                  id: $('input[name="id"]').val(),
                  type: $('select[name="type_block"]').val(),
                  justify: $('textarea[name="justify"]').val(),
                  status: 1
                }
            },
            showConfirmButton: true,
            confirmButtonColor: "#cc1b5b",
            confirmButtonText: 'CONTINUAR',
        })

    }

    const sortTable = function(){

        $('table img').each(function () {
            $(this).after('<span style="display:none">1</span>');
        });

        $('table .without-image-div').each(function () {
            $(this).before('<span style="display:none">0</span>');
        });

        $("#tableUsers").tablesorter({
            sortList: [[0,1]],
        });
    }

    const applyFilters = function(sex){
		if(sex.length > 0){
			let sexArray = [];
			$('input[name="sex"]:checked').each(function(){
				sexArray.push($(this).val());
			});
			setCookie('sex',sexArray, '1', '/');
		} else{
			setCookie('sex',null, '-1', '/');
		}
	}

    const filters = function(){
        var sex = $('input[name="sex"]');

        $(document).on('click', '.btn-filter', async function(){
            
            applyFilters(sex);
            await getValues();
        })
    }

    const getValues = async function(){
        var sexArray = [];
        $('input[name="sex"]:checked').each(function(){
            sexArray.push($(this).val());
        });

        return await filterSearch(sexArray);
    }

    const filterSearch = async function(sex = null){
        clearTimeout(timeout);

        if(sex == null && $('input[name="sex"]').is(':checked') != false){
            sex = [];
            $('input[name="sex"]:checked').each(function(){
                sex.push($(this).val());
            });
        }else{
            sex = sex;
        }

        if((sex == null || sex.length == 0)){
            timeout = setTimeout(async function(){

                pagination = pagination == 0 ? 1 : pagination;
                $('#loader-overlay').fadeIn(500, () => {
                    $.ajax({
                        url: PATH + "/dashboard/approve-users/" + pagination,
                        dataType: 'HTML'
                    }).done((res) => {
                        $('#approve-users').html($(res).find('#approve-users').html());
                        openProfile();
                        setTimeout(function (){
                            sortTable()
                        }, 500)
                        setCookie('sex', null, '-1', '/');
                        $('#loader-overlay').fadeOut(1000);
                        return res;
                    })
                });
            }, 500);
        }else{
            timeout = setTimeout(async function(){
				await $('#loader-overlay').fadeIn(500);
				return await searchUser(sex);
			}, 500);			
		}
    }

    const searchUser = async function(sex){
        $.ajax({
            url: PATH + "/searchUsers",
            data: {
                sex: sex,
            },
            type: 'POST',
            dataType: 'HTML'
        }).done((res) => {
            $('#approve-users').html($(res).find('#approve-users').html());
            openProfile();
            setTimeout(function (){
                sortTable()
            }, 500)
            setCookie('sex', sex, '1', '/');
            $('#loader-overlay').fadeOut(1000);
            ChangeUrl(1);
            return res;
        })
    }
    var ChangeUrl = function(url) {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Url: url };
            history.pushState(obj, '' , obj.Url);
        } else {
            // alert("Browser does not support HTML5.");
        }
    }

    var setCookie = function(key, value, expiry){
        var expires = new Date();
        expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';path=/;expires=' + expires.toUTCString();
		page = 0;
    }

    $(document).ready( function () {
        saveGrades();
        openProfile()
        swiper = new Swiper('.swiper', swiperOptions);
        seeMore();
        blockUser();
        filters();
        setTimeout(sortTable, 1000);
    });

})($, PATH, Helpers);