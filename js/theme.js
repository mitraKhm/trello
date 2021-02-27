
function appendC() {
    var showMenu = document.querySelector('.themeMenuMain')
    if (!showMenu) {
        document.querySelector('.showMenu').appendChild(menuOption())
    }
}
let bac =localStorage.getItem('bacPicture');
if(bac){
    if(bac.length == 7){
        document.body.style.backgroundColor = bac; 
    }
    document.body.style.backgroundImage = bac;
}else{let bacPicture = '#0079bf'}
//show menu
function menuOption() {
    let divMains = createListElement("div", {
        class: 'themeMenuMain',
        id: 'showMenuOption',
    });
    let close = createListElement('img', {
        class: 'closethemMenu',
        src: 'img/close.svg',
        alt: 'close'
    })
    let name = createListElement('p', {
        class: 'manuTitle'
    }, 'Menu')
    let line = createListElement('div', {
        class: 'line'
    })
    let opDiv = createListElement('div', {
        class: 'divContainop'
    })
    let optionPalet = {
        about: 'About This Bord',
        back: 'Change Background',
        Search: 'Search Cards',
        more: 'More'
    };
    let renderoptionPalet = []
    for (var key in optionPalet) {
        renderoptionPalet.push(
            opDiv.appendChild(
                createListElement('div', {
                    class: 'showMenuOption',
                    id: key
                }, optionPalet[key])
            )
        )
    }
 
    divMains.appendChild(close);
    divMains.appendChild(name);
    divMains.appendChild(line);
    divMains.appendChild(opDiv);
    renderoptionPalet[1].addEventListener('click', function () {
        document
            .querySelector('.showMenu')
            .appendChild(changeBackground());
    });
    close.addEventListener('click',
        closeMenu
    );
    return divMains
}
//menu option
function changeBackground() {
    let head = createListElement('div', {
        class: 'themHead'
    })
    let divMain = createListElement("div", {
        class: 'themeMenuMain',
        id: 'bacOption',
     });
    let close = createListElement('img', {
        class: 'closethemMenu',
        src: 'img/close.svg',
        alt: 'close'
    })
    let name = createListElement('p', {
        class: 'manuTitle'
    }, 'Chenge background')
    let line = createListElement('div', {
        class: 'line'
    })
    let Back = createListElement('i', {
        class: 'fa fa-angle-left back_menu',
    })
    head.appendChild(Back)
    head.appendChild(name)
    head.appendChild(close)
    divMain.appendChild(head)
    divMain.appendChild(line)
    let bacOption = {
        photos: 'url("img/photos.jpg")',
        colors: 'url("img/colorPalet.png")',
        customPhoto: 'url("img/custom.jpeg")'
    }
    //creat background option
    let Palets = []
    for (const i in bacOption) {
        Palets.push(divMain.appendChild(
            createListElement('div', {
                id: i,
                class: 'Palets'
            }, createListElement('div', {
                class: 'Palet',
                style: `background-image:${bacOption[i]}`,
                'data-name': i,
                id: i
            }))))
    }
    for (const i in Palets) {
        Palets[i].appendChild(
            createListElement('span', null, Palets[i].id)
        )
    }
    //call function
    for (const i in Palets) {
 Palets[i].addEventListener('click',(e) =>{
     let name=e.target.id
     switch(name) {
        case 'colors':
        document
        .querySelector('.showMenu')
        .appendChild(colorsPalets());
          break;
        case  'photos':
        document
        .querySelector('.showMenu')
        .appendChild(photosPalets());
          break;
        case'customPhoto':
        document
        .body
        .appendChild(customPicPalets());
       
      }
 })
    }
    close.addEventListener('click',  closeMenu)
    Back.addEventListener('click',  bac_to_Menu)
    return divMain
}
//Change the background to the color selected by the user
function colorsPalets() {
    let head = createListElement('div', {
        class: 'themHead'
    })
    let divMain = createListElement("div", {
        class: 'themeMenuMain',
        id: 'bacOption',
     });
    let close = createListElement('img', {
        class: 'closethemMenu',
        src: 'img/close.svg',
        alt: 'close'
    })
    let name = createListElement('p', {
        class: 'manuTitle'
    }, 'Chenge background')
    let line = createListElement('div', {
        class: 'line'
    })
    let Back = createListElement('i', {
        class: 'fa fa-angle-left back_menu',
    })
    head.appendChild(Back)
    head.appendChild(name)
    head.appendChild(close)
    divMain.appendChild(head)
    divMain.appendChild(line)
    let colors = ['#838c91', '#d29034', '#0079bf', '#b04632', '#519839', '#cd5a91', '#89609e', '#00aecc', '#4bbf6b']
    var items = [];
    //creat colors
    for (var j = 1; j <= 9; j++) { 
        items.push(divMain
            .appendChild(createListElement('div', {
                class: 'themColor',
                id: j,
                'data-nub': j + 1
            })))
    }
  //change background color to selected color
    for (var i = 0; i < items.length; i++) { 
        items[i].style.backgroundColor = colors[i];
    }
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            //
            document.body.style.backgroundImage = '';
            //set the color chosen by the user 
            document.body.style.backgroundColor = colors[i];
            //Save the color chosen by the user 
            localStorage.setItem('bacPicture',colors[i])
        })
    }
 
    close.addEventListener('click',  closeMenu)
    Back.addEventListener('click',  bac_to_Menu)
    return divMain
}
//Change the background to the photo selected by the user
function photosPalets() {
    let head = createListElement('div', {
        class: 'themHead'
    })
    let divMain = createListElement("div", {
        class: 'themeMenuMain',
        id: 'bacOption',
     });
    let close = createListElement('img', {
        class: 'closethemMenu',
        src: 'img/close.svg',
        alt: 'close'
    })
    let name = createListElement('p', {
        class: 'manuTitle'
    }, 'Chenge background')
    let line = createListElement('div', {
        class: 'line'
    })
    let Back = createListElement('i', {
        class: 'fa fa-angle-left back_menu',
    })
    head.appendChild(Back)
    head.appendChild(name)
    head.appendChild(close)
    divMain.appendChild(head)
    divMain.appendChild(line)
    var items = [];
    for (var j = 1; j <= 9; j++) { //creat colors
        items.push(divMain
            .appendChild(createListElement('div', {
                class: 'themColor themphoto',
            })))
    }
    for (var i = 0; i < items.length; i++) {
        var url = "url('img/" + i + ".jpg')"
        items[i].style.backgroundImage = url;
    }
    for (let i = 0; i < items.length; i++) { //change background color to selected color
        items[i].addEventListener('click', function () {
            var url = "url('img/" + i + ".jpg')"
            document.body.style.backgroundImage = url;
             localStorage.setItem('bacPicture',url)
        })
    }
    close.addEventListener('click',  closeMenu)
    Back.addEventListener('click',  bac_to_Menu)
    return divMain
};
//Change the background to the photo uplosd by the user
function customPicPalets() {
    let modal = createListElement('div', {
        class: 'customPicModal'
    })
    let div = createListElement('div',{class:'modalDiv'})
    let close = createListElement('img', {
        class: 'closethemMenu',
        src: 'img/close.svg',
        alt: 'close'
    })
    const realBtn = createListElement('input', {
        type: 'file',
        id: 'realFile',
        accept: "image/*",
        hidden: "hidden"
    });
    const customBtn = createListElement('button', {
        id: 'custonBtn',
    }, 'choose a picture');
    const customTxt = createListElement('apan', {
        id: 'custom-text'
    }, 'No choose yet');
    customBtn.addEventListener('click', function () {
        realBtn.click();
    });
    realBtn.addEventListener('change', function () {
        if (realBtn.value) {
            let img = realBtn.value.match(
                /[\/\\]([\w\d\s\.\-\(\)]+)$/
            )[1];
            customTxt.innerHTML = img
            var files = realBtn.files;
            if (files.length > 0) {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    // console.log(e)
                    var srcm = e.target.result
                    var dte = "url(' " + srcm + "')"
                    document.body.style.backgroundImage = dte;
               
                    localStorage.setItem('bacPicture',dte)
                }
                fileReader.readAsDataURL(files[0]);
                console.log(files[0].name)
            }
        }
    })
    modal.style.display = "block"
    div.appendChild(close)
    div.appendChild(realBtn)
    div.appendChild(customBtn)
    div.appendChild(customTxt)
    modal.appendChild(div)
    close.addEventListener('click',  () => {
        modal.style.display = "none"
        bac_to_Menu ()
    })
    return modal
}
function bac_to_Menu() {
    document.querySelector('.showMenu').lastElementChild.remove();
}
function closeMenu() {
    let items =[...document.querySelectorAll('.themeMenuMain')];
    for (const i in items) {
        items[i].remove()
    }
}
