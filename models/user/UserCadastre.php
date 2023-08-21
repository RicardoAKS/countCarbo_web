<?php

/**
 *
 * Classe que configura o crud de sessão
 *
 * @author Emprezaz.com
 *
 **/
class UserCadastre
{

    private $pdoCrud;
    private $pdoQuery;
    private $userSession;

    public function __construct()
    {

        $this->pdoCrud     = new PDOCrud;
        $this->pdoQuery    = new PDOQuery;
        $this->userSession = new UserSession;
    }

    public function blockUser($id, $type, $justify, $status = 1)
    {
        
        $pdo = array(
            ':id'      => $id,
            ':type'    => $status,
            ':justify' => $justify
        );

        $clausule  = "WHERE id = :id";

        if($type == "photo_block"){
            $values = "photo_block = :type, photo_block_justify = :justify";
        }else if($type == "all_block"){
            $values = "all_block = :type, all_block_justify = :justify";
        }
        
        return $this->pdoCrud->update("user", $values, $clausule, $pdo);
    }

    public function saveGrade($user_id, $beauty, $hair_size, $hair_color, $eyes, $weight, $vulgarity, $adm_id)
    {
        $pdo = array(
            ':userid'            => $user_id,
            ':beauty_number'     => $beauty,
            ':hair_size_number'  => $hair_size,
            ':hair_color_number' => $hair_color,
            ':eyes_number'       => $eyes,
            ':weight_number'     => $weight,
            ':vulgarity_number'  => $vulgarity,
            ':adm_id'            => $adm_id
        );

        $columns = "userid, beauty, hair_size, hair_color, eyes, weight, vulgarity, adm_id";
        $values  = ":userid, :beauty_number, :hair_size_number, :hair_color_number, :eyes_number, :weight_number, :vulgarity_number, :adm_id";

        return $this->pdoCrud->insert('grades', $columns, $values, $pdo);
    }

    public function register($username, $age, $birthDay, $phone, $sex, $preference, $type, $validationCode, $latitude, $longitude, $link)
    {
        $pdo = array(
            ':username'        => $username,
            ':ageDate'         => $birthDay,
            ':sex'             => $sex,
            ':preference'      => $preference,
            ':validationCode'  => $validationCode,
            ':validation'      => 1,
            ':latitudeNumber'  => $latitude,
            ':longitudeNumber' => $longitude,
            ':phone'           => $phone,
            ':linkCadastre'    => $link
        );

        $columns = 'username, ageDate, sex, preference, validationCode, validation, latitude, longitude, phone, linkCadastre';
        $values = ':username, :ageDate, :sex, :preference, :validationCode, :validation, :latitudeNumber, :longitudeNumber, :phone, :linkCadastre';

        $id = (int) $this->pdoCrud->insert('user', $columns, $values, $pdo);

        // $eventName = 'validationUser' . $id;
        // $this->pdoQuery->executeQuery("DROP EVENT IF EXISTS $eventName");
        // $this->pdoQuery->executeQuery("CREATE EVENT $eventName ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 10 MINUTE DO DELETE FROM user WHERE id = '$id' AND validation = 0");


        $code = $id . rand(0, 99) . rand(0, 99) . rand(0, 99) . rand(0, 99);
            
        $this->updateFriendCode($code, $id);

        $this->userSession->saveUser(array(
            'id'             => $id,
            'username'       => $username,
            'age'            => $age,
            'phone'          => $phone,
            'sex'            => $sex,
            'search'         => $preference,
            'validation'     => 1,
            'latitude'       => $latitude,
            'longitude'      => $longitude,
            // 'cadastre'       => true,
            'email'          => "",
            'my_code'        => $code
        ));

        return $id;
    }

    public function validationCodeUpdate($id, $validationCode)
    {
        $pdo = array(
            ':validationCode' => $validationCode,
            ':id'             => $id
        );

        $values = 'validationCode = :validationCode';
        $clausule = ' WHERE id = :id';

        return $this->pdoCrud->update('user', $values, $clausule, $pdo);
    }

    public function validate($id, $validation)
    {
        $pdo = array(
            ':id'         => $id,
            ':validation' => $validation
        );

        $values   = "validation = :validation";
        $clausule = "WHERE id = :id";

        return $this->pdoCrud->update("user", $values, $clausule, $pdo);
    }


    public function saveAsaas($id, $idasaas)
    {

        $pdo = array(
            ':idasaas' => $idasaas,
        );

        $columns = 'idasaas=:idasaas';

        return $this->pdoCrud->update('user', $columns, 'WHERE id = :id', array_merge($pdo, array(
            ':id' => $id
        )));
    }

