window.addEventListener('load',function(){
    document.elementFromPoint(0,0).click();
});
window.addEventListener('click',function(e){
    details(e);
    info(e);
    info_close();
    col(e);
    col_close(e);
    del(e);
    plus(e);
    plus1(e);
    plus2(e);
    option(e);
    option_del(e);
});
window.addEventListener('DOMFocusOut',function(e){
    edit_ap(e);
});

//名称変更
function edit_ap(event){
    if(event.target.classList.contains('bar_name')){
        let ap_name = document.querySelectorAll('details')[Array.from(document.querySelectorAll('.bar_name')).indexOf(event.target)];
        ap_name.querySelector('summary>span:nth-of-type(2)').innerHTML = event.target.value;
    };
};

//details open
function details(event){
    if(event.target.closest('summary')){
        event.preventDefault();
        if(!event.target.closest('details').classList.contains('open') && !event.target.closest('details').classList.contains('moving')){
            event.target.closest('details').classList.toggle('open');
            event.target.closest('details').classList.toggle('moving');
            event.target.closest('details').querySelector('div').style.height = event.target.closest('details').querySelector('div').scrollHeight + 'px';
            setTimeout(() => {
                event.target.closest('details').querySelector('div').style.height = 'auto';
                event.target.closest('details').classList.toggle('moving');
            }, 300);
        } else if(event.target.closest('details').classList.contains('open') && !event.target.closest('details').classList.contains('moving')){
            event.target.closest('details').querySelector('div').style.height = event.target.closest('details').querySelector('div').scrollHeight + 'px';
            event.target.closest('details').classList.toggle('moving');
            setTimeout(() => {
                event.target.closest('details').classList.toggle('open');
                event.target.closest('details').querySelector('div').style.height = '0px';
                setTimeout(() => {
                    event.target.closest('details').classList.toggle('moving');
                }, 300);
            }, 1);
        };
    };
};

//bar詳細
function info(event){
    if(event.target.classList.contains('info') && !event.target.parentElement.querySelector('.info_box').classList.contains('open') && !event.target.parentElement.querySelector('.info_box').classList.contains('moving')){
        document.getElementById('bubu').innerHTML = event.target.parentElement.querySelector('.info_box');
        event.target.parentElement.querySelector('.info_box').classList.toggle('moving');
        event.target.parentElement.querySelector('.info_box').classList.toggle('open');
        event.target.parentElement.parentElement.style.zIndex = 102;
        event.target.parentElement.querySelector('.info_box').style.visibility = 'visible';
        event.target.parentElement.querySelector('.info_box').style.opacity = '1';
        setTimeout(() => {
            event.target.parentElement.querySelector('.info_box').classList.toggle('moving');
        }, 300);
    };
};
function info_close(){
    document.querySelectorAll('.info_box').forEach(function(car){
        if(car.classList.contains('open') && !car.classList.contains('moving')){
            car.classList.toggle('open');
            car.classList.toggle('moving');
            car.parentElement.parentElement.style.zIndex = '';
            car.style.visibility = '';
            car.style.opacity = '';
            setTimeout(() => {
                car.style.display = '';
                car.classList.toggle('moving');
            }, 300);
        };
    });
};

//カラー変更
let which = '';
let which_color = '';
let whiich = '';
let col_box_open = 0;
function col(event){
    if(event.target.classList.contains('col')){
        which = event.target.parentElement.parentElement;
        which_color = which.querySelector('.bar_abs').style.background;
        which_color = which_color.replace('rgb(','').replace('rgba(','').replace(')','');
        which_color = which_color.split(',');
        which_color[1] = which_color[1].trim();
        which_color[2] = which_color[2].trim();
        if(which_color.length == 3){
            which_color.push('1');
        } else {
            which_color[3] = which_color[3].trim();
        };
        document.getElementById('color_r').value = which_color[0];
        document.getElementById('color_g').value = which_color[1];
        document.getElementById('color_b').value = which_color[2];
        document.getElementById('color_a').value = which_color[3];
        cur();
        whiich = document.querySelectorAll('details')[Array.from(document.querySelectorAll('.col')).indexOf(event.target)];
        document.getElementById('col_box').style.display = 'block';
        setTimeout(() => {
            col_box_open = 1;
        }, 500);
    };
};
function col_close(event){
    if(event.target.closest('#col_box') === null && col_box_open == 1){
        document.getElementById('col_box').style.display = '';
        col_box_open = 0;
    };
};

