// 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
function changeMarker(type){
    
    var restaurantMenu = document.getElementById('restaurantMenu');
    var cafeMenu = document.getElementById('cafeMenu');
    var hospitalMenu = document.getElementById('hospitalMenu');
    var none = document.getElementById('none');
    
    // 식당 카테고리가 클릭됐을 때
    if (type === 'restaurant') {

        removeAllChildNods(listEl);
        removeMarker();
    
        // 식당 카테고리를 선택된 스타일로 변경하고
        restaurantMenu.className = 'menu_selected';
        
        // 다른 카테고리는 선택되지 않은 스타일로 바꿉니다
        cafeMenu.className = '';
        hospitalMenu.className = '';
        
        // 식당 마커들만 지도에 표시하도록 설정합니다
        createClosedRestaurantMarkers(); 
        setClosedRestaurantMarkers(map);
        createTodayClosedRestaurantMarkers();
        setTodayClosedRestaurantMarkers(map);
        createOpenedRestaurantMarkers();
        setOpenedRestaurantMarkers(map);
        
    } else if (type === 'cafe') { // 카페 카테고리가 클릭됐을 때

        removeAllChildNods(listEl);
        removeMarker();
    
        // 카페 카테고리를 선택된 스타일로 변경하고
        restaurantMenu.className = '';
        cafeMenu.className = 'menu_selected';
        hospitalMenu.className = '';
        
        //카페 마커들만 지도에 표시하도록 설정합니다
        createClosedCafeMarkers();
        setClosedCafeMarkers(map);
        createTodayClosedCafeMarkers();
        setTodayClosedCafeMarkers(map);
        createOpenedCafeMarkers();
        setOpenedCafeMarkers(map);
        
    } else if (type === 'hospital') { // 병원 카테고리가 클릭됐을 때

        removeAllChildNods(listEl);
        removeMarker();
     
        // 병원 카테고리를 선택된 스타일로 변경하고
        restaurantMenu.className = '';
        cafeMenu.className = '';
        hospitalMenu.className = 'menu_selected';
        
        // 병원 마커들만 지도에 표시하도록 설정합니다
        createClosedHospitalMarkers();
        setClosedHospitalMarkers(map);
        createTodayClosedHospitalMarkers();
        setTodayClosedHospitalMarkers(map);
        createOpenedHospitalMarkers();
        setOpenedHospitalMarkers(map);
    }else if (type === 'none'){

        removeAllChildNods(listEl);
        removeMarker();

        restaurantMenu.className = '';
        cafeMenu.className = '';
        hospitalMenu.className = '';

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