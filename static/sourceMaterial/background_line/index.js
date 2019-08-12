$(function(){
	$(".container").jParticle({
		background: "rgba(0,0,0,0)",//背景颜色
		color: "#808080",//粒子和连线的颜色
		particlesNumber:100,//粒子数量
		//disableLinks:true,//禁止粒子间连线
		//disableMouse:true,//禁止粒子间连线(鼠标)
		particle: {
			minSize: 1,//最小粒子
			maxSize: 3,//最大粒子
			speed: 30,//粒子的动画速度
		 }
	});
});