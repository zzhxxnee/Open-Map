
const infowindow = new kakao.maps.InfoWindow({zIndex:1});
let init = 0;
const closedMarkerImageSrc = "//localhost:3000/images/closed.png";  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
const holidayMarkerImageSrc = "//localhost:3000/images/holiday.png";
const opendMarkerImageSrc = "//localhost:3000/images/open.png";

function setCenter() {            
    // 이동할 위도 경도 위치를 생성합니다 
    navigator.geolocation.getCurrentPosition((position) => {
        const moveLatLon = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(moveLatLon);
      });
}


const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    }; 

// 지도를 생성합니다   
const map = new kakao.maps.Map(mapContainer, mapOption); 
if(init === 0){
    setCenter();
    init++;
    console.log(init);
}


// 장소 검색 객체를 생성합니다
const ps = new kakao.maps.services.Places(); 

// 키워드로 장소를 검색합니다
function searchPlaces() {

    let keyword = document.getElementById('keyword').value;

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
}

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {   
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        createClosedRestaurantMarkers(); 
        setClosedRestaurantMarkers(map);
        createClosedCafeMarkers();
        setClosedCafeMarkers(map);
        createClosedHospitalMarkers();
        setClosedHospitalMarkers(map);
        createTodayClosedRestaurantMarkers();
        setTodayClosedRestaurantMarkers(map);
        createTodayClosedCafeMarkers();
        setTodayClosedCafeMarkers(map);
        createTodayClosedHospitalMarkers();
        setTodayClosedHospitalMarkers(map);
        createOpenedRestaurantMarkers();
        setOpenedRestaurantMarkers(map);
        createOpenedCafeMarkers();
        setOpenedCafeMarkers(map);
        createOpenedHospitalMarkers();
        setOpenedHospitalMarkers(map);
    } 
}

function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;            
}

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
function createMarker(position, image) {
    var marker = new kakao.maps.Marker({
        position: position,
        image: image
    });
    
    return marker;  
}   

function createInfowindowEvent(itemEl, marker, title) {
    kakao.maps.event.addListener(marker, 'mouseover', function() {
        displayInfowindow(marker, title);
    });

    kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
    });

    itemEl.onmouseover =  function () {
        displayInfowindow(marker, title);
    };

    itemEl.onmouseout =  function () {
        infowindow.close();
    };
}

const listEl = document.getElementById('placesList');
const menuEl = document.getElementById('slideNav');
const fragment = document.createDocumentFragment();

let closedRestaurantMarkers = [];
let closedCafeMarkers = [];
let closedHospitalMarkers = [];
let todayClosedRestaurantMarkers = [];
let todayClosedCafeMarkers = [];
let todayClosedHospitalMarkers = [];
let openedRestaurantMarkers = [];
let openedCafeMarkers = [];
let openedHospitalMarkers = [];

// 오늘 마감 식당 마커를 생성하고 오늘 마감 식당 마커 배열에 추가하는 함수입니다
function createClosedRestaurantMarkers() {
    
    for (var i = 0; i < closedRestaurant.length; i++) {  
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(0, 45),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };     

        let itemEl_CR = getClosedRestarantItem(closedRestaurant[i]);
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(closedMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(closedRestaurantPositions[i], markerImage);  
        
        // 생성된 마커를 마커 배열에 추가합니다
        closedRestaurantMarkers.push(marker);

        createInfowindowEvent(itemEl_CR, marker, closedRestaurant[i].compName);

        fragment.appendChild(itemEl_CR);
    }     
}

// 오늘 마감 휴게음식점 마커를 생성하고 오늘 마감 휴게음식점 마커 배열에 추가하는 함수입니다
function createClosedCafeMarkers() {
    for (var i = 0; i < closedCafe.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 2),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };  
            
        let itemEl_CC = getClosedCafeItem(closedCafe[i]);
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(closedMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(closedCafePositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        closedCafeMarkers.push(marker);    

        createInfowindowEvent(itemEl_CC, marker, closedCafe[i].compName);

        fragment.appendChild(itemEl_CC);
    }        
}

// 오늘 마감 병원 마커를 생성하고 오늘 마감 병원 마커 배열에 추가하는 함수입니다
function createClosedHospitalMarkers() {
    for (var i = 0; i < closedHospital.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 87),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };    
            
        let itemEl_CH = getClosedHospitalItem(closedHospital[i]);
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(closedMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(closedHospitalPositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        closedHospitalMarkers.push(marker);  
        
        createInfowindowEvent(itemEl_CH, marker, closedHospital[i].compName);

        fragment.appendChild(itemEl_CH);
    }                
}

