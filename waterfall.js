let baseUrl = "https://www.easy-mock.com/mock/5a51c67ee3c8e82df3cace3f/auth/imgs";

$.ajax(baseUrl,{
    method:"get"
}).then(function (data) {
    appendImg(data.data.img_arr,200);
});
let eleWidth = document.documentElement.clientWidth;
function appendImg(arr,imgWidth) {

    let cols = Math.floor(eleWidth/imgWidth);
    let num = 0;
    let imgAll = document.getElementsByTagName("img");
    let divAll = document.getElementsByTagName("div");
    let arr_ = [];
    let bindNum = 0;
    for (let j = 0;j<arr.length;j++){
        let fra = document.createDocumentFragment();
        let div_ = document.createElement("div");
        setA(div_,{"class":"img-box"});
        let img_ = document.createElement("img");
        setA(img_,{"src":arr[j]["src"],"width":imgWidth});
        div_.appendChild(img_);
        fra.appendChild(div_);
        document.body.appendChild(fra);
        bindEv(imgAll[j],function () {
            num++;
            if(num===imgAll.length){
                for(let g = 0;g<cols;g++){
                    setA(divAll[g],{"style":"left:"+g*imgWidth+"px"});
                    arr_[g]=parseInt(getComputedStyle(divAll[g])["height"])
                }
                bindNum = bindNum_(arr_);
                for (let y = cols;y<divAll.length;y++){
                    setA(divAll[y],{"style":"left:"+bindNum*imgWidth+"px;top:"+arr_[bindNum]+"px"});
                    arr_[bindNum] += parseInt(getComputedStyle(divAll[y])["height"]) ;
                    bindNum = bindNum_(arr_);
                }
            }
        })
    }
    function setA(obj,opt) {
        Object.keys(opt).forEach(function (val) {
            obj.setAttribute(val,opt[val])
        })
    }
    function bindNum_(arr_) {
        return arr_.indexOf(Math.min.apply(undefined,arr_));
    }
    function bindEv(obj,fn){
        obj.addEventListener("load", fn);
    }
}
function throttle(fn,time) {
    let star_time = new Date();
    return function () {
        let end_time = new Date();
        let spent_time = end_time- star_time;
        if(spent_time>=time){
            fn.call(this);
            star_time = end_time
        }
    }
}
window.onresize=throttle(function () {
    eleWidth = document.documentElement.clientWidth;
},350);







