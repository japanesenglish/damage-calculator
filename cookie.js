document.cookie = '=; max-age=0';
let origin = cookie();
let cookies = '';
let cookieslist = [];
let content = [];
function sort(){
    //cookie保存
    console.log(document.cookie);
    cookies = document.cookie;
    if(cookies == ''){
        cookies = ',=' + cookie();
    };
    if((cookies.match(/;/g) || []).length >= 1){
        cookieslist = cookies.split(';');
        for(i = 0; i < cookieslist.length; i++){
            if(cookieslist[i].split('=')[0].trim() === ','){
                let con = cookieslist[i]
                cookieslist.splice(i,1);
                cookieslist.unshift(con);
                i = Infinity;
            };
        };
    } else {
        cookieslist = [cookies];
    };
    //Cookie仕分け
    content = [];
    for(let h = 0; h < cookieslist.length; h++){
        content.push(cookieslist[h])
        content[h] = content[h].split('=');
        if(content[h][0].trim() == '#'){
            content[h][0] = '';
        };
        content[h][0] = decodeURIComponent(content[h][0].trim());
        content[h][1] = content[h][1].split('$');
        content[h][1][0] = content[h][1][0].split('/');
        for(let i = 0; i < content[h][1][0].length; i++){
            content[h][1][0][i] = content[h][1][0][i].split('+');
        };
        content[h][1][1] = content[h][1][1].split('/');
        content[h][1][2] = content[h][1][2].split('/');
        for(let i = 0; i < content[h][1][2].length; i++){
            content[h][1][2][i] = content[h][1][2][i].split('+');
            for(let a = 0; a <= 1; a++){
                content[h][1][2][i][a] = Array.from(content[h][1][2][i][a].split('@'));
                if(content[h][1][2][i][a][0] === '?'){
                    content[h][1][2][i][a].shift();
                } else {
                    for(let b = 0; b < content[h][1][2][i][a].length; b++){
                        content[h][1][2][i][a][b] = Array.from(content[h][1][2][i][a][b].split('#'));
                    };
                };
            };
        };
        content[h][1][3] = content[h][1][3].split('/');
        for(let i = 0; i < content[h][1][3].length; i++){
            content[h][1][3][i] = content[h][1][3][i].split('+');
            for(let a = 0; a <= 1; a++){
                content[h][1][3][i][a] = Array.from(content[h][1][3][i][a].split('@'));
                if(content[h][1][3][i][a][0] === '?'){
                    content[h][1][3][i][a].shift();
                } else {
                    for(let b = 0; b < content[h][1][3][i][a].length; b++){
                        content[h][1][3][i][a][b] = Array.from(content[h][1][3][i][a][b].split('#'));
                    };
                };
            };
        };
    };
    list();
};
sort();
    document.getElementById('bubu').innerHTML = document.cookie;

