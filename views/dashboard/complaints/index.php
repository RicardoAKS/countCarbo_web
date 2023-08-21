<section>
	<div class="card">
		<div class="card-header">
			<div class="row">
				<div class="col-lg-6 col-md-5 col-6">
				<h3 class="text-left">Usuários (<?= $totalReports ?>)</h3>
				</div>

			</div>
		</div>
		<div class="card-body">
			<br />

			<div class="row-search col-12">
				<h4>Filtro</h4>
				<input type="text" name="search" class="form-control mb-3" placeholder="Digite para filtrar" />
			</div>
			<?php if (count($reports) > 0) {
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
							if ($totalReports > $limit) {
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
			<div class="tab-content">

				<!-- Geral -->
				<div class="table-responsive">
					<table class="table table-hover table-stripedtablesorter tablesorter-default" id="tableComplaints">
						<thead>
							<tr>
								<th class="text-center">#</th>
								<th class="text-center">Denunciado</th>
								<th class="text-center">Nome</th>
								<th class="text-center">Quantidade de denúncias</th>
								<th class="text-center">Denúncia</th>
								<th class="text-center">Bloqueio</th>
								<th class="sorter-false"></th>
								<th class="sorter-false"></th>
								<th class="text-center">Verificado</th>
							</tr>
						</thead>
						<tbody>

							<?php foreach ($reports as $report) { ?>

								<tr class="align-items-center" id="<?= $report['profile_id'] ?>">
									<td class="text-center">
										<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
											<?php echo $report['id']; ?>
										</div>
									</td>
									<td class="text-center">
										<div class="d-flex flex-wrap">
											<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
												<img width="75px" height="75px" class="rounded-circle" src="<?= $url ?>/assets/photos/<?php echo $report['profile_id']; ?>/<?php echo $report['profile_photo']; ?>" onerror="this.parentNode.insertAdjacentHTML('afterbegin', `<div class='without-image-div gilroy'>Sem Foto</div>`); this.remove()" />
											</div>
										</div>
									</td>
									<td class="text-center">
										<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
											<p class="gilroy"><?= $report["profilename"] ?></p>
										</div>
									</td>
									<td class="text-center">
										<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
											<p class="gilroy"><?= $report["countReports"] ?></p>
										</div>
									</td>
									<td class="text-center">
										<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
											<p class="gilroy"><?= $report_status[$report["report"]] ?></p>
										</div>
									</td>

									<td class="text-center">
										<div class="gilroy w-100 d-flex flex-wrap justify-content-center align-items-center">
											<?php if($report["all_block"] == "1"): ?>
												Bloqueio Total - Motivo: <?=$report["all_block_justify"]?>
											<?php elseif($report["photo_block"] == "1"): ?>
												Bloqueio pela Foto - Motivo: <?=$report["photo_block_justify"]?>
											<?php endif; ?>
										</div>
									</td>
									
									<td class="text-center">
										<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
											<button type="button" class="btn btn-save-grade <?= $report["all_block"] == 0 && $report["photo_block"] == 0 ? 'btn-block' : 'btn-unlock'?>" data-id="<?=$report["profile_id"]?>" all_block="<?=$report["all_block"]?>" photo_block="<?=$report["photo_block"]?>">
												<?= $report["all_block"] == 0 && $report["photo_block"] == 0 ? "BLOQUEAR" : "DESBLOQUEAR"?>
											</button>
										</div>
									</td>

									<td class="text-center">
										<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
											<div class="btn btn-danger btn-avaliation" data-toggle="modal" data-target="#modal-avaliation" data-id="<?php echo $report['profile_id']; ?>">Perfil</div>
										</div>
									</td>

									<td class="text-center">
										<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
											<input type="checkbox" class="verify" <?=$report["verified"] == 1 ? "checked" : ""?> data-id="<?=$report['id']?>">
										</div>
									</td>
								</tr>
							<?php } ?>
						</tbody>
					</table>

					<?php if (count($reports) > 0) {
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
									if ($totalReports > $limit) {
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
</section>

<!-- Modal -->
<div class="modal fade" id="modal-avaliation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Avaliação de Perfil</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">

				<!-- Slider main container -->
				<div class="swiper mb-3">
					<!-- Additional required wrapper -->
					<div class="swiper-wrapper">
						<!-- Slides -->



					</div>
					<!-- If we need pagination -->
					<div class="d-flex justify-content-center w-100">
						<div class="swiper-pagination"></div>
					</div>

					<!-- If we need navigation buttons -->
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>

				</div>

				<div class="squares-info">
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Nome: <br /> <span class="gilroy details-name"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Idade: <br /> <span class="gilroy details-age"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>E-mail: <br /> <span class="gilroy details-email"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Telefone: <br /> <span class="gilroy details-phone"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Sexo: <br /> <span class="gilroy details-gender"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Cor do Cabelo: <br /> <span class="gilroy details-hairColor"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Cor do Olhos: <br /> <span class="gilroy details-eyeColor"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Filhos(as): <br /> <span class="gilroy details-childrens"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Estado Civil: <br /> <span class="gilroy details-maritalStatus"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Fumante: <br /> <span class="gilroy details-smoke"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Bebidas: <br /> <span class="gilroy details-drink"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Formação: <br /> <span class="gilroy details-academicFormation"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Profissão: <br /> <span class="gilroy details-profession"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Altura: <br /> <span class="gilroy details-height"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Preferências: <br /> <span class="gilroy details-preferences"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Localização: <br /> <span class="gilroy details-location"></span></p>
						</div>
					</div>
					<div class="square-info text-center p-2">
						<div class="user-info">
							<p>Biografia: <br /> <span class="gilroy details-description"></span></p>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
</div>