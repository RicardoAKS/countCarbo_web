<?php
$url      = $this->helpers['URLHelper']->getURL();
$location = $this->helpers['URLHelper']->getLocation();
$link 	  = $this->helpers['URLHelper']->getAllParameters();
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
	<meta charset="utf-8">
	<meta name="description" content="Flyrt é o app de relacionamento mais querido atualmente. É o lugar certo para conhecer pessoas novas.">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="author" content="Flyrt">
	<meta name="facebook-domain-verification" content="xrs6sdu8216yqmesnaf52skisj309v" />
	<title>Flyrt | Bate papo. Encontro | <?php $this->helpers['URLHelper']->getTitle(); ?></title>
	<link rel="shortcut icon" href="<?php echo $url ?>/assets/img/padrao/favicon.png" type="image/x-icon">

	<!-- Styles -->
	<?php $this->helpers['URLHelper']->getStyles(); ?>

</head>

<body>

	<div id="loader-overlay" style="display:none">
		<span class="loader loader-circles"></span>
	</div>
	<div id="loader">
		<div class="loader-pulse"></div>
	</div>

	<main>
		<?php require $file; ?>
	</main>

	<script type="text/javascript">
		var PATH        = "<?php echo $url; ?>";
		var Helpers     = {};
        var Parameters  = window.location.href.split("/").reverse();
	</script>

	<!-- Scripts -->
	<?php $this->helpers['URLHelper']->getScripts(); ?>

</body>

</html>