console.log(content)
//cookie適応
let copy = document.querySelector('.bar_copy').cloneNode(true);
let coopy = document.querySelector('.buff_copy').cloneNode(true);
let copy_plus1 = document.querySelector('.copy1').cloneNode(true);
let copy_plus2 = document.querySelector('.copy2').cloneNode(true);
let copy_op = document.querySelector('.copy3').cloneNode(true);
function bar(count,per,abs){
    if(per >= 1 && abs >= 1){
        document.querySelectorAll('.bar_per')[count + 1].style.display = 'block';
        document.querySelectorAll('.bar_per')[count + 1].style.left = '0px';
        document.querySelectorAll('.bar_per')[count + 1].style.width = '45%';
        document.querySelectorAll('.bar_per')[count + 1].style.transform = 'none';
        document.querySelectorAll('.bar_abs')[count + 1].style.display = 'block';
        document.querySelectorAll('.bar_abs')[count + 1].style.right = '0px';
        document.querySelectorAll('.bar_abs')[count + 1].style.width = '45%';
        document.querySelectorAll('.bar_abs')[count + 1].style.transform = 'none';
        document.querySelectorAll('.mul>div')[count + 1].innerHTML = '×';
    } else if (per >= 1 && abs == 0){
        document.querySelectorAll('.bar_per')[count + 1].style.display = 'block';
        document.querySelectorAll('.bar_per')[count + 1].style.left = '50%';
        document.querySelectorAll('.bar_per')[count + 1].style.width = '';
        document.querySelectorAll('.bar_per')[count + 1].style.transform = 'translate(-50%)';
        document.querySelectorAll('.bar_abs')[count + 1].style.display = 'none';
        document.querySelectorAll('.bar_abs')[count + 1].style.transform = 'none';
        document.querySelectorAll('.mul>div')[count + 1].innerHTML = '×';
    } else if (abs >= 1 && per == 0){
        document.querySelectorAll('.bar_per')[count + 1].style.display = 'none';
        document.querySelectorAll('.bar_per')[count + 1].style.transform = 'none';
        document.querySelectorAll('.bar_abs')[count + 1].style.display = 'block';
        document.querySelectorAll('.bar_abs')[count + 1].style.left = '50%';
        document.querySelectorAll('.bar_abs')[count + 1].style.width = '';
        document.querySelectorAll('.bar_abs')[count + 1].style.transform = 'translate(-50%)';
        document.querySelectorAll('.mul>div')[count + 1].innerHTML = '＋';
    } else if (per == 0 && abs == 0){
        document.querySelectorAll('.bar_per')[count + 1].style.display = 'none';
        document.querySelectorAll('.bar_abs')[count + 1].style.display = 'none';
    };
};

//list
document.querySelectorAll('#top_box>div>div:nth-of-type(1)').forEach(function(car){
    car.addEventListener('click',function(){
        if(!car.parentElement.querySelector('div:nth-of-type(2)').classList.contains('open') && !car.parentElement.querySelector('div:nth-of-type(2)').classList.contains('moving')){
            car.parentElement.querySelector('div:nth-of-type(2)').classList.toggle('moving');
            car.parentElement.querySelector('div:nth-of-type(2)').classList.toggle('open');
            car.parentElement.querySelector('div:nth-of-type(2)').style.display = 'block';
            car.parentElement.querySelector('div:nth-of-type(2)').style.height = car.parentElement.querySelector('div:nth-of-type(2)').scrollHeight + 'px';
            setTimeout(() => {
                car.parentElement.querySelector('div:nth-of-type(2)').classList.toggle('moving');
            }, 300);
        };
    });
});
window.addEventListener('click',function(){
    document.querySelectorAll('#top_box>div>div:nth-of-type(2)').forEach(function(car){
        if(car.classList.contains('open') && !car.classList.contains('moving')){
            car.classList.toggle('open');
            car.classList.toggle('moving');
            car.style.height = '';
            setTimeout(() => {
                car.style.display = '';
                car.classList.toggle('moving');
            }, 300);
        };
    });
});

