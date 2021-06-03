// enable the edit mode

console.log("activating the edit mod");

let matieres = document.getElementsByClassName('notes');
let tempNotes2 = [];

for (let g=1; g<(matieres.length); g++) {
    
    //chaque matière
    let tempNotes = matieres[g].getElementsByClassName('note cliquable');
    for (let i=0; i < tempNotes.length; i++) {
        
        // chaque note :
        let valeur = tempNotes[i].getElementsByClassName('valeur');
        let valeurNote = valeur[0].innerHTML.substring(0, valeur[0].innerHTML.indexOf("<")-1);

        // check if there is letter
        var regExp = /[a-zA-Z]/g;
        if(!regExp.test(valeurNote)) {

            let coefs = valeur[0].getElementsByClassName('coef');
            let coef = "1";
            let note = [valeurNote.replace(',', '.')];
            try {
                coef = coefs[0].innerHTML.substring(1, coefs[0].innerHTML.length - 1);
            } catch (error) {
                // console.log("Aucun coef sur la note [" + g + "; " + i + "], par defaut " + coef + ".");
            }
            note.push(coef);
            let quotiens = valeur[0].getElementsByClassName("quotien");
            let quotien = "20";
            try {
                quotien = quotiens[0].innerHTML.substring(1);
            } catch (error) {
                // console.log("Aucun quotient sur la note [" + g + "; " + i + "], par defaut " + quotien + ".");
            }
            note.push(quotien);
            tempNotes2[i] = note;
            // console.log(note);

        } else {
            tempNotes2[i] = ['null'];
        }
    }

    setMoyenne(g, tempNotes2);

    //reset de la liste des notes pour la nouvelle matière
    tempNotes2 = [];
}

function setMoyenne(matiere, notes) {
    // console.log(notes);
    const label = document.getElementsByClassName('relevemoyenne')[matiere].firstElementChild;
    let tot = 0;
    let coefSumm = 0;

    for (let i=0; i<notes.length; i++) {
        // console.log(tot);
        let note = parseFloat(notes[i][0]);

        if (note !== 'null') {
            let coef = parseFloat(notes[i][1]);
            let qot = parseFloat(notes[i][2]);
            note = (note/qot)*20;

            // console.log("note : " + note + "\ncoef : " + coef);

            tot = tot + note*coef;
            coefSumm = coefSumm + coef;
        }
    }

    tot = (tot/coefSumm).toFixed(2);

    // console.log(tot);
    let old = parseFloat(label.innerHTML.replace(',', '.'));
    if (old > tot) {
        label.innerHTML = old + " => " + tot.toString();
        label.setAttribute('style', 'color: red');
    } else if (old < tot) {
        label.innerHTML = old + " => " + tot.toString();
        label.setAttribute('style', 'color: green');
    }
}

moyenneG();

function moyenneG() {
    let moyennes = document.getElementsByClassName('relevemoyenne');
    let tot = 0;
    let coefCount = 0;
    let subMode = false;
    let coefs = [];
    let oldCoefs = document.getElementsByClassName("coef");

    //filtrer pour avoir que les coefs des matière et pas ceux des notes
    for (let i=0; i<oldCoefs.length; i++) {
        if(oldCoefs[i].nodeName === "TD") {
            coefs.push(oldCoefs[i]);
        }
    }

    for (let i=1; i<moyennes.length; i++) {
        let note = moyennes[i].firstElementChild.innerHTML.replace(",", ".");
        if (note.includes('=')) {
            note = note.substring(note.indexOf(' ')+7);
            console.log("nouvelle note : " + note);
        }

        note = parseFloat(note);

        let coef = parseFloat(coefs[i-1].firstElementChild.innerHTML);
        let label = document.getElementsByClassName('discipline');
        let sub = label[i].classList.contains('sousmatiere');

        if (sub) {
            if (!subMode) {
                let oldNote = moyennes[i-1].firstElementChild.innerHTML.replace(',', '.');
                if (moyennes[i-1].firstElementChild.innerHTML.replace(',', '.').includes('=')) {
                    console.log("note-1 : " + oldNote);
                    oldNote = oldNote.substring(oldNote.indexOf('>')+1);
                    console.log("  => " + oldNote);
                }
                oldNote = parseFloat(oldNote);
                tot = tot-(parseFloat(moyennes[i-1].firstElementChild.innerHTML.replace(',', '.'))*parseFloat(coefs[i-2].firstElementChild.innerHTML));
                coefCount = coefCount-parseFloat(coefs[i-2].firstElementChild.innerHTML);

                // console.log('- ' + parseFloat(moyennes[i-1].firstElementChild.innerHTML.replace(',', '.')) + ', coef ' + parseFloat(coefs[i-2].firstElementChild.innerHTML));
                subMode = true;
            }

        } else subMode = false;

        tot = tot + note * coef;
        coefCount = coefCount + coef;

        // console.log('+ ' + note + ', coef ' + coef);
    }

    tot = tot/coefCount;


    let moyenneLabel = document.getElementsByClassName('moyennegenerale-valeur')[0];

    if (parseFloat(moyenneLabel.innerHTML.replace(',', ".")) < tot) {
        moyenneLabel.innerHTML = moyenneLabel.innerHTML + " => " + tot.toFixed(2).toString();
        moyenneLabel.setAttribute('style', 'color: green');
    } if (parseFloat(moyenneLabel.innerHTML.replace(',', '.')) > tot) {
        moyenneLabel.innerHTML = moyenneLabel.innerHTML + " => " + tot.toFixed(2).toString();
        moyenneLabel.setAttribute('style', 'color: red');
    }
    // console.log("Moyenne G = " + tot.toFixed(2));
}


