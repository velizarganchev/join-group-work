let alreadychosen = false; // Var for choosing the Priority

/** reads out which priority was chosen
 * @param {int} i - 1 = High Prio ; 2 = Medium Prio ; 3 = Low Prio
 * @param {String} Prio - Safes the Prio in words instead of numbers
 */
function choosePrio(i){
    let Prio;
    if (i == 1){
        Prio = 'High';
    } else if(i == 2){
        Prio = 'Medium';
    } else{
        Prio = 'Low';
    }
    changeColorOfPrio(Prio, i);
}
/**changes the Img of the Prio div
 * 
 * @param {*} Prio - still the Priority in numbers
 * @param {*} img1 - the url of the image when not chosen
 * @param {*} img2 - the url of the image when chosen
 */
function changeImgOfPrio(Prio, img1, img2){
    if (alreadychosen == false){
        document.getElementById(`${Prio}Img`).src = img2;
        alreadychosen = true;
    }else{
        document.getElementById(`${Prio}Img`).src = img1;
        alreadychosen = false;
    }
}


/** changes the backgroundcolors of the Priority divs
 * @param {*} Prio 
 * @param {*} i 
 */
function changeColorOfPrio(Prio, i){
    let img1 = `/assets/img/Prio${Prio}.png`;
    let img2 = `/assets/img/Prio${Prio}White.png`;
    document.getElementById(`Prio${i}`).classList.toggle(`${Prio}choosen`);
    changeImgOfPrio(Prio, img1, img2);
}

