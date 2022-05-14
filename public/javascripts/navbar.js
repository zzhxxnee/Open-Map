(function(){
    var current;
    if(location.pathname === '/'){
        current = '/'
        document.querySelector('.map').classList.add('active');
        document.querySelector('.navbar__togglebtn').style.display = "flex";
    } else {
        current = location.pathname.split('/')[1];
        var menuItems = document.querySelectorAll('nav li a');
        var menuList = document.querySelectorAll('nav li');
        for(let i = 0; i<menuItems.length; i++){
            if(menuItems[i].getAttribute("href").indexOf(current) !== -1){
                menuList[i].classList.add('active');
            }
        }
    }
    
})();

const togglebtn = document.querySelector('.navbar__togglebtn');
togglebtn.addEventListener('click', function() {
    document.querySelector('.navbar__togglebtn').classList.toggle('active');
});