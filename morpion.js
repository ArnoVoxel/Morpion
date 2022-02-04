//déclaration variables
//variable qui contiendra l'objet joueur
var joueur1;
var joueur2;
//variables pour alimenter l'objet joueur
var nomJoueur1 = "joueur1";
var nomJoueur2 = "";
var ordreJoueur1 = 0;
var ordreJoueur2 = 0;
var symboleJoueur1 = "";
var symboleJoueur2 = "";
//variable pour savoir quel objet joueur utiliser
var joueurActif;
//initialisation de la grille repère
var tGrille = [1,2,3,4,5,6,7,8,9];
var affichageGrille = document.getElementById("grilleMorpion");
//variables de contrôles de fin de partie
var tour = 1;
var victory = false; //flag de fin

var btnReStart = document.getElementById('restart');

var affichageOrdreJoueur1 = document.getElementById("ordreJoueur1");
var affichageSymboleJoueur1 = document.getElementById("symboleJoueur1");
var affichageOrdreJoueur2 = document.getElementById("ordreJoueur2");
var affichageSymboleJoueur2 = document.getElementById("symboleJoueur2");

btnReStart.addEventListener("click", nouvellePartie);

//déterminer le nombre de joueurs humains
modeDeJeu();

//choisir le symbole du pion
selectPion();

//déterminer quel joueur commence aléatoirement
ordreAleatoire();

//création du joueur pour stocker ses infos
creationJoueurs();

//Afficher les joueurs dans le fieldset infos
affichageInfosJoueurs();

//initialiser l'affichage du tour en cours
var tourActif = document.getElementById("tour");
tourActif.innerHTML = tour;

//remplir une grille vide (uniquement des images -> point.png)
affichageGrilleMorpion();

//boucle
//début de tour - maximum 9 tours
// incrémentation pour chaque tour de boucle et savoir si tour pair ou impair


//joueur actif (si pair ou impair pour alterner les tours) 
//si joueur humain clique une case


//si ordi choisit une case

caseJouerOrdi(); //si Ordi joue en 1er doit pouvoir initialiser une case

//afficher la case


//vérifier alignements

//fin boucle

//condition fin de partie

//afficher résultat

//FONCTIONS
function modeDeJeu(){
    var reg = /^[12]$/
    do{
        var choixModeJeu = prompt("mode de jeu\n2 joueurs humains tapez - 1\ncontre l'ordi tapez - 2");
    } while (!reg.test(choixModeJeu));

    if (choixModeJeu == 1){
        nomJoueur2 = "joueur2";
    } else {
        nomJoueur2 = "ordi";
    }
}

function selectPion(){
    var reg = /^[12]$/
    do{
        var choixSymbole = prompt("joueur 1 choisissez votre symbole\npour avoir les 'X' tapez - 1\npour avoir les '0' tapez - 2");
    } while (!reg.test(choixSymbole));

    if (choixSymbole == 1){
        symboleJoueur1 = 'X';
        symboleJoueur2 = 'O';
    } else {
        symboleJoueur1 = 'O';
        symboleJoueur2 = 'X';
    }
}

function ordreAleatoire(){
    ordreJoueur1 = parseInt(Math.random()*2+1);
    if(ordreJoueur1 == 1){
        ordreJoueur2 = 2;
    } else {
        ordreJoueur2 = 1;
    }
}

function creationJoueurs(){
    joueur1 = new JoueurMorpion(nomJoueur1, ordreJoueur1, symboleJoueur1);
    joueur2 = new JoueurMorpion(nomJoueur2, ordreJoueur2, symboleJoueur2);
}

function affichageGrilleMorpion(){ //TODO abonner les cases pour modifier
    affichageGrille.innerHTML = "";
    for(let i in tGrille){
        var caseGrille = document.createElement('img'); //création d'un élément à chaque boucle
        caseGrille.setAttribute('src', 'assets/point.png');
        caseGrille.setAttribute('id', i);
        caseGrille.addEventListener("click", afficherSymbole);
        affichageGrille.appendChild(caseGrille);
    }
}

function afficherSymbole(){ // afficher le symbole dans la grille et modifier valeur dans tGrille
    ordreJoueurActif();
    if(typeof(tGrille[this.getAttribute('id')]) == 'number'){
        tGrille[this.getAttribute('id')] = joueurActif.getSymboleJoueur();
        this.setAttribute('src', 'assets/'+joueurActif.getSymboleJoueur()+'.png');
        tourActif.innerHTML = tour;
        victoireJoueur();
        finPartieEgalite();
        tour++;
    }
    if(joueur2.getNomJoueur()=='ordi'){ 
        ordiAuto();
    }
}

