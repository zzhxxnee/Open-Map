const modal = document.querySelector('.modal');

const body = document.querySelector('body');
const menu = document.querySelector('.menu');
const content = document.querySelector('.modal_body');

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.toggle('show');

    if (!modal.classList.contains('show')) {
      body.style.overflow = 'auto';
    }
  }
});

//이벤트를 동적 바인딩합니다
$(document).on('click', '.menu', function(e) {
    modal.classList.toggle('show');

    if (modal.classList.contains('show')) {
        body.style.overflow = 'hidden';
    }

    var inputdata = selectedPlace.compId;
    sendAjax('http://localhost:3000/menuajax', inputdata)
});

//send함수 'http://localhost:3000/menuajax'주소에 inputdata를 보냅니다
function sendAjax(url, data) {

    var data = { 'id': data };
    data = JSON.stringify(data);
    
    //data에 inputdata를 json형식으로 넣고 이를 xmlhttprequest를 통해 post방식으로 보냅니다
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(data);
    
    //서버에서 결과가 도착하면 그것을 result div에 입력합니다
    xhr.addEventListener('load', function () {
        const result =  JSON.parse(xhr.responseText);
        let menuInfo = '';
        for(let i = 0; i < result.length; i++){
            menuInfo += `<div>${result[i].menuName} ${result[i].price}</div>`
        }
        content.innerHTML = menuInfo;
        console.log(result);
    });
}