    public function saveWalletId($id, $walletId)
    {
        $pdo = array(
            ':walletId' => $walletId,
        );

        $columns = 'walletId = :walletId';

        return $this->pdoCrud->update('user', $columns, 'WHERE id = :id', array_merge($pdo, array(
            ':id' => $id
        )));
    }

    public function updatePassword($id, $password)
    {
        $pdo = array(
            ':id'         => $id,
            ':password'   => SHA1($password),
            ':validation' => true
        );

        $values   = "password = :password, validation = :validation";
        $clausule = "WHERE id = :id";

        $update = $this->pdoCrud->update("user", $values, $clausule, $pdo);

        if ($update) {
            return $id;
        } else {
            return $update;
        }
    }

    function updatePhone($id)
    {
        $previousphone = $this->pdoQuery->fetch("SELECT phone FROM user WHERE id = $id");
        // $eventName     = 'validationPhone' . $id;
        // $this->pdoQuery->executeQuery("DROP EVENT IF EXISTS $eventName");
        // $this->pdoQuery->executeQuery("CREATE EVENT $eventName ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 10 MINUTE DO UPDATE user set phone = '$previousphone[phone]'  WHERE id = '$id' AND validation = 0");
    }

    function updateEmailUser(array $user)
    {
        $id = $user['id'];
        $previousemail = $this->pdoQuery->fetch("SELECT email FROM user WHERE id = $id");
        // $eventName = 'validationEmail' . $user['id'];
        // $this->pdoQuery->executeQuery("DROP EVENT IF EXISTS $eventName");
        // $this->pdoQuery->executeQuery("CREATE EVENT $eventName ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 20 MINUTE DO UPDATE user set email = '$previousemail[email]'  WHERE id = '$user[id]' AND validation = 1 AND validateemail = '0'");
    }

    public function updateFriendCode($code, $id)
    {
        return $this->pdoCrud->update("user", "code = :codeNumber", " WHERE id = :id", array(
            ':codeNumber' => $code,
            ':id'         => $id
        ));
    }

    function confirmemail($id)
    {
        $pdo = array(
            ':id'       => $id,
        );
        $values = "validateemail = '1'";
        $clausule = "WHERE id = :id";

        $user = $this->pdoCrud->update("user", $values, $clausule, $pdo);

        return $user;
    }

