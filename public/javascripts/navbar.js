(function(){
    var current;
    if(location.pathname === '/'){
        document.querySelector('.map').classList.add('active');
        document.querySelector('.navbar__togglebtn').style.display = "flex";
    } 
    else if((location.pathname).indexOf("users/login") !== -1){
        document.querySelector('.login').classList.add('active');
    }
    else if((location.pathname).indexOf("users/sign_up") !== -1){
        document.querySelector('.signup').classList.add('active');
    }
    else if((location.pathname).indexOf("favorite") !== -1){
        document.querySelector('.favorite').classList.add('active');
    }
    else if(((location.pathname).indexOf("mypage") !== -1)
            || ((location.pathname).indexOf("compRegist") !== -1)){
        document.querySelector('.mypage').classList.add('active');
    }
})();

const togglebtn = document.querySelector('.navbar__togglebtn');
togglebtn.addEventListener('click', function() {
    document.querySelector('.navbar__togglebtn').classList.toggle('active');
});