// 오늘 휴무 식당 마커를 생성하고 오늘 휴무 식당 마커 배열에 추가하는 함수입니다
function createTodayClosedRestaurantMarkers() {
    
    for (var i = 0; i < todayClosedRestaurant.length; i++) {  
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(0, 45),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };   
            
        let itemEl_TCR = getTodayClosedRestarantItem(todayClosedRestaurant[i]);
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(holidayMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(todayClosedRestaurantPositions[i], markerImage);  
        
        // 생성된 마커를 마커 배열에 추가합니다
        todayClosedRestaurantMarkers.push(marker);

        createInfowindowEvent(itemEl_TCR, marker, todayClosedRestaurant[i].compName);

        fragment.appendChild(itemEl_TCR);
    }     
}

// 오늘 휴무 휴게음식점 마커를 생성하고 오늘 휴무 휴게음식점 마커 배열에 추가하는 함수입니다
function createTodayClosedCafeMarkers() {

    for (var i = 0; i < todayClosedCafe.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 2),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };       

        let itemEl_TCC = getClosedCafeItem(todayClosedCafe[i]);
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(holidayMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(todyClosedCafePositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        todayClosedCafeMarkers.push(marker);   
        
        createInfowindowEvent(itemEl_TCC, marker, todayClosedCafe[i].compName);

        fragment.appendChild(itemEl_TCC);
    }        
}

// 오늘 휴무 병원 마커를 생성하고 오늘 휴무 병원 마커 배열에 추가하는 함수입니다
function createTodayClosedHospitalMarkers() {

    for (var i = 0; i < todayClosedHospital.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 87),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };      
            
        let itemEl_TCH = getTodayClosedHospitalItem(todayClosedHospital[i]);
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(holidayMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(todayClosedHospitalPositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        todayClosedHospitalMarkers.push(marker);  
        
        createInfowindowEvent(itemEl_TCH, marker, todayClosedHospital[i].compName);

        fragment.appendChild(itemEl_TCH);
    }                
}

// 영업중 식당 마커를 생성하고 영업중 식당 마커 배열에 추가하는 함수입니다
function createOpenedRestaurantMarkers() {
    
    for (var i = 0; i < openedRestaurant.length; i++) {  
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(0, 45),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };     
        
        let itemEl_OR = getOpenedRestarantItem(openedRestaurant[i]);
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(opendMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(openedRestaurantPositions[i], markerImage);  
        
        // 생성된 마커를 마커 배열에 추가합니다
        openedRestaurantMarkers.push(marker);

        createInfowindowEvent(itemEl_OR, marker, openedRestaurant[i].compName);

        fragment.appendChild(itemEl_OR);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
}     

// 영업중 휴게음식점 마커를 생성하고 영업중 휴게음식점 마커 배열에 추가하는 함수입니다
function createOpenedCafeMarkers() {

    for (var i = 0; i < openedCafe.length; i++) {
        
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 2),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };       

        let itemEl_OC = getOpenedCafeItem(openedCafe[i]);
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(opendMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(openedCafePositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        openedCafeMarkers.push(marker);    

        createInfowindowEvent(itemEl_OC, marker, openedCafe[i].compName);

        fragment.appendChild(itemEl_OC);
    }     
}

// 영업중 병원 마커를 생성하고 영업중 병원 마커 배열에 추가하는 함수입니다
function createOpenedHospitalMarkers() {

    for (var i = 0; i < openedHospital.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 80),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 87),    
                spriteSize: new kakao.maps.Size(36, 133)
            };     
            
        let itemEl_OH = getOpenedHospitalItem(openedHospital[i]);
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(opendMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(openedHospitalPositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        openedHospitalMarkers.push(marker);    
        
        createInfowindowEvent(itemEl_OH, marker, openedHospital[i].compName);

        fragment.appendChild(itemEl_OH);
    }                
}

// 오늘 마감 식당 마커들의 지도 표시 여부를 설정하는 함수입니다
function setClosedRestaurantMarkers(map) {        
    for (var i = 0; i < closedRestaurantMarkers.length; i++) {  
        closedRestaurantMarkers[i].setMap(map);
    }        
}

// 오늘 마감 휴게음식점 마커들의 지도 표시 여부를 설정하는 함수입니다
function setClosedCafeMarkers(map) {        
    for (var i = 0; i < closedCafeMarkers.length; i++) {  
        closedCafeMarkers[i].setMap(map);
    }        
}

