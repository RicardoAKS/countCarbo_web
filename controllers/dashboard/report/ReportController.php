<?php

/**
*
* Controller do site.
*
* @author Emprezaz.com
*
**/
class ReportController extends Controller
{

	public function index()
	{	
		if($this->helpers['AdmSession']->has()){

			$financialData = new FinancialData;
			$financials    = $financialData->getAllFinancial();

			$this->setLayout(
				'dashboard/shared/layout.php',
				'Dashboard - Flyrt',
				array(
					'assets/libs/bootstrap/css/bootstrap.min.css',
					'assets/libs/fontawesome/css/all.min.css',
					'assets/css/site/style.css',
					'assets/css/fonts.css',
					'assets/css/dashboard/template.css',
					'assets/css/dashboard/style.css',
				),
				array(
					'assets/libs/jquery/jquery.js',
					'assets/libs/jquery/jquery.mask.min.js',
					'assets/libs/jquery/jquery.maskMoney.min.js',
					'assets/js/helpers/helpers.js',
					'assets/libs/bootstrap/js/bootstrap.bundle.js',
					'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
					'assets/libs/bootstrap/js/bootstrap.min.js',
					'assets/js/dashboard/report.js',
				)
			);
			$this->view('dashboard/report/index.php', array(
				'financials' => $financials,
			));
		}else{
			header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
		}

	}

	public function financesFilter(){
		
		if($this->helpers['AdmSession']->has()){
			$name   = $_POST['name']   != "" ? addslashes($_POST['name'])   : NULL;
			$value  = $_POST['value']  != "" ? addslashes($_POST['value'])  : NULL;
			$status = $_POST['status'] != "" ? addslashes($_POST['status']) : NULL;
			$remove = "";

			$string = "WHERE ";
			if($name != null){
				$string .= "per.name like '%".$name."%'";
			}

			if($value != null){
				$value = str_replace("R$", "", $value);
				$value = str_replace(".", "", $value);
				$value = str_replace(",", ".", $value);

				if($string != "WHERE "){
					$string .= " AND financial.price = '".(int) $value."'";
				}else{
					$string .= "financial.price = '".(int) $value."'";
				}
			}

			if($status != null){

				if($string != "WHERE "){
					$string .= " AND financial.status = '".$status."'";
				}else{
					$string .= "financial.status = '".$status."'";
				}
			}

			if($string == "WHERE "){
				$string = "";
			}

			$financialData = new FinancialData;
			
			if($status != "presentes"){
				$financials = $financialData->getAllFinancial($string);
			}else{
				if($remove != ""){
					$string = str_replace($remove, "", $string);
				}

			}

			$this->setLayout(
				'dashboard/shared/layout.php',
				'Dashboard - Flyrt',
				array(
					'assets/libs/bootstrap/css/bootstrap.min.css',
					'assets/libs/fontawesome/css/all.min.css',
					'assets/css/site/style.css',
					'assets/css/fonts.css',
					'assets/css/dashboard/template.css',
					'assets/css/dashboard/style.css',
				),
				array(
					'assets/libs/jquery/jquery.js',
					'assets/libs/jquery/jquery.mask.min.js',
					'assets/libs/jquery/jquery.maskMoney.min.js',
					'assets/js/helpers/helpers.js',
					'assets/libs/bootstrap/js/bootstrap.bundle.js',
					'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
					'assets/js/dashboard/report.js',
				)
			);
			$this->view('dashboard/report/index.php', array(
				'financials' => $financials,
			));
		}else{
			header("Location: ".$this->helpers['URLHelper']->getURL("/dashboard/login"));
			exit;
		}
	}
}