    public function updateUser(array $data, $validation_email = null, $validation_phone = null)
    {

        $pdo = array(
            ':id'                    => $data['id'],
            ':username'              => $data['username'],
            ':ageDate'               => $data['ageDate'],
            ':blockage'              => $data['blockage'],
            ':bio'                   => $data['bio'],
            ':ufId'                  => $data['ufId'],
            ':cityId'                => $data['cityId'],
            ':phone'                 => $data['phone'],
            ':email'                 => mb_strtolower($data['email']),
            ':invisibleNumber'       => $data['invisible'],
            ':message_visibleNumber' => $data['message_visible'],
            ':notificationsNumber'   => $data['notifications'],
            ':latitudeNumber'        => $data['latitude'],
            ':longitudeNumber'       => $data['longitude'],
            ':sex'                   => $data['sex'],
            ':preference'            => $data['preference'],
            ':hidden'                => $data['hidden'],
            ':cpf'                   => isset($data['cpf']) ? $data['cpf'] : null
        );
        $values = "username = :username, ageDate = :ageDate, blockage = :blockage, bio = :bio, ufId = :ufId, cityId = :cityId, phone = :phone, email = :email, invisible = :invisibleNumber, latitude = :latitudeNumber, longitude = :longitudeNumber, sex = :sex, preference = :preference, message_visible = :message_visibleNumber, notifications = :notificationsNumber, hidden = :hidden, cpf = :cpf";

        if($validation_email !== null){
            $pdo[':validate_email_number'] = $validation_email;
            $values = $values . ", validateemail = :validate_email_number";
        }

        if($validation_phone !== null){
            $pdo[':validate_phone_number'] = $validation_phone;
            $values = $values . ", validatephone = :validate_phone_number";
        }

        if($validation_email != 2 || $validation_phone != 2){
            $pdo[':validation_number'] = 1;
            $values = $values . ", validation = :validation_number";
        }

        $clausule = "WHERE id = :id";

        $user = $this->pdoCrud->update("user", $values, $clausule, $pdo);

        if (isset($data['personalinformations'])) {
            $id                              = $data['id'];
            $data                            = $data['personalinformations'];
            $data['personalinformations_id'] = $data['id'];
            $data['id']                      = $id;
        }

        $return = false;
        if (isset($data['personalinformations_id']) && $user) {

            $pdo = array(
                ':id'                   => $data['personalinformations_id'],
                ':users_id'             => $data['id'],
                ':height'               => @$data['height'],
                ':hairColor'            => @$data['hairColor'],
                ':eyeColor'             => @$data['eyeColor'],
                ':smoke'                => @$data['smoke'],
                ':drink'                => @$data['drink'],
                ':maritalStatus'        => @$data['maritalStatus'],
                ':childrens'            => @$data['childrens'],
                ':academicFormation'    => @$data['academicFormation'],
                ':profession'           => @$data['profession'],
                ':likeTrip'             => @$data['likeTrip']
            );

            $values = "users_id = :users_id, height = :height, hairColor = :hairColor, eyeColor = :eyeColor, smoke = :smoke, drink = :drink, maritalStatus = :maritalStatus, childrens = :childrens, academicFormation = :academicFormation, profession = :profession, likeTrip = :likeTrip";
            $clausule = "WHERE id = :id";

            $return = $this->pdoCrud->update("personalinformations", $values, $clausule, $pdo);

            if (isset($data['music'])) {
                $this->pdoCrud->deleteMap('music_user', 'personalinformations_id', $data['personalinformations_id']);

                foreach ($data['music'] as $music) {
                    $pdomusic = array(
                        ':music_id'                => $music,
                        ':personalinformations_id' => $data['personalinformations_id'],
                    );
                    $columnsmusic = 'music_id, personalinformations_id';
                    $valuesmusic = ':music_id, :personalinformations_id';

                    $this->pdoCrud->insert('music_user', $columnsmusic, $valuesmusic, $pdomusic);
                }
            } else {
                $this->pdoCrud->deleteMap('music_user', 'personalinformations_id', $data['personalinformations_id']);
            }

        } else if ($user) {
            $pdo = array(
                ':users_id'             => $data['id'],
                ':height'               => @$data['height'],
                ':hairColor'            => @$data['hairColor'],
                ':eyeColor'             => @$data['eyeColor'],
                ':smoke'                => @$data['smoke'],
                ':drink'                => @$data['drink'],
                ':maritalStatus'        => @$data['maritalStatus'],
                ':childrens'            => @$data['childrens'],
                ':academicFormation'    => @$data['academicFormation'],
                ':profession'           => @$data['profession'],
                ':likeTrip'             => @$data['likeTrip']
            );

            $columns = "users_id, height, hairColor, eyeColor, smoke, drink, maritalStatus, childrens, academicFormation, profession, likeTrip";
            $values = ":users_id, :height, :hairColor, :eyeColor, :smoke, :drink, :maritalStatus, :childrens, :academicFormation, :profession, :likeTrip";
            $return = $this->pdoCrud->insert("personalinformations", $columns, $values, $pdo);

            if (isset($data['music'])) {
                $this->pdoCrud->deleteMap('music_user', 'personalinformations_id', $return);

                foreach ($data['music'] as $music) {
                    $pdomusic = array(
                        ':music_id'                => $music,
                        ':personalinformations_id' => $return,
                    );
                    $columnsmusic = 'music_id, personalinformations_id';
                    $valuesmusic = ':music_id, :personalinformations_id';

                    $this->pdoCrud->insert('music_user', $columnsmusic, $valuesmusic, $pdomusic);
                }
            }
        }

        return $return;
    }

    public function insertProfilePhotos($image, $id, $order)
    {
        $pdo = array(
            ':media'            => $image,
            ':userid'           => $id,
            ':orderPhotoNumber' => $order
        );

        $columns = "media, userid, orderPhoto";
        $values  = ":media, :userid, :orderPhotoNumber";

        return $this->pdoCrud->insert("photos", $columns, $values, $pdo);
    }

    public function updateProfilePhotos($id, $order, $image)
    {
        $pdo = array(
            ':id'               => $id,
            ':media'            => $image,
            ':orderPhotoNumber' => $order
        );

        $values   = "media = :media, orderPhoto = :orderPhotoNumber";
        $clausule = " WHERE id = :id";

        return $this->pdoCrud->update("photos", $values, $clausule, $pdo);
    }

    public function updateProfilePhoto($id, $image)
    {
        $pdo = array(
            ':id'    => $id,
            ':photo' => $image
        );

        $values   = "photo = :photo";
        $clausule = "WHERE id = :id";

        return $this->pdoCrud->update("user", $values, $clausule, $pdo);
    }

