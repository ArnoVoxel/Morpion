function JoueurMorpion(nomJoueur, ordreJoueur, symboleJoueur){
    //données membres
    var nomJoueur; //joueur 1 - joueur 2 - ordi
    var ordreJoueur; // joue en 1er (tour impair) - joueur en 2eme (tour pair)
    var symboleJoueur; // symbole X ou O (images dans assets)

    //GETTERS
    this.getNomJoueur = function(){return nomJoueur};
    this.getOrdreJoueur = function(){return ordreJoueur};
    this.getSymboleJoueur = function(){return symboleJoueur};

    this.toString = function(){
        return nomJoueur + "\njoue en : " + ordreJoueur + "\navec le symbole : " + symboleJoueur
    };

    //SETTERS
    this.setNomJoueur = function(nouveauNomJoueur){
        nomJoueur = nouveauNomJoueur;
    };

    this.setOrdreJoueur = function(nouveauOrdreJoueur){
        ordreJoueur = nouveauOrdreJoueur;
    };

    this.setSymboleJoueur = function(nouveauSymboleJoueur){
        symboleJoueur = nouveauSymboleJoueur;
    };

    //initialisation
    this.setNomJoueur(nomJoueur);
    this.setOrdreJoueur(ordreJoueur);
    this.setSymboleJoueur(symboleJoueur);
}