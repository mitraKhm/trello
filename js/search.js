let search_icon = document.getElementById('searchIcon');
let search_input = document.getElementById('searchinput');
let cards = [];
let test = false;
let test2 = false;
let result_box =document.querySelector('.result_box')
console.log(!result_box);
search_icon.addEventListener('click', (e) => {
    let s = search_input.value;
    cards = [...document.querySelectorAll('.draggable')]
    for (const i in cards) {
        if (s == cards[i].innerText) {//find the card
            test = true;
            let bac = localStorage.getItem('bacPicture')
              if (bac.length == 7) {
                cards[i].style.backgroundColor = bac;
                cards[i].style.transition = '1s';
                s = '';
            } else {
                cards[i].style.backgroundColor = '#0079bf';
                cards[i].style.transition = '.7s';
                s = '';
            }
            console.log('found');
        }//not found
    }
    if(test == false && s != ''){
        if (!document.querySelector('.result_box')) {
            let box = createListElement('div',{ class: 'result_box'}, createListElement('p', { class: 'result_p'}, `sorry! I can't find: 
             ${s}
            please creat it ;)`))
            search_icon.after(box);
            test2=true
        } else if(document.querySelector('.result_box')){
            document.querySelector('.result_box').remove();
        }          
                // test2 ==false;
        
      
    }
    s = '';
});

document.addEventListener('click', function (e) {
    var isClickInside = search_icon.contains(e.target);
    if (!isClickInside) {
        for (const i in cards) {
            cards[i].style.backgroundColor = 'white'
            cards[i].style.transition = '1s'
            if (document.querySelector('.result_box')) {
                document.querySelector('.result_box').remove();
            }
        }
    }
});