    public function savePhoto(array $photo, $userId, $order)
    {
        if (isset($photo['name']) && $photo['name'][0] != "") {
            return $this->photoControl($userId, $photo, 0, $order);
        }

        return false;
    }

    public function savePhotos(array $photos, $userId, $datapost)
    {

        if (isset($photos['name'][0]) && $photos['name'][0] != "") {

            $id = $userId;

            if(count($photos['name']) > 0){
                $this->pdoCrud->deleteMap('photos', 'userid', $id);
            }

            for ($i = 0; $i < count($photos['name']); $i++) {

                if($i < 9){
                    $name = preg_replace("/ /", "---", $photos['name'][$i]);
                    $name = preg_replace("/[.]/", "___", $name);

                    $this->photoControl($id, $photos, $i, $datapost[$name]);
                }
            }

            return true;
        }else if(count($datapost) > 0){

            foreach ($datapost["name"] as $key => $value) {

                $name = preg_replace("/[.]/", "___", preg_replace("/ /", "---", $value));

                $this->updateProfilePhotos($datapost[$name."Id"], $datapost[$name], $value);

            }

            return true;
        }

        return false;
    }

    public function photoControl($id, $image, $i, $order)
    {
        $imageName = $image['name'][$i];
        $imageType = $image['type'][$i];
        $imageTmp  = $image['tmp_name'][$i];
        @$exitf    = exif_read_data($image['tmp_name'][$i]);

        if ($imageName != "") {

            $image = $this->ImageConfiguration($imageName, $imageType, $imageTmp, 600, 400, $id, $exitf);

            return $this->insertProfilePhotos($image, $id, $order);
        }

        return true;
    }

    private function ImageConfiguration($name, $type, $temp, $width, $height, $id, $exitf = null)
    {

        if (preg_match("/^image\/(png)$/", $type)) {

            $formatedImage = imagecreatefrompng($temp);
        } else {

            $formatedImage = imagecreatefromjpeg($temp);
        }

        if (!preg_match("/^image\/(png)$/", $type) && !$formatedImage) {

            $formatedImage = imagecreatefrompng($temp);
        } else if (!$formatedImage) {

            $formatedImage = imagecreatefromjpeg($temp);
        }


        if (!$formatedImage) {
            $formatedImage = imagecreatefromstring(file_get_contents($temp));
        }

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
            $color = imagecolorallocatealpha($newImage, 0, 0, 0, 127);
            imagefill($newImage, 0, 0, $color);
        }

        imagecopyresampled($newImage, $formatedImage, 0, 0, 0, 0, $newWidth, $newHeigth, $originalWidth, $originalHeigth);

        if (!empty($exitf['Orientation'])) {

            switch ($exitf['Orientation']) {
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
        }

        return $this->savePhotoFile($name, $newImage, $formatedImage, $type, $id);
    }

    private function savePhotoFile($name, $newImage, $temp, $type, $id)
    {

        $newName = sha1($name) . rand(0, 9999);

        if (preg_match("/^image\/(png)$/", $type)) {

            $newName .= '.png';
        } else {

            $newName .= '.jpg';
        }

        if (!file_exists(ROOT . "/assets/photos")) {

            mkdir(ROOT . "/assets/photos/", 0755, true);
        }

        if (!file_exists(ROOT . "/assets/photos/" . $id)) {

            mkdir(ROOT . "/assets/photos/" . $id, 0755, true);
        }

        if (preg_match("/^image\/(png)$/", $type)) {

            imagepng($newImage, ROOT . "/assets/photos/" . $id . "/" . $newName, 9);
        } else {

            imagejpeg($newImage, ROOT . "/assets/photos/" . $id . "/" . $newName, 99);
        }

        $newImageBlur = $this->blur($newImage, 16.5);

        if (!file_exists(ROOT . "/assets/photos/" . $id . "/blur")) {

            mkdir(ROOT . "/assets/photos/" . $id . "/blur", 0755, true);
        }

        if (preg_match("/^image\/(png)$/", $type)) {

            imagepng($newImageBlur, ROOT . "/assets/photos/" . $id . "/blur/" . $newName, 5);
        } else {

            imagejpeg($newImageBlur, ROOT . "/assets/photos/" . $id . "/blur/" . $newName, 50);
        }

        imagedestroy($temp);

        imagedestroy($newImageBlur);

        return $newName;
    }

