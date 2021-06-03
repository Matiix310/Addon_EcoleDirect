// enable the edit mode

console.log("Anylising notes...");

let matieres = document.getElementsByClassName('notes');
let tempNotes2 = [];

for (let g=1; g<(matieres.length); g++) {
    
    //chaque matière
    let tempNotes = matieres[g].getElementsByClassName('note cliquable');
    // console.log("Matière " + g + ": ");
    for (let i=0; i < tempNotes.length; i++) {
        
        // chaque note :
        let valeur = tempNotes[i].getElementsByClassName('valeur');
        let valeurNote = valeur[0].innerHTML.substring(0, valeur[0].innerHTML.indexOf("<")-1);

        // check if there is letter
        var regExp = /[a-zA-Z]/g;
        if(!regExp.test(valeurNote)) {

            let coef = "1";
            let coefs = valeur[0].getElementsByClassName('coef');
            let note = [valeurNote.replace(',', '.')];
            try {
                coef = coefs[0].innerHTML.substring(1, coefs[0].innerHTML.length - 1);
            } catch (error) {
                // console.log("Aucun coef sur la note [" + g + "; " + i + "], par defaut " + coef + ".");
            }

            // non significative ?
            if (tempNotes[i].firstElementChild.innerHTML === "(") {
                coef = "0";
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

        if (notes[i][0] !== 'null') {
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
        let note = parseFloat(moyennes[i].firstElementChild.innerHTML.replace(",", "."));
        let coef = parseFloat(coefs[i-1].firstElementChild.innerHTML);
        let label = document.getElementsByClassName('discipline');
        let sub = label[i].classList.contains('sousmatiere');

        if (sub) {
            if (!subMode) {
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