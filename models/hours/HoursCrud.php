<?php

class HoursCrud {

    private $pdoCrud;

    public function __construct()
    {
        $this->pdoCrud = new PDOCrud;
    }

    public function submitHour($hour, $max_carbohydrate, $min_carbohydrate, $description, $notification, $user_id)
    {
        $pdo = array(
            ':hour_number'             => $hour,
            ':max_carbohydrate_number' => $max_carbohydrate,
            ':min_carbohydrate_number' => $min_carbohydrate,
            ':description'             => $description,
            ':notification_number'     => isset($notification) && $notification ? 1 : 0,
            ':users_id'                => $user_id
        );

        $columns = "hour, max_carbohydrate, min_carbohydrate, description, notification, users_id";
        $values  = ":hour_number, :max_carbohydrate_number, :min_carbohydrate_number, :description, :notification_number, :users_id";

        return $this->pdoCrud->insert("hours", $columns, $values, $pdo);
    }

    public function editHour($id, $hour, $max_carbohydrate, $min_carbohydrate, $description, $notification, $user_id)
    {
        $pdo = array(
            ':id'                      => $id,
            ':hour_number'             => $hour,
            ':max_carbohydrate_number' => $max_carbohydrate,
            ':min_carbohydrate_number' => $min_carbohydrate,
            ':description'             => $description,
            ':notification_number'     => isset($notification) && $notification ? 1 : 0,
            ':users_id'                => $user_id
        );

        $clausule = " WHERE id = :id";
        $values  = "hour = :hour_number, max_carbohydrate = :max_carbohydrate_number, min_carbohydrate = :min_carbohydrate_number, description = :description, notification = :notification_number, users_id = :users_id";

        return $this->pdoCrud->update("hours", $values, $clausule, $pdo);
    }

    public function deleteHour($id)
    {
        return $this->pdoCrud->delete('hours', $id);
    }

}