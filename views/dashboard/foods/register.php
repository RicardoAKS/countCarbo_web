<section class="dashboard-page" id="foods-register-content">
    
    <div class="w-100 d-flex flex-wrap">

        <div class="col-12 row">

            <div class="form-group col-6">

                <label>Nome</label>
                <input class="form-control" type="text" name="name" placeholder="Ex: Maça pera" required />

            </div>

            <div class="form-group col-6">

                <label>Grupo Alimentício</label>
                <select class="form-control">
                    <option value="">Selecione uma categoria</option>
                    <?php foreach ($categories as $key => $category) { ?>
                        <option value="<?=$category["id"]?>"><?=$category["name"]?></option>
                    <?php } ?>
                </select>

            </div>

        </div>

    </div>
    
</section>