let save_data = '';
let call_data = '';
let out_data = '';
let ex_data = '';
window.addEventListener('click',function(e){
    if(e.target.classList.contains('data')){
        document.getElementById('confirm').style.display = 'block';
        document.querySelectorAll('#confirm>div').forEach(function(dar){
            dar.style.display = '';
        });
        if(e.target.parentElement.getAttribute('id') == 'save_list'){
            save_data = e.target;
            document.querySelector('#confirm>div:nth-of-type(1)').style.display = 'block';
            document.querySelector('#confirm>div>div:nth-of-type(1)').innerHTML = e.target.innerHTML;
            if(e.target.classList.contains('new')){
                document.querySelector('#confirm>div:nth-of-type(1)>input').value = 'name';
            } else {
                document.querySelector('#confirm>div:nth-of-type(1)>input').value = e.target.innerHTML;
            };
        } else if (e.target.parentElement.getAttribute('id') == 'call_list'){
            call_data = e.target;
            document.querySelector('#confirm>div:nth-of-type(2)').style.display = 'block';
            document.querySelector('#confirm>div:nth-of-type(2)>div:nth-of-type(1)').innerHTML = e.target.innerHTML;
        } else if (e.target.parentElement.getAttribute('id') == 'out_list'){
            out_data = e.target;
            document.querySelector('#confirm>div:nth-of-type(3)').style.display = 'block';
            document.querySelector('#confirm>div:nth-of-type(3)>div:nth-of-type(1)').innerHTML = e.target.innerHTML;
        } else if (e.target.parentElement.getAttribute('id') == 'ex_list'){
            if(!e.target.classList.contains('load')){
                ex_data = e.target;
                document.querySelector('#confirm>div:nth-of-type(4)').style.display = 'block';
                document.querySelector('#confirm>div:nth-of-type(4)>div:nth-of-type(1)').innerHTML = e.target.innerHTML;
            } else {
                document.querySelector('#confirm>div:nth-of-type(5)').style.display = 'block';
            };
        };
    };
});

document.getElementById('confirm_close').addEventListener('click',function(){
    document.getElementById('confirm').style.display = '';
});

function list(){
    let count = document.querySelectorAll('#save_box>div:nth-of-type(2)>div').length;
    for(i = 1; i < count; i++){
        document.querySelector('#save_box>div:nth-of-type(2)>div').remove();
    };
    for(i = 1; i < count; i++){
        document.querySelector('#call_box>div:nth-of-type(2)>div').remove();
    };
    for(i = 1; i < count; i++){
        document.querySelector('#out_box>div:nth-of-type(2)>div').remove();
    };
    for(i = 1; i < count; i++){
        document.querySelector('#ex_box>div:nth-of-type(2)>div').remove();
    };
    for(let i = 1; i < content.length; i++){
        let add_content = document.createElement('div');
        add_content.innerHTML = content[i][0];
        add_content.classList.toggle('data');
        document.querySelector('#save_list .new').before(add_content);
    };
    for(let i = 1; i < content.length; i++){
        let add_content = document.createElement('div');
        add_content.innerHTML = content[i][0];
        add_content.classList.toggle('data');
        document.querySelector('#call_list .new').before(add_content);
    };
    for(let i = 1; i < content.length; i++){
        let add_content = document.createElement('div');
        add_content.innerHTML = content[i][0];
        add_content.classList.toggle('data');
        document.querySelector('#out_list').append(add_content);
    };
    for(let i = 1; i < content.length; i++){
        let add_content = document.createElement('div');
        add_content.innerHTML = content[i][0];
        add_content.classList.toggle('data');
        document.querySelector('#ex_list .load').before(add_content);
    };
};
list();

