<!--  -->
<template>
<div class="about2" :style="backgroundStyle">
	<div class="wrapper clearfix-time">
		<div class="tit">
			<!-- <h6 class="f12">时间线</h6> -->
			<h5 class="f24">故事还在继续...</h5>
		</div>
		<ul class="clearfix-time">
			<li>
				<h4 class="f30" @mouseover="mouseOver(2020)" @mouseout="mouseOut()">2020</h4>
				<span class="span">Jay.</span>
				<p class="f14">君不见黄河之水天上来</p>
			</li>
			<li>
				<h4 class="f30">2006 年-2015年</h4>
				<span class="span">Jay.</span>
				<p class="f14">高堂明镜悲白发</p>
			</li>
			<li>
				<h4 class="f30">2016年</h4>
				<p class="f14">朝露青丝暮成雪</p>
			</li>
			<li>
				<h4 class="f30">2016年12月</h4>
				<p class="f14">仰天大笑出门去</p>
			</li>
			<li>
				<h4 class="f30">2017年6月</h4>
				<p class="f14">我辈岂是蓬蒿人</p>
			</li>
			<li>
				<h4 class="f30">2018年6月</h4>
				<p class="f14">天生我材必有用</p>
			</li>
			<li>
				<h4 class="f30" @mouseover="mouseOver(2020)" @mouseout="mouseOut()">2018年9月</h4>
				<p class="f14">千金散尽还复来 </p>
			</li>
			<li>
				<h4 class="f30">2019年6月</h4>
				<p class="f14">将进酒，杯莫停</p>
			</li>
		</ul>
		<div class="future" >12456</div>
	</div>
</div>
</template>

<script>
export default {
data () {
return {

    backgroundStyle: {
		//backgroundImage: "url('~@/assets/img/mac_pic.jpg')",
        backgroundImage: "url(" + require("../../../assets/img/mac_pic.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "157% 22%",
        backgroundAttachment: "",
        //backgroundSize: "25px auto",
        //marginTop: "5px",
        //opacity: "0.9",
        //-moz-background-size:"100% 100%",
        backgroundSize:"61% 76%"
        },
};
},

components: {},

computed: {},

mounted() {
    console.log('123');
    
},

methods: {
    mouseOver(year){
        console.log(year)
        this.backgroundStyle.backgroundImage = "url(" + require("../../../assets/img/originBackground.jpg") + ")";
        this.backgroundStyle.backgroundPosition = "top center";
        this.backgroundStyle.backgroundSize = "70%";
        //this.backgroundStyle.backgroundAttachment = fixed;
    },
    mouseOut(){
        this.backgroundStyle.backgroundImage = "url(" + require("../../../assets/img/mac_pic.jpg") + ")";
        this.backgroundStyle.backgroundPosition = "200% 22%";
        this.backgroundStyle.backgroundSize = "76% 76%"
    }
}
}

</script>
<style lang='scss' scoped>
//清除所有元素的脏边距 *{margin:0; padding:0;}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td,img,area,param{margin:0;padding:0}
//宽度设置为76.4让时间轴处于黄金分隔 不愧是我
body{font-size:12px}.wrapper{box-sizing:border-box;width:76.4%;margin:auto;}
html[xmlns] .clearfix-time{display:block}
body{font-size:12px}
th{font-style:normal;font-weight:400}
//h1,h2,h3,h4,h5,h6继承 body 的font-size并设置400（normal）的粗细
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}
//列表项目样式为不使用项目符号
ol,ul{padding-left:0;list-style:none}

.clearfix-time{display:block;zoom:1;margin-left: 0;}
//:after 伪元素在元素之后添加内容  	clear:both=>在左右两侧均不允许浮动元素。
.clearfix-time:after{content:'\20';display:block;clear:both;visibility:hidden;line-height:0;height:0}

.f12{font-size:12px}
.f30{font-size:30px}
.f24{font-size:24px}
.f14{font-size:14px}

.about2{padding-bottom:80px;padding-top: 15px;}
.about2 .tit{text-align:center;margin-bottom: 15px;}
//	背景图像将在垂直方向重复并居中
.about2 ul{background:url(../../../assets/img/sy51.png) repeat-y center }

.about2 .tit h6{color:#666}
.about2 .tit h5{color:#333}


.about2 li:before{background:url(../../../assets/img/sy50.png) no-repeat center center;left:-68px;top:12px;content:"";display:block;position:absolute;width:17px;height:17px}
//鼠标hover到h4元素的时候  transform:translateY 基点在元素心点 y轴向上移动  transition 动画过度皆为1s
.about2 li h4:hover{color:#f8f8f8;transition:all 1s;transform:translateY(-15px)}
//uppercase 定义仅有大写字母。
.about2 li h4{position:relative;display:block;text-decoration:none;font-family:lato;color:#ecf0f1;text-transform:uppercase;padding:4px 0;transition:.5s}
//定义 元素只在X轴(水平方向)缩放元素，通过transform-origin来改变元素的基点为right(就底下的蓝线)
.about2 li h4::after{position:absolute;content:"";width:100%;height:1px;top:100%;left:0;background:#3498db;transition:transform .5s;transform:scaleX(0);transform-origin:right}
.about2 li h4:hover{color:#95a5a6}
.about2 li h4:hover::after{transform:scaleX(1);transform-origin:left}
.about2 li:nth-child(2n):before{background:url(../../../assets/img/sy50.png) no-repeat center center;right:-69px;top:12px;left:auto;content:"";display:block;position:absolute;width:17px;height:17px}
.about2 li h4{color:#333;transition:all 1s}
.about2 li p{color:#666;margin-top:10px;height:60px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3}

.future{text-align:center;color:#999;font-size:12px;margin-top:17px;height: 100px;}
.about2 li:nth-child(1){margin-top:0}
.about2 li{float:right;width:45%;text-align:left;position:relative;margin-top:100px}
.about2 li:nth-child(2n){float:left;text-align:right;margin-top:90px}

.span{display: inline-block;color: green;font-size: 20px;}
</style>