    private function blur($img, $radius = 10)
    {

        if ($radius > 100) $radius = 100; //max radius
        if ($radius <   0) $radius = 0; //nin radius

        $radius    = $radius * 4;
        $alphaStep = round(100 / $radius) * 1.7;
        $width     = imagesx($img);
        $height    = imagesy($img);
        $beginX    = floor($radius / 2);
        $beginY    = floor($radius / 2);


        //make clean imahe sample for multiply
        $cleanImageSample = imagecreatetruecolor($width, $height);
        imagecopy($cleanImageSample, $img, 0, 0, 0, 0, $width, $height);


        //make h blur
        for ($i = 1; $i < $radius + 1; $i++) {
            $xPoint = ($beginX * -1) + $i - 1;
            imagecopymerge($img, $cleanImageSample, $xPoint, 0, 0, 0, $width, $height, $alphaStep);
        }

        //make v blur
        imagecopy($cleanImageSample, $img, 0, 0, 0, 0, $width, $height);
        for ($i = 1; $i < $radius + 1; $i++) {
            $yPoint = ($beginY * -1) + $i - 1;
            imagecopymerge($img, $cleanImageSample, 0, $yPoint, 0, 0, $width, $height, $alphaStep);
        }

        imagedestroy($cleanImageSample);
        return $img;
    }

    public function deleteUser($id)
    {
        $delete = $this->pdoCrud->delete("user", $id);

        if($delete){
            
            if (file_exists(ROOT . "/assets/photos/" . $id)) {
                $this->deleteDirectory(ROOT . "/assets/photos/" . $id);
            }

        }

        return $delete;
    }

    public function deletePhotoUser($id)
    {
        return $this->pdoCrud->delete("photos", $id);
    }

    function deleteDirectory($dir) {
        if (!file_exists($dir)) {
            return true;
        }
    
        if (!is_dir($dir)) {
            return unlink($dir);
        }
    
        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }
    
            if (!$this->deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }
    
        }
    
        return rmdir($dir);
    }

    public function aproveUser($id, $aproveUser)
    {
        $pdo = array(
            ':status' => $aproveUser,
        );

        $columns    = 'status=:status';

        return $this->pdoCrud->update('user', $columns, 'WHERE id = :id', array_merge($pdo, array(
            ':id' => $id,
        )));
    }

    public function reproveUser($id)
    {
        $pdo = array(
            ':status' => 2,
        );

        $columns    = 'status=:status';

        return $this->pdoCrud->update('userphotos', $columns, 'WHERE id = :id', array_merge($pdo, array(
            ':id' => $id,
        )));
    }

    public function searchFilter($minage, $maxage, $gender, $hairColor, $eyeColor, $childrens, $likeTrip, $maritalStatus, $smoke, $drink, $academicFormation, $profession, $height, $monthlyIncome,$min_locale, $max_locale, $cityId)
    {

        setcookie('hairColor'           , $hairColor        , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('minage'              , $minage           , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('maxage'              , $maxage           , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('eyeColor'            , $eyeColor         , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('childrens'           , $childrens        , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('likeTrip'            , $likeTrip         , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('gender'              , $gender           , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('maritalStatus'       , $maritalStatus    , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('smoke'               , $smoke            , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('drink'               , $drink            , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('academicFormation'   , $academicFormation, time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('profession'          , $profession       , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('height'              , $height           , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('monthlyIncome'       , $monthlyIncome    , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('min_locale'          , $min_locale       , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('max_locale'          , $max_locale       , time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('city'                , $cityId           , time() + (86400 * 30), "/"); // 86400 = 1 day
        
        return true;
    }

    public function searchBadge($cityId, $new, $highlights)
    {

        setcookie('city', $cityId, time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('new', $new, time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie('highlights', $highlights, time() + (86400 * 30), "/");

        return true;
    }

    public function saveSexAndChoice($id, $sex, $preference)
    {
        $pdo = array(
            ':sex'        => $sex,
            ':preference' => $preference,
            ':id'         => $id
        );

        $values   = "sex = :sex, preference = :preference";
        $clausule = "WHERE id = :id";

        return $this->pdoCrud->update("user", $values, $clausule, $pdo);
    }

    public function verifyUser($id, $verified)
    {
        $pdo = array(
            ':verifiedstatus' => $verified,
            ':id'       => $id
        );

        $values = "verified = :verifiedstatus";
        $clausule = "WHERE id = :id";

        return $this->pdoCrud->update("report", $values, $clausule, $pdo);
    }
}