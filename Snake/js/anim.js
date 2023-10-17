function loop() {
    const ctx = canvas.getContext("2d");

    // Fonction qui va se répéter
    if (Date.now() - lastDrawTime > 175.00) {
        console.log(tabValue[8]);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fonctionImportante(ctx);
        lastDrawTime = Date.now();

    }
    requestAnimationFrame(loop);
}

function main() {
    nbCarre = 17;
    largeur = 40;
    window.canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = (nbCarre + 2)*largeur;
    canvas.height = (nbCarre + 2)*largeur;
    canvas.style.background = "#578a34";

    drawGrid(ctx, nbCarre)
    lastDrawTime = Date.now();

    tabValue = [];
    for(i = 0; i < nbCarre; i++){
        ligne = [];
        for(j = 0; j < nbCarre; j++){
            if (i == Math.floor(nbCarre / 2) && j == 5){
                ligne.push([1, 0])
                posH = [i, j]
            } else if(i == Math.floor(nbCarre / 2) && j == 10){
                ligne.push([4])
            } else if(i == Math.floor(nbCarre / 2) && j == 4){
                ligne.push([2, 0])
            } else if(i == Math.floor(nbCarre / 2) && j == 3){
                ligne.push([3, 0])
            } else {
                ligne.push([0])
            }
        }
        tabValue.push(ligne);

    }

    drawGrid(ctx, nbCarre);
    posCorp(ctx)
    loop();
}

main();

function drawGrid(ctx, nbCarre){
    tableauJeu = [];
    for(i=0; i<nbCarre;i++){
        ligneJeu = [];
        for(j=0; j<nbCarre; j++){
            ligneJeu.push((i+j)%2);
        }
        tableauJeu.push(ligneJeu);
    }
    u = Math.floor(canvas.width / (tableauJeu.length + 2));
    couleur = ["#aad751", "#a2d149"]
    for(i = 0; i < tableauJeu.length; i++){
        for(j = 0; j < tableauJeu[i].length; j++){
            ctx.beginPath();
            ctx.fillStyle = couleur[tableauJeu[i][j]];
            ctx.rect(u*(i + 1), u*(j + 1), u, u);
            ctx.fill();
            ctx.closePath();
        }
    }

}

function posHead(ctx){

    const img = new Image();

    img.onload = () => {
    ctx.save();
    ctx.translate(2*largeur + posH[1]*largeur, largeur + posH[0]*largeur);
    ctx.rotate(90 * Math.PI / 180);
    ctx.drawImage(img,0,0,largeur,largeur);
    ctx.restore();
    };
    img.src = "../img/asset/headSnakeRight.png";
}


function posCorp(ctx) {
    for(i = 0; i < tableauJeu.length; i++){
        for(j = 0; j < tableauJeu[i].length; j++){
            if(tabValue[i][j][0] == 2){
                ctx.beginPath();
                ctx.fillStyle = "#4774E4";
                ctx.rect(u*(j + 1), u*(i + 1.25), u, u / 2);
                ctx.fill();
                ctx.closePath();
            }
            if(tabValue[i][j][0] == 1){
                posHead(ctx);
            }
        }
    }
}

function fonctionImportante(ctx){
    drawGrid(ctx, nbCarre);
    posCorp(ctx)
    update();
}

/*
0 à droite
1 en haut
2 à gauche
3 en bas
*/

function update(){
    newT = []
    for(i = 0; i < tableauJeu.length; i++){
        L = [];
        for(j = 0; j < tableauJeu[i].length; j++){
            if(tabValue[i][j][0] == 2){
                L.push([3, tabValue[i][j][1]])
            } else if(tabValue[i][j][0] == 1){
                L.push([2, tabValue[i][j][1]])
                posH = [i, j]
            } else if(tabValue[i][j][0] == 0){
                L.push([0])
            } else if(tabValue[i][j][0] == 3){
                L.push([0])
            } else if(tabValue[i][j][0] == 4){
                L.push([4])
            }
        }
        newT.push(L);
    }
    tabValue = newT
    updateTete(posH);
}

function updateTete(posH){
    if(tabValue[posH[0]][posH[1]][1] == 0){
        tabValue[posH[0]][posH[1] + 1] = [1, 0]
    } else if(tabValue[posH[0]][posH[1]][1] == 1){
        tabValue[posH[0] - 1][posH[1]] = [1, 1]
    } else if(tabValue[posH[0]][posH[1]][1] == 2){
        tabValue[posH[0]][posH[1] - 1] = [1, 2]
    } else if(tabValue[posH[0]][posH[1]][1] == 3){
        tabValue[posH[0] + 1][posH[1]] = [1, 3]
    }
}
