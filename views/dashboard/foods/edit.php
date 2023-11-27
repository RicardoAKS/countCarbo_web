<section class="dashboard-page pt-0">
    <div class="row title dashboard-title bg-success rounded-top">

        <div class="col-md-6 p-0">
            <h1 class="text-white bourto">Novo Alimento</h1>
        </div>

    </div>

    <form id="submitFood" class="row p-3">

        <div class="col-12 col-md-4 d-flex flex-wrap justify-content-center align-items-center mb-3">

            <input type="file" hidden name="food-image" accept="image/png, image/jpeg, image/jpg" />

            <?php if($base64 != null): ?>
                <div class="col-8 bg-secondary rounded d-flex flex-wrap justify-content-center align-items-center food-image pointer" style="aspect-ratio: 1/1; background-image: url('<?= $base64 ?>'); background-size: cover; background-position: center;">
            <?php else: ?>
                <div class="col-8 bg-secondary rounded d-flex flex-wrap justify-content-center align-items-center food-image pointer" style="aspect-ratio: 1/1;">
            <?php endif; ?>

                <?php if ($base64 == null) : ?>
                    <p class="text-white text-center">Clique aqui para adicionar uma imagem</p>
                <?php endif; ?>
            </div>

        </div>

        <div class="d-flex flex-wrap col-md-8 col-12 px-0">
            <div class="form-group col-md-6 col-12">

                <label for="name">Nome</label>
                <input class="form-control" name="name" type="text" id="name" placeholder="Ex: Maça" required maxlength="255" value="<?= $food["name"] ?>" />

            </div>

            <div class="form-group col-md-6 col-12">

                <label for="category">Categoria</label>
                <select class="form-control" name="category" id="category" required>
                    <option hidden value="">Selecione uma categoria</option>
                    <?php foreach ($categories as $key => $category) { ?>
                        <option <?= $category["id"] == $food["category_foods_id"] ? "selected" : "" ?> value="<?= $category["id"] ?>"><?= $category["name"] ?></option>
                    <?php } ?>
                </select>

            </div>

            <div class="form-group col-12 col-md-6">

                <label for="measure">Medida</label>
                <input class="form-control" name="measure" type="text" id="measure" placeholder="Ex: Meia maça" required maxlength="255" value="<?= $food["measure"] ?>" />

            </div>

            <div class="form-group col-12 col-md-6">

                <label for="weight">Peso</label>

                <div class="d-flex flex-row flex-wrap">
                    <input class="form-control w-75 rounded-left" name="weight" type="tel" id="weight" placeholder="Ex: 100" style="border-radius: 0 0;" required number maxlength="11" value="<?= $food["weight"] ?>" />
                    <select class="form-control w-25 rounded-right" name="weightType" style="border-radius: 0 0;" required>
                        <option hidden value="">Selecione uma medida</option>
                        <?php foreach ($weigthMeasures as $key => $weigthMeasure) { ?>
                            <option <?=$food["weight_measure_food_id"] == $weigthMeasure["id"] ? "selected" : "" ?> value="<?= $weigthMeasure["id"] ?>"><?= $weigthMeasure["name"] ?></option>
                        <?php } ?>
                    </select>
                </div>

            </div>

            <div class="form-group col-12 col-md-6">

                <label for="kcal">Kcal</label>
                <input class="form-control" name="kcal" type="tel" id="kcal" placeholder="Ex: 52" required number maxlength="11" value="<?= $food["kcal"] ?>" />

            </div>

            <div class="form-group col-12 col-md-6">

                <label for="carbohydrate">Carboidratos</label>
                <input class="form-control" name="carbohydrate" type="tel" id="carbohydrate" placeholder="Ex: 22.80G" required number maxlength="11" value="<?= $food["carbohydrate"] ?>" />

            </div>
        </div>

        <div class="form-group col-12">
            <label for="description">Descrição</label>
            <textarea class="form-control" name="description" name="description" id="description"><?= $food["description"] ?></textarea>
        </div>

        <div class="col-12 d-flex justify-content-end">

            <button class="btn btn-success py-2 px-3" type="submit">
                SALVAR
            </button>

        </div>

    </form>


</section>