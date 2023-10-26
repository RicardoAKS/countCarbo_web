<section class="dashboard-page pt-0">
    <div class="row title dashboard-title bg-success rounded-top">

        <div class="col-md-6 p-0">
            <h1 class="text-white bourto">Novo Alimento</h1>
        </div>

    </div>

    <form id="submitFood" class="row p-3">

        <div class="form-group pr-3 col-12 col-md-6">
    
            <label for="name">Nome</label>
            <input class="form-control" name="name" type="text" id="name" placeholder="Ex: Maça" required maxlength="255"/>
    
        </div>

        <div class="form-group pr-3 col-12 col-md-6">
    
            <label for="category">Grupo Alimentício</label>
            <select class="form-control uppercase" name="category" id="category" required>
                <option hidden value="">Selecione uma categoria</option>
                <?php foreach ($categories as $key => $category) { ?>
                    <option value="<?=$category["id"]?>" class="uppercase"><?=$category["name"]?></option>
                <?php } ?>
            </select>
    
        </div>

        <div class="form-group pr-3 col-12 col-md-6">
    
            <label for="measure">Medida</label>
            <input class="form-control" name="measure" type="text" id="measure" placeholder="Ex: Meia maça" required maxlength="255"/>
    
        </div>

        <div class="form-group pr-3 col-12 col-md-6">
    
            <label for="weight">Peso</label>

            <div class="d-flex flex-row flex-wrap">
                <input class="form-control w-75 rounded-left" name="weight" type="tel" id="weight" placeholder="Ex: 100" style="border-radius: 0 0;" required number maxlength="11" />
                <select class="form-control w-25 uppercase rounded-right" name="weightType" style="border-radius: 0 0;" required>
                    <option hidden value="">Selecione uma medida</option>
                    <?php foreach ($weigthMeasures as $key => $weigthMeasure) { ?>
                        <option value="<?=$weigthMeasure["id"]?>" class="uppercase"><?=$weigthMeasure["name"]?></option>
                    <?php } ?>
                </select>
            </div>
    
        </div>

        <div class="form-group pr-3 col-12 col-md-6">
    
            <label for="kcal">Kcal</label>
            <input class="form-control" name="kcal" type="tel" id="kcal" placeholder="Ex: 52" required number maxlength="11" />
    
        </div>

        <div class="form-group pr-3 col-12 col-md-6">
    
            <label for="carbohydrate">Carboidratos</label>
            <input class="form-control" name="carbohydrate" type="tel" id="carbohydrate" placeholder="Ex: 22.80G" required number maxlength="11"/>
    
        </div>

        <div class="col-12 d-flex justify-content-end">

            <button class="btn btn-success py-2 px-3" type="submit">
                SALVAR
            </button>

        </div>

    </form>


</section>