// 오늘 마감 병원 마커들의 지도 표시 여부를 설정하는 함수입니다
function setClosedHospitalMarkers(map) {        
    for (var i = 0; i < closedHospitalMarkers.length; i++) {  
        closedHospitalMarkers[i].setMap(map);
    }        
}

// 오늘 휴무 식당 마커들의 지도 표시 여부를 설정하는 함수입니다
function setTodayClosedRestaurantMarkers(map) {        
    for (var i = 0; i < todayClosedRestaurantMarkers.length; i++) {  
        todayClosedRestaurantMarkers[i].setMap(map);
    }        
}

// 오늘 휴무 휴게음식점 마커들의 지도 표시 여부를 설정하는 함수입니다
function setTodayClosedCafeMarkers(map) {        
    for (var i = 0; i < todayClosedCafeMarkers.length; i++) {  
        todayClosedCafeMarkers[i].setMap(map);
    }        
}

// 오늘 휴무 병원 마커들의 지도 표시 여부를 설정하는 함수입니다
function setTodayClosedHospitalMarkers(map) {        
    for (var i = 0; i < todayClosedHospitalMarkers.length; i++) {  
        todayClosedHospitalMarkers[i].setMap(map);
    }        
}

// 영업중 식당 마커들의 지도 표시 여부를 설정하는 함수입니다
function setOpenedRestaurantMarkers(map) {        
    for (var i = 0; i < openedRestaurantMarkers.length; i++) {  
        openedRestaurantMarkers[i].setMap(map);
    }        
}

// 영업중 휴게음식점 마커들의 지도 표시 여부를 설정하는 함수입니다
function setOpenedCafeMarkers(map) {        
    for (var i = 0; i < openedCafeMarkers.length; i++) {  
        openedCafeMarkers[i].setMap(map);
    }        
}

// 영업중 병원 마커들의 지도 표시 여부를 설정하는 함수입니다
function setOpenedHospitalMarkers(map) {        
    for (var i = 0; i < openedHospitalMarkers.length; i++) {  
        openedHospitalMarkers[i].setMap(map);
    }        
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}


function getClosedRestarantItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';

    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span>' +  places.restOpen  + '</span>'+
        '   <span>' +  places.restClosed  + '</span>'; 

    itemStr += '  <span class="tel"> 오늘 마감 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function getClosedCafeItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';
    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span>' + places.cafeType + '</span>';
    itemStr += '    <span>' +  places.cafeOpen  + '</span>'+
        '   <span>' +  places.cafeClosed  + '</span>'; 

    itemStr += '  <span class="tel"> 오늘 마감 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function getClosedHospitalItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';
    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span>' + places.HospType + '</span>';
    itemStr += '    <span>' +  places.hospitalOpen  + '</span>'+
        '   <span>' +  places.hospitalClosed  + '</span>'; 
    itemStr += '    <span>' + places.content + '</span>';

    itemStr += '  <span class="tel"> 오늘 마감 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function getTodayClosedRestarantItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';

    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span> 휴무 </span>'

    itemStr += '  <span class="tel"> 오늘 휴무 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function getTodayClosedCafeItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';
    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span>' + places.cafeType + '</span>';
    itemStr += '    <span> 휴무 </span>'

    itemStr += '  <span class="tel"> 오늘 휴무 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function getTodayClosedHospitalItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';
    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span>' + places.HospType + '</span>';
    itemStr += '    <span> 휴무 </span>'
    itemStr += '    <span>' + places.content + '</span>';

    itemStr += '  <span class="tel"> 오늘 휴무 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function getOpenedRestarantItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';

    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span>' +  places.restOpen  + '</span>'+
        '   <span>' +  places.restClosed  + '</span>'; 

    itemStr += '  <span class="tel"> 영업중 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function getOpenedCafeItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';
    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span>' + places.cafeType + '</span>';
    itemStr += '    <span>' +  places.cafeOpen  + '</span>'+
        '   <span>' +  places.cafeClosed  + '</span>'; 

    itemStr += '  <span class="tel"> 영업중 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function getOpenedHospitalItem(places) {

    var el = document.createElement('li'),
    itemStr = '<div class="info">' +
        '   <h5>' + places.compName + '</h5>';
    itemStr += '    <span>' + places.address + '</span>';
    itemStr += '    <span>' + places.HospType + '</span>';
    itemStr += '    <span>' +  places.hospitalOpen  + '</span>'+
        '   <span>' +  places.hospitalClosed  + '</span>'; 
    itemStr += '    <span>' + places.content + '</span>';

    itemStr += '  <span class="tel"> 영업중 </span>' +
        '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}


function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}