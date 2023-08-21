
        <div class="container">
            <center>
                <div class="login">
                    <header class="text-center">
                        <img src="<?php echo $url; ?>/assets/img/padrao/logo.png" alt="">
                    </header>
                    <form id="recoverPassword" name="recoverPassword">
                        <h3>Cadastre a nova senha</h3>
                        
                        <div class="form-group">
                            <label class="text-left w-100">Nova Senha</label>
                            <input class="form-control" name="newPassword" data-id="<?=$id?>" placeholder="****" type="password" />
                        </div>
                        <div class="form-group">
                            <label class="text-left w-100">Confirme a nova senha</label>
                            <input class="form-control" name="newPasswordConfirm" placeholder="****" type="password" />
                        </div>
                        <div>
                            <a href="<?php echo $url; ?>"></a>
                        </div>

                        <div class="btn btn-outline-light mb-2" id="btn-recover">Alterar Senha</div>

                    </form>
                </div>
            </center>
        </div>