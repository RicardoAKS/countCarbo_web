<?php

class FoodCrud
{

    private $pdoCrud;

    public function __construct()
    {
        $this->pdoCrud = new PDOCrud();
    }

    public function insertFoodsInDiet($foodsId, $userId)
    {
        $response = [];
        foreach ($foodsId as $key => $foodId) {
            $pdo = array(
                ':food_id' => $foodId,
                ':user_id' => $userId
            );

            $columns = "food_id, user_id";
            $values = ":food_id, :user_id";

            $response[] = $this->pdoCrud->insert("user_foods", $columns, $values, $pdo);
        }

        return count($response) > 0 ? $response : false;
    }

    public function removeFoodsInDiet($foodsId, $userId)
    {
        $response = [];
        foreach ($foodsId as $key => $foodId) {
            $response[] = $this->pdoCrud->deleteMap("user_foods", "food_id = '$foodId' AND user_id", $userId);
        }

        return count($response) > 0 ? $response : false;
    }

    public function submit($name, $measure, $weight, $kcal, $carbohydrate, $category_id, $weight_type_id, $description, $rotation, $foodImage)
    {
        $pdo = array(
            ':name'                   => $name,
            ':measure'                => $measure,
            ':weight_number'          => $weight,
            ':kcal_number'            => $kcal,
            ':carbohydrate_number'    => $carbohydrate,
            ':category_foods_id'      => $category_id,
            ':weight_measure_food_id' => $weight_type_id,
            ':description'            => $description,
        );

        $columns = "category_foods_id, weight_measure_food_id, name, measure, weight, kcal, carbohydrate, description";
        $values = ":category_foods_id, :weight_measure_food_id, :name, :measure, :weight_number, :kcal_number, :carbohydrate_number, :description";

        $id = $this->pdoCrud->insert("foods", $columns, $values, $pdo);

        if ($id) {

            $this->savePhotoPost($id, $foodImage, $rotation);
        }

        return $id;
    }

    public function edit($id, $name, $measure, $weight, $kcal, $carbohydrate, $category_id, $weight_type_id, $description, $rotation, $foodImage)
    {
        $pdo = array(
            ':id'                     => $id,
            ':name'                   => $name,
            ':measure'                => $measure,
            ':weight_number'          => $weight,
            ':kcal_number'            => $kcal,
            ':carbohydrate_number'    => $carbohydrate,
            ':category_foods_id'      => $category_id,
            ':weight_measure_food_id' => $weight_type_id,
            ':description'            => $description,
        );

        $clausule = "WHERE id = :id";
        $values = "category_foods_id = :category_foods_id, weight_measure_food_id = :weight_measure_food_id, name = :name, measure = :measure, weight = :weight_number, kcal = :kcal_number, carbohydrate = :carbohydrate_number, description = :description";

        $update = $this->pdoCrud->update("foods", $values, $clausule, $pdo);

        if ($update) {

            $this->deleteImages($id);
            $this->savePhotoPost($id, $foodImage, $rotation);
        }

        return $update;
    }

    public function delete($id)
    {
        $delete = $this->pdoCrud->delete("foods", $id);

        if ($delete) {
            $this->deleteDir(ROOT . "/assets/img/food/" . $id);
        }

        return $delete;
    }

    private function deleteImages($id)
    {
        $delete = $this->pdoCrud->deleteMap("image_foods", "foods_id", $id);

        if ($delete) {

            $this->deleteDir(ROOT . "/assets/img/food/" . $id);
        }

        return $delete;
    }

