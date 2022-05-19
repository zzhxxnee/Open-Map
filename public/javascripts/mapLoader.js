
const infowindow = new kakao.maps.InfoWindow({zIndex:1});

const closedMarkerImageSrc = "/images/closed.png";  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
const holidayMarkerImageSrc = "/images/holiday.png";
const opendMarkerImageSrc = "/images/open.png";
let restaurantMarkers = []; // 커피숍 마커 객체를 가지고 있을 배열입니다
let cafeMarkers = []; // 편의점 마커 객체를 가지고 있을 배열입니다
let hospitalkMarkers = []; // 주차장 마커 객체를 가지고 있을 배열입니다

function setCenter() {            
    // 이동할 위도 경도 위치를 생성합니다 
    navigator.geolocation.watchPosition((position) => {
        const moveLatLon = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(moveLatLon);
      });
}


const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

setCenter();

// 지도를 생성합니다    
const map = new kakao.maps.Map(mapContainer, mapOption); 

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

