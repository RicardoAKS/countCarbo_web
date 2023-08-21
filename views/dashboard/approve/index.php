<section id="approve-users">
	<div class="card">
		<div class="card-header">
			<div class="row">
				<div class="col-lg-6 col-md-5 col-6">
					<h3 class="text-left">Usuários (<?= $totalUsers ?>)</h3>
				</div>

			</div>
		</div>
		<div class="card-body">
			<br />
			<div class="row">
				<div class="row-search col-6">
					<h4>Pesquisa</h4>
					<input type="text" name="search" id="search" class="form-control mb-3" placeholder="Digite para pesquisar" />
				</div>
				<div class="col-6">
					<h4>Filtro</h4>
					<div class="box-sex d-flex">
						<h5 class="m-0">Sexo: </h5>
						<div class="w-100 col-12 d-flex align-items-center justify-content-center">
							<div class="d-flex col-3 col-md-3">
								<input type="checkbox" class="sex" name="sex" value="masc" <?= isset($sexes) && $sexes != "" &&  gettype(array_search('masc', $sexes)) == 'integer'  ? 'checked' : ''; ?>>
								<p class="ml-2">Masculino</p>
							</div>
							<div class="d-flex col-3 col-md-3">
								<input type="checkbox" class="sex" name="sex" value="fem" <?= isset($sexes) && $sexes != "" &&  gettype(array_search('fem', $sexes)) == 'integer'  ? 'checked' : ''; ?>>
								<p class="ml-2">Feminino</p>
							</div>
							<div class="d-flex col-3 col-md-3">
								<input type="checkbox" class="sex" name="sex" value="other" <?= isset($sexes) && $sexes != "" &&  gettype(array_search('other', $sexes)) == 'integer'  ? 'checked' : ''; ?>>
								<p class="ml-2">Outro</p>
							</div>
							<div class="d-flex col-3 col-md-3">
								<input type="checkbox" class="sex" name="sex" value="null" <?= isset($sexes) && $sexes != "" &&  gettype(array_search('null', $sexes)) == 'integer'  ? 'checked' : ''; ?>>
								<p class="ml-2">Nulo</p>
							</div>
						</div>
					</div>
					<div class="box-button col-12 col-md-12 text-center mt-3">
						<div class="btn btn-flyrt btn-filter">Filtrar</div>
					</div>
				</div>
			</div>
			<?php if (count($users) > 0) {
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
							if ($totalUsers > $limit) {
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
					<table class="table table-hover table-striped tablesorter tablesorter-default" id="tableUsers">
						<thead>
							<tr>
								<th class="text-center">#</th>
								<th class="text-center">Foto</th>
								<th class="text-center">Nome</th>
								<th class="text-center">Validações<br>E-mail/Tel</th>
								<th class="text-center">E-mail</th>
								<th class="text-center">Tel</th>
								<th class="text-center sorter-false">Sexo</th>
								<th class="text-center">Avaliações</th>
								<th class="text-center sorter-false">Ação</th>
								<th class="text-center sorter-false">Bloquear</th>
							</tr>
						</thead>
						<tbody>

							<?php foreach ($users as $user) { ?>

								<tr id="<?=$user['id']?>">
									<td class="text-center"><?php echo $user['id']; ?></td>
									<td class="text-center photo">
										<img width="75px" height="75px" class="rounded-circle fit-cover" src="<?= $url ?>/assets/photos/<?php echo $user['id']; ?>/<?php echo $user['photo']; ?>" onerror="this.parentNode.insertAdjacentHTML('beforeend', `<div class='without-image-div gilroy'>Sem Foto</div>`); this.remove()" />
									</td>
									<td class="text-center"><?php echo $user['username']; ?></td>
									<td class="text-center">
										<?=$user["validateemail"] == 2 || $user["email"] == null || trim($user["email"]) == "" ? ($user["email"] == null || trim($user["email"]) == "" ? '<span>-</span>' :"<span style='color:#008000'>SIM</span>") : "<span style='color:#ff0000'>NÃO</span>"?>/<?=$user["validatephone"] == 2 || $user["phone"] == null || trim($user["phone"]) == "" ? ($user["phone"] == null || trim($user["phone"]) == "" ? '<span>-</span>' : "<span style='color:#008000'>SIM</span>") : "<span style='color:#ff0000'>NÃO</span>"?>
									</td>
									<td class="text-center"><?php echo $user['email']; ?></td>
									<td class="text-center"><?php echo $user['phone'] ? "55{$user['phone']}" : ""; ?></td>
									<td class="text-center"><?php echo $user['sex']; ?></td>
									<td class="text-center avaliation-status">
										<span class="gilroy <?=$user["grades"] > 0 ? 'text-success' : 'text-danger'?>">
											<?=$user["grades"]?>
										</span>
									</td>
									<td class="text-center">
										<div class="btn btn-danger btn-avaliation" data-toggle="modal" data-target="#modal-avaliation" data-id="<?php echo $user['id']; ?>">Avaliar</div>
									</td>
									<td class="text-center">
										<div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
											<button type="button" class="btn btn-save-grade <?= $user["all_block"] == 0 && $user["photo_block"] == 0 ? 'btn-block' : 'btn-unlock'?>" data-id="<?=$user["id"]?>" all_block="<?=$user["all_block"]?>" photo_block="<?=$user["photo_block"]?>">
												<?= $user["all_block"] == 0 && $user["photo_block"] == 0 ? "BLOQUEAR" : "DESBLOQUEAR"?>
											</button>
										</div>
									</td>

								</tr>
							<?php } ?>
						</tbody>
					</table>
					<?php if (count($users) > 0) {
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
									if ($totalUsers > $limit) {
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
					<div class="box-see-more">
						<li class="page-item"><a class="see-more" data-page="<?=$pagenumber?>">Ver mais</a></li>
					</div>
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
			<div class="modal-footer">

				<form id="grades" class="w-100 p-0 m-0">
					<input type="text" name="userid" id="userid" hidden>

					<div class="row px-0">

						<div class="col-12 col-md-6">
							<label for="beauty" class="px-0 pt-1 pb-0 mb-0 gilroy">Beleza:</label>
							<select class="form-control" id="beauty" name="beauty">
								<option value="1">1 - Muito abaixo da média</option>
								<option value="2">2 - Abaixo da média</option>
								<option value="3">3 - Média</option>
								<option value="4">4 - Acima da média</option>
								<option value="5">5 - Muito acima da média</option>
							</select>
						</div>

						<div class="col-12 col-md-6">
							<label for="hair_size" class="px-0 pt-2 pb-0 mb-0 gilroy">Tamanho do cabelo:</label>
							<select class="form-control" id="hair_size" name="hair_size">
								<option value="1">1 - Careca</option>
								<option value="2">2 - Curto</option>
								<option value="3">3 - Médio</option>
								<option value="4">4 - Grande</option>
								<option value="5">5 - Muito grande</option>
							</select>
						</div>

						<div class="col-12 col-md-6">
							<label for="hair_color" class="px-0 pt-2 pb-0 mb-0 gilroy">Cor do cabelo:</label>
							<select class="form-control" id="hair_color" name="hair_color">
								<option value="1">1 - Preto</option>
                                <option value="2">2 - Castanho</option>
                                <option value="3">3 - Castanho claro</option>
                                <option value="4">4 - Loiro</option>
                                <option value="5">5 - Ruivo</option>
                                <option value="6">6 - Vermelho</option>
                                <option value="7">7 - Grisalho</option>
                                <option value="8">8 - Outro</option>
							</select>
						</div>

						<div class="col-12 col-md-6">
							<label for="eyes" class="px-0 pt-2 pb-0 mb-0 gilroy">Cor dos olhos:</label>
							<select class="form-control" id="eyes" name="eyes">
								<option value="1">1 - Castanho claro</option>
                                <option value="2">2 - Castanho escuro</option>
                                <option value="3">3 - Preto</option>
                                <option value="4">4 - Azul</option>
                                <option value="5">5 - Verde</option>
                                <option value="6">6 - Cinza</option>
                                <option value="7">7 - Outro</option>
							</select>
						</div>

						<div class="col-12 col-md-6">
							<label for="weight" class="px-0 pt-2 pb-0 mb-0 gilroy">Peso:</label>
							<select class="form-control" id="weight" name="weight">
								<option value="1">1 - Muito magro</option>
								<option value="2">2 - Magro</option>
								<option value="3">3 - Físico top</option>
								<option value="4">4 - Gordo</option>
								<option value="5">5 - Muito Gordo</option>
							</select>
						</div>

						<div class="col-12 col-md-6">
							<label for="vulgarity" class="px-0 pt-2 pb-0 mb-0 gilroy">Vulgaridade:</label>
							<select class="form-control" id="vulgarity" name="vulgarity">
								<option value="1">1 - Todo coberto</option>
								<option value="2">2 - Pouco coberto</option>
								<option value="3">3 - Normal</option>
								<option value="4">4 - Pouca roupa</option>
								<option value="5">5 - Seminu</option>
							</select>
						</div>

					</div>
				</form>

				<div class="w-100 d-flex justify-content-center align-items-center mt-3">

					<button type="button" class="btn btn-save-grade gilroy" id="save">
						SALVAR
					</button>

				</div>

			</div>
		</div>
	</div>
</div>