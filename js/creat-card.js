var chekCardName = [];
var cardId = 0;
var dropzone = 0;
//creat card function
function creatCardNode(text, id = null) {
    let li = createListElement('li', {
        class: 'show draggable',
        draggable: true,
        id: (id == null) ? `${++cardId}_card` : id,
    }, text);
    let br = createListElement('br');
    let closeMenu = createListElement('i', {
        class: 'close-m fa fa-times-circle'
    });
    let deleteCard = createListElement('a', {
        class: 'delete-card fa fa-trash-o'
    }, '\xa0\xa0delete card');
    let editCard = createListElement('a', {
        class: 'edit-card fa fa-pencil-square-o'
    }, '\xa0\xa0Entre card name');
    let menuContent = createListElement('div', {
        class: 'menu-content'
    });
    let inputNewname = createListElement('input', {
        class: 'input-edit-card hide',
        id: 'test',
        type: 'text',
        placeholder: 'enter card name....'
    }, );
    let openMenu = createListElement('i', {
        class: 'open-menu fa fa-pencil hide',
        id: 'openMenu',
    });
    let Menu = createListElement('div', {
        class: 'menu ',
        id: 'menuBar'
    });
    editCard.appendChild(inputNewname);
    menuContent.appendChild(editCard);
    menuContent.appendChild(br);
    menuContent.appendChild(deleteCard);
    Menu.appendChild(closeMenu);
    Menu.appendChild(menuContent);
    li.appendChild(openMenu);
 
  
    li.addEventListener("mouseover", () => {
        openMenu.classList.remove('hide')
        openMenu.classList.add('show')
    })
    li.addEventListener('mouseleave', () => {
        openMenu.classList.remove('show')
        openMenu.classList.add('hide')
    })
    openMenu.addEventListener('click', function (e) {
        // console.log(`"${e.screenY}px"`)
        menuContent.style.left = e.screenX + 20 + 'px'
        let list= li.closest('.list')
        li.style.zIndex ='245'
        document.body.appendChild(Menu)
    })
    closeMenu.addEventListener('click', function () {
        Menu.remove();
        // document.getElementById('menuBar').style.width='0%'
    })
    //delete card
    deleteCard.addEventListener('click', function () {
        let list_id = li.closest('.list').id
        let card_id = li.id
        //update lists 
        lists = JSON.parse(localStorage.getItem("lists"))
        delete lists[list_id].cards[card_id]
        localStorage.setItem('lists', JSON.stringify(lists))
        li.remove();
        Menu.remove();
    });
    editCard.addEventListener('click', function () {
        toggel1(null, inputNewname)
        inputNewname.focus();
    })
    //edit the card name
    editCard.addEventListener("keyup", function (e) {

        if (e.keyCode == 13) {
            let newText = inputNewname.value
            //Prevent enter unvalid name
            if (newText !== '') {
                li.innerText = newText;
                let list_id = li.closest('.list').id
                let card_id = li.id
                //update lists 
                lists = JSON.parse(localStorage.getItem("lists"))
                lists[list_id].cards[card_id] = newText
                localStorage.setItem('lists', JSON.stringify(lists))
                li.appendChild(openMenu);
                li.appendChild(Menu);
                newText = ''
                Menu.remove();
            } else {
                alert("enter valid name")
            }
        }
    });
    li.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id)
        li.style.backgroundColor = 'tomato'
        li.classList.add('dragging');
        dropzone = e.target.id;
        let list_id = li.closest('.list').id
        lists = JSON.parse(localStorage.getItem("lists"))
        delete lists[list_id].cards[li.id]

        localStorage.setItem('lists', JSON.stringify(lists))
    })
    li.addEventListener('dragend', function (e) {
        li.classList.remove('dragging');
        console.log(e.target.id);
        let dr = e.target
        const cards = [...document.querySelectorAll('.draggable')]
        // console.log(cards);
        cards.forEach((el) => {
            el.style.marginTop = ''
            el.style.transition = '.2s'
        })
        setTimeout(() => {
            dr.style.backgroundColor = '#fff';
            dr.style.transition = '1.5s'
        }, 200);
        //update localstorage
        let card_id=e.target
        let list = card_id.closest('.list')
        // console.log(list.id);
        lists = JSON.parse(localStorage.getItem("lists"));
        delete lists[list.id].cards
        lists[list.id].cards ={}
        let el = [...list.querySelectorAll('.draggable')]
        for (const i in el) {
        lists[list.id].cards[el[i].id] = el[i].innerText
        console.log( lists[list.id].cards[el[i].id] );
         console.log(el[i].innerText);
        }
        localStorage.setItem('lists', JSON.stringify(lists))
    })
    li.addEventListener('drag', function () {

    })
    return li;
};