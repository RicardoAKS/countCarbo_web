<aside class="col-lg-2 col-md-3 sidebar">
    <div class="header-menu">        
       
        <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user-circle"></i>
                <p class="text-light mr-2"><?=$admName?></p>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="<?php echo $url ?>/logoutAdmin"> 
                    <i class="fas fa-walking fa-2x"></i>
                    Sair
                </a>
            </div>
        </div>

    </div>

    <div class="sidebar-links">
        <ul>

            <li>
                <a href="<?php echo $url; ?>/dashboard" class="<?php echo (end($params) == 'dashboard') ? 'active' : '';?>">
                    <i class="fas fa-home"></i>
                    Home
                </a>
            </li>
            <li>
                <a href="<?php echo $url; ?>/dashboard/foods" class="<?=(in_array('foods', $params) || in_array('food', $params)) ? 'active' : '';?>">
                    <i class="fas fa-utensils"></i>
                    Alimentos
                </a>
            </li>
            
        </ul>
    </div>
</aside>