<table class="table table-striped" id="admin-financials">
	<thead>
		<tr class="text-center">
			<th>Cód. Usuário</th>
			<th>Usuário</th>
			<th>Data de emissão</th>
            <th>Data de Validade</th>
			<th>Valor</th>
			<th>Tipo</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		<?php 
		$total = 0;
		foreach ($financials as $key => $value):
			
			$total = $value['type'] == 'Saque' ? $total - $value['price'] : ($value['status'] == 'CONFIRMED' ? $total + $value['price'] : $total);
			
		?>
			<tr class="text-center">
				<td>
					<?=$value['id']?>
				</td>
				<td>
					<?=$value['name']?>
				</td>
				<td>
					<?=$value['createdate'] != null ? date('d/m/Y', strtotime($value['createdate'])) : '' ?>
				</td>
                <td>
					<?=
						$value['dateReceived'] != null ? 
						($value['status'] == 'CONFIRMED' || $value['status'] == 'DESPESA' ? 'Pago em '. date('d/m/Y', strtotime($value['dateReceived'])) : 'Vence em '. date('d/m/Y', strtotime($value['dateReceived']))) : 
						($value['status'] != 'CONFIRMED' ? 'Vence em '.date('d/m/Y', strtotime($value['createdate']. '15 days')) : '') ;
					?>
				</td>
				<td class="<?=$value['type'] == 'Saque' ? 'text-danger' : ( $value['status'] == 'CONFIRMED' ? 'text-success' : 'text-warning')?>">
					<?=$value['type'] == 'Saque' ? '-' : ''?>R$ <?=number_format($value['price'], 2, ',', '.')?>
				</td>
				<td>
					<?=$value['type']?>
				</td>
				<td>
					<?=$value['status'] == 'CONFIRMED' ? 'Pago' : 'Pendente' ?>
				</td>
			</tr>
		<?php endforeach; ?>
		<?php if(count($financials) > 1): ?>
		<tr>
			<td class="text-center" colspan="4"><b>TOTAL</b></td>
			<td class="text-center <?= $total > 0 ? 'text-success' : ( $total == 0 ? '' : 'text-danger') ?>">R$ <?=number_format($total, 2, ',', '.')?></td>
			<td></td>
			<td></td>
		</tr>
		<?php endif; ?>
	</tbody>
</table>