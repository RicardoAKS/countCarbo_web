<?php

class HoursData {

    private $pdoQuery;

    public function __construct()
    {
        $this->pdoQuery = new PDOQuery();
    }

    public function countAllHoursByUserId($user_id)
    {
        $sql = $this->pdoQuery->fetch("SELECT count(id) as count FROM hours WHERE users_id = :id", array(
            ':id' => $user_id
        ));

        return $sql["count"];
    }

    public function getHoursByUserId($user_id, $limit = false, $page = false)
    {
        $pagination = "";
        if($limit !== false || $page !== false){
            $pagination = "LIMIT $page, $limit";
        }

        $hours = $this->pdoQuery->fetchAll("SELECT h.id, DATE_FORMAT(h.hour, '%H:%i') as hour, h.min_carbohydrate, h.max_carbohydrate, h.description, IF(h.notification = 1, true, false) as notification FROM hours h 
        WHERE h.users_id = :id
        ORDER BY HOUR(h.hour)
        $pagination", array(
            ':id' => $user_id
        ));

        foreach ($hours as $key => $hour) {

            
            if($hour["max_carbohydrate"] != null && $hour["min_carbohydrate"] != null){

                $hours[$key]["foods"] = $this->pdoQuery->fetchAll("SELECT f.*, cf.name as category_name, wmf.name as weight_measure FROM foods f
                INNER JOIN category_foods cf ON cf.id = f.category_foods_id
                INNER JOIN weight_measure_food wmf ON wmf.id = f.weight_measure_food_id
                INNER JOIN user_foods uf ON uf.food_id = f.id AND uf.user_id = :userId
                WHERE CAST(f.carbohydrate as INTEGER) <= CAST(:maxCarbohydrateNumber as INTEGER)
                AND CAST(f.carbohydrate as INTEGER) >= CAST(:minCarbohydrateNumber as INTEGER)
                LIMIT 0, 20", array(
                    ':userId'                => $user_id,
                    ':maxCarbohydrateNumber' => $hour["max_carbohydrate"],
                    ':minCarbohydrateNumber' => $hour["min_carbohydrate"]
                ));

                foreach ($hours[$key]["foods"] as $key2 => $food) {
                    $hours[$key]["foods"][$key2]["images"] = $this->pdoQuery->fetchAll("SELECT * FROM image_foods WHERE foods_id = :id", array(
                        ':id' => $food["id"]
                    ));
                }
            }

        }

        return $hours;
    }

    public function checkHour($users_id, $hour)
    {
        return $this->pdoQuery->fetch("SELECT * FROM hours h WHERE h.users_id = :id AND DATE_FORMAT(h.hour, '%H:%i') = :hours", array(
            ':id'    => $users_id,
            ':hours' => $hour
        ));
    }

}