//save
window.addEventListener('click',function(d){
    if(cookie().length >= 4095){
        console.log(cookie().length)
        document.getElementById('sin').style.top = '2px';
        document.getElementById('sin').addEventListener('click',function(e){
            e.target.style.height = '50px';
            e.target.style.width = '97%';
            setTimeout(() => {
                e.target.style.height = '';
                e.target.style.width = '';
            }, 2000);
        });
        if(d.target == document.getElementById('save')){
            document.getElementById('sin').style.height = '50px';
            document.getElementById('sin').style.width = '97%';
            setTimeout(() => {
                document.getElementById('sin').style.height = '';
                document.getElementById('sin').style.width = '';
            }, 2000);
        };
    } else {
        document.getElementById('sin').style.top = '';
        document.cookie = ',=' + cookie() + '; max-age=31536000';
        if(d.target == document.getElementById('save')){
            if((encodeURIComponent(d.target.parentElement.querySelector('input').value).length + cookie().length) < 4096){
                let same = 0;
                for(i = 0; i < document.querySelectorAll('#save_list>div').length - 1; i++){
                    console.log(document.querySelectorAll('#save_list>div')[i].innerHTML,d.target.parentElement.querySelector('input').value)
                    if(document.querySelectorAll('#save_list>div')[i] !== save_data && document.querySelectorAll('#save_list>div')[i].innerHTML === d.target.parentElement.querySelector('input').value){
                        same = 1;
                    };
                };
                if(same == 0){
                    if(save_data.innerHTML == ''){
                        document.cookie = '#' + '=; max-age=0';
                    } else {
                        document.cookie = encodeURIComponent(save_data.innerHTML) + '=; max-age=0';
                    };
                    if(d.target.parentElement.querySelector('input').value == ''){
                        document.cookie = '#' + '=' + cookie() + '; max-age=31536000';
                    } else {
                        document.cookie = encodeURIComponent(d.target.parentElement.querySelector('input').value) + '=' + cookie() + '; max-age=31536000';
                    };
                    document.getElementById('confirm').style.display = '';
                    sort();
                } else {
                    window.alert('既に同じ名前のセットが存在しています。');
                };
            } else {
                document.getElementById('sin').style.top = '2px';
                document.getElementById('sin').style.height = '50px';
                document.getElementById('sin').style.width = '97%';
                setTimeout(() => {
                    document.getElementById('sin').style.top = '';
                    document.getElementById('sin').style.height = '';
                    document.getElementById('sin').style.width = '';
                }, 2000);
            };
        };
    };
});
function cookie(){
    let cookie_text = '';
    let cookie_total = '';
    document.querySelectorAll('.bar_abs').forEach(function(car){
        cookie_text = cookie_text + '/';
        let cookie_color = '';
        cookie_color = car.style.background;
        cookie_color = cookie_color.replace('rgb(','').replace('rgba(','').replace(')','');
        cookie_color = cookie_color.split(',');
        cookie_color[1] = cookie_color[1].trim();
        cookie_color[2] = cookie_color[2].trim();
        if(cookie_color.length == 3){
            cookie_color.push('1');
        } else {
            cookie_color[3] = cookie_color[3].trim();
        };
        cookie_color.forEach(function(dar){
            cookie_text = cookie_text + '+';
            cookie_text = cookie_text + dar;
        });
    });
    cookie_text = cookie_text.replace('/+','');
    cookie_text = cookie_text.replaceAll('/+','/');
    cookie_total = cookie_total + cookie_text;

    cookie_text = '';
    document.querySelectorAll('.bar_name').forEach(function(car){
        cookie_text = cookie_text + '/';
        cookie_text = cookie_text + encodeURIComponent(car.value);
    });
    cookie_text = cookie_text.replace('/','');
    cookie_total = cookie_total + '$' + cookie_text;

    cookie_text = '';
    document.querySelectorAll('details').forEach(function(car){
        cookie_text = cookie_text + '/';
        car.querySelectorAll('.copy1 .main').forEach(function(dar){
            cookie_text = cookie_text + encodeURIComponent(dar.value);
            dar.parentElement.parentElement.parentElement.querySelectorAll('.cri').forEach(function(ear){
                cookie_text = cookie_text + '#';
                cookie_text = cookie_text + encodeURIComponent(ear.value);
            });
            cookie_text = cookie_text + '@';
        });
        if(car.querySelectorAll('.copy1 .main').length == 0){
            cookie_text = cookie_text + '?';
        };
        cookie_text = cookie_text + '+';
        car.querySelectorAll('.copy2 .main').forEach(function(dar){
            cookie_text = cookie_text + '@';
            cookie_text = cookie_text + encodeURIComponent(dar.value);
            dar.parentElement.parentElement.parentElement.querySelectorAll('.cri').forEach(function(ear){
                cookie_text = cookie_text + '#';
                cookie_text = cookie_text + encodeURIComponent(ear.value);
            });
        });
        if(car.querySelectorAll('.copy2 .main').length == 0){
            cookie_text = cookie_text + '?';
        };
        cookie_text = cookie_text.replace('@+@','+');
        cookie_text = cookie_text.replace('+@','+');
        cookie_text = cookie_text.replace('@+','+');
    });
    cookie_text = cookie_text.replace('/','');
    cookie_total = cookie_total + '$'  + cookie_text;
    
    cookie_text = '';
    document.querySelectorAll('details').forEach(function(car){
        cookie_text = cookie_text + '/';
        car.querySelectorAll('.copy1 .content:has(.main) .num').forEach(function(dar){
            cookie_text = cookie_text + encodeURIComponent(dar.value);
            dar.parentElement.parentElement.parentElement.querySelectorAll('.content:has(.cri) .num').forEach(function(ear){
                cookie_text = cookie_text + '#';
                cookie_text = cookie_text + encodeURIComponent(ear.value);
            });
            cookie_text = cookie_text + '@';
        });
        if(car.querySelectorAll('.copy1 .content:has(.main) .num').length == 0){
            cookie_text = cookie_text + '?';
        };
        cookie_text = cookie_text + '+';
        car.querySelectorAll('.copy2 .content:has(.main) .num').forEach(function(dar){
            cookie_text = cookie_text + '@';
            cookie_text = cookie_text + encodeURIComponent(dar.value);
            dar.parentElement.parentElement.parentElement.querySelectorAll('.content:has(.cri) .num').forEach(function(ear){
                cookie_text = cookie_text + '#';
                cookie_text = cookie_text + encodeURIComponent(ear.value);
            });
        });
        if(car.querySelectorAll('.copy2 .content:has(.main) .num').length == 0){
            cookie_text = cookie_text + '?';
        };
        cookie_text = cookie_text.replace('@+@','+');
        cookie_text = cookie_text.replace('+@','+');
        cookie_text = cookie_text.replace('@+','+');
    });
    cookie_text = cookie_text.replace('/','');
    cookie_total = cookie_total + '$'  + cookie_text;
    return cookie_total;
};

