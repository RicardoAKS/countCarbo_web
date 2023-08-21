
<section class="recovery dashboard-page" id="recovery-content" style="padding: 0!important;min-height: 0!important;">

	<div class="p-3">

		<div class="dashboard-title">

			<div class="row">
				<div class="col-md-6 col-12">
					<h1 class="title">Relatório Financeiro</h1>
				</div>
				<div class="col-md-6 col-12 text-right pt-3">
					Valor necessário para saque <span class="text-danger">R$ <?=number_format($withdraw[0]['price'], 2, ',', '.')?></span>
				</div>
			</div>
		</div>

		<div class="pt-5 dashboard-content">

			<div class="tab-content" id="myTabContent">
				<div class="w-100 d-flex flex-wrap">
					<div class="col-md-3">
						<div class="form-group">
							<label>Nome do anunciante</label>
							<input type="text" id="announceName" class="form-control">
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label>Valor</label>
							<input type="text" id="valuePayment" name="valuePayment" class="form-control">
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label>Status</label>
							<select class="form-control" id="status">
								<option value="">Selecione</option>
								<option value="CONFIRMED">Pago</option>
								<option value="PENDING">Pendente</option>
							</select>
						</div>
					</div>
					<div class="col-md-3 text-center">
						<div class="btn btn-success btn-lg py-1 submit-filter-report w-100" style="margin-top: 35px">
							Filtrar
						</div>
					</div>
				</div>
				<!-- atual -->
				<div class="tab-pane fade show active" id="actual" role="tabpanel" aria-labelledby="actual-tab">
					<?php require dirname(__FILE__).'/table.php'; ?>
				</div>
			</div>

		</div>
	</div>
</section>