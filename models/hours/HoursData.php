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

        return $this->pdoQuery->fetchAll("SELECT h.id, DATE_FORMAT(h.hour, '%H:%i') as hour, h.min_carbohydrate, h.max_carbohydrate, h.description, IF(h.notification = 1, true, false) as notification FROM hours h 
        WHERE h.users_id = :id
        ORDER BY h.hour DESC
        $pagination", array(
            ':id' => $user_id
        ));
    }

    public function checkHour($users_id, $hour)
    {
        return $this->pdoQuery->fetch("SELECT * FROM hours h WHERE h.users_id = :id AND DATE_FORMAT(h.hour, '%H:%i') = :hours", array(
            ':id'    => $users_id,
            ':hours' => $hour
        ));
    }

}