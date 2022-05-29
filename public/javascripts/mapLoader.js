
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
    
    for (var i = 0; i < closedRestaurantPositions.length; i++) {  
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(0, 45),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(closedMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(closedRestaurantPositions[i], markerImage);  
        
        // 생성된 마커를 마커 배열에 추가합니다
        closedRestaurantMarkers.push(marker);
    }     
}

// 오늘 마감 휴게음식점 마커를 생성하고 오늘 마감 휴게음식점 마커 배열에 추가하는 함수입니다
function createClosedCafeMarkers() {
    for (var i = 0; i < closedCafePositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 2),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(closedMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(closedCafePositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        closedCafeMarkers.push(marker);    
    }        
}

// 오늘 마감 병원 마커를 생성하고 오늘 마감 병원 마커 배열에 추가하는 함수입니다
function createClosedHospitalMarkers() {
    for (var i = 0; i < closedHospitalPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 85),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(closedMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(closedHospitalPositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        closedHospitalMarkers.push(marker);        
    }                
}

// 오늘 휴무 식당 마커를 생성하고 오늘 휴무 식당 마커 배열에 추가하는 함수입니다
function createTodayClosedRestaurantMarkers() {
    
    for (var i = 0; i < todayClosedRestaurantPositions.length; i++) {  
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(0, 45),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(holidayMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(todayClosedRestaurantPositions[i], markerImage);  
        
        // 생성된 마커를 마커 배열에 추가합니다
        todayClosedRestaurantMarkers.push(marker);
    }     
}

// 오늘 휴무 휴게음식점 마커를 생성하고 오늘 휴무 휴게음식점 마커 배열에 추가하는 함수입니다
function createTodayClosedCafeMarkers() {
    for (var i = 0; i < todyClosedCafePositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 2),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(holidayMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(todyClosedCafePositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        todayClosedCafeMarkers.push(marker);    
    }        
}

// 오늘 휴무 병원 마커를 생성하고 오늘 휴무 병원 마커 배열에 추가하는 함수입니다
function createTodayClosedHospitalMarkers() {
    for (var i = 0; i < todayClosedHospitalPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 85),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(holidayMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(todayClosedHospitalPositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        todayClosedHospitalMarkers.push(marker);        
    }                
}

// 영업중 식당 마커를 생성하고 영업중 식당 마커 배열에 추가하는 함수입니다
function createOpenedRestaurantMarkers() {
    
    for (var i = 0; i < openedRestaurantPositions.length; i++) {  
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(0, 45),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(opendMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(openedRestaurantPositions[i], markerImage);  
        
        // 생성된 마커를 마커 배열에 추가합니다
        openedRestaurantMarkers.push(marker);
    }     
}

// 영업중 휴게음식점 마커를 생성하고 영업중 휴게음식점 마커 배열에 추가하는 함수입니다
function createOpenedCafeMarkers() {
    for (var i = 0; i < openedCafePositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 44),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 2),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(opendMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(openedCafePositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        openedCafeMarkers.push(marker);    
    }     
}

// 영업중 병원 마커를 생성하고 영업중 병원 마커 배열에 추가하는 함수입니다
function createOpenedHospitalMarkers() {
    for (var i = 0; i < openedHospitalPositions.length; i++) {
        
        var imageSize = new kakao.maps.Size(35, 80),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 85),    
                spriteSize: new kakao.maps.Size(36, 133)  
            };       
     
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(opendMarkerImageSrc, imageSize, imageOptions),    
            marker = createMarker(openedHospitalPositions[i], markerImage);  

        // 생성된 마커를 마커 배열에 추가합니다
        openedHospitalMarkers.push(marker);        
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
