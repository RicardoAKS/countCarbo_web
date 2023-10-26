<section class="dashboard-page pt-0" id="foods-content">
    <div class="row title dashboard-title bg-success rounded-top align-items-center">
        <div class="col-md-6 p-0">
            <h1 class="bourto text-white">Alimentos</h1>
        </div>
        <div class="col-md-6 text-right box-trees">
            <a href="<?= $url; ?>/dashboard/food/register" class="btn btn-light font-bold">
                + Novo Alimento
            </a>
        </div>

    </div>

    <?php if (count($foods) >  0) { ?>
        <?php $start = 0; ?>

        <nav aria-label="Page navigation example" style="position: relative!important;">
            <center>

                <ul class="pagination justify-content-center my-3">

                    <?php if ($pagenumber >= 2) { ?>
                        <li class="page-item first"><a class="page-link" href="<?= $url ?>/foods/"><span> &laquo;</span></a></li>
                        <li class="page-item previous"><a class="page-link" href="<?= $url ?>/foods/<?= $previous ?>"><span aria-hidden="true">&lsaquo;</span></a></li>
                    <?php } ?>

                    <?php for ($i = $pagenumber - 3; $i <= $pagenumber - 1; $i++) { ?>

                        <?php if ($i > 0) { ?>
                            <li class="page-item"><a class="page-link" href='<?= $url ?>/foods/<?= $i ?>'>
                                    <div class='circle'><?= $i ?></div>
                                </a>
                            </li>
                        <?php } ?>

                        <?php $start = $start - $totalpages; ?>
                    <?php } ?>

                    <?php if ($totalnews > $limit) { ?>
                        <li class="page-item">
                            <a class="page-link" href='<?= $url ?>/foods/<?= $pagenumber ?>'>
                                <div class='circle'><strong><?= $pagenumber ?></strong></div>
                            </a>
                        </li>
                    <?php } ?>

                    <?php for ($i = $pagenumber + 1; $i < $pagenumber + 3; $i++) {

                        if ($i <= $totalpages) { ?>
                            <li class="page-item">
                                <a class="page-link" href='<?= $url ?>/foods/<?= $i ?>'>
                                    <div class='circle'><?= $i ?></div>
                                </a>
                            </li>
                        <?php } ?>

                        <?php $start = $start + $totalpages; ?>
                    <?php } ?>

                    <?php if ($pagenumber < $totalpages) { ?>

                        <li class="page-item next"><a class="page-link" href="<?= $url ?>/foods/<?= $next ?>"><span aria-hidden="true">&rsaquo;</span></a></li>
                        <li class="page-item last"><a class="page-link" href="<?= $url ?>/foods/<?= $totalpages ?>"><span>&raquo;</span></a></li>

                    <?php } ?>
                </ul>
            </center>
        </nav>
    <?php } ?>
    <div class="table-content">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col" class="text-center left-radius">#</th>
                        <th scope="col" class="text-center"></th>
                        <th scope="col" class="text-center">Nome</th>
                        <th scope="col" class="text-center">Categoria</th>
                        <th scope="col" class="text-center">Medida</th>
                        <th scope="col" class="text-center">Peso</th>
                        <th scope="col" class="text-center">KCAL</th>
                        <th scope="col" class="text-center">Carboidratos</th>
                        <th scope="col" class="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($foods as $key => $food) { ?>
                        <tr>
                            <td class="text-center"><?= $food['id']; ?></td>
                            <td class="text-center"></td>
                            <td class="text-center"><?= $food['name']; ?></td>
                            <td class="text-center uppercase"><?= $food['category_name']; ?></td>
                            <td class="text-center"><?= $food["measure"]; ?></td>
                            <td class="text-center"><?= $food["weight"]; ?><?= $food["weight_measure"]; ?></td>
                            <td class="text-center"><?= $food["kcal"]; ?></td>
                            <td class="text-center"><?= $food["carbohydrate"]; ?></td>
                            <td class="text-center" style="min-width: 200px;">
                                <a href="<?= $url; ?>/food/details/<?= $food['id'] ?>" class="btn btn-gray">Ver mais</a>
                                <button type="button" class="btn btn-close delete-food" data-id="<?= $food['id'] ?>">Deletar</button>
                            </td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
            <?php if (count($foods) > 0) { ?>
                <?php $start = 0; ?>

                <nav aria-label="Page navigation example" style="position: relative!important;">
                    <center>

                        <ul class="pagination justify-content-center my-3">

                            <?php if ($pagenumber >= 2) { ?>
                                <li class="page-item first"><a class="page-link" href="<?= $url ?>/foods/"><span> &laquo;</span></a></li>
                                <li class="page-item previous"><a class="page-link" href="<?= $url ?>/foods/<?= $previous ?>"><span aria-hidden="true">&lsaquo;</span></a></li>
                            <?php } ?>

                            <?php for ($i = $pagenumber - 3; $i <= $pagenumber - 1; $i++) { ?>

                                <?php if ($i > 0) { ?>
                                    <li class="page-item"><a class="page-link" href='<?= $url ?>/foods/<?= $i ?>'>
                                            <div class='circle'><?= $i ?></div>
                                        </a>
                                    </li>
                                <?php } ?>

                                <?php $start = $start - $totalpages; ?>
                            <?php } ?>

                            <?php if ($totalnews > $limit) { ?>
                                <li class="page-item">
                                    <a class="page-link" href='<?= $url ?>/foods/<?= $pagenumber ?>'>
                                        <div class='circle'><strong><?= $pagenumber ?></strong></div>
                                    </a>
                                </li>
                            <?php } ?>

                            <?php for ($i = $pagenumber + 1; $i < $pagenumber + 3; $i++) {

                                if ($i <= $totalpages) { ?>
                                    <li class="page-item">
                                        <a class="page-link" href='<?= $url ?>/foods/<?= $i ?>'>
                                            <div class='circle'><?= $i ?></div>
                                        </a>
                                    </li>
                                <?php } ?>

                                <?php $start = $start + $totalpages; ?>
                            <?php } ?>

                            <?php if ($pagenumber < $totalpages) { ?>

                                <li class="page-item next"><a class="page-link" href="<?= $url ?>/foods/<?= $next ?>"><span aria-hidden="true">&rsaquo;</span></a></li>
                                <li class="page-item last"><a class="page-link" href="<?= $url ?>/foods/<?= $totalpages ?>"><span>&raquo;</span></a></li>

                            <?php } ?>
                        </ul>
                    </center>
                </nav>
            <?php } ?>
        </div>
    </div>

</section>