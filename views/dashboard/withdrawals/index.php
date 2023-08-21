<section id="approve-users">
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-lg-6 col-md-5 col-6">
                    <h3 class="text-left">Saques (<?= $totalWithdrawals ?>)</h3>
                </div>

            </div>
        </div>
        <div class="card-body">
            <!-- <br />
            <div class="row">
                <div class="row-search col-6">
                    <h4>Pesquisa</h4>
                    <input type="text" name="search" id="search" class="form-control mb-3" placeholder="Digite para pesquisar" />
                </div>
            </div> -->
            
            <?php if (count($withdrawals) > 0) {
                $start = 0;
            ?>
                <nav class="update-pages" aria-label="Page navigation example" style="position: relative!important;">
                    <center>

                        <ul class="pagination justify-content-center my-3">

                            <?php if ($pagenumber > $pagination + 1) { ?>
                                <!-- <li class="page-item first"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>"><span> &laquo;</span></a></li> -->
                                <li class="page-item previous"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>/<?= $previous ?>"><span aria-hidden="true">&lsaquo;</span></a></li>
                                <li class="page-item last"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>"><span>1</span></a></li>
                                <li class="page-item last"><a class="page-link"><span>...</span></a></li>

                            <?php } ?>

                            <?php
                            for ($i = $pagenumber - $pagination; $i <= $pagenumber - 1; $i++) {

                                if ($i > 0) {
                            ?>
                                    <li class="page-item"><a class="page-link" href='<?= $url ?>/dashboard/<?= $page ?>/<?= $i ?>'>
                                            <div class='circle'><?= $i ?></div>
                                        </a>
                                    </li>
                            <?php   }

                                $start = $start - $totalpages;
                            }
                            ?>

                            <?php if ($totalWithdrawals > $limit) { ?>
                                <li class="page-item">
                                    <a class="page-link" href='<?= $url ?>/dashboard/<?= $page ?>/<?= $pagenumber ?>'>
                                        <div class='circle'><strong><?= $pagenumber ?></strong></div>
                                    </a>
                                </li>
                            <?php } ?>

                            <?php for ($i = $pagenumber + 1; $i < $pagenumber + $pagination; $i++) {

                                if ($i <= $totalpages) {
                            ?>
                                    <li class="page-item">
                                        <a class="page-link" href='<?= $url ?>/dashboard/<?= $page ?>/<?= $i ?>'>
                                            <div class='circle'><?= $i ?></div>
                                        </a>
                                    </li>
                            <?php }
                                $start = $start + $totalpages;
                            } ?>

                            <?php if ($pagenumber <= $totalpages - $pagination) { ?>
                                <li class="page-item last"><a class="page-link"><span>...</span></a></li>
                                <li class="page-item last"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>/<?= $totalpages ?>"><span><?= $totalpages ?></span></a></li>
                                <li class="page-item next"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>/<?= $next ?>"><span aria-hidden="true">&rsaquo;</span></a></li>
                                <!-- <li class="page-item last"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>/<?= $totalpages ?>"><span>&raquo;</span></a></li> -->

                            <?php } ?>
                        </ul>
                    </center>
                </nav>
            <?php } ?>

            <div class="tab-content">

                <!-- Geral -->
                <div class="table-responsive">
                    <table class="table table-hover table-striped tablesorter tablesorter-default" id="tableWithdrawals">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Comprovante</th>
                                <th class="text-center">Nome do <br> beneficiário</th>
                                <th class="text-center">Cadastros</th>
                                <th class="text-center">Saque</th>
                                <th class="text-center">Tipo PIX</th>
                                <th class="text-center">Código PIX</th>
                                <th class="text-center">Justificativa</th>
                                <th class="text-center sorter-false">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($withdrawals as $withdrawal) { ?>
                                <tr id="<?= $withdrawal["id"] ?>">
                                    <td class="text-center"><?= $withdrawal["id"] ?></td>
                                    <td class="text-center">
                                        <?php if($withdrawal["payment_voucher"] != null): ?>
                                            <a target="_BLANK" href="<?= $url ?>/assets/payment_vouchers/<?= $withdrawal['id']; ?>/<?= $withdrawal['payment_voucher']; ?>">
                                                <img width="75px" height="100px" class="fit-cover border border-dark rounded" src="<?= $url ?>/assets/payment_vouchers/<?= $withdrawal['id']; ?>/<?= $withdrawal['payment_voucher']; ?>" onerror="this.parentNode.insertAdjacentHTML('beforeend', `<div class='without-image-div gilroy'>Sem Foto</div>`); this.remove()" />
                                            </a>
                                        <?php endif; ?>
                                    </td>
                                    <td class="text-center"><?= $withdrawal["namePix"] ?></td>
                                    <td class="text-center"><?= $withdrawal["records"] ?></td>
                                    <td class="text-center">R$<?= number_format($withdrawal["balance"], 2, ',', '.') ?></td>
                                    <td class="text-center"><?=$type[$withdrawal["typePix"]]?></td>
                                    <td class="text-center"><?=$withdrawal["codePix"]?></td>
                                    <td class="text-center"><?=$withdrawal["justify"]?></td>
                                    <td class="text-center">
                                        <div class="">
                                            <?php if ($withdrawal['status'] == 'pending') { ?>
                                                <button class="btn btn-md btn-warning dropdown-toggle text-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" user-id="<?= $withdrawal["user_id"] ?>">
                                                    Pendente
                                                </button>
                                            <?php } else if ($withdrawal['status'] == 'confirmed') { ?>
                                                <button class="btn btn-md btn-success" type="button">
                                                    CONFIRMADO
                                                </button>
                                            <?php } else { ?>
                                                <button class="btn btn-md btn-danger" type="button">
                                                    RECUSADO
                                                </button>
                                            <?php } ?>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item change-status <?= $withdrawal['status'] == 'confirmed' ? 'active' : '' ?>" data-id="<?= $withdrawal['id'] ?>" data-status="confirmed">Confirmar</a>
                                                <a class="dropdown-item change-status <?= $withdrawal['status'] == 'refused' ? 'active' : '' ?>" data-id="<?= $withdrawal['id'] ?>" data-status="refused">Recusar</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                    <?php if (count($withdrawals) > 0) {
                        $start = 0;
                    ?>
                        <nav class="update-pages" aria-label="Page navigation example" style="position: relative!important;">
                            <center>

                                <ul class="pagination justify-content-center my-3">

                                    <?php if ($pagenumber > $pagination + 1) { ?>
                                        <!-- <li class="page-item first"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>"><span> &laquo;</span></a></li> -->
                                        <li class="page-item previous"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>/<?= $previous ?>"><span aria-hidden="true">&lsaquo;</span></a></li>
                                        <li class="page-item last"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>"><span>1</span></a></li>
                                        <li class="page-item last"><a class="page-link"><span>...</span></a></li>

                                    <?php } ?>

                                    <?php
                                    for ($i = $pagenumber - $pagination; $i <= $pagenumber - 1; $i++) {

                                        if ($i > 0) {
                                    ?>
                                            <li class="page-item"><a class="page-link" href='<?= $url ?>/dashboard/<?= $page ?>/<?= $i ?>'>
                                                    <div class='circle'><?= $i ?></div>
                                                </a>
                                            </li>
                                    <?php   }

                                        $start = $start - $totalpages;
                                    }
                                    ?>

                                    <?php
                                    if ($totalWithdrawals > $limit) {
                                    ?>
                                        <li class="page-item">
                                            <a class="page-link" href='<?= $url ?>/dashboard/<?= $page ?>/<?= $pagenumber ?>'>
                                                <div class='circle'><strong><?= $pagenumber ?></strong></div>
                                            </a>
                                        </li>
                                    <?php } ?>

                                    <?php
                                    for ($i = $pagenumber + 1; $i < $pagenumber + $pagination; $i++) {

                                        if ($i <= $totalpages) {
                                    ?>
                                            <li class="page-item">
                                                <a class="page-link" href='<?= $url ?>/dashboard/<?= $page ?>/<?= $i ?>'>
                                                    <div class='circle'><?= $i ?></div>
                                                </a>
                                            </li>
                                    <?php
                                        }

                                        $start = $start + $totalpages;
                                    }
                                    ?>

                                    <?php
                                    if ($pagenumber <= $totalpages - $pagination) { ?>
                                        <li class="page-item last"><a class="page-link"><span>...</span></a></li>
                                        <li class="page-item last"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>/<?= $totalpages ?>"><span><?= $totalpages ?></span></a></li>
                                        <li class="page-item next"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>/<?= $next ?>"><span aria-hidden="true">&rsaquo;</span></a></li>
                                        <!-- <li class="page-item last"><a class="page-link" href="<?= $url ?>/dashboard/<?= $page ?>/<?= $totalpages ?>"><span>&raquo;</span></a></li> -->
                                    <?php
                                    }
                                    ?>
                                </ul>
                            </center>
                        </nav>
                    <?php } ?>

                </div>


            </div>

        </div>
    </div>

    <form id="formRefused">
        <div class="modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Recusar Saque</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <input type="text" hidden name="status" value="refused">
                        <input type="text" hidden name="id" value="">

                        <div class="form-group">
                            <label for="name">Motivo para recusar saque</label>
                            <textarea class="form-control" id="justify" name="justify" required></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary gilroy" data-dismiss="modal">FECHAR</button>
                        <button type="submit" class="btn btn-success gilroy">ENVIAR</button>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <form id="formConfirmed">
        <div class="modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Mandar Comprovante</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        
                        <input type="text" hidden name="status" value="confirmed">
                        <input type="text" hidden name="id" value="">

                        <div class="form-group">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile" name="payment_voucher" accept="image/*" required>
                                <label class="custom-file-label" for="customFile" data-browse="Selecionar">Escolher Comprovante</label>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary gilroy" data-dismiss="modal">FECHAR</button>
                        <button type="submit" class="btn btn-success gilroy">ENVIAR</button>
                    </div>
                </div>
            </div>
        </div>
    </form>

</section>