<?php

class WithdrawDashboardController extends Controller {

    public $type = [
        "cpfCnpj" => "CPF ou CPNJ",
        "email"   => "E-mail",
        "phone"   => "Telefone",
        "random"  => "Chave Aleatória"
    ];

    public function index($params)
    {
        if($this->helpers["AdmSession"]->has()){

            $page = isset($params[0]) ? intval($params[0]) : 0;
            $limit = 100;

            if ($page <> 0) {

                $start      = ($limit * $page) - $limit;
                $pagenumber = $page;
                
            } else {

                $start      = 0;
                $pagenumber = 1;

            }

            $withdrawData     = new WithdrawData;
			$totalWithdrawals = count($withdrawData->getAllWithdrawals(false, false));

			$totalpages = ceil($totalWithdrawals / $limit);
            $pagination = 3;
            $previous   = (($pagenumber - 1) <= 0) ? 1 : $pagenumber - 1;
            $next       = (($pagenumber + 1) >= $totalpages) ? $totalpages : $pagenumber + 1;

            $withdrawals = $withdrawData->getAllWithdrawals($limit, $start);

            $this->setLayout(
				'dashboard/shared/layout.php',
				'Dashboard - Flyrt',
				array(
                    'assets/libs/bootstrap/css/bootstrap.min.css',
                    'assets/libs/fontawesome/css/all.min.css',
					'assets/css/site/style.css',
					'assets/css/fonts.css',
					'assets/libs/swiper/swiper.min.css',
					'assets/css/dashboard/template.css',
					'assets/css/dashboard/style.css',
					'assets/css/dashboard/approve.css',
					'assets/libs/tablesorter/css/theme.css',
				),
				array(
					'assets/libs/jquery/jquery.js',
					'assets/libs/jquery/jquery.mask.min.js',
					'assets/libs/jquery/jquery.maskMoney.min.js',
					'assets/libs/swiper/swiper.min.js',
					'assets/libs/tablesorter/js/tablesorter.min.js',
					'assets/js/helpers/helpers.js',
					'assets/libs/bootstrap/js/bootstrap.bundle.js',
					'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
                    'assets/js/dashboard/withdrawals.js'
				)
			);
			$this->view('dashboard/withdrawals/index.php', array(
				'withdrawals'      => $withdrawals,
				'totalWithdrawals' => $totalWithdrawals,
				'pagination'       => $pagination,
                'previous'         => $previous,
                'next'             => $next,
                'pagenumber'       => $pagenumber,
                'totalpages'       => $totalpages,
				'start'            => $start,
				'page'             => 'withdrawals',
                'type'             => $this->type
			));
        }else{
            header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
			exit;
        }
    }

    public function refuseWithdrawal()
    {
        if($this->helpers["AdmSession"]->has() && isset($_POST["status"]) && isset($_POST["id"]) && isset($_POST["justify"])){

            $id     = addslashes($_POST["id"]);
            $status = addslashes($_POST["status"]);
            $justify = addslashes($_POST["justify"]);
            
            $withdrawCrud = new WithdrawCrud;
            $result = $withdrawCrud->updateStatus($id, $status, $justify);

            echo json_encode(array(
                'result' => $result
            ));

        }else{
            header("HTTP/1.1 403 Proxy Authentication Required");
            exit;
        }
    }

    public function confirmWithdrawal()
    {
        if($this->helpers["AdmSession"]->has() && isset($_POST["status"]) && isset($_POST["id"]) && isset($_FILES["payment_voucher"])){

            $id      = addslashes($_POST["id"]);
            $status  = addslashes($_POST["status"]);
            
            $withdrawCrud = new WithdrawCrud;
            $result = $withdrawCrud->savePaymentVoucher($_FILES["payment_voucher"], $id, $status);

            echo json_encode(array(
                'result' => $result
            ));

        }else{
            header("HTTP/1.1 403 Proxy Authentication Required");
            exit;
        }
    }

}