<?php

class FoodCrud {

    private $pdoCrud;

    public function __construct()
    {
        $this->pdoCrud = new PDOCrud();
    }

    public function submit($name, $measure, $weight, $kcal, $carbohydrate, $category_id, $weight_type_id)
    {
        $pdo = array(
            ':name'                   => $name,
            ':measure'                => $measure,
            ':weight_number'          => $weight,
            ':kcal_number'            => $kcal,
            ':carbohydrate_number'    => $carbohydrate,
            ':category_foods_id'      => $category_id,
            ':weight_measure_food_id' => $weight_type_id
        );

        $columns = "category_foods_id, weight_measure_food_id, name, measure, weight, kcal, carbohydrate";
        $values = ":category_foods_id, :weight_measure_food_id, :name, :measure, :weight_number, :kcal_number, :carbohydrate_number";

        return $this->pdoCrud->insert("foods", $columns, $values, $pdo);
    }
}