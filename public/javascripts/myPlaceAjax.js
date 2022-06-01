//heart를 눌렀을 때 실행되는 함수
function setMyPlace(compId) {
    const inputdata = compId;
    sendMyPlaceAjax('http://localhost:3000/myplace-ajax', inputdata)
}

const section = document.querySelector(".heart");

//send함수 'http://localhost:3000/myplace-ajax'주소에 inputdata를 보냅니다
function sendMyPlaceAjax(url, data) {

    let ajaxData;
    if(section.innerHTML == '<i class="fa-light fa-heart"></i>'){
        ajaxData = {'compId' : data, 'type': 'set'};
    }else{
        ajaxData = {'compId' : data, 'type': 'remove'};
    }
    ajaxData = JSON.stringify(ajaxData);
    
    //data에 inputdata를 json형식으로 넣고 이를 xmlhttprequest를 통해 post방식으로 보냅니다
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(ajaxData);
    
    //서버에서 결과가 도착하면 그것을 result div에 입력합니다.
    xhr.addEventListener('load', function () {
        console.log(xhr.responseText);

        if(section.innerHTML == '<i class="fa-light fa-heart"></i>'){
            section.innerHTML = '<i class="fa-solid fa-heart"></i>';
        }else{
            section.innerHTML = '<i class="fa-light fa-heart"></i>';
        }
    });
}