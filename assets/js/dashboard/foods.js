(function ($, PATH, Helpers) {

    const deleteFood = () => {

        $(document).on('click', '.delete-food', function () {

            let food_id = $(this).data('id');

            swal({
                type: "warning",
                title: "Deletar Alimento!",
                text: "Quer mesmo deletar este alimento?",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "SIM",
                cancelButtonText: "NÃO"
            })
                .then((res) => {

                    if (res.value) {

                        $('#loader-overlay').fadeIn(500, () => {

                            $.ajax({
                                url: PATH + "/deleteFood",
                                data: {
                                    id: food_id
                                },
                                type: "POST",
                                dataType: "JSON"
                            })
                            .then((res) => {
                                $("#loader-overlay").fadeOut(0)

                                swal({
                                    type: "success",
                                    title: "Deletar Alimento!",
                                    text: "Alimento deletado com sucesso!",
                                })
                                .then(() => {
                                    window.location.reload()
                                })
                            })
                            .catch(err => {
                                $("#loader-overlay").fadeOut(0)

                                swal({
                                    type: "error",
                                    title: "Deletar Alimento!",
                                    text: "Ocorreu algum erro ao tentar deletar o alimento",
                                })
                            })

                        })

                    }

                })

        });

    }

    $(document).ready(() => {

        deleteFood();

    });

})($, PATH, Helpers);