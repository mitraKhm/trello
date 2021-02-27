var listId = 0
var stateNub = 0;
var nodes = [];
function creatListNade(title, id = null) {
    let listTitle = createListElement(
        'h4', {
            class: 'list-title'
        },
        title);
    var listUl = createListElement('ul', {
        class: 'ul'
    });
    let addCard = createListElement('button', {
            class: 'add-card show',
        },
        '+\xa0add card...');
    let inputname = createListElement('input', {
        class: 'addNewCardinput hide',
        type: 'text',
        placeholder: 'enter card name'
    });
    let MyListContent = createListElement('div', {
        class: 'text-box',
        id: 'list'
    });
    let dragZone = createListElement('button', {
        class: 'drag-zone hide'
    }, '+')
    let header = createListElement('div', {
        class: 'list-header'
    })
    let listMenu = createListElement('i', {
        class: 'fa fa-ellipsis-h List-menu '
    })
    let MyList = createListElement('main', {
        class: 'task-box-wrapper show list',
        id: (id == null) ? `${++listId}_list` : id,
    })
    header.appendChild(listTitle);
    header.appendChild(listMenu);
    MyListContent.appendChild(header);
    MyListContent.appendChild(listUl);
    MyListContent.appendChild(dragZone)
    MyListContent.appendChild(addCard);
    MyListContent.appendChild(inputname);
    listMenu.addEventListener('click', function (e) {
        let menuIsActiv = document.getElementById('menuuu');
        if (stateNub % 2 == 0) { //check menu is open or not
            if (menuIsActiv) {
                menuIsActiv.remove();
               
            }
            var xLeft = e.screenX;
            var yTop = (e.clientY + 10); //+10=> margin
            MyList.appendChild(ListMenuContent(xLeft, yTop, 'openMenu'));
            stateNub++
            //user click on menu icone again
        } else if (posithon <= (e.screenX + 20) && posithon >= (e.screenX - 20)) {
            if (menuIsActiv) {
                menuIsActiv.remove();
            }
            stateNub--;
        } else {
            if (menuIsActiv) {
                menuIsActiv.remove();
            }
            var xLeft = e.screenX;
            var yTop = (e.clientY + 10); //+10=> margin
            MyList.appendChild(ListMenuContent(xLeft, yTop, 'openMenu'));
            stateNub + 1
        }
    })
    addCard.addEventListener('click', function () {
        toggel1(addCard, inputname);
        inputname.focus();
    });
    //Add new card---------------------------------------------
    inputname.addEventListener("keyup", function (e) {
        var minput = inputname.value;
        if (e.keyCode === 13) {
            if (minput !== '') {
                //Avoid inserting duplicate cards
                if (chekCardName.includes(minput) === true) {
                    alert('tekrary');
                } else {
                    if (localStorage.getItem('lists')) {
                        var mycard = creatCardNode(minput);
                        // nodes.push(mycard)
                        lists = JSON.parse(localStorage.getItem("lists"))
                        let cardId = mycard.id
                        let listId = inputname.parentElement.parentElement.id;
                        lists[listId].cards[mycard.id] = minput;
                        //ADD TO LOCAL STORAG
                        localStorage.setItem('lists', JSON.stringify(lists))
                        chekCardName.push(minput)
                    }
                    nodes.push(mycard)
                    listUl.appendChild(mycard);
                    localStorage.setItem('cards', mycard);
                    inputname.value = '';
                    toggel1(inputname, addCard)
                }
            } else {
                inputname.value = '';
                toggel1(inputname, addCard)
            }
        }
    });
    inputname.addEventListener('focusout', (e) => {
        toggel1(inputname, addCard)    
      });
    MyList.appendChild(MyListContent);
    listUl.addEventListener('drop', function (e) {
       e.preventDefault();
       e.dataTransfer.getData('text/plain');
      });
    listUl.addEventListener('dragover',  (e) => {
        e.preventDefault();
        var afterElement = getDragafterElement(listUl, e.clientY)
        var dr = document.querySelector('.dragging')
        if (afterElement == null) {
            listUl.appendChild(dr)
        } else {
            listUl.insertBefore(dr, afterElement)
        }
    });
    return MyList;
}
//Checking the right place to drop card
function getDragafterElement(listUl, y) {
    const draggableElements = [...listUl.querySelectorAll('.draggable:not(.dragging)')]
    // draggableElements.forEach(i => {
    //     i.style.marginTop = 0;
    //     i.style.transition = '2s'
    // });
    return draggableElements
        .reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            //midle of the cards
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {

                child.style.marginTop = '20px';
                child.style.transition = '1s'
                return {
                    offset: offset,
                    el: child
                }
            } else {
                return closest
            }
        }, {
            offset: Number.NEGATIVE_INFINITY
        }).el
}
//Creat menu of lists
function ListMenuContent(x, y, active) {
    let listMenuu = createListElement('div', {
        class: 'list-Menucontent ',
        id: 'menuuu'
    })
    let headerDiv = createListElement('div', {
        class: "action-list"
    })
    let line = createListElement('div', {
        class: 'line'
    })
    let actionList = createListElement('a', {
        class: 'menu-title',
        href: '#'
    }, ' List action');
    let MenuListClose = createListElement('img', {
        class: 'closethemMenu',
        src: 'img/close.svg',
        alt: 'close'
    })
    let listContent = {
        edite: 'edite list name...',
        delete: 'delete list...',
        addCard: 'add new card'
    }
    let MenulistUl = createListElement('ul', {
        class: 'menu-list-ul'
    });
    let contentArray = []
    for (const i in listContent) {
        contentArray.push(createListElement('li', {
                class: 'MenuListLi menu-list-option',
                id: i
            },
            listContent[i]))
    }
    for (const i in contentArray) {
        MenulistUl.appendChild(contentArray[i])
    }
    headerDiv.appendChild(actionList)
    listMenuu.appendChild(headerDiv);
    listMenuu.appendChild(MenuListClose);
    listMenuu.appendChild(line);
    listMenuu.appendChild(MenulistUl)
    console.log(listMenuu);
    MenulistUl.addEventListener('click', (e) => {
        let action = e.target.id;
        switch (action) {
            case 'delete':
                let list = e.target
                    .parentElement
                    .parentElement
                    .parentElement
                let list_id = list.id
                lists = JSON.parse(localStorage.getItem("lists"))
                delete lists[list_id]
                localStorage.setItem('lists', JSON.stringify(lists));
                list.remove()
            case ' edite:' :
        }
    })
    MenuListClose.addEventListener('click', () => {
        listMenuu.classList.remove('show')
        listMenuu.classList.add('hide')
    });
    if (active == 'openMenu') {
        listMenuu.style.left = x + 'px';
        listMenuu.style.top = y + 'px';
        listMenuu.classList.remove('hide');
        listMenuu.classList.add('show');
        posithon = x;
        console.log('x in main: ' + x)
        return listMenuu;
    }
}