//call
document.getElementById('call').addEventListener('click',function(){
    if(call_data.classList.contains('new')){
        console.log(origin)
        document.cookie = ',=' + origin + '; max-age=31536000';
        sort();
        call(0);
    } else {
        call(Array.from(document.querySelectorAll('#call_list>div')).indexOf(call_data) + 1);
    };
    document.getElementById('confirm').style.display = '';
});
function call(e){
    document.querySelectorAll('.buff_copy').forEach(function(){
        document.querySelector('.buff_copy').remove();
    })
    document.querySelectorAll('.bar_copy').forEach(function(){
        document.querySelector('.bar_copy').remove();
    })
    for(let i = 2; i <= content[e][1][0].length; i++){
        //copy
        let cocopy = copy.cloneNode(true);
        document.getElementById('add').before(cocopy);
        //coopy
        let cocoopy = coopy.cloneNode(true);
        document.getElementById('buff_box').append(cocoopy);
    };
    for(let i = 0; i < content[e][1][2].length; i++){
        document.querySelectorAll('details')[i].querySelectorAll('.copy1').forEach(function(car){
            car.remove();
        });
        document.querySelectorAll('details')[i].querySelectorAll('.copy2').forEach(function(car){
            car.remove();
        });
        for(a = 0; a < content[e][1][2][i][0].length; a++){
            let cocopy_plus1 = copy_plus1.cloneNode(true);
            document.querySelectorAll('details')[i].querySelector('.bor').before(cocopy_plus1);
            for(b = 1; b < content[e][1][2][i][0][a].length; b++){
                let cocopy_op = copy_op.cloneNode(true);
                document.querySelectorAll('details')[i].querySelectorAll('.copy1')[a].append(cocopy_op);
            };
        };
        for(a = 0; a < content[e][1][2][i][1].length; a++){
            let cocopy_plus2 = copy_plus2.cloneNode(true);
            document.querySelectorAll('details')[i].querySelector('.add_buffs').before(cocopy_plus2);
            for(b = 1; b < content[e][1][2][i][1][a].length; b++){
                let cocopy_op = copy_op.cloneNode(true);
                document.querySelectorAll('details')[i].querySelectorAll('.copy2')[a].append(cocopy_op);
            };
            if(content[e][1][2][i][0].length > 0){
                document.querySelectorAll('details')[i].querySelector('.bor').style.display = 'block';
            };
        };
        bar(i - 1,content[e][1][2][i][0].length,content[e][1][2][i][1].length);
    };
    for(let i = 0; i < content[e][1][0].length; i++){
        //color
        document.querySelectorAll('.bar_per')[i].style.background = 'rgba(' + content[e][1][0][i][0] + ',' + content[e][1][0][i][1] + ',' + content[e][1][0][i][2] + ',' + content[e][1][0][i][3] + ')';  
        document.querySelectorAll('.bar_abs')[i].style.background = 'rgba(' + content[e][1][0][i][0] + ',' + content[e][1][0][i][1] + ',' + content[e][1][0][i][2] + ',' + content[e][1][0][i][3] + ')';  
        document.querySelectorAll('details')[i].style.border = 'rgb(' + content[e][1][0][i][0] + ',' + content[e][1][0][i][1] + ',' + content[e][1][0][i][2] + ')' + ' solid 3px';  
        document.querySelectorAll('details')[i].style.background = 'rgba(' + content[e][1][0][i][0] + ',' + content[e][1][0][i][1] + ',' + content[e][1][0][i][2] + ',' + '0.2' + ')';  
        document.querySelectorAll('details')[i].querySelector('summary').style.background = 'rgba(' + content[e][1][0][i][0] + ',' + content[e][1][0][i][1] + ',' + content[e][1][0][i][2] + ',' + '0.4' + ')';  
        document.querySelectorAll('details')[i].querySelectorAll('.content').forEach(function(dar){
            dar.style.background = 'rgba(' + content[e][1][0][i][0] + ',' + content[e][1][0][i][1] + ',' + content[e][1][0][i][2] + ',' + '0.3' + ')';  
        });
        //bar_name
        document.querySelectorAll('.bar_name')[i].value = decodeURIComponent(content[e][1][1][i]);
        //buff_name
        for(let a = 0; a < content[e][1][2][i][0].length; a++){
            document.querySelectorAll('details')[i].querySelectorAll('.copy1')[a].querySelector('input').value = decodeURIComponent(content[e][1][2][i][0][a][0]);
            for(let b = 1; b < content[e][1][2][i][0][a].length; b++){
                document.querySelectorAll('details')[i].querySelectorAll('.copy1')[a].querySelectorAll('.copy3 .buff_name')[b - 1].value = decodeURIComponent(content[e][1][2][i][0][a][b]);
            };
        };
        for(let a = 0; a < content[e][1][2][i][1].length; a++){
            document.querySelectorAll('details')[i].querySelectorAll('.copy2')[a].querySelector('input').value = decodeURIComponent(content[e][1][2][i][1][a][0]);
            for(let b = 1; b < content[e][1][2][i][1][a].length; b++){
                document.querySelectorAll('details')[i].querySelectorAll('.copy2')[a].querySelectorAll('.copy3 .buff_name')[b - 1].value = decodeURIComponent(content[e][1][2][i][1][a][b]);
            };
        };
        //num
        for(let a = 0; a < content[e][1][3][i][0].length; a++){
            document.querySelectorAll('details')[i].querySelectorAll('.copy1')[a].querySelector('.num').value = decodeURIComponent(content[e][1][3][i][0][a][0]);
            for(let b = 1; b < content[e][1][3][i][0][a].length; b++){
                document.querySelectorAll('details')[i].querySelectorAll('.copy1')[a].querySelectorAll('.copy3 .num')[b - 1].value = decodeURIComponent(content[e][1][3][i][0][a][b]);
            };
        };
        for(let a = 0; a < content[e][1][3][i][1].length; a++){
            document.querySelectorAll('details')[i].querySelectorAll('.copy2')[a].querySelector('.num').value = decodeURIComponent(content[e][1][3][i][1][a][0]);
            for(let b = 1; b < content[e][1][3][i][1][a].length; b++){
                document.querySelectorAll('details')[i].querySelectorAll('.copy2')[a].querySelectorAll('.copy3 .num')[b - 1].value = decodeURIComponent(content[e][1][3][i][1][a][b]);
            };
        };
    };
    for(i = 0; i < document.querySelectorAll('.bar_name').length; i++){
        document.querySelectorAll('summary>span:nth-of-type(2)')[i].innerHTML = document.querySelectorAll('.bar_name')[i].value;
    };
};
call(0);