    public static function deleteDir($dirPath)
    {
        if (!is_dir($dirPath)) {
            throw new InvalidArgumentException("$dirPath must be a directory");
        }
        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);
    }

    public function savePhotoPost($id, $photo, $orientation)
    {

        $image = $this->ImageConfigurationBase64($photo, 800, 800, $id, $orientation);

        return $this->saveMedia($id, $image);
    }

    private function saveMedia($id, $media)
    {

        $pdo = array(
            ':foods_id' => $id,
            ':name'     => $media
        );

        $columns = "foods_id, name";
        $values  = ":foods_id, :name";

        return $this->pdoCrud->insert('image_foods', $columns, $values, $pdo);
    }

    private function ImageConfigurationBase64($base64string, $width, $height, $id, $orientation)
    {

        $imageInfo = explode(";base64,", $base64string);
        $imgExt = str_replace('data:image/', '', $imageInfo[0]);
        $type = str_replace('"', "", "image/$imgExt");
        $temp = base64_decode($imageInfo[1]);
        $name = uniqid() . ".$imgExt";

        $formatedImage = imagecreatefromstring($temp);

        $originalWidth = imagesx($formatedImage);

        $originalHeigth = imagesy($formatedImage);

        if ($originalWidth > $width) {

            $newWidth  = $width;
        } else {

            $newWidth = $originalWidth;
        }

        $newHeigth = ($originalHeigth * $newWidth) / $originalWidth;

        if ($originalHeigth > $height) {

            $newHeigth  = $height;
        } else {

            $newHeigth = $originalHeigth;
        }

        $newWidth = ($originalWidth * $newHeigth) / $originalHeigth;

        $newImage = imagecreatetruecolor($newWidth, $newHeigth);

        // preserve transparency
        $transindex = imagecolortransparent($formatedImage);

        if ($transindex >= 0) {

            $transcol = imagecolorsforindex($formatedImage, $transindex);
            $transindex = imagecolorallocatealpha($newImage, $transcol['red'], $transcol['green'], $transcol['blue'], 127);
            imagefill($newImage, 0, 0, $transindex);
            imagecolortransparent($newImage, $transindex);
        } else if (preg_match("/^image\/(png)$/", $type)) {

            imagesavealpha($newImage, true);
            $color = imagecolorallocatealpha($newImage, 255, 255, 255, 127);
            imagefill($newImage, 0, 0, $color);
        }

        imagecopyresampled($newImage, $formatedImage, 0, 0, 0, 0, $newWidth, $newHeigth, $originalWidth, $originalHeigth);

        switch ($orientation) {
            case 3:
                $newImage = imagerotate($newImage, 180, 0);
                break;
            case 6:
                $newImage = imagerotate($newImage, -90, 0);
                break;
            case 8:
                $newImage = imagerotate($newImage, 90, 0);
                break;
        }

        return $this->savePhotoFile($newImage, $formatedImage, $type, $id);
    }

    private function savePhotoFile($newImage, $temp, $type, $id)
    {

        $newName = sha1(uniqid(rand()));

        if (preg_match("/^image\/(png)$/", $type)) {

            $newName .= '.png';
        } else {

            $newName .= '.jpg';
        }

        if (!file_exists(ROOT . "/assets/img/food/")) {

            mkdir(ROOT . "/assets/img/food/", 0755, true);
        }

        if (!file_exists(ROOT . "/assets/img/food/")) {

            mkdir(ROOT . "/assets/img/food/", 0755, true);
        }

        if (!file_exists(ROOT . "/assets/img/food/" . $id)) {

            mkdir(ROOT . "/assets/img/food/" . $id, 0755, true);
        }

        if (preg_match("/^image\/(png)$/", $type)) {

            $save = imagepng($newImage, ROOT . "/assets/img/food/" . $id . "/" . $newName, 8);
        } else {

            $save = imagejpeg($newImage, ROOT . "/assets/img/food/" . $id . "/" . $newName, 85);
        }

        if (!preg_match("/^image\/(png)$/", $type) && $save == null) {

            imagepng($newImage, ROOT . "/assets/img/food/" . $id . "/" . $newName, 8);
        } else {

            imagejpeg($newImage, ROOT . "/assets/img/food/" . $id . "/" . $newName, 85);
        }

        imagedestroy($temp);

        imagedestroy($newImage);

        return $newName;
    }
}
