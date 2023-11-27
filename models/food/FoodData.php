<?php

class FoodData
{

    private $pdoQuery;

    public function __construct()
    {
        $this->pdoQuery = new PDOQuery;
    }

    public function getFood($id)
    {
        $food = $this->pdoQuery->fetch("SELECT f.*, cf.name as category_name, wmf.name as weight_measure FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        WHERE f.id = :id", array(
            ':id' => $id
        ));

        if ($food) {
            $food["images"] = $this->pdoQuery->fetchAll("SELECT * FROM image_foods WHERE foods_id = :id", array(
                ':id' => $food["id"]
            ));
        }

        return $food;
    }

    public function getAllFoods($limit = false, $page = false)
    {
        $pagination = "";

        if ($limit !== false && $page !== false) {
            $pagination = "LIMIT $page, $limit";
        }

        $foods = $this->pdoQuery->fetchAll("SELECT f.*, cf.name as category_name, wmf.name as weight_measure FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        ORDER BY f.name ASC
        $pagination");

        foreach ($foods as $key => $food) {
            $foods[$key]["images"] = $this->pdoQuery->fetchAll("SELECT * FROM image_foods WHERE foods_id = :id", array(
                ':id' => $food["id"]
            ));
        }

        return $foods;
    }

    public function searchFoods($search = "", $categoryId, $userId, $limit = false, $page = false)
    {
        $pagination  = "";
        $where = "WHERE f.category_foods_id = :categoryId AND uf.id IS NULL";
        $pdo = array(
            ':categoryId' => $categoryId,
            ':userId' => $userId
        );

        if ($limit !== false && $page !== false) {
            $pagination = "LIMIT $page, $limit";
        }

        if ($search != "") {
            $where .= " AND f.name LIKE '%$search%'";
        }

        $foods = $this->pdoQuery->fetchAll("SELECT f.*, cf.name as category_name, wmf.name as weight_measure FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        LEFT JOIN user_foods uf ON uf.food_id = f.id AND uf.user_id = :userId
        $where
        ORDER BY f.name ASC
        $pagination", $pdo);

        foreach ($foods as $key => $food) {
            $foods[$key]["images"] = $this->pdoQuery->fetchAll("SELECT * FROM image_foods WHERE foods_id = :id", array(
                ':id' => $food["id"]
            ));
        }

        return $foods;
    }

    public function getDiet($search = "", $categoryId, $userId, $limit = false, $page = false)
    {
        $pagination  = "";
        $where = "";
        $pdo = array(
            ':userId' => $userId
        );

        if ($limit !== false && $page !== false) {
            $pagination = "LIMIT $page, $limit";
        }

        if ($categoryId != null) {
            $where = "WHERE f.category_foods_id = :categoryId";
            $pdo[':categoryId'] = $categoryId;
        }

        if ($search != "") {

            if ($where != "") {
                $where .= " AND f.name LIKE '%$search%'";
            } else {
                $where = "WHERE f.name LIKE '%$search%'";
            }
        }

        $foods = $this->pdoQuery->fetchAll("SELECT f.*, cf.name as category_name, wmf.name as weight_measure FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        INNER JOIN user_foods uf ON uf.food_id = f.id AND uf.user_id = :userId
        $where
        ORDER BY f.name ASC
        $pagination", $pdo);

        foreach ($foods as $key => $food) {
            $foods[$key]["images"] = $this->pdoQuery->fetchAll("SELECT * FROM image_foods WHERE foods_id = :id", array(
                ':id' => $food["id"]
            ));
        }

        return $foods;
    }

    public function getFoodsByHourId($hourId, $userId, $limit = false, $page = false)
    {
        $pagination = "";

        if ($limit !== false && $page !== false) {
            $pagination = "LIMIT $page, $limit";
        }

        $hour = $this->pdoQuery->fetch("SELECT h.id, DATE_FORMAT(h.hour, '%H:%i') as hour, h.min_carbohydrate, h.max_carbohydrate, h.description, IF(h.notification = 1, true, false) as notification FROM hours h 
        WHERE h.id = :id", array(
            ':id' => $hourId
        ));

        $foods = $this->pdoQuery->fetchAll("SELECT f.*, cf.name as category_name, wmf.name as weight_measure FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        INNER JOIN user_foods uf ON uf.food_id = f.id AND uf.user_id = :userId
        WHERE CAST(f.carbohydrate as INTEGER) <= CAST(:maxCarbohydrateNumber as INTEGER)
        AND CAST(f.carbohydrate as INTEGER) >= CAST(:minCarbohydrateNumber as INTEGER)
        $pagination", array(
            ':userId'                => $userId,
            ':maxCarbohydrateNumber' => $hour["max_carbohydrate"],
            ':minCarbohydrateNumber' => $hour["min_carbohydrate"]
        ));

        foreach ($foods as $key => $food) {
            $foods[$key]["images"] = $this->pdoQuery->fetchAll("SELECT * FROM image_foods WHERE foods_id = :id", array(
                ':id' => $food["id"]
            ));
        }

        return $foods;
    }

    public function countAllFoods()
    {
        return $this->pdoQuery->fetch("SELECT COUNT(fs.id) as countFoods FROM foods fs
        INNER JOIN weight_measure_food wmf ON wmf.id = fs.weight_measure_food_id");
    }

    public function countSearchFoods($search, $categoryId, $userId)
    {
        $where = "WHERE f.category_foods_id = :categoryId AND uf.id IS NULL";
        $pdo = array(
            ':categoryId' => $categoryId,
            ':userId' => $userId
        );

        if ($search != "") {
            $where .= " AND f.name LIKE '%$search%'";
        }

        return $this->pdoQuery->fetch("SELECT COUNT(f.id) as countFoods FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        LEFT JOIN user_foods uf ON uf.food_id = f.id AND uf.user_id = :userId
        $where", $pdo);
    }

    public function countDiet($search, $categoryId, $userId)
    {
        $where = "";
        $pdo = array(
            ':userId' => $userId
        );

        if ($categoryId != null) {
            $where = "WHERE f.category_foods_id = :categoryId";
            $pdo[':categoryId'] = $categoryId;
        }

        if ($search != "") {

            if ($where != "") {
                $where .= " AND f.name LIKE '%$search%'";
            } else {
                $where = "WHERE f.name LIKE '%$search%'";
            }
        }

        return $this->pdoQuery->fetch("SELECT COUNT(f.id) as countFoods FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        INNER JOIN user_foods uf ON uf.food_id = f.id AND uf.user_id = :userId
        $where", $pdo);
    }

    public function countFoodsByHourId($hourId, $userId)
    {
        $hour = $this->pdoQuery->fetch("SELECT h.id, DATE_FORMAT(h.hour, '%H:%i') as hour, h.min_carbohydrate, h.max_carbohydrate, h.description, IF(h.notification = 1, true, false) as notification FROM hours h 
        WHERE h.id = :id", array(
            ':id' => $hourId
        ));

        return $this->pdoQuery->fetch("SELECT COUNT(f.id) as countFoods FROM foods f
        INNER JOIN category_foods cf ON cf.id = f.category_foods_id
        INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
        INNER JOIN user_foods uf ON uf.food_id = f.id AND uf.user_id = :userId
        WHERE CAST(f.carbohydrate as INTEGER) <= CAST(:maxCarbohydrateNumber as INTEGER)
        AND CAST(f.carbohydrate as INTEGER) >= CAST(:minCarbohydrateNumber as INTEGER)", array(
            ':userId'                => $userId,
            ':maxCarbohydrateNumber' => $hour["max_carbohydrate"],
            ':minCarbohydrateNumber' => $hour["min_carbohydrate"]
        ));
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
