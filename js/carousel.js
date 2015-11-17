/**
 * Created by yyg on 2015/11/17.
 */

window.onload = function() {
    var next = document.getElementById("next");
    var prev = document.getElementById("prev");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var list = document.getElementById("list");
    var index = 1;
    var animated = 0;

    function showButton(){
        for(var i = 0 ; i < buttons.length ; i ++){
            if(buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }


    function check(left){//检测是否显示图片越界
        if(left<-4800) return '-1200px';
        if(left>-1200) return '-4800px';
        return left+'px';
    }

    function animate(offset) {//移动图片
        var left = parseInt(list.style.left) + offset;
        var time = 300;//位移时间
        var interval = 10;//位移间隔
        var speed = offset/(time/interval);


        var go = function(){
//                debugger;
//                if((speed < 0 && parseInt(list.style.left) > left) || (speed > 0 && parseInt(list.style.left) < left) ){
            animated=1;
            if((parseInt(list.style.left) > left) || (parseInt(list.style.left) < left) ){
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go , interval);
            }
            else{
                list.style.left = left + 'px';
                list.style.left = check(parseInt(left));
                animated=0;
            }
        }
        go();
    }

    function play(){
        timer = setInterval(function(){
            next.onclick();
        },3000);
    }

    function stop(){
        clearInterval(timer);
    }

    prev.onclick = function(){
        if (animated) {
            return;
        }
        index -= 1;
        if(index<1) index=4;
        animate(1200);
        showButton();
    }
    next.onclick = function(){
        console.log(animated);
        if (animated) {
            return;
        }
        index += 1;
        if(index>4) index=1;
        animate(-1200);
        showButton();
    }

    for(var i = 0 ; i < buttons.length ; i ++){
        buttons[i].onclick = function(){
            if(this.className == 'on') return;
            var myIndex = parseInt(this.getAttribute("index"));
            var offset = (myIndex - index) * -1200;
            index = myIndex;
            animate(offset);
            showButton();
        }
    }

    carousel.onmouseover = stop;
    carousel.onmouseout = play;

    play();
}