function ordreJoueurActif(){
    if (tour % 2 == 0 && joueur1.getOrdreJoueur() == 2){ // modulo pour savoir si tour pair ou impair modulo de 0 tour pair, sinon impair
        joueurActif = joueur1;
    } else if(tour % 2 == 0 && joueur2.getOrdreJoueur() == 2){
        joueurActif = joueur2;
    } else if(tour % 2 != 0 && joueur1.getOrdreJoueur() == 1){
        joueurActif = joueur1;
    } else {
        joueurActif = joueur2;
    }
}

function victoireJoueur(){
    var condition = tGrille[0]==tGrille[1] && tGrille[1]==tGrille[2]
    || tGrille[3]==tGrille[4] && tGrille[4]==tGrille[5]
    || tGrille[6]==tGrille[7] && tGrille[7]==tGrille[8]
    || tGrille[0]==tGrille[4] && tGrille[4]==tGrille[8]
    || tGrille[6]==tGrille[4] && tGrille[4]==tGrille[2]
    || tGrille[0]==tGrille[3] && tGrille[3]==tGrille[6]
    || tGrille[1]==tGrille[4] && tGrille[4]==tGrille[7]
    || tGrille[2]==tGrille[5] && tGrille[5]==tGrille[8];

    if (condition){
            victory = true;
            btnReStart.style = "display : inline-block";
            document.getElementById("affichageJoueurs").innerHTML = joueurActif.getNomJoueur() + " a gagné !";
            // alert("Victoire : "+joueurActif.getNomJoueur());
        }
}

function finPartieEgalite(){
    var condition = tGrille[0]==tGrille[1] && tGrille[1]==tGrille[2]
    || tGrille[3]==tGrille[4] && tGrille[4]==tGrille[5]
    || tGrille[6]==tGrille[7] && tGrille[7]==tGrille[8]
    || tGrille[0]==tGrille[4] && tGrille[4]==tGrille[8]
    || tGrille[6]==tGrille[4] && tGrille[4]==tGrille[2]
    || tGrille[0]==tGrille[3] && tGrille[3]==tGrille[6]
    || tGrille[1]==tGrille[4] && tGrille[4]==tGrille[7]
    || tGrille[2]==tGrille[5] && tGrille[5]==tGrille[8];

    if(tour == 9 && !condition){
        btnReStart.style = "display : inline-block";
        alert("EGALITE");
    }
}

function caseOrdi(){
    var nombre = parseInt(Math.random()*9); //valeur entre 0 et 8 correspondant aux indices du tableau tGrille
    return nombre;
}

function caseJouerOrdi(){ //nombre random entre 0 et 8 (les indices du tableai tGrille)
    ordreJoueurActif();
    if(joueurActif.getNomJoueur() == 'ordi' && tour < 10 && victory == false){
        var nombre = -1;
        do {
            nombre = caseOrdi();
        } while (typeof(tGrille[nombre]) != 'number');

        tGrille[nombre] = joueurActif.getSymboleJoueur();
        var caseModify = document.getElementById(nombre);
        caseModify.setAttribute('src', 'assets/'+joueurActif.getSymboleJoueur()+'.png');
        tourActif.innerHTML = tour;
        victoireJoueur();
        finPartieEgalite();
        tour++;
    }
}

function ordiAuto(){ // pour avoir un délai avant apparition du choix de l'ordi
    setTimeout(caseJouerOrdi, 1000);
}

function nouvellePartie(){
    tour = 1;
    tGrille = [1,2,3,4,5,6,7,8,9];
    victory = false;
    modeDeJeu();
    selectPion();
    ordreAleatoire();
    creationJoueurs();
    affichageGrilleMorpion();
    affichageInfosJoueurs();
    caseJouerOrdi();
    btnReStart.style = "display : none";
}

function affichageInfosJoueurs(){
    document.getElementById("affichageJoueurs").innerHTML = "<div class=\"joueur\"\><div>Joueur 1</div\><br\><div>joue en : <span id=\"ordreJoueur1\"></span></div\><br\><div>avec le symbole : <span id=\"symboleJoueur1\"></span></div\></div\><br\><div class=\"joueur\"\><div>Joueur 2</div\><br\><div>joue en : <span id=\"ordreJoueur2\"></span></div\><br\><div>avec le symbole : <span id=\"symboleJoueur2\"></span></div\></div>";
    affichageOrdreJoueur1.innerHTML = joueur1.getOrdreJoueur();
    affichageSymboleJoueur1.innerHTML = joueur1.getSymboleJoueur();

    affichageOrdreJoueur2.innerHTML = joueur2.getOrdreJoueur();
    affichageSymboleJoueur2.innerHTML = joueur2.getSymboleJoueur();

    console.log(joueur1.toString());
    console.log(joueur2.toString());
}