// for (let g=0; g < (matieres.length-1); g++) {
//     let tempNotes = matieres[g].getElementsByClassName('note cliquable');
//     console.log("matière : " + g);
//     for (let i=0; i < tempNotes.length; i++) {
//         if (tempNotes[i].childElementCount == 3) {

//             let matiere = tempNotes[i].parentNode.parentNode;
//             let matiereCoefs = matiere.getElementsByClassName('coef');
//             let matiereCoef = matiereCoefs[0].children[0].innerHTML;

//             let valeur = tempNotes[i].getElementsByClassName('valeur');
//             let coefs = valeur[0].getElementsByClassName('coef');
//             let coef = coefs[0].innerHTML.substring(1, coefs[0].innerHTML.length - 1);
//             console.log("coef : " + coef);
//         }
//     }
// }

// note : faire juste un script qui calcul tout, pas besoin d'analyser parenthèses ou pas.


// let notes = document.getElementsByClassName("note cliquable");
// var styles = `
//     .checkbox {
//         --border-default: #bbbbc1;
//         --border-hover: #9898a3;
//         --active: #6e7bf2;
//         --active-tick: #fff;
//         display: block;
//         width: 18px;
//         height: 18px;
//         cursor: pointer;
//         position: relative;
//         -webkit-tap-highlight-color: transparent;
//         margin: 0px !important;
//     }
//     .checkbox svg {
//         display: block;
//         position: absolute;
//     }
//     .checkbox input {
//         display: block;
//         outline: none;
//         border: none;
//         padding: 0;
//         margin: 0 !important;
//         -webkit-appearance: none;
//         width: 18px;
//         height: 18px;
//         border-radius: 36% / 36%;
//         box-shadow: inset 0 0 0 1.5px var(--border, var(--border-default));
//         background: var(--background, transparent);
//         transition: background 0.25s linear, box-shadow 0.25s linear;
//     }
//     .checkbox input + svg {
//         width: 21px;
//         height: 18px;
//         left: 0;
//         top: 0;
//         color: var(--active);
//     }
//     .checkbox input + svg .tick {
//         stroke-dasharray: 20;
//         stroke-dashoffset: var(--stroke-dashoffset, 20);
//         transition: stroke-dashoffset 0.2s;
//     }
//     .checkbox input + svg .tick.mask {
//         stroke: var(--active-tick);
//     }
//     .checkbox input + svg + svg {
//         width: 11px;
//         height: 11px;
//         fill: none;
//         stroke: var(--active);
//         stroke-width: 1.25;
//         stroke-linecap: round;
//         top: -6px;
//         right: -10px;
//         stroke-dasharray: 4.5px;
//         stroke-dashoffset: 13.5px;
//         pointer-events: none;
//         animation: var(--animation, none) 0.2s ease 0.175s;
//     }
//     .checkbox input:checked {
//         --background: var(--active);
//         --border: var(--active);
//     }
//     .checkbox input:checked + svg {
//         --stroke-dashoffset: 0;
//     }
//     .checkbox input:checked + svg + svg {
//         --animation: check;
//     }
//     .checkbox:hover input:not(:checked) {
//         --border: var(--border-hover);
//     }
//     @keyframes check {
//         100% {
//             stroke-dashoffset: 4.5px;
//     }
//     }
//     html {
//         box-sizing: border-box;
//         -webkit-font-smoothing: antialiased;
//     }
//     * {
//         box-sizing: inherit;
//     }
//     *:before, *:after {
//         box-sizing: inherit;
//     }
//     body {
//         min-height: 100vh;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }
// `

// var styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);

// for (let i = 0; i < notes.length; i++) {
//     let div = document.createElement("label");
//     div.classList.add('checkbox');
//     div.innerHTML = '<input type="checkbox" /><svg viewBox="0 0 21 18"><symbol id="tick-path" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg"><path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" /></symbol><defs><mask id="tick"><use class="tick mask" href="#tick-path" /></mask></defs><use class="tick" href="#tick-path" stroke="currentColor" /><path fill="white" mask="url(#tick)" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" /></svg><svg class="lines" viewBox="0 0 11 11"><path d="M5.88086 5.89441L9.53504 4.26746" /><path d="M5.5274 8.78838L9.45391 9.55161" /><path d="M3.49371 4.22065L5.55387 0.79198" /></svg>';
//     insertAfter(div, notes[i]);
// }

// function insertAfter(el, referenceNode) {
//     referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
// }