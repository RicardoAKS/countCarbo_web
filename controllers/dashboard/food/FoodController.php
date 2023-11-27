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
                'Dashboard - CountCarbo',
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
                    'assets/js/dashboard/foods.js'
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

            $categories     = $foodData->getAllCategories();
            $weigthMeasures = $foodData->getAllWeightMeasure();

            $this->setLayout(
                'dashboard/shared/layout.php',
                'Dashboard - CountCarbo',
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
                    'assets/libs/exifr/lite.umd.js',
                    'assets/libs/tinymce/js/tinymce/tinymce.min.js',
                    'assets/js/dashboard/registerFood.js'
                )
            );
            $this->view('dashboard/foods/register.php', array(
                'categories'     => $categories,
                'weigthMeasures' => $weigthMeasures
            ));
        } else {
            header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
            exit;
        }
    }

    public function edit($params)
    {
        if($this->helpers['AdmSession']->has()){

            $id = $params[0];

            $foodData = new FoodData;

            $categories     = $foodData->getAllCategories();
            $weigthMeasures = $foodData->getAllWeightMeasure();

            $food = $foodData->getFood($id);

            if(!$food){
                header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/foods');
                exit;
            }

            $filePath = ROOT . "/assets/img/food/" . $food["id"] . "/" . $food["images"][0]["name"];
            $file = file_get_contents($filePath);

            $base64 = null;
            if($file){
                $type = mime_content_type($filePath);

                $base64 = "data:" . $type . ";base64, " . base64_encode($file);
            }

            $this->setLayout(
                'dashboard/shared/layout.php',
                'Dashboard - CountCarbo',
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
                    'assets/libs/exifr/lite.umd.js',
                    'assets/libs/tinymce/js/tinymce/tinymce.min.js',
                    'assets/js/dashboard/editFood.js'
                )
            );
            $this->view('dashboard/foods/edit.php', array(
                'categories'     => $categories,
                'weigthMeasures' => $weigthMeasures,
                'food'           => $food,
                'base64'         => $base64
            ));

        } else {
            header('LOCATION: '.$this->helpers['URLHelper']->getURL().'/dashboard/login');
            exit;
        }
    }

    public function deleteFood()
    {
        if(!$this->helpers['AdmSession']->has()){
            http_response_code(401);
            exit;
        }

        if(!isset($_POST["id"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Parâmetros insuficientes'
            ));
            exit;
        }

        $id           = addslashes($_POST["id"]);

        $foodCrud = new FoodCrud;
        $delete   = $foodCrud->delete($id);

        echo json_encode(array(
            'response' => $delete
        ));
    }

    public function submitFood()
    {

        if(!$this->helpers['AdmSession']->has()){
            http_response_code(401);
            exit;
        }

        if(!isset($_POST["name"]) || !isset($_POST["category"]) || !isset($_POST["measure"]) || !isset($_POST["weight"]) || !isset($_POST["weightType"]) || !isset($_POST["kcal"]) || !isset($_POST["carbohydrate"]) || !isset($_POST["food-image"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Parâmetros insuficientes'
            ));
            exit;
        }

        $name         = addslashes($_POST["name"]);
        $category_id  = addslashes($_POST["category"]);
        $measure      = addslashes($_POST["measure"]);
        $weight       = addslashes($_POST["weight"]);
        $weightType   = addslashes($_POST["weightType"]);
        $kcal         = addslashes($_POST["kcal"]);
        $carbohydrate = addslashes($_POST["carbohydrate"]);
        $description  = $_POST["description"];
        $rotation     = addslashes($_POST["rotation"]);
        $foodImage    = $_POST["food-image"];

        $foodCrud = new FoodCrud;
        $submit   = $foodCrud->submit($name, $measure, $weight, $kcal, $carbohydrate, $category_id, $weightType, $description, $rotation, $foodImage);

        echo json_encode(array(
            'response' => $submit
        ));
    }

    public function editFood()
    {

        if(!$this->helpers['AdmSession']->has()){
            http_response_code(401);
            exit;
        }

        if(!isset($_POST["id"]) || !isset($_POST["name"]) || !isset($_POST["category"]) || !isset($_POST["measure"]) || !isset($_POST["weight"]) || !isset($_POST["weightType"]) || !isset($_POST["kcal"]) || !isset($_POST["carbohydrate"]) || !isset($_POST["food-image"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Parâmetros insuficientes'
            ));
            exit;
        }

        $id           = addslashes($_POST["id"]);
        $name         = addslashes($_POST["name"]);
        $category_id  = addslashes($_POST["category"]);
        $measure      = addslashes($_POST["measure"]);
        $weight       = addslashes($_POST["weight"]);
        $weightType   = addslashes($_POST["weightType"]);
        $kcal         = addslashes($_POST["kcal"]);
        $carbohydrate = addslashes($_POST["carbohydrate"]);
        $description  = $_POST["description"];
        $rotation     = addslashes($_POST["rotation"]);
        $foodImage    = $_POST["food-image"];

        $foodCrud = new FoodCrud;
        $submit   = $foodCrud->edit($id, $name, $measure, $weight, $kcal, $carbohydrate, $category_id, $weightType, $description, $rotation, $foodImage);

        echo json_encode(array(
            'response' => $submit
        ));
    }
}