let cur_bw = document.querySelector('#bw>.cur');
let cur_tp = document.querySelector('#transparent>.cur');
let cur_rb = document.querySelector('#rainbow>.cur');
let drag_bw = '';
let drag_tp = '';
let drag_rb = '';
let ratio = [];
function cur(){
    drag_bw = '';
    drag_tp = '';
    drag_rb = '';
    cur_bw.style.margin = '';
    cur_tp.style.margin = '';
    cur_rb.style.margin = '';
    let color_r = Number(document.getElementById('color_r').value);
    let color_g = Number(document.getElementById('color_g').value);
    let color_b = Number(document.getElementById('color_b').value);
    let color_a = Number(document.getElementById('color_a').value);
    //blackwhite
    let biggest = Math.max(color_r,color_g,color_b);
    let smallest = Math.min(color_r,color_g,color_b);
    let rate = 1 / (biggest / 255);
    smallest = Math.round(smallest * rate);
    cur_bw.style.top = (255 - biggest) + 'px';
    cur_bw.style.left = (255 - smallest) + 'px';
    //transparent
    cur_tp.style.top = Math.round(255 - (255 * color_a)) + 'px';
    //rainbow
    if(color_r == color_g && color_g == color_b && color_b == color_r){
        cur_rb.style.top = '0px';
        document.getElementById('bw').style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0)),linear-gradient(to right, rgba(255, 255, 255), rgb(255, 0, 0))';
    } else {
        if(color_r > color_g && color_g == color_b){
            color_r = 255;
            color_g = 0;
            color_b = 0;
            cur_rb.style.top = '0px';
        } else if (color_r >= color_g && color_g > color_b){
            let rate = 1 / (color_r / 255);
            color_r = 255;
            color_g = Math.round(color_g * rate);
            color_b = Math.round(color_b * rate);
            color_g = color_g - ((255 - color_g) * ((color_b / 255) / (1 - (color_b / 255))));
            color_b = 0;
            let top = Math.floor(color_g / 6);
            cur_rb.style.top = top + 'px';
        } else if (color_g > color_r && color_r == color_b){
            color_g = 255;
            color_r = 0;
            color_b = 0;
            cur_rb.style.top = '85px';
        } else if (color_g > color_r && color_r >= color_b){
            let rate = 1 / (color_g / 255);
            color_g = 255;
            color_r = Math.round(color_r * rate);
            color_b = Math.round(color_b * rate);
            color_r = color_r - ((255 - color_r) * ((color_b / 255) / (1 - (color_b / 255))));
            color_b = 0;
            let top = Math.floor((512 - color_r) / 6);
            cur_rb.style.top = top + 'px';
        } else if (color_g >= color_b && color_b > color_r){
            let rate = 1 / (color_g / 255);
            color_g = 255;
            color_b = Math.round(color_b * rate);
            color_r = Math.round(color_r * rate);
            color_b = color_b - ((255 - color_b) * ((color_r / 255) / (1 - (color_r / 255))));
            color_r = 0;
            let top = Math.floor((512 + color_b) / 6);
            cur_rb.style.top = top + 'px';
        } else if (color_b > color_r && color_r == color_g){
            color_b = 255;
            color_r = 0;
            color_g = 0;
            cur_rb.style.top = '170px';
        } else if (color_b > color_g && color_g >= color_r){
            let rate = 1 / (color_b / 255);
            color_b = 255;
            color_g = Math.round(color_g * rate);
            color_r = Math.round(color_r * rate);
            color_g = color_g - ((255 - color_g) * ((color_r / 255) / (1 - (color_r / 255))));
            color_r = 0;
            let top = Math.floor((1024 - color_b) / 6);
            cur_rb.style.top = top + 'px';
        } else if (color_b >= color_r && color_r > color_g){
            let rate = 1 / (color_b / 255);
            color_b = 255;
            color_r = Math.round(color_r * rate);
            color_g = Math.round(color_g * rate);
            color_r = color_r - ((255 - color_r) * ((color_g / 255) / (1 - (color_g / 255))));
            color_g = 0;
            let top = Math.floor((1024 + color_r) / 6);
            cur_rb.style.top = top + 'px';
        } else if (color_r > color_b && color_b >= color_g){
            let rate = 1 / (color_r / 255);
            color_r = 255;
            color_b = Math.round(color_b * rate);
            color_g = Math.round(color_g * rate);
            color_b = color_b - ((255 - color_b) * ((color_g / 255) / (1 - (color_g / 255))));
            color_g = 0;
            let top = Math.floor((1536 - color_b) / 6);
            cur_rb.style.top = top + 'px';
        };
        document.getElementById('bw').style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0)),linear-gradient(to right, rgba(255, 255, 255), rgb(' + color_r + ', ' + color_g + ', ' + color_b + '))';
    };
    let toop = cur_rb.style.top.replace('px','');
    if(toop == 0){
        color_r = 255;
        color_g = 0;
        color_b = 0;
    } else if (toop <= 42){
        color_r = 255;
        color_b = 0;
        let rate = toop / 42;
        color_g = Math.floor(255 * rate);
    } else if (toop <= 85){
        color_g = 255;
        color_b = 0;
        let rate = (toop - 42) / 43;
        color_r = 255 - (Math.floor(255 * rate));
    } else if (toop <= 127){
        color_g = 255;
        color_r = 0;
        let rate = (toop - 85) / 42;
        color_b = Math.floor(255 * rate);
    } else if (toop <= 170){
        color_b = 255;
        color_r = 0;
        let rate = (toop - 127) / 43;
        color_g = 255 - (Math.floor(255 * rate));
    } else if (toop <= 212){
        color_b = 255;
        color_g = 0;
        let rate = (toop - 170) / 42;
        color_r = Math.floor(255 * rate);
    } else if (toop <= 254){
        color_r = 255;
        color_g = 0;
        let rate = (toop - 212) / 42;
        color_b = 255 - (Math.floor(255 * rate));
    };
    ratio = [color_r,color_g,color_b];
};
cur();
//input手動入力
document.querySelectorAll('#r_g_b input').forEach(function(car){
    car.addEventListener('change',function(){
        cur();
        which.querySelector('.bar_per').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + document.getElementById('color_a').value + ')';  
        which.querySelector('.bar_abs').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + document.getElementById('color_a').value + ')';  
        whiich.style.border = 'rgb(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ')' + ' solid 3px';  
        whiich.style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.2' + ')';  
        whiich.querySelector('summary').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.4' + ')';  
        whiich.querySelectorAll('.content').forEach(function(dar){
            dar.style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.3' + ')';  
        });
    });
});
//dont move
document.getElementById('col_box').addEventListener('touchmove', function(evt){
    evt.preventDefault();
},{passive: false});
//cursor drag
cur_rb.addEventListener('pointermove',function(event){
    if(event.buttons == 1){
        event.preventDefault();
        if(drag_rb == ''){
            let top = this.offsetTop;
            this.style.margin = '0px 0px 0px -6px';
            this.style.top = top + 'px';
        };
        drag_rb = 1;
        this.style.top = Math.max(-9, Math.min(this.offsetTop + event.movementY, 267 - this.offsetHeight)) + 'px';
        this.style.cursor = 'grabbing';
        this.draggable = false;
        this.setPointerCapture(event.pointerId);
        //反映
        let toop = this.offsetTop + 9;
        if(toop == 0){
            document.getElementById('color_r').value = 255;
            document.getElementById('color_g').value = 0;
            document.getElementById('color_b').value = 0;
        } else if (toop <= 42){
            document.getElementById('color_r').value = 255;
            document.getElementById('color_b').value = 0;
            let rate = toop / 42;
            document.getElementById('color_g').value = Math.floor(255 * rate);
        } else if (toop <= 85){
            document.getElementById('color_g').value = 255;
            document.getElementById('color_b').value = 0;
            let rate = (toop - 42) / 43;
            document.getElementById('color_r').value = 255 - (Math.floor(255 * rate));
        } else if (toop <= 127){
            document.getElementById('color_g').value = 255;
            document.getElementById('color_r').value = 0;
            let rate = (toop - 85) / 42;
            document.getElementById('color_b').value = Math.floor(255 * rate);
        } else if (toop <= 170){
            document.getElementById('color_b').value = 255;
            document.getElementById('color_r').value = 0;
            let rate = (toop - 127) / 43;
            document.getElementById('color_g').value = 255 - (Math.floor(255 * rate));
        } else if (toop <= 212){
            document.getElementById('color_b').value = 255;
            document.getElementById('color_g').value = 0;
            let rate = (toop - 170) / 42;
            document.getElementById('color_r').value = Math.floor(255 * rate);
        } else if (toop <= 254){
            document.getElementById('color_r').value = 255;
            document.getElementById('color_g').value = 0;
            let rate = (toop - 212) / 42;
            document.getElementById('color_b').value = 255 - (Math.floor(255 * rate));
        };
        ratio = [document.getElementById('color_r').value,document.getElementById('color_g').value,document.getElementById('color_b').value];
        document.getElementById('bw').style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0)),linear-gradient(to right, rgba(255, 255, 255), rgb(' + ratio[0] + ', ' + ratio[1] + ', ' + ratio[2] + '))';
        rat();
    } else {
        this.style.cursor = 'grab';
    };
},{passive: false});
cur_tp.onpointermove = function(event) {
    if(event.buttons == 1){
        if(drag_tp == ''){
            let top = this.offsetTop;
            this.style.margin = '0px 0px 0px -6px';
            this.style.top = top + 'px';
        };
        drag_tp = 1;
        this.style.top = Math.max(-9, Math.min(this.offsetTop + event.movementY, 267 - this.offsetHeight)) + 'px';
        this.style.cursor = 'grabbing';
        this.draggable = false;
        this.setPointerCapture(event.pointerId);
        //反映
        let toop = this.offsetTop + 9;
        document.getElementById('color_a').value = Math.round(100 - toop * (100 / 255)) / 100;
        which.querySelector('.bar_per').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + document.getElementById('color_a').value + ')';  
        which.querySelector('.bar_abs').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + document.getElementById('color_a').value + ')';  
        whiich.style.border = 'rgb(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ')' + ' solid 3px';  
        whiich.style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.2' + ')';  
        whiich.querySelector('summary').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.4' + ')';  
        whiich.querySelectorAll('.content').forEach(function(dar){
            dar.style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.3' + ')';  
        });
    } else {
        this.style.cursor = 'grab';
    };
};
function rat(){
    let toop = 255 - cur_bw.offsetTop - 20;
    let leeft = 255 - cur_bw.offsetLeft - 20;
    let toprate = toop / 255;
    let color_r = Number(ratio[0]);
    let color_g = Number(ratio[1]);
    let color_b = Number(ratio[2]);
    let biggest = '';
    let midlle = [];
    let smallest = [];
    if(color_r >= color_g && color_r >= color_b){
        biggest = [document.getElementById('color_r'),ratio[0]];
        if(color_g >= color_b){
            midlle = [document.getElementById('color_g'),ratio[1]];
            smallest = [document.getElementById('color_b'),ratio[2]];
        } else {
            midlle = [document.getElementById('color_b'),ratio[2]];
            smallest = [document.getElementById('color_g'),ratio[1]];
        };
    } else if (color_g >= color_r && color_g >= color_b){
        biggest = [document.getElementById('color_g'),ratio[1]];
        if(color_r >= color_b){
            midlle = [document.getElementById('color_r'),ratio[0]];
            smallest = [document.getElementById('color_b'),ratio[2]];
        } else {
            midlle = [document.getElementById('color_b'),ratio[2]];
            smallest = [document.getElementById('color_r'),ratio[0]];
        };
    } else if (color_b >= color_r && color_b >= color_g){
        biggest = [document.getElementById('color_b'),ratio[2]];
        if(color_r >= color_g){
            midlle = [document.getElementById('color_r'),ratio[0]];
            smallest = [document.getElementById('color_g'),ratio[1]];
        } else {
            midlle = [document.getElementById('color_g'),ratio[1]];
            smallest = [document.getElementById('color_r'),ratio[0]];
        };
    };
    biggest[0].value = toop;
    biggest[1] = biggest[1] * toprate;
    midlle[1] = midlle[1] * toprate;
    let leftrate = leeft / 255;
    midlle[0].value = Math.round(midlle[1] + ((biggest[1] - midlle[1]) * leftrate));
    smallest[0].value = Math.round(biggest[1] * leftrate);
    which.querySelector('.bar_per').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + document.getElementById('color_a').value + ')';  
    which.querySelector('.bar_abs').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + document.getElementById('color_a').value + ')';  
    whiich.style.border = 'rgb(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ')' + ' solid 3px';  
    whiich.style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.2' + ')';  
    whiich.querySelector('summary').style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.4' + ')';  
    whiich.querySelectorAll('.content').forEach(function(dar){
        dar.style.background = 'rgba(' + document.getElementById('color_r').value + ',' + document.getElementById('color_g').value + ',' + document.getElementById('color_b').value + ',' + '0.3' + ')';  
    });
};
cur_bw.onpointermove = function(event) {
    if(event.buttons == 1){
        if(drag_bw == ''){
            let top = this.offsetTop;
            let left = this.offsetLeft;
            this.style.margin = '0px';
            this.style.top = top + 'px';
            this.style.left = left + 'px';
        };
        drag_bw = 1;
        this.style.left = Math.max(-20, Math.min(this.offsetLeft + event.movementX, 277 - this.offsetWidth)) + 'px';
        this.style.top = Math.max(-20, Math.min(this.offsetTop + event.movementY, 277 - this.offsetHeight)) + 'px';
        this.style.cursor = 'grabbing';
        this.draggable = false;
        this.setPointerCapture(event.pointerId);
        rat();
    } else {
        this.style.cursor = 'grab';
    };
};

