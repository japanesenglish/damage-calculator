let base = document.getElementById('base');
function calc(){
    let atk = 0;
    base.querySelectorAll('.copy2').forEach(function(car){
        let buff = Number(car.querySelector('.num').value);
        car.querySelectorAll('.copy3').forEach(function(dar){
            buff = buff * dar.querySelector('.num').value / 100;
        });
        atk = atk + buff;
    });
    base.querySelector('.per').innerHTML = 100;
    base.querySelector('.abs').innerHTML = atk;
    base.querySelector('.total').innerHTML = shorten(atk);
    document.querySelectorAll('.buff_copy').forEach(function(car){
        let buff_sum = 0;
        if(car.querySelectorAll('.copy1').length >= 1){
            car.querySelector('summary>span>span:has(.per)').style.display = '';
            car.querySelectorAll('.copy1').forEach(function(dar){
                let buff = Number(dar.querySelector('.num').value);
                dar.querySelectorAll('.copy3').forEach(function(ear){
                    buff = buff * ear.querySelector('.num').value / 100;
                });
                dar.querySelectorAll('.copy4').forEach(function(ear){
                    buff = buff + (buff * ear.querySelector('.num').value / 100);
                });
                buff_sum = buff_sum + buff;
            });
        } else {
            car.querySelector('summary>span>span:has(.per)').style.display = 'none';
        }
        car.querySelector('summary .per').innerHTML = 100 + buff_sum;
        let total = atk * (1 + (buff_sum / 100));
        buff_sum = 0;
        if(car.querySelectorAll('.copy2').length >= 1){
            car.querySelector('summary>span>span:has(.abs)').style.display = '';
            car.querySelectorAll('.copy2').forEach(function(dar){
                let buff = Number(dar.querySelector('.num').value);
                dar.querySelectorAll('.copy3').forEach(function(ear){
                    buff = buff * ear.querySelector('.num').value / 100;
                });
                dar.querySelectorAll('.copy4').forEach(function(ear){
                    buff = buff + (buff * ear.querySelector('.num').value / 100);
                });
                buff_sum = buff_sum + buff;
            });
        } else {
            car.querySelector('summary>span>span:has(.abs)').style.display = 'none';
        };
        car.querySelector('summary .abs').innerHTML = buff_sum;
        total = total + buff_sum;
        car.querySelector('.total').innerHTML = shorten(total);
        atk = total;
    });
    document.getElementById('total').innerHTML = atk.toLocaleString();
    let save_total = atk;
    document.querySelectorAll('.grow').forEach(function(car){
        let save = car.closest('.content').querySelector('.num').value;
        car.closest('.content').querySelector('.num').value = Number(car.closest('.content').querySelector('.num').value) + 1;
        atk = 0;
        base.querySelectorAll('.copy2').forEach(function(car){
            let buff = Number(car.querySelector('.num').value);
            car.querySelectorAll('.copy3').forEach(function(dar){
                buff = buff * dar.querySelector('.num').value / 100;
            });
            atk = atk + buff;
        });
            document.querySelectorAll('.buff_copy').forEach(function(dar){
            buff_sum = 0;
            dar.querySelectorAll('.copy1').forEach(function(ear){
                let buff = Number(ear.querySelector('.num').value);
                ear.querySelectorAll('.copy3').forEach(function(far){
                    buff = buff * far.querySelector('.num').value / 100;
                });
                ear.querySelectorAll('.copy4').forEach(function(far){
                    buff = buff + (buff * far.querySelector('.num').value / 100);
                });
                buff_sum = buff_sum + buff;
            });
            total = atk * (1 + (buff_sum / 100));
            buff_sum = 0;
            dar.querySelectorAll('.copy2').forEach(function(ear){
                let buff = Number(ear.querySelector('.num').value);
                ear.querySelectorAll('.copy3').forEach(function(far){
                    buff = buff * far.querySelector('.num').value / 100;
                });
                ear.querySelectorAll('.copy4').forEach(function(far){
                    buff = buff + (buff * far.querySelector('.num').value / 100);
                });
                buff_sum = buff_sum + buff;
            });
            total = total + buff_sum;
            atk = total;
        });
        if(save_total == 0){
            car.innerHTML = '-';
        } else {
            car.innerHTML = Math.round((atk - save_total) / save_total * 100000) / 1000;
        };
        car.closest('.content').querySelector('.num').value = save;
    });
    let biggest = 0;
    document.querySelectorAll('summary .abs').forEach(function(car){
        biggest = Math.max(biggest, car.innerHTML);
    });
    document.querySelectorAll('summary .abs').forEach(function(car){
        document.querySelectorAll('.bar_abs')[Array.from(document.querySelectorAll('summary .abs')).indexOf(car)].style.height = Number(car.innerHTML) / biggest * 100 + '%';
    });
    biggest = 0;
    document.querySelectorAll('summary .per').forEach(function(car){
        biggest = Math.max(biggest, Number(car.innerHTML - 100));
    });
    document.querySelectorAll('summary .per').forEach(function(car){
        document.querySelectorAll('.bar_per')[Array.from(document.querySelectorAll('summary .per')).indexOf(car)].style.height = Number(car.innerHTML - 100) / biggest * 100 + '%';
    });

};
function shorten(event){
    if(event < 1000){
        return Math.floor(event * 100) / 100;
    } else if (event < 10000){
        return Math.floor(event / 10) / 100 + 'K';
    } else if (event < 100000){
        return Math.floor(event / 100) / 10 + 'K';
    } else if (event < 1000000){
        return Math.floor(event / 1000) + 'K';
    } else if (event < 10000000){
        return Math.floor(event / 10000) / 100 + 'M';
    } else if (event < 100000000){
        return Math.floor(event / 100000) / 10 + 'M';
    } else if (event < 1000000000){
        return Math.floor(event / 1000000) + 'M';
    } else if (event < 10000000000){
        return Math.floor(event / 10000000) / 100 + 'G';
    } else if (event < 100000000000){
        return Math.floor(event / 100000000) / 10 + 'G';
    } else if (event < 1000000000000){
        return Math.floor(event / 1000000000) + 'G';
    } else if (event < 10000000000000){
        return Math.floor(event / 10000000000) / 100 + 'T';
    } else if (event < 100000000000000){
        return Math.floor(event / 100000000000) / 10 + 'T';
    } else if (event < 1000000000000000){
        return Math.floor(event / 1000000000000) + 'T';
    } else if (event < 10000000000000000){
        return Math.floor(event / 10000000000000) / 100 + 'P';
    } else if (event < 100000000000000000){
        return Math.floor(event / 100000000000000) / 10 + 'P';
    } else if (event < 1000000000000000000){
        return Math.floor(event / 1000000000000000) + 'P';
    } else if (event < 10000000000000000000){
        return Math.floor(event / 10000000000000000) / 100 + 'E';
    } else if (event < 100000000000000000000){
        return Math.floor(event / 100000000000000000) / 10 + 'E';
    } else if (event < 1000000000000000000000){
        return Math.floor(event / 1000000000000000000) + 'E';
    } else if (event < 10000000000000000000000){
        return Math.floor(event / 10000000000000000000) / 100 + 'Z';
    } else if (event < 100000000000000000000000){
        return Math.floor(event / 100000000000000000000) / 10 + 'Z';
    } else if (event < 1000000000000000000000000){
        return Math.floor(event / 1000000000000000000000) + 'Z';
    } else if (event < 10000000000000000000000000){
        return Math.floor(event / 10000000000000000000000) / 100 + 'Y';
    } else if (event < 100000000000000000000000000){
        return Math.floor(event / 100000000000000000000000) / 10 + 'Y';
    } else if (event < 1000000000000000000000000000){
        return Math.floor(event / 1000000000000000000000000) + 'Y';
    } else if (event < 10000000000000000000000000000){
        return Math.floor(event / 10000000000000000000000000) / 100 + 'R';
    } else if (event < 100000000000000000000000000000){
        return Math.floor(event / 100000000000000000000000000) / 10 + 'R';
    } else if (event < 1000000000000000000000000000000){
        return Math.floor(event / 1000000000000000000000000000) + 'R';
    } else if (event < 10000000000000000000000000000000){
        return Math.floor(event / 10000000000000000000000000000) / 100 + 'Q';
    } else if (event < 100000000000000000000000000000000){
        return Math.floor(event / 100000000000000000000000000000) / 10 + 'Q';
    } else if (event >= 100000000000000000000000000000000){
        return Math.floor(event / 1000000000000000000000000000000) + 'Q';
    };
};

calc();
document.addEventListener('click',function(){
    calc();
});
document.addEventListener('change',function(){
    calc();
});
