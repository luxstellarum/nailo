$(document).ready(function(){
	var lat;
	var lon;
	$('#btn123').click(function(){
		var adr = $('#adr').val();
		$.ajax({
			url: "/map/get_point"
			, dataType :"json"
			, data : { 'location' : adr}
			, type:'POST'
			, success: function(data){
				console.log('x : ', data.x);
				console.log('y : ', data.y);
				lat = data.x;
				lon = data.y;						
				draw_map(lon, lat);
			}
			, error : function (jqXHR, textStatus, errorThrown) {
				alert( textStatus + ", " + errorThrown );
			}
		}); // end of ajax
	 }); // end of click _ btn123		
});		// end of ready
	
function draw_map(lat, lon) {
	var oPoint = new nhn.api.map.LatLng(lat, lon);
	var defaultLevel = 11;
	
	$('#map').html(" ");
	var oMap = new nhn.api.map.Map(document.getElementById('map'), { 
					point : oPoint,
					zoom : defaultLevel,
					enableWheelZoom : true,
					enableDragPan : true,
					enableDblClickZoom : false,
					mapMode : 0,
					activateTrafficMap : false,
					activateBicycleMap : false,
					minMaxLevel : [ 1, 14 ],
					size : new nhn.api.map.Size(480, 600)		});
	var oSlider = new nhn.api.map.ZoomControl();
	oMap.addControl(oSlider);
	oSlider.setPosition({
		top : 10,
		left : 10
	});

	var oMapTypeBtn = new nhn.api.map.MapTypeBtn();
	oMap.addControl(oMapTypeBtn);
	oMapTypeBtn.setPosition({
		bottom : 10,
		right : 80
	});
	
	var oThemeMapBtn = new nhn.api.map.ThemeMapBtn();
	oThemeMapBtn.setPosition({
		bottom : 10,
		right : 10
	});
	oMap.addControl(oThemeMapBtn);
	
	var oSize = new nhn.api.map.Size(28, 37);
	var oOffset = new nhn.api.map.Size(14, 37);
	var oIcon = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);

	var oInfoWnd = new nhn.api.map.InfoWindow();
	oInfoWnd.setVisible(false);
	oMap.addOverlay(oInfoWnd);

	oInfoWnd.setPosition({
		top : 20,
		left :20
	});

	var oMarker = new nhn.api.map.Marker(oIcon);
	oMarker.setPoint(oPoint);
	oMap.addOverlay(oMarker);
	var oLabel = new nhn.api.map.MarkerLabel(); // - 마커 라벨 선언.
	oMap.addOverlay(oLabel); // - 마커 라벨 지도에 추가. 기본은 라벨이 보이지 않는 상태로 추가됨.
	oLabel.setVisible(true,oMarker);

	oInfoWnd.attach('changeVisible', function(oCustomEvent) {
		if (oCustomEvent.visible) {
			oLabel.setVisible(false);
		}
	});
		
	oMap.attach('click', function(oCustomEvent) {
		var oPoint = oCustomEvent.point;
		var oTarget = oCustomEvent.target;
		oInfoWnd.setVisible(false);
		// 마커 클릭하면
		if (oTarget instanceof nhn.api.map.Marker) {
			// 겹침 마커 클릭한거면
			if (oCustomEvent.clickCoveredMarker) {
				return;
			}
			// - InfoWindow 에 들어갈 내용은 setContent 로 자유롭게 넣을 수 있습니다. 외부 css를 이용할 수 있으며, 
			// - 외부 css에 선언된 class를 이용하면 해당 class의 스타일을 바로 적용할 수 있습니다.
			// - 단, DIV 의 position style 은 absolute 가 되면 안되며, 
			// - absolute 의 경우 autoPosition 이 동작하지 않습니다. 
			oInfoWnd.setContent('<DIV style="border-top:1px solid; border-bottom:2px groove black; border-left:1px solid; border-right:2px groove black;margin-bottom:1px;color:black;background-color:white; width:auto; height:auto;">'+
				'<span style="color: #000000 !important;display: inline-block;font-size: 12px !important;font-weight: bold !important;letter-spacing: -1px !important;white-space: nowrap !important; padding: 2px 5px 2px 2px !important">' + 
				'<br />' + oTarget.getPoint()
				+'<span></div>');
			oInfoWnd.setPoint(oTarget.getPoint());
			oInfoWnd.setPosition({right : 15, top : 30});
			oInfoWnd.setVisible(true);
			oInfoWnd.autoPosition();
			return;
		}

	});	
}			// end of draw_map function


function search_address(){
	f3b15e153924330a909453a056312aee
}