//add
document.querySelector('#add>div').addEventListener('click',function(){
    //copy
    let now = document.querySelectorAll('.bar').length;
    let cocopy = copy.cloneNode(true);
    cocopy.querySelector('input').value = 'バフ群' + now;
    this.parentElement.before(cocopy);
    //coopy
    let cocoopy = coopy.cloneNode(true);
    cocoopy.querySelector('summary>span:nth-of-type(2)').innerHTML = 'バフ群' + now;
    document.getElementById('buff_box').append(cocoopy);
});
document.getElementById('graph_close').addEventListener('click',function(e){
    if(!e.target.classList.contains('open')){
        document.getElementById('top_box').style.top = '-165px';
        document.getElementById('graph').style.top = '-165px';
        document.getElementById('buff_box').style.top = '65px';
        e.target.style.transform = 'translate(-50%) rotate(90deg)';
        e.target.classList.toggle('open');
    } else {
        document.getElementById('top_box').style.top = '';
        document.getElementById('graph').style.top = '';
        document.getElementById('buff_box').style.top = '';
        e.target.style.transform = '';
        e.target.classList.toggle('open');
    };
});
function plus(event){
    if(event.target.classList.contains('plus')){
        if(!event.target.classList.contains('open')){
            event.target.parentElement.querySelector('.add_buffs_box').style.display = 'block';
            event.target.classList.toggle('open');
        } else {
            event.target.parentElement.querySelector('.add_buffs_box').style.display = 'none';
            event.target.classList.toggle('open');
        };
    };
};
function plus1(event){
    if(event.target.classList.contains('plus1')){
        let cocopy_plus1 = copy_plus1.cloneNode(true);
        let now = event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy1').length + 1;
        cocopy_plus1.querySelector('.buff_name').value = 'バフ' + now;
        event.target.parentElement.parentElement.parentElement.querySelector('.bor').before(cocopy_plus1);
        cocopy_plus1.querySelector('.content').style.background = event.target.parentElement.parentElement.parentElement.querySelector('.content').style.background;
        if(event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy2').length >= 1){
            event.target.parentElement.parentElement.parentElement.querySelector('.bor').style.display = 'block';
        };
        bar(Array.from(document.querySelectorAll('.buff_copy')).indexOf(event.target.parentElement.parentElement.parentElement),event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy1').length,event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy2').length);
    };
};
function plus2(event){
    if(event.target.classList.contains('plus2')){
        if(event.target.parentElement.parentElement.parentElement.querySelector('.bor') !== null && event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy1').length >= 1){
            event.target.parentElement.parentElement.parentElement.querySelector('.bor').style.display = 'block';
        };
        let cocopy_plus2 = copy_plus2.cloneNode(true);
        let now = event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy2').length + 1;
        cocopy_plus2.querySelector('.buff_name').value = 'バフ' + now;
        event.target.parentElement.parentElement.parentElement.querySelector('.add_buffs').before(cocopy_plus2);
        cocopy_plus2.querySelectorAll('.content').forEach(function(car){
            car.style.background = event.target.parentElement.parentElement.parentElement.querySelector('.content').style.background;
        });
        bar(Array.from(document.querySelectorAll('.buff_copy')).indexOf(event.target.parentElement.parentElement.parentElement),event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy1').length,event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy2').length);
    };
};

