﻿//创建数据库对象
var objdbConn= new ActiveXObject("ADODB.Connection"); 
// DSN字符串
var strdsn = "Driver={SQL Server};Server=127.0.0.1;Database=anfang_sql;UID=sa;PWD=FFFjjj999";


function my_get_myinfo(leixing,jingdu,weidu){
//	alert(leixing + jingdu.toString() + weidu.toString());
	// 打开数据源
	objdbConn.Open(strdsn);
	// 执行SQL的数据库查询
	if(leixing.indexOf("xiaofangshuan")>=0){ //消防栓
		var objrs = objdbConn.Execute("select * from t_gdd where jingdu like '%"+ jingdu.toString() +"%' and weidu like '%"+ weidu.toString() +"%' ");
	}
	if(leixing.indexOf("shuiyuan")>=0){ //水源
		var objrs = objdbConn.Execute("select * from t_shuiyuan  where jingdu like '%"+ jingdu.toString() +"%' and weidu like '%"+ weidu.toString() +"%' ");
	}
	if(leixing.indexOf("danwei")>=0){ //重点单位
		var objrs = objdbConn.Execute("select * from t_danwei  where jingdu like '%"+ jingdu.toString() +"%' and weidu like '%"+ weidu.toString() +"%' ");
	}
	
	// 获取字段数目
	var fdCount = objrs.Fields.Count - 1;	
	// 检查是否有记录
	if (!objrs.EOF){
//		alert(objrs.Fields(0).name + objrs.Fields(0).value);
		var map_zoom = map.getZoom();
		var poi = new BMap.Point(jingdu,weidu);
		
		var wendang=objrs.Fields(16).value;
		map.centerAndZoom(poi, map_zoom);
		map.enableScrollWheelZoom();
		
		//searchInfoWindow.open(marker);
		document.getElementById("jingdu").value = "";
		document.getElementById("weidu").value = "";
		
		var l_yanse="";
		var l_tupian="";
		if(objrs.Fields(11).value==0){
			l_yanse="FF0000";
			l_tupian="http://photo2.bababian.com/upload7/20160125/9B3BC4D5283B2510851E3B56D88A8AF1_240.jpg";
		}
		if(objrs.Fields(11).value>0 || objrs.Fields(11).value<1.5){
			l_yanse="0000FF";
			l_tupian="http://photo2.bababian.com/upload7/20160125/F4FAFC987DD0806862D4A428E3FDD25F_240.jpg";
		}
		if(objrs.Fields(11).value>=1.5){
			l_yanse="FF0000";
			l_tupian="http://photo2.bababian.com/upload7/20160125/56A3A493FA5D61B431B5242839E8E903_240.jpg";
		}
		var l_shuiya="";
		if(objrs.Fields(11).value==null){
			l_shuiya=""
		}else{
			l_shuiya=objrs.Fields(11).value.toString();
		}
	
		
		if(leixing.indexOf("danwei")>=0){ //重点单位
			var infoWindow = new BMap.InfoWindow("<form id='x'><br /><div style='line-height:1.8em;font-size:12px;'><b>名称:</b>"+ objrs.Fields(2).value +"</br><div style='border-top:1px dashed #8de376'></div><b>地址:</b>"+objrs.Fields(5).value+"</br><b>电话:</b>"+ objrs.Fields(9).value +"<p style='border-top:1px dashed #9b9b9b;margin: 2px;'></p>选择消防车:<br /><label><input type='radio' name='xiaofangche' value='wj6668x'  />WJ浙6668X</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><input type='radio' name='xiaofangche' value='wj6667x'  />WJ浙6667X</label><br /><label><input type='radio' name='xiaofangche' value='wj6665x'  />WJ浙6665X</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='xiaofangche' value='wj6651x'  />WJ浙6651X</label><br /><input type='button' onclick='checkRadio("+jingdu.toString()+","+weidu.toString()+");' value='到这里去' /><p style='border-top:1px dashed #9b9b9b;margin: 2px;'></p><input type='button' value='消防预案' onClick='openwendang();'/>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='视频监控' onClick='shipin();' /></div></form>");
		}
		if(leixing.indexOf("xiaofangshuan")>=0){ //消防栓
			var infoWindow = new BMap.InfoWindow("<form id='x'><div style='width=400px;'><div style='line-height:1.8em;font-size:12px;'><b>名称:</b>"+objrs.Fields(2).value+"</br></div><div style='border-top:1px dashed #8de376;width=400px;'></div><div style='margin:0;line-height:20px;padding:2px;'><img src='"+l_tupian + "' alt='' style='float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;'/><span style='font-size:12px;'>地址："+objrs.Fields(5).value+"<br/>电话："+objrs.Fields(4).value+"<br/>流量："+ objrs.Fields(20).value +"</span><br/><font color='#"+l_yanse+"' size=3>"+l_shuiya+"MPa</font></div><span style='border-top:1px dashed #9b9b9b'></span><div>选择消防车:<br /><label><input type='radio' name='xiaofangche' value='wj6668x'  />WJ浙6668X</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><input type='radio' name='xiaofangche' value='wj6667x'  />WJ浙6667X</label><br /><label><input type='radio' name='xiaofangche' value='wj6665x'  />WJ浙6665X</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='xiaofangche' value='wj6651x'  />WJ浙6651X</label><br /><input type='button' onclick='checkRadio("+jingdu.toString()+","+weidu.toString()+");' value='到这里去' /></div></form>")
		}
		if(leixing.indexOf("shuiyuan")>=0){ //水源
			var infoWindow = new BMap.InfoWindow("<form id='x'><div style='line-height:1.8em;font-size:12px;'><b>名称:</b>"+objrs.Fields(2).value+"</br><div style='border-top:1px dashed #8de376'></div><b>地址:</b>"+ objrs.Fields(5).value+"</br><b>电话:</b>"+objrs.Fields(4).value+"</br><font color='#"+l_yanse+"' size=3><b>水深:</b>"+l_shuiya+"M</font><p style='border-top:1px dashed #9b9b9b'></p>选择消防车:<br /><label><input type='radio' name='xiaofangche' value='wj6668x'  />WJ浙6668X</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><input type='radio' name='xiaofangche' value='wj6667x'  />WJ浙6667X</label><br /><label><input type='radio' name='xiaofangche' value='wj6665x'  />WJ浙6665X</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='xiaofangche' value='wj6651x'  />WJ浙6651X</label><br /><input type='button' onclick='checkRadio("+jingdu.toString()+","+weidu.toString()+");' value='到这里去' /></div></form>");
		}
		
		
		map.openInfoWindow(infoWindow,poi);
	}

	objrs.Close(); // 关闭记录集合
	objdbConn.Close(); // 关闭数据库链接
}

