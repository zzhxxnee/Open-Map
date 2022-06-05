function setOverlay(place, marker){
    let img;

    if(place.image){
        async () => {
            const res = await axios.get("http://localhost:3000/");
            let buff = new Buffer(res.data.images[0], "base64");
            let text = buff.toString("ascii");
            img = `data:image/png;base64,${text}`;
        };
    }else{
        img = '//localhost:3000/images/baseimg.jpg'
    }

    if(place.type == 'cr'){
        
        let closeTime = Math.floor((place.restClosed)/100);
        if(closeTime > 24){
            closeTime -= 24;
            closeTime = '익일 ' + closeTime;
        }
    
        itemStr = '<div class="wrap">' + 
    '    <div class="info">' + 
    '        <div class="title">' 
                + place.compName + 
    '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
    '        </div>' + 
    '        <div class="body">' + 
    '            <div class="img">' +
    `                <img src=${img} width="73" height="70">` +
    '           </div>' + 
    '            <div class="desc">' + 
                    place.address +
    '            </div>' + 
    '            <div class="desc">' + 
                    place.tel +
    '            </div>' +
    '            <span class="desc">' + 
                    Math.floor((place.restOpen)/100) + ':'+ ((place.restOpen)%100 == 0 ? '00' : (place.restOpen)%100) +
    '            </span>' + 
    '            <span class="desc"> ~ ' + 
                    closeTime  + ':'+ ((place.restClosed)%100 == 0 ? '00' : (place.restClosed)%100) +
    '            </span>' + 
    '            <span class="desc"> 마감 </span>' + 
    '            <div><button class="menu">메뉴판 보기</a></div>' + 
    '        </div>' + 
    '    </div>' +    
    '</div>';
    }else if(place.type == 'cc'){

        let closeTime = Math.floor((place.cafeClosed)/100);
        if(closeTime > 24){
            closeTime -= 24;
            closeTime = '익일 ' + closeTime;
        }

        itemStr = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' 
                    + place.compName + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        `                <img src=${img} width="73" height="70">` +
        '           </div>' + 
        '            <div class="desc">' + 
                        place.cafeType +
        '            </div>' +
        '            <div class="desc">' + 
                        place.address +
        '            </div>' + 
        '            <div class="desc">' + 
                        place.tel +
        '            </div>' +
        '            <span class="desc">' + 
                        Math.floor((place.cafeOpen)/100)+ ':'+ ((place.cafeOpen)%100 == 0 ? '00' : (place.cafeOpen)%100) +
        '            </span>' + 
        '            <span class="desc"> ~ ' + 
                        closeTime  + ':'+ ((place.cafeClosed)%100 == 0 ? '00' : (place.cafeClosed)%100) +
        '            </span>' + 
        '            <span class="desc"> 마감 </span>' + 
        '            <div><button class="menu">메뉴판 보기</button></div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>';
    }else if(place.type == 'ch'){

        let closeTime = Math.floor((place.hospitalClosed)/100);
        if(closeTime > 24){
            closeTime -= 24;
            closeTime = '익일 ' + closeTime;
        }

        itemStr = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' 
                    + place.compName + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        `                <img src=${img} width="73" height="70">` +
        '           </div>' + 
        '            <div class="desc">' + 
                        place.HospType +
        '            </div>' +
        '            <div class="desc">' + 
                        place.address +
        '            </div>' + 
        '            <div class="desc">' + 
                        place.tel +
        '            </div>' +
        '            <span class="desc">' + 
                        Math.floor((place.hospitalOpen)/100) + ':'+ ((place.hospitalOpen)%100 == 0 ? '00' : (place.hospitalOpen)%100) +
        '            </span>' + 
        '            <span class="desc"> ~ ' + 
                        closeTime + ':'+ ((place.hospitalClosed)%100 == 0 ? '00' : (place.hospitalClosed)%100) +
        '            </span>' + 
        '            <span class="desc"> 마감 </span>' +
        '            <div class="desc">' + 
                        place.content +
        '            </div>' +
        '        </div>' + 
        '    </div>' +    
        '</div>';
    }else if(place.type == 'tcr'){
        itemStr = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' 
                    + place.compName + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        `                <img src=${img} width="73" height="70">` +
        '           </div>' + 
        '            <div class="desc">' + 
                        place.address +
        '            </div>' + 
        '            <div class="desc">' + 
                        place.tel +
        '            </div>' +
        '            <span class="desc"> 오늘 휴무 </span>' + 
        '            <div><button class="menu">메뉴판 보기</button></div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>';
    }else if(place.type == 'tcc'){
        itemStr = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' 
                    + place.compName + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        `                <img src=${img} width="73" height="70">` +
        '           </div>' + 
        '            <div class="desc">' + 
                        place.cafeType +
        '            </div>' +
        '            <div class="desc">' + 
                        place.address +
        '            </div>' + 
        '            <div class="desc">' + 
                        place.tel +
        '            </div>' +
        '            <span class="desc"> 오늘 휴무 </span>' + 
        '            <div><button class="menu">메뉴판 보기</button></div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>';
    }else if(place.type == 'tch'){
        itemStr = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' 
                    + place.compName + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        `                <img src=${img} width="73" height="70">` +
        '           </div>' + 
        '            <div class="desc">' + 
                        place.HospType +
        '            </div>' +
        '            <div class="desc">' + 
                        place.address +
        '            </div>' + 
        '            <div class="desc">' + 
                        place.tel +
        '            </div>' +
        '            <span class="desc"> 오늘 휴무 </span>' +
        '            <div class="desc">' + 
                        place.content +
        '            </div>' +
        '        </div>' + 
        '    </div>' +    
        '</div>';
    }else if(place.type == 'or'){

        let closeTime = Math.floor((place.restClosed)/100);
        if(closeTime > 24){
            closeTime -= 24;
            closeTime = '익일 ' + closeTime;
        }

        itemStr = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' 
                    + place.compName + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        `                <img src=${img} width="73" height="70">` +
        '           </div>' + 
        '            <div class="desc">' + 
                        place.address +
        '            </div>' + 
        '            <div class="desc">' + 
                        place.tel +
        '            </div>' +
        '            <span class="desc">' + 
                        Math.floor((place.restOpen)/100) + ':'+ ((place.restOpen)%100 == 0 ? '00' : (place.restOpen)%100) +
        '            </span>' + 
        '            <span class="desc"> ~ ' + 
                        closeTime  + ':'+ ((place.restClosed)%100 == 0 ? '00' : (place.restClosed)%100) +
        '            </span>' + 
        '            <span class="desc"> 영업중 </span>' + 
        '            <div><button class="menu">메뉴판 보기</button></div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>';
    }else if(place.type == 'oc'){

        let closeTime = Math.floor((place.cafeClosed)/100);
        if(closeTime > 24){
            closeTime -= 24;
            closeTime = '익일 ' + closeTime;
        }

        itemStr = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' 
                    + place.compName + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        `                <img src=${img} width="73" height="70">` +
        '           </div>' + 
        '            <div class="desc">' + 
                        place.cafeType +
        '            </div>' +
        '            <div class="desc">' + 
                        place.address +
        '            </div>' + 
        '            <div class="desc">' + 
                        place.tel +
        '            </div>' +
        '            <span class="desc">' + 
                        Math.floor((place.cafeOpen)/100) + ':'+ ((place.cafeOpen)%100 == 0 ? '00' : (place.cafeOpen)%100) +
        '            </span>' + 
        '            <span class="desc"> ~ ' + 
                        closeTime  + ':'+ ((place.cafeClosed)%100 == 0 ? '00' : (place.cafeClosed)%100) +
        '            </span>' + 
        '            <span class="desc"> 영업중 </span>' + 
        '            <div><button class="menu">메뉴판 보기</button></div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>';
    }else if(place.type == 'oh'){

        let closeTime = Math.floor((place.hospitalClosed)/100);
        if(closeTime > 24){
            closeTime -= 24;
            closeTime = '익일 ' + closeTime;
        }

        itemStr = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' 
                    + place.compName + 
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
        '        </div>' + 
        '        <div class="body">' + 
        '            <div class="img">' +
        `                <img src=${img} width="73" height="70">` +
        '           </div>' + 
        '            <div class="desc">' + 
                        place.HospType +
        '            </div>' +
        '            <div class="desc">' + 
                        place.address +
        '            </div>' + 
        '            <div class="desc">' + 
                        place.tel +
        '            </div>' +
        '            <span class="desc">' + 
                        Math.floor((place.hospitalOpen)/100) + ':'+ ((place.hospitalOpen)%100 == 0 ? '00' : (place.hospitalOpen)%100) +
        '            </span>' + 
        '            <span class="desc"> ~ ' + 
                        closeTime  + ':'+ ((place.hospitalClosed)%100 == 0 ? '00' : (place.hospitalClosed)%100) +
        '            </span>' + 
        '            <span class="desc"> 영업중 </span>' +
        '            <div class="desc">' + 
                        place.content +
        '            </div>' +
        '        </div>' + 
        '    </div>' +    
        '</div>';
    }

    const overlayContent = new kakao.maps.CustomOverlay({
        content: itemStr,
        map: map,
        position: marker.getPosition()       
    });

    return overlayContent;
}