<?php

/**
*
*
* @author Emprezaz.com
*
**/
class ProfileSettings
{
    public function settings($path)
    {
        if($path == '/assets/img/man.jpg' || $path == '/assets/img/woman.jpg' || $path == '/assets/img/noprofile.jpg'){
            return 'background-position: center; background-size: 100%; background-color: #465a65; background-repeat: no-repeat;';
        }else{
            return "";
        }
    }

    public function getUserStatus($id)
    {
        $userData = new UserData;
        $result = $userData->getUserStatus($id);
        return $result;
    }
    
    public function CheckIndications($id)
    {
        $userData = new UserData;
        $result = $userData->CheckIndications($id);

        return $result;
    }
}