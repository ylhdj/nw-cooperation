let con=document.getElementById('content')
let items=document.getElementsByClassName('img-item');
let arrI=[5,1,2,3,4,5,1]
let btns=document.getElementsByClassName('btn')

// 准备工作
function prepare(){
    window.w = document.documentElement.clientWidth || document.body.clientWidth
    window.d=window.w*0.99
    // window.arrT=[-d,0,d,2*d,3*d,4*d,5*d]
}
prepare()
window.positionD=1
window.boolD=true;

// 定义类
class ImgItem{
    constructor(){
        // this.a=1
    }
    drag(before,now){ // 接收起始位置与当前位置
        let distance=now-before;
        for(let i=0;i<7;i++){
            // console.log((i-window.positionD)*window.d-distance)
            items[i].style.transform='translateX('+((i-window.positionD)*window.d+distance)+'px)'
        }
        
    }
    return(){ 
        for(let i=0;i<7;i++){
            // 设置动画属性
            // items[i].style.transition='transform 0.5s'
            items[i].className='img-item item-5 transition'
            // 恢复默认translate值
            items[i].style.transform='translateX('+(i-window.positionD)*window.d+'px)'

            items[i].onmousedown=null
        }
        // 删除动画属性
        setTimeout(function(){
            for(let i=0;i<7;i++){
                items[i].className='img-item item-5'
                items[i].onmousedown=down;
            }
        },500)  
    }
    toggle(one){ // 接收1或-1
        // 改变按钮样式

        for(let i=0;i<7;i++){
            // 设置动画属性
            // items[i].style.transition='transform 0.5s'
            items[i].className='img-item item-5 transition'
            // 恢复默认translate值
            items[i].style.transform='translateX('+(i-window.positionD+one)*window.d+'px)'

            items[i].onmousedown=null
        }
        window.positionD-=one
        change()
        // 删除动画属性
        setTimeout(function(){
            for(let i=0;i<7;i++){
                items[i].className='img-item item-5'
                items[i].onmousedown=down;
            }
        },500)  
        setTimeout(function(){
            // 判断是否需要切换  0或6需要切换  0切换 换到5  6切换 换到1
            if(window.positionD==0){
                window.boolD=false
                window.positionD=5
                for(let i=0;i<7;i++){
                    items[i].style.transform='translateX('+(i-window.positionD)*window.d+'px)'
                }
            }else if(window.positionD==6){
                window.boolD=true
                window.positionD=1
                for(let i=0;i<7;i++){
                    items[i].style.transform='translateX('+(i-window.positionD)*window.d+'px)'
                }
            }else{

            }
        },600) 
    }

    // clickToggle(num){ // 接收被点击按钮的位置
    //     // 设置动画属性
    // }

    autoToggle(){
        window.positionD++
        for(let i=0;i<7;i++){
            items[i].style.transform='translateX('+(i-window.positionD)*window.d+'px)'
        }
        // 判断是否需要切换  0或6需要切换  0切换 换到5  6切换 换到1
        if(window.positionD==0){
            window.boolD=false
            window.positionD=5
            for(let i=0;i<7;i++){
                items[i].style.transform='translateX('+(i-window.positionD)*window.d+'px)'
            }
        }else if(window.positionD==6){
            window.boolD=true
            window.positionD=1
            for(let i=0;i<7;i++){
                items[i].style.transform='translateX('+(i-window.positionD)*window.d+'px)'
            }
        }else{

        }
        change()
    }
}

// 鼠标按下函数
function down(e){
    // 获取起始鼠标的位置
    window.before=e.screenX;
    // 绑定move和up事件
    for(let i=0;i<7;i++){
        items[i].onmousemove=move
        items[i].onmouseup=up
    }
    clearInterval(timer)
}
// 鼠标松开函数
function up(e){
    // 判断鼠标最终位置和起始位置的差值是否超过屏幕的一半  超过调用切换函数 没有则调用返回函数
    let bool=(e.screenX-window.before<window.w/2)&&(e.screenX-window.before>-window.w/2)
    if(bool){
        window.img.return()
        // console.log(1)
    }else{
        let a=e.screenX-window.before>window.w/2 ? 1 : -1
        window.img.toggle(a)
    }
    // 解绑move和up事件
    for(let i=0;i<7;i++){
        items[i].onmousemove=null
        items[i].onmouseup=null
    }
    window.timer=setInterval(function(){
        window.img.toggle(-1);
    },5000)
}
// 鼠标移动函数
function move(e){
    // 调用拉拽函数
    window.img['drag'](window.before,e.screenX)
}
// 鼠标点击函数
function click(e){
    for(let i=0;i<5;i++){
        btns[i].className='btn';
        if(btns[i]==e.currentTarget){
            window.positionD=i;
            window.img.toggle(-1);
        }
    }
    e.currentTarget.className='btn current'
}
// 绑定鼠标按下事件
for(let i=0;i<7;i++){
    items[i].onmousedown=down;
}
// 按钮绑定鼠标点击事件
for(let i=0;i<5;i++){
    btns[i].onclick=click;
}
// 创建类的实例
window.img=new ImgItem()
// 自动循环播放轮播图
window.timer=setInterval(function(){
    window.img.toggle(-1);
},5000)
function change(){
    let a=window.positionD
    for(let i=0;i<5;i++){
        btns[i].className='btn';
    }
    if(window.positionD==0){
        a=5
    }else if(window.positionD==6){
        a=1
    }
    btns[a-1].className='btn current'
}