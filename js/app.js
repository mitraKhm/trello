//add addNewList befor call
var m;
var n;
var addListm = document.querySelector('.task-wraper');
addListm.appendChild(addNewList());
//check localstorage and load list and cards
if (localStorage.getItem('lists')) {
    lists = JSON.parse(localStorage.getItem("lists"))
    for (const list in lists) {
        let saved_list = creatListNade(lists[list].title ,list);
        let position = document.getElementById('add-list');
        position.before(saved_list);
        m=list
        listId = m[0]     // var listId = 
        //add cards to list
        for (let card in lists[list].cards) {
            let list_ul = document.getElementById(list)
                .firstChild
                .firstChild
                .nextSibling
            list_ul.appendChild(creatCardNode(lists[list].cards[card] ,card))
        
            n=card
            cardId =n[0]
        }
    }
}