//out
document.getElementById('out').addEventListener('click',function(){
    if(out_data.innerHTML == ''){
        document.cookie = '#=; max-age=0';
    } else {
        document.cookie = encodeURIComponent(out_data.innerHTML) + '=; max-age=0';
    };
    document.getElementById('confirm').style.display = '';
    sort();
});
function allout(){
    content.forEach(function(car){
        document.cookie = encodeURIComponent(car[0]) + '=' + cookie() + '; max-age=0';
    });
    document.cookie = ',=' + cookie() + '; max-age=0';
};

//export
document.getElementById('ex').addEventListener('click',function(){
    let ex_text = cookieslist[Array.from(document.querySelectorAll('#ex_list>div')).indexOf(ex_data) + 1];
    const blob = new Blob([ex_text],{type:"text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = content[Array.from(document.querySelectorAll('#ex_list>div')).indexOf(ex_data) + 1][0] + '.txt';
    link.click();
    document.getElementById('confirm').style.display = '';
});

//inport
let reader = new FileReader();
let key = 'no';
let key_content = '';
document.getElementById('file').addEventListener('change',function(event){
    let file = event.target.files[0];
    let mimeType = file.type;
    if(mimeType === 'text/plain'){
        reader.readAsText(file);
        reader.onload = function(){
            let cookie_in = reader.result;
            if((cookie_in.match(/=/g) || []).length >= 1){
                let cookie_in_list = cookie_in.split('=');
                cookie_in_list[0] = decodeURIComponent(cookie_in_list[0]);
                if((cookie_in_list[1].match(/\$/g) || []).length == 3){
                    sort();
                    call(0);
                    let len = 0;
                    let result_tx = '';
                    for (let i = 0; i < cookie_in_list[0].trim().length; i++){
                        (cookie_in_list[0][i].match(/[ -~]/)) ? len += 1 : len += 2;
                        if(len <= 10){
                            result_tx += cookie_in_list[0].trim()[i];
                        } else {
                            result_tx += '…';
                            i = Infinity;
                        };
                    };
                    document.getElementById('result').innerHTML = result_tx + ' を読み込みますか？';
                    key = 'yes';
                    key_content = cookie_in_list[1];
                } else {
                    document.getElementById('result').innerHTML = '<div style="color: red;">ファイルが適切ではありません。</div>';
                };
            } else {
                document.getElementById('result').innerHTML = '<div style="color: red;">ファイルが適切ではありません。</div>';
            };
        };
    } else {
        document.getElementById('result').innerHTML = '<div style="color: red;">txtファイルのみが対象です。</div>';
    };
});

document.getElementById('in').addEventListener('click',function(){
    if(key == 'yes'){
        console.log(key_content)
        document.cookie = ',=' + key_content + '; max-age=31536000';
        sort();
        call(0);
        document.getElementById('confirm').style.display = '';
    };
});
