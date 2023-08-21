<?php


class SanitizeString
{
    
    public function sanitize($string) {

        // matriz de entrada
        $what = array( 'ä','ã','à','á','â','ê','ë','è','é','ï','ì','í','ö','õ','ò','ó','ô','ü','ù','ú','û','À','Á','É','Í','Ó','Ú','ñ','Ñ','ç','Ç',' ','-','(',')',',',';',':','|','!','"','#','$','%','&','/','=','?','~','^','>','<','ª','º' );
    
        // matriz de saída
        $by   = array( 'a','a','a','a','a','e','e','e','e','i','i','i','o','o','o','o','o','u','u','u','u','A','A','E','I','O','U','n','n','c','C','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_' );
    
        // devolver a string
        return str_replace($what, $by, $string);
    }

    public function Mask($mask, $str)
    {
        $str = str_replace(" ","",$str);

        for($i=0;$i<strlen($str);$i++){
            $mask[strpos($mask,"#")] = $str[$i];
        }

        return $mask;
    }

    public function phoneWithNineInFront($phone)
    {
        $phone = preg_replace("/[^0-9]/", "", $phone);
        
        if(strlen($phone) == "10"){
            $phone = $this->mask("(##) ####-####", $phone);
            $phone_without_nine = explode(" ", trim($phone), 2);
            $phone_without_nine = "$phone_without_nine[0] 9$phone_without_nine[1]";
            $phone = preg_replace("/[^0-9]/", "", $phone_without_nine);
        }

        return $phone;
    }

}