<?php
$url        = $this->helpers['URLHelper']->getURL();
$location   = $this->helpers['URLHelper']->getLocation();
$params     = $this->helpers['URLHelper']->getAllParameters();
$admName    = $this->helpers["AdmSession"]->get('username');
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="author" content="LTR">
    <title><?php $this->helpers['URLHelper']->getTitle(); ?></title>

    <!-- Styles -->
    <?php $this->helpers['URLHelper']->getStyles(); ?>
	<link rel="shortcut icon" href="<?php echo $url ?>/assets/img/padrao/favicon.png" type="image/x-icon">

</head>

<body>

    <div id="loader-overlay" style="display:none">
		<span class="loader loader-circles"></span>
	</div>

    <header class="page-header">
        <div class="expanded row">
            <div class="col-lg-2 logo">
                <img src="<?php echo $url; ?>/assets/img/padrao/site-flyrt-textr.png">
            </div>
            <!-- navbar right -->
            <div class="col-lg-10 col-md-12 navbar-right text-center" style="background-color: #fff;">
                <div class="toggle-menu bars" data-open-sidebar>
                    <i class="fa fa-bars" style="margin-left: 10px;"></i>
                </div>

                <div class="mobile logo">
                    <img src="<?php echo $url; ?>/assets/img/padrao/site-flyrt-textr.png">
                </div>

                <ul class="nav pull-right">
                    <li class="switch-li toggle-sidebar">
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                        </label>
                    </li>

                    <li class="divider"></li>

                    <li>
                        <a href="javascript:void(0)" onclick="location.reload();">
                            <i class="fas fa-sync-alt"></i>
                        </a>
                    </li>

                    <li class="hide-fullscreen">
                        <a href="javascript:void(0)" data-action="fullscreen">
                            <i class="fas fa-expand"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>

    <section id="content">
        <div class="expanded row app-wrap">

            <div class="col-lg-2 col-md-3 c-2">

                <?php require ROOT . '/views/dashboard/shared/menu.php'; ?>

            </div>

            <div class="col-lg-10 col-md-12 page">

                <?php require $file; ?>

            </div>
        </div>
    </section>

    <div class="modal fade" id="general-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        var PATH = "<?php echo $url; ?>";
        var Helpers = {};
    </script>

    <!-- Scripts -->
    <?php $this->helpers['URLHelper']->getScripts(); ?>
    <script defer type="text/javascript" src="<?=$url?>/assets/js/dashboard/menu.js"></script>

</body>

</html>