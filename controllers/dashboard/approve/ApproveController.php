<?php

/**
*
* Controller do site.
*
* @author Emprezaz.com
*
**/
class ApproveController extends Controller
{
	public $limit = 100;

	public function index($params)
	{		
		if($this->helpers['AdmSession']->has()){
			$page = isset($params[0]) ? intval($params[0]) : 0;

			$sexes = "";
			if(isset($_COOKIE['sex'])){
				$sexes = explode(',', $_COOKIE['sex']);
			}

            if ($page <> 0) {

                $start      = ($this->limit * $page) - $this->limit;
                $pagenumber = $page;
                
            } else {

                $start      = 0;
                $pagenumber = 1;

            }

			$userData   = new UserData;
			$totalUsers = count($userData->getUsersToApproval($sexes, false, false));
			$totalpages = ceil($totalUsers / $this->limit);
            $pagination = 3;
            $previous   = (($pagenumber - 1) <= 0) ? 1 : $pagenumber - 1;
            $next       = (($pagenumber + 1) >= $totalpages) ? $totalpages : $pagenumber + 1;

			$users      = $userData->getUsersToApproval($sexes, $this->limit, $start);

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
					'assets/js/dashboard/acceptusers.js',
				)
			);
			$this->view('dashboard/approve/index.php', array(
				'users' 	 => $users,
				'totalUsers' => $totalUsers,
				'sexes'	 	 => isset($sexes) ? $sexes : "",
				'pagination' => $pagination,
                'previous'   => $previous,
                'next'       => $next,
                'pagenumber' => $pagenumber,
                'totalpages' => $totalpages,
				'start'      => $start,
				'page'       => 'approve-users'
			));
		}else{
			header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
			exit;
		}

	}
    public function getProfile(){

		if(isset($_POST['id']) && $this->helpers['AdmSession']->has()){
			$profileData = new UserData;
			$user = $profileData->getMyInformation($_POST['id']);

			echo json_encode(array(
				'user' => $user
			));
		}else{
			header("Location: ".$this->helpers['URLHelper']->getURL("/dashboard/login"));
			exit;
		}
    }

	public function saveGrade()
	{
		if($this->helpers["AdmSession"]->has() && isset($_POST["beauty"]) && isset($_POST["hair_size"]) && isset($_POST["hair_color"]) && isset($_POST["eyes"]) && isset($_POST["weight"]) && isset($_POST["vulgarity"]) && isset($_POST["userid"])){

			$user_id    = addslashes($_POST["userid"]);
			$beauty     = addslashes($_POST["beauty"]);
			$hair_size  = addslashes($_POST["hair_size"]);
			$hair_color = addslashes($_POST["hair_color"]);
			$eyes		= addslashes($_POST["eyes"]);
			$weight		= addslashes($_POST["weight"]);
			$vulgarity  = addslashes($_POST["vulgarity"]);
			$adm_id     = $this->helpers["AdmSession"]->get('id');

			$userCadastre = new UserCadastre;
			$response = $userCadastre->saveGrade($user_id, $beauty, $hair_size, $hair_color, $eyes, $weight, $vulgarity, $adm_id);

			echo json_encode(array(
				'response' => $response
			));
		}else{
			 //Erro 403 ao tentar acessar um rota sem os dados necessários
			 header("HTTP/1.1 403 Proxy Authentication Required");
			 exit;
		}
	}

	public function blockUser()
	{
		if($this->helpers["AdmSession"]->has() && isset($_POST["id"]) && isset($_POST["type"]) && isset($_POST["justify"]) && isset($_POST["status"])){

			$id      = addslashes($_POST["id"]);
			$type    = addslashes($_POST["type"]);
			$justify = addslashes($_POST["justify"]);
			$status  = addslashes($_POST["status"]);

			$userCadastre = new UserCadastre;
			$response     = $userCadastre->blockUser($id, $type, $justify, $status);

			if($response && $status == '1'){

				$userData = new UserData;
				$user     = $userData->getData($id);

				if($type == "all_block"){

					if($user["email"] != "" && $user["email"] != null){

						$subject = 'Sua conta Flyrt foi bloqueada - Flyrt';
						$text = '
						<h5 style="color:#091b31">Olá '.ucwords($user['username']).'</h5>
						<p style="color:#091b31">
							Sua conta Flyrt foi bloqueada e o motivo foi:
						</p>
						<div style="text-align:center;width: 100%;">
							<p style="color:#091b31"><b>' . $justify . '</b></p>
						</div>';
			
						$mailer  = new MailerClass;				
						$mailer->sendGrid($subject, "noreply@flyrt.me", mb_strtolower($user['username']), $user['email'], $subject, $text);

					}

					if($user["phone"] != "" && $user["phone"] != null && preg_replace("/[^0-9]/", "", $user["phone"]) != ""){
		
						$phone = $this->helpers["SanitizeString"]->phoneWithNineInFront($user["phone"]);
		
						$phone = "55$phone";
		
						$text = "Sua conta Flyrt foi bloqueada e o motivo foi: $justify";
		
						$chatApi = new ChatApi;
						$message = $chatApi->sendMessage($phone, $text);
					}

				}else 
				if($type == "photo_block"){

					if($user["email"] != "" && $user["email"] != null){

						$subject = 'Sua conta Flyrt foi bloqueada - Flyrt';
						$text = '
						<h5 style="color:#091b31">Olá '.ucwords($user['username']).'</h5>
						<p style="color:#091b31">
							Sua conta Flyrt foi bloqueada e será desbloqueada quando você trocar suas fotos, segue o motivo do bloqueio: 
						</p>
						<div style="text-align:center;width: 100%;">
							<p style="color:#091b31"><b>' . $justify . '</b></p>
						</div>';
			
						$mailer  = new MailerClass;				
						$mailer->sendGrid($subject, "noreply@flyrt.me", mb_strtolower($user['username']), $user['email'], $subject, $text);

					}

					if($user["phone"] != "" && $user["phone"] != null && preg_replace("/[^0-9]/", "", $user["phone"]) != ""){
		
						$phone = $this->helpers["SanitizeString"]->phoneWithNineInFront($user["phone"]);
		
						$phone = "55$phone";
		
						$text = "Sua conta Flyrt foi bloqueada e será desbloqueada quando você trocar suas fotos, segue o motivo do bloqueio: $justify";
		
						$chatApi = new ChatApi;
						$message = $chatApi->sendMessage($phone, $text);
					}

				}
			}else if($response && $status == 0){

				$userData = new UserData;
				$user     = $userData->getData($id);

				if($user["email"] != "" && $user["email"] != null){

					$subject = 'Sua conta Flyrt foi desbloqueada - Flyrt';
					$text = '
					<h5 style="color:#091b31">Olá '.ucwords($user['username']).'</h5>
					<p style="color:#091b31">
						Sua conta Flyrt foi desbloqueada.
					</p>';
		
					$mailer  = new MailerClass;				
					$mailer->sendGrid($subject, "noreply@flyrt.me", mb_strtolower($user['username']), $user['email'], $subject, $text);

				}

				if($user["phone"] != "" && $user["phone"] != null && preg_replace("/[^0-9]/", "", $user["phone"]) != ""){
	
					$phone = $this->helpers["SanitizeString"]->phoneWithNineInFront($user["phone"]);
	
					$phone = "55$phone";
	
					$text = "Sua conta Flyrt foi desbloqueada.";
	
					$chatApi = new ChatApi;
					$message = $chatApi->sendMessage($phone, $text);
				}

			}

			echo json_encode(array(
				'response' => $response
			));

		}else{
			 //Erro 403 ao tentar acessar um rota sem os dados necessários
			 header("HTTP/1.1 403 Proxy Authentication Required");
			 exit;
		}
	}

	public function searchUsers()
	{
		if(isset($_POST['sex'])){
			// $search   = isset($_POST['search']) && $_POST['search'] != "" ? $_POST['search'] : "";
			$sex   = isset($_POST['sex']) && $_POST['sex'] != "" ? $_POST['sex'] : "";
			if(isset($_COOKIE['sex'])){
				$sexes = explode(',', $_COOKIE['sex']);
			}

			$start      = 0;
			$pagenumber = 1;

			$userData   = new UserData;

			$columnist = "/1";

			$totalUsers = count($userData->getUsersToApproval($sex, false, false));
			$totalpages = ceil($totalUsers / $this->limit);
            $pagination = 3;
            $previous   = (($pagenumber - 1) <= 0) ? 1 : $pagenumber - 1;
            $next       = (($pagenumber + 1) >= $totalpages) ? $totalpages : $pagenumber + 1;

			// var_dump($start);

			$users      = $userData->getUsersToApproval($sex, $this->limit, $start);

			// var_dump($users);


			$this->setLayout(
				'dashboard/shared/layout.php',
				'Dashboard - Flyrt',
				array(
					'assets/libs/bootstrap/css/bootstrap.min.css',
					'assets/libs/fontawesome/css/all.min.css',
					'assets/css/site/style.css',
					'assets/css/fonts.css',
					'assets/libs/swiper/swiper.min.css',
					'assets/libs/tablesorter/css/theme.css',
					'assets/css/dashboard/template.css',
					'assets/css/dashboard/style.css',
					'assets/css/dashboard/approve.css',
				),
				array(
					'assets/libs/jquery/jquery.js',
					'assets/libs/jquery/jquery.mask.min.js',
					'assets/libs/jquery/jquery.maskMoney.min.js',
					'assets/libs/swiper/swiper.min.js',
					'assets/js/helpers/helpers.js',
					'assets/libs/bootstrap/js/bootstrap.bundle.js',
					'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
					'assets/js/dashboard/acceptusers.js',
				)
			);
			$this->view('dashboard/approve/index.php', array(
				'users' 	 => $users,
				'totalUsers' => $totalUsers,
				'sexes'	 	 => isset($sexes) ? $sexes : "",
				'pagination' => $pagination,
                'previous'   => $previous,
                'next'       => $next,
                'pagenumber' => $pagenumber,
                'totalpages' => $totalpages,
				'start'      => $start,
				'page'       => 'approve-users'
			));
		}else{
			// header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
			//Erro 403 ao tentar acessar um rota sem os dados necessários
			header("HTTP/1.1 403 Proxy Authentication Required");
			exit;
		}

	}

}