function createListElement(tagName, obj, content) {
    var el = document.createElement(tagName);
    for (var m in obj) {
        el.setAttribute(m, obj[m]);
    };
    if (typeof content !== "undefined") {
        if (content instanceof HTMLElement) {
            el.appendChild(content);
        } else {
            el.innerText = content;
        }
    }
    return el;
}
function toggel1(var1,var2){
    if (var1 !== null ){
        var1.classList.remove('show');
        var1.classList.add('hide');
    }
    if (var2 !== null ){
        var2.classList.remove('hide');
        var2.classList.add('show')
    }
    return var1,var2
}
// function app( var1 ,arry){
//     for(let i=0; i<=arry.lengh ; i++){
//         console.log(arry[i])
//        return var1.appendChild(arry[i])
//     }


// }
