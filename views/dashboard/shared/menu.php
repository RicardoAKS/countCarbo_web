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
                <a href="<?php echo $url; ?>/dashboard/approve-users" class="<?=(in_array('approve-users', $params)) ? 'active' : '';?>">
                    <i class="fas fa-users-cog"></i>
                    Aprovar usuários
                </a>
            </li>
            <li>
                <a href="<?php echo $url; ?>/dashboard/complaints" class="<?=in_array('complaints', $params) ? 'active' : ''?>">
                    <i class="fas fa-bullhorn"></i>
                    Denúncias
                </a>
            </li>
           <li>
                <a href="<?php echo $url; ?>/dashboard/withdrawals" class="<?=in_array('withdrawals', $params) ? 'active' : ''?>">
                    <i class="fas fa-dollar-sign"></i>
                    Saques
                </a>
           </li>
            
        </ul>
    </div>
</aside>