function option(event){
    if(event.target.classList.contains('option')){
        let cocopy_op = copy_op.cloneNode(true);
        event.target.parentElement.parentElement.append(cocopy_op);
    };
};

//del
function del(event){
    if(event.target.classList.contains('del')){
        let del_element = document.querySelectorAll('.buff_copy')[Array.from(document.querySelectorAll('.del')).indexOf(event.target)];
        del_element.remove();
        del_element = event.target.parentElement.parentElement.parentElement.parentElement;
        del_element.remove();
    };
};

function option_del(event){
    if(event.target.classList.contains('option_del')){
        if(event.target.parentElement.parentElement.parentElement.querySelector('.bor') !== null && event.target.parentElement.parentElement.classList.contains('copy2') && event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy2').length == 1){
            event.target.parentElement.parentElement.parentElement.querySelector('.bor').style.display = '';
            bar(Array.from(document.querySelectorAll('.buff_copy')).indexOf(event.target.parentElement.parentElement.parentElement),event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy1').length,event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy2').length - 1);
        } else if (event.target.parentElement.parentElement.classList.contains('copy1') && event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy1').length == 1){
            event.target.parentElement.parentElement.parentElement.querySelector('.bor').style.display = '';
            bar(Array.from(document.querySelectorAll('.buff_copy')).indexOf(event.target.parentElement.parentElement.parentElement),event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy1').length - 1,event.target.parentElement.parentElement.parentElement.querySelectorAll('.copy2').length);
        };
        event.target.parentElement.parentElement.remove();
    };
};


