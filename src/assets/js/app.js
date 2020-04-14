function appJs(){
    $(document).ready(function(){
    
        $('#minimizeSidebar').click(function(){
    
            //cambia el icono del button
            let buttonIcon = $(this).find('i').first();
            if($(buttonIcon).attr('class') === 'pe-7s-menu'){
                $(buttonIcon).attr('class','pe-7s-more');
            }else{
                $(buttonIcon).attr('class','pe-7s-menu');
            }
    
            //Oculta los textos del sidebar
            $('.sidebar-main p').toggleClass('active');
    
            //cambia el ancho del sidebar y admin
            $('#sidebar').toggleClass('expanded');
            $('#admin').toggleClass('expanded');
    
        });
    
        const showMenu = (toggleId,navId,sidebar) =>{
            const toggle = document.getElementById(toggleId),
                  nav = document.getElementById(navId),
                  mainSidebar = document.getElementById(sidebar);
            if(toggle && nav && mainSidebar){
                toggle.addEventListener('click',() =>{
                    toggle.classList.toggle("is-active");
                    nav.classList.toggle('show');
                    mainSidebar.classList.toggle('display-block');
                })
            }
        };
        showMenu('hamburger','sidebar','l-sidebar');
    
        $('.l-main').perfectScrollbar();
    
        $('.l-auth').perfectScrollbar();
    
        $('.sidebar-main__modules').perfectScrollbar();
    
        $('.nav a').click(function(e){
            $(this).toggleClass('active');
            $(this).find('.caret').toggleClass('active');
        });
    
    });
}