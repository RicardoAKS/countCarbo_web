<?php

class ComplaintsController extends Controller {

    private $reports = array(
        "comportamento_abusivo" => "Comportamento abusivo",
        "fotos_explicitas"      => "Fotos explícitas",
        "menor_de_idade"        => "Menor de idade",
        "perfil_fake"           => "Perfil fake"
    ); 

    public function index($params)
    {
        
        if($this->helpers['AdmSession']->has()){
			$limit = 100;
			$page = isset($params[0]) ? intval($params[0]) : 0;

            if ($page <> 0) {

                $start      = ($limit * $page) - $limit;
                $pagenumber = $page;
                
            } else {

                $start      = 0;
                $pagenumber = 1;

            }

			$userData     = new UserData;
			$totalReports = count($userData->getComplaints(false, false));
			$totalpages   = ceil($totalReports / $limit);
            $pagination   = 3;
            $previous     = (($pagenumber - 1) <= 0) ? 1 : $pagenumber - 1;
            $next         = (($pagenumber + 1) >= $totalpages) ? $totalpages : $pagenumber + 1;

			$reports    = $userData->getComplaints($limit, $start);

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
                    'assets/css/dashboard/complaints.css',
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
					'assets/js/dashboard/acceptusers.js',
                    'assets/js/dashboard/complaints.js'
				)
			);
			$this->view('dashboard/complaints/index.php', array(
				'reports' 	    => $reports,
				'totalReports'  => $totalReports,
				'pagination'    => $pagination,
                'previous'      => $previous,
                'next'          => $next,
                'pagenumber'    => $pagenumber,
                'totalpages'    => $totalpages,
				'start'         => $start,
				'page'          => 'complaints',
                'report_status' => $this->reports
			));
		}else{
			header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
			exit;
		}

    }

	public function userVerified(){
		if(isset($_POST['userId']) && $_POST['userId'] != "" && $_POST['userId'] != false){
			$userId = $_POST['userId'];
			$check  = $_POST['check'];
			$userCadastre = new UserCadastre;
			$response = $userCadastre->verifyUser($userId, $check);

			echo json_encode(array(
				'response' => $response
			));
		}
		else{
			echo json_encode(array(
				'error' => "Ocorreu um erro, o id retornou vazio"
			));
		}
	}

}