
//add list button 
function addNewList() {
    let addList = createListElement('div', {
        class: 'add-list ',
        id: 'add-list'
    }, );
    let addListButton = createListElement('button', {
        class: 'add-list-btn show '
    }, '+\xa0 add list ...');
    let addListInput = createListElement('input', {
        class: 'add-title hide',
        type: 'text',
        placeholder: 'enter list name'
    });
    addList.appendChild(addListButton);
    addList.appendChild(addListInput);
    addListButton.addEventListener('click', function () {
        //show input and hide add list btn
        toggel1(addListButton, addListInput);
        addListInput.focus();
    });
    //snd input value to creat list function
    addListInput.addEventListener("keyup", function (e) {
        //check user push enter key
        if (e.keyCode === 13) {
               //check user enter a valid name
            if (addListInput.value !== '') {
                //Creat new list
                let list = creatListNade(addListInput.value);
                let list_position = document.getElementById('add-list');
                list_position.before(list);
        
                let listId = list.id
                //check localStorage 
                if (!localStorage.getItem('lists')) {
                    let lists = {};
                 
                    localStorage.setItem('lists', JSON.stringify(lists))
                    localStorage.setItem('listid',listId)
                }
                //get the list from localStorage 
                lists = JSON.parse(localStorage.getItem("lists"))
                lists[listId] = {
                    title: addListInput.value,
                    cards: {},
                   }
           
                localStorage.setItem('listid',listId++)
                //save lists in localstorage
                localStorage.setItem('lists', JSON.stringify(lists));
                //show add list btn and hide input
                toggel1(addListInput, addListButton)
                addListInput.value = ''
            } else {
                alert('enter valid name')
            }
        }
    });
    addListInput.addEventListener('focusout', (e) => {
        toggel1(addListInput, addListButton)  
      });
    return addList;
}