<?php

/**
 *
 * Classe captura os dados do usuário
 *
 * @author Willen
 *
 **/
class UserData
{

    private $pdoQuery;
    private $userSession;
    private $encryptString;


    public function __construct()
    {
        $this->userSession    = new UserSession;
        $this->pdoQuery       = new PDOQuery;
        $this->encryptString  = new EncryptString;

    }

    public function getData($id)
    {

        $locale = $this->userSession->get('latitude') != null && $this->userSession->get('longitude') != null ? ', IF(u.latitude IS NULL AND u.longitude IS NULL, NULL, (((acos(sin(('.floatval($this->userSession->get('latitude')).'*pi()/180)) * sin((u.latitude*pi()/180)) + cos(('.floatval($this->userSession->get('latitude')).'*pi()/180)) * cos((u.latitude*pi()/180)) * cos((('.floatval($this->userSession->get('longitude')).' - u.longitude) * pi()/180)))) * 180/pi()) * 60 * 1.1515 * 1.609344)) AS distance' : ', NULL as distance';
		
        $sql = $this->pdoQuery->fetch("SELECT u.*, c.city, uf.uf, p.media as userphoto, TIMESTAMPDIFF(YEAR, u.ageDate, NOW()) as ageDate, pif.name, pif.hairColor, pif.eyeColor, pif.childrens, pif.likeTrip, pif.maritalStatus, pif.smoke, pif.drink, pif.academicFormation, pif.profession, pif.height, pif.monthlyIncome, pif.apresentationPhrase $locale FROM user u 
        left join personalinformations pif on pif.users_id = u.id 
        left join city c on c.id = u.cityId
        left join uf on uf.id = u.ufId
        left join photos p on p.userid = u.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = u.id)
        WHERE u.id = :id", array(
            ':id' => $id
        ));

		if($sql){
       		$sql['images'] = $this->pdoQuery->fetchAll("SELECT p.*, user.username as username FROM photos p
        	inner join user on user.id = p.userid
        	WHERE p.userid = :id
        	GROUP BY p.id
        	ORDER BY p.orderPhoto", array(
            	':id' => $sql['id']
        	));

        	foreach ($sql['images'] as $key2 => $value) {
            	if(!file_exists(ROOT . '/assets/photos/' . $sql['images'][$key2]['id'] . '/' . $sql['images'][$key2]['media']) && !file_exists(ROOT . '/assets/posts/videos/' . $sql['images'][$key2]['id'] . '/' . $sql['images'][$key2]['media'])){
                	// $this->postCrud->remove($this->urlHelper->getURL(), $value);
                	unset($sql['images'][$key2]);
            	}
        	}
		}

        return $sql;
    }

    public function getComplaints($limit = false, $page = false)
    {
        $pagination = "";

        if($limit !== false && $page !== false){
            $pagination = "LIMIT $page, $limit";
        }

        return $this->pdoQuery->fetchAll("SELECT r.id, r.report, p.all_block_justify, p.photo_block_justify, p.all_block, p.photo_block, p.id as profile_id, p.username as profilename, p_photos.media as profile_photo, (SELECT count(DISTINCT r2.idUser) FROM report r2 WHERE r2.idProfile = r.idProfile AND r2.report = r.report) as countReports, r.verified FROM report r
        INNER JOIN user p on p.id = r.idProfile
        LEFT JOIN photos p_photos on p_photos.userid = p.id AND p_photos.orderPhoto = (SELECT MIN(p_photos2.orderPhoto) FROM photos p_photos2 WHERE p_photos2.userid = p.id)
        GROUP BY r.idProfile, r.report
        ORDER BY r.id DESC
        $pagination");
    }

    public function getBlockedsProfile($id)
    {
        $block = $this->pdoQuery->fetchAll('SELECT u.*, p.media as userphoto FROM user u
		inner join blocked b on b.idProfile = u.id
        left join photos p on p.userid = u.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = u.id)
        WHERE b.idUser = :id', array(
                ':id' => $id,
            )
        );

        return $block;
    }

    public function getBlockedsProfileIds($id)
    {
        $blocks = $this->pdoQuery->fetchAll('SELECT u.id FROM user u, blocked b WHERE u.id = b.idProfile AND b.idUser = :id', array(':id' => $id,));

        foreach ($blocks as $block) {
            $ids[] = $block['id'];
        }

        return $blocks;
    }

    public function getBlockedsMeProfileIds($id)
    {
        $blocks = $this->pdoQuery->fetchAll('SELECT u.id FROM user u, blocked b WHERE u.id = b.idUser AND b.idProfile = :id', array(':id' => $id,));

        foreach ($blocks as $block) {
            $ids[] = $block['id'];
        }

        return $blocks;
    }

    public function getOldest()
    {
        $data = $this->pdoQuery->fetch('SELECT MAX(TIMESTAMPDIFF(YEAR, ageDate, NOW())) as maxage FROM user');

        return $data['maxage'];
    }

    public function getDistanceLongest()
    {
        $latitude  = floatval($this->userSession->get('latitude'));
        $longitude = floatval($this->userSession->get('longitude'));
        if($latitude != NULL && $longitude != NULL){
            $data = $this->pdoQuery->fetch("SELECT 
                CEIL(MAX((((acos(sin(($latitude*pi()/180)) * sin((u.latitude*pi()/180)) + cos(($latitude*pi()/180)) * cos((u.latitude*pi()/180)) * cos((($longitude - u.longitude) * pi()/180)))) * 180/pi()) * 60 * 1.1515 * 1.609344))) AS distance 
            FROM user u");

            return $data['distance'];
        }else{
            return 100;
        }
    }

    public function getDataByCode($code)
    {
        return $this->pdoQuery->fetch("SELECT * FROM user WHERE lower(code) = :code", array(
            ':code' => $code
        ));
    }

    public function getSearchName($name, $verification)
    {

        $data = $this->pdoQuery->fetchAll('SELECT username, bio, p.media as photo, id FROM user 
        left join photos p on p.userid = user.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = user.id)
        WHERE id <> :id AND sex <> :verification AND username like "%' . $name . '%" AND validation = 1', array(':verification' => $verification, ':id' => $this->userSession->get('id')));
        return $data;
    }

    public function UsersWithCode($code, $validation = false)
    {
        $validate = "";
        if($validation){
            $validate = "AND u.validatephone = 2 AND u.phone <> '' AND u.phone IS NOT NULL AND p.media IS NOT NULL";
        }

        return $this->pdoQuery->fetchAll("SELECT u.*, p.media as photo FROM user u
        left join photos p on p.userid = u.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = u.id)
        WHERE u.linkCadastre = :codeValue
        AND DATE(u.create_date) >= '2022-10-31'
        $validate
        ", array(
            ':codeValue' => $code
        ));
    }
    
    public function getUsersToApproval($filterSex = [], $limit = false, $page = false)
    {
        $where = "";
        $sexSql = "";
        $pagination = "";
        
        if ($filterSex[0] != "" && $filterSex != false) {
            if (count($filterSex) == 1) {

                if($filterSex[0] == "null"){
                    $where .= "WHERE u.sex is null";
                }else{
                    $where .= "WHERE u.sex = '$filterSex[0]'";
                }
            } else {

                foreach ($filterSex as $key => $sex) {

                    if ($key == 0) {
                        if($sex == "null"){
                            $sexSql = "u.sex is null";
                        }else{
                            $sexSql = "u.sex = '$sex'";
                        }
                    } else {
                        if($sex == "null"){
                            $sexSql = "OR u.sex is null";
                        }else{
                            $sexSql .= " OR u.sex = '$sex'";
                        }
                    }
                   
                }

                $where .= " WHERE ( $sexSql )";
            }
        }

        if($limit !== false && $page !== false){
            $pagination = "LIMIT $page, $limit";
        }
        // if($search != ""){
        //     $where = "WHERE u.username like '%$search%' or u.email like '%$search%' or u.phone like '%$search%'";
        // }
        $users = $this->pdoQuery->fetchAll("SELECT u.*, (SELECT COUNT(g.id) FROM grades g WHERE g.userid = u.id) as grades, p.media as photo, pinfo.name, pinfo.hairColor, pinfo.eyeColor, pinfo.childrens, pinfo.likeTrip, pinfo.maritalStatus, pinfo.smoke, pinfo.drink, pinfo.academicFormation, pinfo.profession, pinfo.height, pinfo.lookingFor, pinfo.monthlyIncome, pinfo.apresentationPhrase FROM user u 
        LEFT JOIN personalinformations pinfo ON pinfo.users_id = u.id 
        LEFT JOIN photos p on p.userid = u.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = u.id)
        $where
        GROUP BY u.id 
        ORDER BY u.status ASC, u.id DESC
        $pagination");

        return $users;
    }

    public function getMyInformation($id)
    {

        $sql = $this->pdoQuery->fetch("SELECT u.id as userid, p.name,u.cityId, u.ufId, u.ageDate, pu.media as photo, p.*, c.city, uf.uf
            FROM user u, personalinformations p, city c, uf
            left join photos pu on pu.userid = u.id AND pu.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = u.id)
            WHERE  u.ufId = uf.id and u.cityId = c.id AND p.users_id = u.id AND u.id = :id ", array(
            ':id' => $id
        ));

        return $sql;
    }

    public function getBlocked($username, $id)
    {
        $favorite = $this->pdoQuery->fetch('SELECT * FROM blocked b, user u WHERE b.idProfile = u.id AND u.username = :username AND b.idUser = :id', array(
            ':username' => $username,
            ':id'       => $id
        ));

        return $favorite;
    }

    public function getPhotosByIdUser($userid)
    {
        return $this->pdoQuery->fetchAll("SELECT * FROM photos p WHERE p.userid = :id ORDER BY p.orderPhoto", array(
            ':id' => $userid
        ));
    }

    public function getPhotoUser($id)
    {
        return $this->pdoQuery->fetch("SELECT * FROM photos p WHERE p.id = :id", array(
            ':id' => $id
        ));
    }

    public function getInformation($choice, $userSex, $initial, $total, $beauty, $beauty_second, $beauty_third, $hair_size, $hair_size_second, $hair_size_third, $hair_color, $hair_color_second, $hair_color_third, $weight, $weight_second, $weight_third, $vulgarity, $vulgarity_second, $vulgarity_third, $eyes, $eyes_second, $eyes_third, $boost = false, $black = false, $gold = false, $withoutPlan = false, $superlike = false, $like = false)
    {
        $total     = round($total);
        $userid    = intval($this->userSession->get('id'));
        $latitude  = floatval($this->userSession->get('latitude'));
        $longitude = floatval($this->userSession->get('longitude'));
        $boostIf   = $boost;

        $boost      = $boostIf ? " inner join boost on boost.userid = u.id AND boost.createdate < NOW() AND boost.dateend > NOW() AND (boost.status = 'RECEIVED_IN_CASH' OR boost.status = 'CONFIRMED' OR boost.status = 'RECEIVED')" : " left outer join boost on boost.userid = u.id AND boost.createdate < NOW() AND boost.dateend > NOW() AND (boost.status = 'RECEIVED_IN_CASH' OR boost.status = 'CONFIRMED' OR boost.status = 'RECEIVED')";
        $boostWhere = $boostIf ? " " : " AND boost.id IS NULL";

        $black = $black ? 
        " 
        inner join signature sign   on sign.iduser = u.id AND (sign.status = 'RECEIVED_IN_CASH' OR sign.status = 'CONFIRMED' OR sign.status = 'RECEIVED' OR sign.status = 'ACTIVE') AND IF(sign.paymentdate IS NULL, sign.createdate + INTERVAL sign.days DAY > CURDATE(), sign.paymentdate + INTERVAL sign.days DAY > CURDATE())
        inner join plans_details pd on pd.id     = sign.idPlanDetail
        inner join plans            on plans.id  = pd.idplan AND lower(plans.name) = 'black'" 
        : "
        left join signature sign   on sign.iduser = u.id AND (sign.status = 'RECEIVED_IN_CASH' OR sign.status = 'CONFIRMED' OR sign.status = 'RECEIVED' OR sign.status = 'ACTIVE') AND IF(sign.paymentdate IS NULL, sign.createdate + INTERVAL sign.days DAY > CURDATE(), sign.paymentdate + INTERVAL sign.days DAY > CURDATE())
        left join plans_details pd on pd.id     = sign.idPlanDetail
        left join plans            on plans.id  = pd.idplan AND lower(plans.name) = 'black'";

        $black = $gold ? "" : $black;

        $gold = $gold ? 
        " 
        inner join signature sign on sign.iduser = u.id AND (sign.status = 'RECEIVED_IN_CASH' OR sign.status = 'CONFIRMED' OR sign.status = 'RECEIVED' OR sign.status = 'ACTIVE') AND IF(sign.paymentdate IS NULL, sign.createdate + INTERVAL sign.days DAY > CURDATE(), sign.paymentdate + INTERVAL sign.days DAY > CURDATE())
        inner join plans_details pd on pd.id     = sign.idPlanDetail
        inner join plans            on plans.id  = pd.idplan AND lower(plans.name) = 'gold'" 
        : "
        left join signature sign   on sign.iduser = u.id AND (sign.status = 'RECEIVED_IN_CASH' OR sign.status = 'CONFIRMED' OR sign.status = 'RECEIVED' OR sign.status = 'ACTIVE') AND IF(sign.paymentdate IS NULL, sign.createdate + INTERVAL sign.days DAY > CURDATE(), sign.paymentdate + INTERVAL sign.days DAY > CURDATE())
        left join plans_details pd on pd.id     = sign.idPlanDetail
        left join plans            on plans.id  = pd.idplan AND lower(plans.name) = 'gold'";

        $gold = $black ? "" : $gold;

        $superlikeWhere = $superlike ? 
        " AND (matchUser1.matchUserSuperLike IS NOT NULL OR  matchUser1.matchProfileSuperLike IS NOT NULL) " : 
        " AND matchUser3.matchUserSuperLike IS NULL      AND matchUser3.matchProfileSuperLike IS NULL ";

        $superlike = $superlike ? 
        " 
        inner join matches matchUser1 on (matchUser1.idUser = $userid AND matchUser1.idProfile = u.id ) 
        OR (matchUser1.idProfile = $userid AND matchUser1.idUser = u.id)" : 
        " 
        left outer join matches matchUser3 on (matchUser3.idUser = $userid AND matchUser3.idProfile = u.id ) 
        OR (matchUser3.idProfile = $userid AND matchUser3.idUser = u.id) ";

        $likeWhere = $like ? 
        " AND (matchUser1.matchUser   IS NOT NULL OR  matchUser1.matchProfile    IS NOT NULL) " : 
        " AND matchUserLike.matchUser IS NULL     AND matchUserLike.matchProfile IS NULL";
        $like = $like ? 
        " inner join matches matchUser1 on (matchUser1.idUser = $userid AND matchUser1.idProfile = u.id ) 
        OR (matchUser1.idProfile = $userid AND matchUser1.idUser = u.id) " : 
        " left outer join matches matchUserLike on (matchUserLike.idUser = $userid AND matchUserLike.idProfile = u.id ) 
        OR (matchUserLike.idProfile = $userid AND matchUserLike.idUser = u.id) ";

        $withoutPlan = $withoutPlan ? " AND (lower(plans.name) != 'black' OR sign.id IS NULL) " : "";
        $locale      = $this->userSession->get('latitude') != null && $this->userSession->get('longitude') != null;

        @$hairColor             = ($_COOKIE['hairColor']         != "") ? ' AND p.hairColor         = "' . $this->encryptString->encrypt($_COOKIE['hairColor']) . '"'         : "";
        @$eyeColor              = ($_COOKIE['eyeColor']          != "") ? ' AND p.eyeColor          = "' . $this->encryptString->encrypt($_COOKIE['eyeColor']) . '"'          : "";
        @$childrens             = ($_COOKIE['childrens']         != "") ? ' AND p.childrens         = "' . $this->encryptString->encrypt($_COOKIE['childrens']) . '"'         : "";
        @$likeTrip              = ($_COOKIE['likeTrip']          != "") ? ' AND p.likeTrip          = "' . $this->encryptString->encrypt($_COOKIE['likeTrip']) . '"'          : "";
        @$gender                = ($_COOKIE['gender']            != "") ? ' AND u.sex               = "' . $_COOKIE['gender'] . '"'                                            : "";
        @$smoke                 = ($_COOKIE['smoke']             != "") ? ' AND p.smoke             = "' . $this->encryptString->encrypt($_COOKIE['smoke']) . '"'             : "";
        @$drink                 = ($_COOKIE['drink']             != "") ? ' AND p.drink             = "' . $this->encryptString->encrypt($_COOKIE['drink']) . '"'             : "";
        @$academicFormation     = ($_COOKIE['academicFormation'] != "") ? ' AND p.academicFormation = "' . $this->encryptString->encrypt($_COOKIE['academicFormation']) . '"' : "";
        @$height                = ($_COOKIE['height']            != "") ? ' AND p.height            = "' . $this->encryptString->encrypt($_COOKIE['height']) . '"'            : "";
        @$monthlyIncome         = ($_COOKIE['monthlyIncome']     != "") ? ' AND p.monthlyIncome     = "' . $this->encryptString->encrypt($_COOKIE['monthlyIncome']) . '"'     : "";
        @$profession            = ($_COOKIE['profession']        != "") ? ' AND p.profession        = "' . $this->encryptString->encrypt($_COOKIE['profession']) . '"'        : "";
        @$minage                = ($_COOKIE['minage']            != "") ? " AND TIMESTAMPDIFF(YEAR, u.ageDate, NOW()) >= " . $_COOKIE['minage'] . " "                          : "";
        @$maxage                = ($_COOKIE['maxage']            != "") ? " AND TIMESTAMPDIFF(YEAR, u.ageDate, NOW()) <= " . $_COOKIE['maxage'] . " "       : "";
        
        
        $distance               = $locale ? "(((acos(sin(($latitude*pi()/180)) * sin((u.latitude*pi()/180)) + cos(($latitude*pi()/180)) * cos((u.latitude*pi()/180)) * cos((($longitude - u.longitude) * pi()/180)))) * 180/pi()) * 60 * 1.1515 * 1.609344)" : "300";

        $localeWhere = "";
        @$localeWhere           = $localeWhere . ((isset($_COOKIE['max_locale']) && $_COOKIE['max_locale'] != "") ? " AND $distance <= $_COOKIE[max_locale] AND $distance <= 300" : " AND $distance <= 300 ");
        

        @$localeWhere = $localeWhere . ((isset($_COOKIE['min_locale']) && $_COOKIE['min_locale'] != "") ? " AND $distance >= $_COOKIE[min_locale] AND $distance >= 0" : " AND $distance >= 0 ");
        
        @$cityId                = ($_COOKIE['city'] != "") ? ' AND u.cityId = "' . $_COOKIE['city'] . '"'                                                         : "";
        $localeWhere = $locale ? $localeWhere : "";
        $locale      = $locale ? ", $distance AS distance" : ', NULL AS distance';

        switch($userSex){
            case "masc": 
                $sex = $this->encryptString->encrypt("man");
            break;

            case "fem": 
                $sex = $this->encryptString->encrypt("woman");
            break;

            default: 
                $sex = $this->encryptString->encrypt("two");
            break;
        }

        $sexWhere = "";
        $sexPreference = $this->encryptString->encrypt('two');
        $preferenceWhere = "AND (u.preference = '$sex' OR u.preference = '$sexPreference')";

        if($choice == "man"){
            $sexWhere = 'AND u.sex = "masc"';

        }else if($choice == "woman"){
            $sexWhere = 'AND u.sex = "fem"';
        }
        
        $order          = "";
        $preference     = "";
        $joinPreference = "";

        if($beauty != null && $hair_size != null && $hair_color != null && $weight != null && $vulgarity != null && $eyes != null){
            $joinPreference = " INNER JOIN grade_average ga on ga.userid = u.id";
            
            $preference = " AND (
                (
                    (
                        ROUND(ga.beauty) = ROUND($beauty)
                        OR
                        ROUND(ga.beauty) = ROUND($beauty_second)
                        OR
                        ROUND(ga.beauty) = ROUND($beauty_third)
                    )
                    AND
                    (
                        ROUND(ga.hair_size) = ROUND($hair_size)
                        OR
                        ROUND(ga.hair_size) = ROUND($hair_size_second)
                        OR
                        ROUND(ga.hair_size) = ROUND($hair_size_third)
                    )
                    AND
                    (
                        ROUND(ga.hair_color) = ROUND($hair_color)
                        OR
                        ROUND(ga.hair_color) = ROUND($hair_color_second)
                        OR
                        ROUND(ga.hair_color) = ROUND($hair_color_third)
                    )
                    AND
                    (
                        ROUND(ga.weight) = ROUND($weight)
                        OR
                        ROUND(ga.weight) = ROUND($weight_second)
                        OR
                        ROUND(ga.weight) = ROUND($weight_third)
                    )
                    AND
                    (
                        ROUND(ga.vulgarity) = ROUND($vulgarity)
                        OR
                        ROUND(ga.vulgarity) = ROUND($vulgarity_second)
                        OR
                        ROUND(ga.vulgarity) = ROUND($vulgarity_third)
                    )
                    AND
                    (
                        ROUND(ga.eyes) = ROUND($eyes)
                        OR
                        ROUND(ga.eyes) = ROUND($eyes_second)
                        OR
                        ROUND(ga.eyes) = ROUND($eyes_third)
                    )
                )
            )";

            $order = ", CASE 
                            WHEN ROUND(ga.beauty) = ROUND($beauty) AND ROUND(ga.hair_size) = ROUND($hair_size) AND ROUND(ga.hair_color) = ROUND($hair_color) AND ROUND(ga.weight) = ROUND($weight) AND ROUND(ga.vulgarity) = ROUND($vulgarity) AND ROUND(ga.eyes) = ROUND($eyes) THEN 1
                            WHEN ROUND(ga.beauty) = ROUND($beauty) OR ROUND(ga.hair_size) = ROUND($hair_size) OR ROUND(ga.hair_color) = ROUND($hair_color) OR ROUND(ga.weight) = ROUND($weight) OR ROUND(ga.vulgarity) = ROUND($vulgarity) OR ROUND(ga.eyes) = ROUND($eyes) THEN 2

                            WHEN ROUND(ga.beauty) = ROUND($beauty_second) AND ROUND(ga.hair_size) = ROUND($hair_size_second) AND ROUND(ga.hair_color) = ROUND($hair_color_second) AND ROUND(ga.weight) = ROUND($weight_second) AND ROUND(ga.vulgarity) = ROUND($vulgarity_second) AND ROUND(ga.eyes) = ROUND($eyes_second) THEN 3
                            WHEN ROUND(ga.beauty) = ROUND($beauty_second) OR ROUND(ga.hair_size) = ROUND($hair_size_second) OR ROUND(ga.hair_color) = ROUND($hair_color_second) OR ROUND(ga.weight) = ROUND($weight_second) OR ROUND(ga.vulgarity) = ROUND($vulgarity_second) OR ROUND(ga.eyes) = ROUND($eyes_second) THEN 4
                            
                            WHEN ROUND(ga.beauty) = ROUND($beauty_third) AND ROUND(ga.hair_size) = ROUND($hair_size_third) AND ROUND(ga.hair_color) = ROUND($hair_color_third) AND ROUND(ga.weight) = ROUND($weight_third) AND ROUND(ga.vulgarity) = ROUND($vulgarity_third) AND ROUND(ga.eyes) = ROUND($eyes_third) THEN 5
                            WHEN ROUND(ga.beauty) = ROUND($beauty_third) OR ROUND(ga.hair_size) = ROUND($hair_size_third) OR ROUND(ga.hair_color) = ROUND($hair_color_third) OR ROUND(ga.weight) = ROUND($weight_third) OR ROUND(ga.vulgarity) = ROUND($vulgarity_third) OR ROUND(ga.eyes) = ROUND($eyes_third) THEN 6
                            
                            ELSE 7
                        END";
        }else{
            $order = ", u.flyrts DESC";
        }

        $sql = $this->pdoQuery->fetchAll("SELECT u.longitude, u.latitude, u.bio, u.id as userid, u.preference, p.name, p.academicFormation, IF(u.blockage = 1 && sign.paymentdate + INTERVAL sign.days DAY > CURDATE(), null, TIMESTAMPDIFF(YEAR, u.ageDate, NOW() ) ) as ageDate, ps.media as userphoto, u.username as 'nickname', IF( c.city IS NOT NULL, c.city , NULL) as 'city', IF(uf.initials IS NOT NULL, uf.initials, NULL) as 'uf', u.sex $locale FROM user u 
        inner join photos ps on ps.userid = u.id AND ps.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = u.id)
        left outer join personalinformations p on p.users_id = u.id

        $boost
        $black
        $gold
        $superlike
        $like
        $joinPreference
        
        left outer join matches matchProfile1 on matchProfile1.idProfile = u.id AND matchProfile1.idUser    = $userid AND matchProfile1.matchUser IS NOT NULL
        left outer join matches matchProfile2 on matchProfile2.idUser    = u.id AND matchProfile2.idProfile = $userid AND matchProfile2.matchProfile IS NOT NULL
        left outer join matches match1        on match1.idUser = u.id AND match1.idProfile = $userid
        left outer join matches match2        on match2.idUser = $userid AND match2.idProfile = u.id
        left outer join city c on c.id = u.cityId
        left outer join uf on uf.id = u.ufId
        WHERE matchProfile1.matchUser IS NULL
        AND matchProfile2.matchProfile IS NULL
        AND u.id <> $userid
        
        AND u.hidden <> 1
        AND u.all_block <> 1
        AND u.photo_block <> 1

        $localeWhere
        $sexWhere
        $preferenceWhere
        $preference

        AND CASE 
            WHEN sign.paymentdate + INTERVAL sign.days DAY > CURDATE()
            THEN (u.invisible != 1 OR (match1.id IS NOT NULL OR match2.id IS NOT NULL) )
            ELSE u.id IS NOT NULL
        END

        $likeWhere
        $superlikeWhere 
        $boostWhere 
        $withoutPlan 
        $gender 
        $minage 
        $maxage 
        $hairColor 
        $eyeColor 
        $childrens 
        $likeTrip 
        $smoke 
        $drink 
        $academicFormation 
        $height 
        $monthlyIncome 
        $profession 
        $cityId 

        GROUP BY u.id
        ORDER BY distance $order
        LIMIT $initial, $total");

        foreach ($sql as $key => $user) {
            if(!file_exists(ROOT . "/assets/photos/".$user['userid']."/".$user['userphoto']) || substr(ROOT . "/assets/photos/".$user['userid']."/".$user['userphoto'], -1) == '/'){
                unset($sql[$key]);
            }else{
                $sql[$key]['userphoto'] = "/assets/photos/".$user['userid']."/".$user['userphoto'];
            }

            if(isset($sql[$key])){
                $sql[$key]['images'] = $this->pdoQuery->fetchAll("SELECT p.*, user.username as username FROM photos p
                inner join user on user.id = p.userid
                WHERE p.userid = :id
                GROUP BY p.id
                ORDER BY p.orderPhoto", array(
                    ':id' => $user['userid']
                ));

                foreach ($sql[$key]['images'] as $key2 => $value) {
                    if(!file_exists(ROOT . '/assets/photos/' . $sql[$key]['images'][$key2]['userid'] . '/' . $sql[$key]['images'][$key2]['media']) &&  !file_exists(ROOT . '/assets/posts/videos/' . $sql[$key]['images'][$key2]['userid'] . '/' . $sql[$key]['images'][$key2]['media'])){
                        unset($sql[$key]['images'][$key2]);
                    }
                }
            }
		}

        return $sql;
    }
	
	public function getUsersNoImage()
    {
        return $this->pdoQuery->fetchAll("SELECT u.* FROM user u 
        left join photos p on p.userid = u.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = u.id)
        WHERE p.media IS NULL AND u.notifications = 1 AND u.push_notifications_token IS NOT NULL");
    }
	
	public function getUsersNotValidated()
    {
        return $this->pdoQuery->fetchAll("SELECT u.id FROM user u WHERE u.validation = 0");
    }
	
	public function getUsersDayBySex($sex, $limit)
    {
        return $this->pdoQuery->fetchAll("SELECT u.id, u.push_notifications_token FROM user u
        left join photos p on p.userid = u.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = u.id)
        WHERE p.media IS NOT NULL AND u.notifications = 1 AND u.push_notifications_token IS NOT NULL AND u.SEX = :sex AND DATE(u.create_date) = CURDATE() ORDER BY u.id DESC LIMIT $limit", array(
            ':sex'   => $sex
        ));
    }

    public function getAllUsersWithPhotos($limit = false)
    {

        if($limit === false){
            $limit = "";
        }else{
            $limit = "LIMIT $limit";
        }

        $users = $this->pdoQuery->fetchAll("SELECT u.* FROM user u
        WHERE u.photo IS NOT NULL OR (SELECT count(p.id) FROM posts p WHERE p.userid = u.id) > 0
        GROUP BY u.id
        $limit");

        foreach ($users as $key => $user) {
            $users[$key]["images"] = $this->pdoQuery->fetchAll("SELECT p.*, pm.media FROM posts p
            left join postmedia pm on pm.postid = p.id
            WHERE p.userid = :id
            GROUP BY p.id
            ORDER BY p.orderPhoto", array(
                ':id' => $user['id']
            ));
        }

        return $users;
    }

    public function getUserStatus($id)
    {
        $result = $this->pdoQuery->fetch("SELECT validation, validateemail, validatephone FROM user WHERE id = $id");

        return $result;
    }

    public function CheckIndications($id)
    {  
        $result = $this->pdoQuery->fetch("SELECT COUNT(u.id)  as counter FROM user u WHERE u.linkCadastre = (SELECT code FROM user u2 WHERE u2.id = $id)")['counter'];

        return $result;
    }

}