function checkRadio(arg_jingdu,arg_weidu) {
	
	var allOverlay = map.getOverlays();
	
	var inputs = document.getElementsByName("xiaofangche");
	var che_checked="";
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type === "radio" && inputs[i].checked) {
			che_checked=inputs[i].value;
		}
	}
	//alert(che_checked);
	var chepai_now=che_checked+"_now";
	var che_jingweidu=document.getElementById(chepai_now).value;
	if(che_jingweidu !=""){
		var che_jingweidu_arr=che_jingweidu.split(",");
		var start_che=new BMap.Point(Number(che_jingweidu_arr[0]),Number(che_jingweidu_arr[1]));
		//var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
		//driving.search(start_che, poi);
		document.getElementById(che_checked+"_daohang").value=String(start_che.lng)+","+String(start_che.lat)+","+arg_jingdu+","+arg_weidu;
		//alert(document.getElementById(che_checked+"_daohang").value);
		//alert(che_checked);
		
		//删除地图上所有的导航信息，重新建立
		var allOverlay = map.getOverlays();

		for(var i=0; i < allOverlay.length ; i++) {
			
			if (allOverlay[i] instanceof BMap.Polyline){
				if(allOverlay[i].getStrokeWeight()!=2){
					map.removeOverlay(allOverlay[i]);
				}
//				alert(allOverlay[i].getStrokeWeight());
		
			}
		}
		//创建6667X的导航
		var daohang=document.getElementById("wj6667x_daohang").value;
		if(daohang!=""){
			var daohang_arr=daohang.split(",");
			var p1=new BMap.Point(Number(daohang_arr[0]),Number(daohang_arr[1]));
			var p2=new BMap.Point(Number(daohang_arr[2]),Number(daohang_arr[3]));
			var driving_1 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false,enableDragging:true}});
			driving_1.search(p1,p2);
		}
		//创建6668X的导航
		var daohang=document.getElementById("wj6668x_daohang").value;
		if(daohang!=""){
			var daohang_arr=daohang.split(",");
			var p1=new BMap.Point(Number(daohang_arr[0]),Number(daohang_arr[1]));
			var p2=new BMap.Point(Number(daohang_arr[2]),Number(daohang_arr[3]));
			var driving_2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false,enableDragging:true}});
			driving_2.search(p1,p2);
		}
		//创建6665X的导航
		var daohang=document.getElementById("wj6665x_daohang").value;
		if(daohang!=""){
			var daohang_arr=daohang.split(",");
			var p1=new BMap.Point(Number(daohang_arr[0]),Number(daohang_arr[1]));
			var p2=new BMap.Point(Number(daohang_arr[2]),Number(daohang_arr[3]));
			var driving_3 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false,enableDragging:true}});
			driving_3.search(p1,p2);
		}
		//创建6651X的导航
		var daohang=document.getElementById("wj6651x_daohang").value;
		if(daohang!=""){
			var daohang_arr=daohang.split(",");
			var p1=new BMap.Point(Number(daohang_arr[0]),Number(daohang_arr[1]));
			var p2=new BMap.Point(Number(daohang_arr[2]),Number(daohang_arr[3]));
			var driving_4 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false,enableDragging:true}});
			driving_4.search(p1,p2);
		}
		
		
		
	}
	else
	{
		alert(che_checked.toUpperCase()+"还没有出现在地图上。请稍等或者选择其他的车辆信息");	
		
	}

}

function shipin(){
	alert("此功能正在拼命开发中，敬请期待。。。");
}