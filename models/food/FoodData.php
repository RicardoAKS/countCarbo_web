<?php

class FoodData {

    private $pdoQuery;

    public function __construct() {
        $this->pdoQuery = new PDOQuery;
    }

    public function getAllFoods($limit = false, $page = false)
    {
        $pagination = "";

        if($limit !== false && $page !== false){
            $pagination = "LIMIT $page, $limit";
        }
        
        $foods = $this->pdoQuery->fetchAll("SELECT f.*, cf.name as category_name, wmf.name as weight_measure FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        $pagination");

        foreach ($foods as $key => $food) {
            $foods[$key]["images"] = $this->pdoQuery->fetchAll("SELECT * FROM image_foods WHERE foods_id = :id", array(
                ':id' => $food["id"]
            ));
        }

        return $foods;
    }

    public function countAllFoods() 
    {
        return $this->pdoQuery->fetch("SELECT COUNT(f.id) as countFoods FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id");
    }

    public function getAllCategories()
    {
        return $this->pdoQuery->fetchAll("SELECT * FROM category_foods");
    }

    public function getAllWeightMeasure()
    {
        return $this->pdoQuery->fetchAll("SELECT * FROM weight_measure_food");
    }

}