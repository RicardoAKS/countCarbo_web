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
                <svg width="50" height="50" viewBox="0 0 280 280" class="css-1j8o68f">
                    <defs id="SvgjsDefs2204"></defs>
                    <g id="SvgjsG2206" featurekey="symbolFeature-0" transform="matrix(2,0,0,2,40,40)" fill="#25a55f">
                        <path xmlns="http://www.w3.org/2000/svg" d="M72,27c-7.769,0-13.387,4.513-17.002,8.865C54.95,14.95,44,3,44,3l-8,6c0,0,8.948,9.946,8.998,26.859  C41.382,31.509,35.766,27,28,27C14,27,5,36,5,50c0,25,45,50,45,50s45-25,45-50C95,36,86,27,72,27z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="M83,0C66.983-0.018,59,8,59,24C74.999,24,83.017,15.982,83,0z"></path>
                    </g>
                </svg>
            </div>
            <!-- navbar right -->
            <div class="col-lg-10 col-md-12 navbar-right text-center" style="background-color: #fff;">
                <div class="toggle-menu bars" data-open-sidebar>
                    <i class="fa fa-bars" style="margin-left: 10px;"></i>
                </div>

                <div class="mobile logo">
                    <svg width="100" height="50" viewBox="0 0 280 280" class="css-1j8o68f">
                        <defs id="SvgjsDefs2204"></defs>
                        <g id="SvgjsG2206" featurekey="symbolFeature-0" transform="matrix(2,0,0,2,40,40)" fill="#25a55f">
                            <path xmlns="http://www.w3.org/2000/svg" d="M72,27c-7.769,0-13.387,4.513-17.002,8.865C54.95,14.95,44,3,44,3l-8,6c0,0,8.948,9.946,8.998,26.859  C41.382,31.509,35.766,27,28,27C14,27,5,36,5,50c0,25,45,50,45,50s45-25,45-50C95,36,86,27,72,27z"></path>
                            <path xmlns="http://www.w3.org/2000/svg" d="M83,0C66.983-0.018,59,8,59,24C74.999,24,83.017,15.982,83,0z"></path>
                        </g>
                    </svg>
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

    <script defer type="text/javascript" src="<?=$url?>/assets/libs/jquery/jquery.js"></script>

    <script type="text/javascript">
        var PATH = "<?php echo $url; ?>";
        var Helpers = {};

        $.ajaxSetup({
            error: (error) => {

                if(error.status == 401){
                    window.location.href = PATH + "/dashboard/login";
                }
                
            }
        })
    </script>

    <!-- Scripts -->
    <?php $this->helpers['URLHelper']->getScripts(); ?>
    <script defer type="text/javascript" src="<?=$url?>/assets/js/dashboard/menu.js"></script>

</body>

</html>