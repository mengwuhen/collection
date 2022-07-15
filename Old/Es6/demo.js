 const industry_list = [
    {
        "parent_ind": "女装",
        "name":"连衣裙"
    },
    {
        "name": "女装"
    },
    {
        "parent_ind":"女装",
        "name":"半身裙"
    },
    {
        "parent_ind":"女装",
        "name":"A字裙"
    },
    {
        "name":"数码"
    },
    {
        "parent_ind":"数码",
        "name":"电脑配件"
    },
    {
        "parent_ind":"电脑配件",
        "name":"内存"
    },
 ]

function debounce(func,time) {
    let timer = null;
    return function (params) {
        if (timer) clearTimeout(timer)
        timer =  setTimeout( () =>{
            func.apply(this,[...params])
        },time)
    }
}

function debounce(func, time, immediate) {
  let timer = null
  console.warn(111)
    return function (params) {
        if (timer) clearTimeout(timer)
        if (immediate && !timer) {
            fn.apply(this, args)
        }
        timer = setTimeout(() => {
            func.apply(this, [...params])
        }, time)
    }
}


// 时间戳的实现方式
function throttle(func, wait) {
    let previous = 0;
    return function (params) {
        let now = +new Date();
        if (now - previous > wait) {
            previous = now
            func.apply(this,[...params])
        }
    }

}

// 定时器的实现方式
function throttle2(func, wait) {
    let previous = 0, timer = null;

    return function (params) {

        let now = + new Date()
        if (timer) clearTimeout(timer)

        if (now - previous < wait) {
            timer = setTimeout(() => {
                previous = now
                func.apply(this,[...params])
            },[wait])
        } else {
            previous = now
            func.apply(this,[...params])
        }

    }
}