(function ($, PATH, Helpers) {

    const dragEnd = function(e){
        let areas = document.querySelectorAll('.area');

        for(var area of areas){

            let boundingClientRect = area.getBoundingClientRect();
            if((e.clientX > boundingClientRect.x && e.clientX < boundingClientRect.x + area.clientWidth) && (e.clientY > boundingClientRect.y && e.clientY < boundingClientRect.y + area.clientHeight)){

                if(area.childElementCount == 1){
                    let aux = area.firstElementChild;

                    if(e.target == aux) return;

                    let orderOrigin = $(e.target).parent().attr('id').replace(/[^0-9]/g, "");
                    let newOrder    = $(aux).parent().attr('id').replace(/[^0-9]/g, "");

                    $(e.target).parent().append($(aux));
                    $(e.target).parent().find(`input#order:not(div#${e.target.id} input#order)`).val(orderOrigin);

                    $(area).append($(e.target));
                    $(e.target).find('input#order').val(newOrder);
                }

            }

        }
    }

    const dragStart = function(ev){
        ev.originalEvent.dataTransfer.effectAllowed = "move";
    }

    const dragStartMobile = function(e){

        $('body').css('overflow', 'hidden');
        
        let touchLocation = e.targetTouches[0];

        e.target.style.left   = touchLocation.pageX - 50 + "px";
        e.target.style.top    = touchLocation.pageY - 50 + "px";
        e.target.style.zIndex = "100";
    }

    const dragEndMobile = function(e){

        $('body').css('overflow', 'auto');
        let clientX = parseFloat(e.changedTouches[0].clientX);
        let clientY = parseFloat(e.changedTouches[0].clientY);

        $.each($('.area'), (i, area) => {

            let boundingClientRect = area.getBoundingClientRect();

            if((clientX > boundingClientRect.x && clientX < (boundingClientRect.x + boundingClientRect.width)) && (clientY > boundingClientRect.y && clientY < (boundingClientRect.y + boundingClientRect.height))){

                if(area.childElementCount >= 1){
                    let aux = area.firstElementChild;

                    if(e.target == aux){
                        $(e.target).css({
                            'left': "unset",
                            'top': "unset",
                            'z-index': '1'
                        });
                        return;
                    }

                    let orderOrigin = $(e.target).parent().attr('id').replace(/[^0-9]/g, "");
                    let newOrder    = $(aux).parent().attr('id').replace(/[^0-9]/g, "");

                    $(e.target).parent().append($(aux));
                    $(e.target).parent().find(`input#order:not(div#${e.target.id} input#order)`).val(orderOrigin);

                    $(area).append($(e.target));
                    $(e.target).find('input#order').val(newOrder);

                    $(e.target).css({
                        'left': "unset",
                        'top': "unset",
                        'z-index': '1'
                    });
                }

            }

            if(i == $('.area').length - 1 && $(e.target).css('left') != "unset"){
                $(e.target).css({
                    'left': "unset",
                    'top': "unset",
                    'z-index': '1'
                });
            }

        });
    }

    const initDrag = function() {

        $(document).on('dragstart', dragStart);
        $(document).on('dragend', dragEnd);
        $(document).on('touchmove', 'div[draggable="true"]', dragStartMobile);
        $(document).on('touchend', 'div[draggable="true"]', dragEndMobile);

    }

    getFile = () => {

        $(document).on('mouseup', '.change-file', function () {
            if($(this).find('.crop-image').length > 0){
                $(this).children('.crop-image').click();
            }
        });

        $(document).on('change', '.crop-image', async function () {
            var input = this;
            var check = true;

            if(input.files.length == 0){
                swal({
                    title: 'Ops', 
                    text: `Selecione pelo menos uma foto para continuar`, 
                    type: 'warning',
                    confirmButtonColor: "#cc1b5b",
                    confirmButtonText: 'Continuar'
                });
                $(input).val(null);
                check = false;
                $('.photos').html("");
                $('#continue').addClass("d-none");
                return false;
            }

            $('.photos').html("");
            $('#continue').removeClass("d-none");
            $('#loader-overlay').fadeIn(0);

            $.each(input.files, (key, file) => {
                // atribuição de extensão e formato de arquivo
                let size = file.size;
                size = Math.round((size / 1024));
                var extension = file.type;

                if (extension != 'image/png' && extension != 'image/jpeg' && extension != 'image/jpg') {
                    swal({
                        title: 'Ops', 
                        text: `Uma das fotos é inválida`, 
                        type: 'warning',
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar'
                    });
                    $(input).val(null);
                    check = false;
                    $('.photos').html("");
                    $('#loader-overlay').fadeOut(0);
                    $('#continue').addClass("d-none");
                    return false;
                }

                if (check && file && key < 9) {
                    var reader = new FileReader();

                    reader.onloadstart = function(e) {
                        if(check){
                            $('.photos').append(`
                                <div class="area" id="area-${key}">
                                    <div class="photo">
                                        <div id="loader-overlay">
                                            <span class="loader loader-circles"></span>
                                        </div>
                                    </div>
                                </div>
                            `);

                            $(`#area-${key}`).on('dragover', function(ev){
                                ev.preventDefault();
                            });

                            let height = $(`#area-${key}`).width();
                            $(`#area-${key}`).css('height', height + 50);

                            $(`.photo`).css({
                                'width': height,
                                'height': height + 50
                            });

                            $(window).on('resize', () => {
                                $.each($(`.area`), (i, area) => {
                                    let height = $(area).width();
                                    $(area).css('height', height + 50);

                                    $(area).find(`.photo`).css({
                                        'width': height,
                                        'height': height + 50
                                    });
                                })
                            })
                        }
                    }

                    reader.onloadend = function (e) {
                        if(check){
                            
                            let image = document.createElement('img');
                            image.src = e.target.result;

                            image.onload = function(){
                                let options = {
                                    height: 600,
                                    width: 800
                                }
                    
                                if(image.width > image.height) options = {width: 800, height: null};
                                if(image.width < image.height) options = {width: null, height: 600};
                                if(image.width == image.height) options = {width: 600, height: 600};

                                resizeImage(image, options).then((base64) => {
                                    $(`#area-${key}`).html(`
                                        <div class="photo" id="photo-${key}" draggable="true" style="background-image: url('${base64}');">
                                            <input type="text" id="order" hidden name="${file.name.replace(/ /g, "---").replace(/[.]/g, "___")}" value="${key}">
                                            <p class="gilroy">Foto de perfil</p>
                                        </div>`
                                    );

                                    let height = $(`#area-${key}`).width();
                                    $(`#area-${key}`).css('height', height + 50);

                                    $(`#photo-${key}`).css({
                                        'width': height,
                                        'height': height + 50
                                    });

                                    $(window).on('resize', () => {
                                        $.each($(`.area`), (i, area) => {
                                            let height = $(area).width();
                                            $(area).css('height', height + 50);

                                            $(area).find(`.photo`).css({
                                                'width': height,
                                                'height': height + 50
                                            });
                                        })
                                    })
                                })
                            }
                        }
                    }

                    reader.readAsDataURL(file);
                }

                if(check && (input.files.length == (key + 1) || key+1 == 9)){
                    $('.div-button-continue').removeClass("d-none");
                    $('#loader-overlay').fadeOut(0);
                    
                    swal({
                        imageUrl: PATH + "/assets/img/icones/drag (5).gif",
                        imageWidth: 200,
                        imageHeight: 200,
                        title: "Você pode ordenar suas fotos",
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar'
                    })
                }

            })

        });
    }

    const send = () => {

        $(document).on('click', '#continue', async function () {

            if (typeof $('input#image.obrigatory-image').val() !== "undefined" && $("input#image")[0].files.length == 0) {
                swal({
                    type: 'warning',
                    title: 'Cadastro de Usuário',
                    text: 'Você deve colocar uma foto de perfil',
                    confirmButtonColor: "#cc1b5b",
                    confirmButtonText: 'Continuar'
                });
                return false;
            }

            $('#loader-overlay').fadeIn(500, async () => {

                var formObj = $("form");
                var formURL = formObj.attr("action");
                var formData = new FormData($('form')[0]);

                let response = await $.ajax({
                    url: PATH + '/saveImage',
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'multipart/form-data',
                    contentType: false,
                    cache: false,
                    processData: false,
                    async: false,
                    data: formData
                });

                $('#loader-overlay').fadeOut(500)

                if (response.result) {
                    swal({
                        type: 'success',
                        title: 'Tudo Certo',
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar'
                    }).then(() => {

                        if(response.url != ""){
                            window.location.href = PATH + response.url;
                        }else{
                            window.location.href = PATH + "/download";
                        }

                    })
                }else{
                    swal({
                        type: 'warning',
                        title: 'Ops',
                        text: 'Não foi possível salvar suas fotos',
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar'
                    }).then(() => {
                        window.location.reload(true);
                    })
                }
            });

        })

    }

    const removeCaptureIOS = function () {

        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) $('input[type="file"]').removeAttr('capture')

    }

    const resize = function(){
        $.each($(`.area`), (i, area) => {
            let height = $(area).width();
            $(area).css('height', height + 50);

            $(area).find(`.photo`).css({
                'width': height,
                'height': height + 50
            });
        })

        $(window).on('resize', () => {
            $.each($(`.area`), (i, area) => {
                let height = $(area).width();
                $(area).css('height', height + 50);

                $(area).find(`.photo`).css({
                    'width': height,
                    'height': height + 50
                });
            })
        })
    }

    const resizeImage = function(image, options = {width: null, height: null}) {

        return new Promise((resolve, reject) => {
          
          // create an off-screen canvas
          var canvas = document.createElement('canvas');
    
          if(!options.width && !options.height){
            canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
            resolve(canvas.toDataURL("image/jpeg", 100));
          }
    
          // set its dimension to target size
          if (options.width && !options.height) {
            options.height = image.height * (options.width / image.width)
          } else if (!options.width && options.height) {
            options.width = image.width * (options.height / image.height)
          }
    
          Object.assign(canvas, options);
    
          // draw source image into the off-screen canvas:
          canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    
          resolve(canvas.toDataURL("image/jpeg", 100));
        });
    }

    $(document).ready(function () {
        getFile();
        removeCaptureIOS();
        send();
        initDrag();
        resize();
        $(`.area`).on('dragover', function(ev){
            ev.preventDefault();
        });
    })

})($, PATH, Helpers)