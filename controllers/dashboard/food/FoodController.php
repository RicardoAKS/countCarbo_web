<?php

class FoodController extends Controller {
    
    public function index($params)
    {
        if($this->helpers['AdmSession']->has()){

            $foodData = new FoodData;

            $limit = 100;
            $page  = isset($params[0]) && is_numeric($params[0]) ? $params[0] : 0;
            if ($page != 0) {
                $start      = ($limit  * $page) - $limit;
                $pagenumber = $page;
                
            } else {

                $start      = 0;
                $pagenumber = 1;

            }

            $totalnews  = $foodData->countAllFoods()["countFoods"];
            $totalpages = ceil($totalnews / $limit);
            $previous   = (($pagenumber - 1) <= 0) ? 1 : $pagenumber - 1;
            $next       = (($pagenumber + 1) >= $totalpages) ? $totalpages : $pagenumber + 1;

            $foods    = $foodData->getAllFoods($limit, $start);

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
                )
            );
            $this->view('dashboard/foods/index.php', array(
                'foods'      => $foods,
                'previous'   => $previous,
                'next'       => $next,
                'pagenumber' => $pagenumber,
                'limit'      => $limit,
                'totalnews'  => $totalnews,
                'totalpages' => $totalpages,
                'start'      => $start,
            ));
        } else {
            header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
            exit;
        }
    }

    public function register()
    {
        if($this->helpers['AdmSession']->has()){

            $foodData = new FoodData;

            $categories    = $foodData->getAllCategories();
            $weigthMeasure = $foodData->getAllWeightMeasure();

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
                )
            );
            $this->view('dashboard/foods/register.php', array(
                'categories'    => $categories,
                'weigthMeasure' => $weigthMeasure 
            ));
        } else {
            header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
            exit;
        }
    }
}