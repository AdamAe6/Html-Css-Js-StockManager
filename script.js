////récupération de l'Html
let nom = document.querySelector(".nom");
let qte = document.querySelector(".qte");
let prixA = document.querySelector(".pa");
let prixV = document.querySelector(".pv");
let deroul = document.querySelector(".form-select");
let degre = document.querySelector(".degre");
let valide = document.querySelector(".boutonValider");
let div = document.querySelector(".droite");
let recherche = document.querySelector(".inputSearch");

////setup local storage////
tableau = [];
let produitsFilter = [];
let lsProduits = JSON.parse(localStorage.getItem("@produits"));

////récupération des données du local storage si == nul alors renvoyer vide////
if (!lsProduits) {
  tableau = [];
} else {
  tableau = lsProduits;
  afficherProduit();
}

////proto du produit////
function Product(n, q, pA, pV, dl, de) {
  this.n = n;
  this.q = q;
  this.pA = pA;
  this.pV = pV;
  this.dl = dl;
  this.de = de;
}

////création de la fonction qui va stocker les infos de nos produits
function afficherProduit() {
  ////on efface le contenu pour que lors de la boucle les élements ne s'ajoute pas////
  let contenu = "";

  ////déclaration d'une variable qui va changer de couleurs (blanc et rouge pour "l'alerte" du stock)
  let blanc = "white";

  let tva = 0;

  tableau.forEach((el, index) => {
    if (el.dl == "Alcool") {
      tva = 1.2;
    } else {
      tva = 1.05;
    }

    if (tableau[index].q < 5) {
      blanc = "red";
    }

    if (el.q < 0) {
      el.q = 0;
    }

    recherche.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        if (tableau[0].n != recherche.value) {
          let save = tableau[0];
          tableau.splice(0, 1);
          tableau.push(save);
          afficherProduit();
        }
      }
    });

    contenu +=
      "<p style='background-color: rgb(235, 235, 235); color: black; border :3px solid rgb(85, 54, 37);line-height= 1.5;word-spacing: 10px;'>" +
      '<button type="button" class="btn-close" aria-label="Close"></button>' +
      "<br />" +
      "NOM : " +
      el.n +
      " <br /> " +
      " Prix d'achat HT : " +
      el.pA +
      " <br /> " +
      " Prix de vente HT : " +
      el.pV +
      " <br /> " +
      "Type : " +
      el.dl +
      " <br />" +
      " Degrés d'alcool : " +
      el.de +
      " <br /> " +
      "Marge HT : " +
      (el.pV - el.pA) +
      " <br /> " +
      "Prix de vente TTC : " +
      el.pV * tva +
      "<br />" +
      " Quantité de produits : " +
      '<input type = "number" style="width: 10%; background-color: ' +
      blanc +
      ';" class ="incr" value="' +
      el.q +
      '"</input>' +
      "<br />" +
      '<button class="modif" value = index >...</button>' +
      '<div class="qrcode"></div>' +
      "</p>";
  });

  div.innerHTML = contenu;

  let supprimer = document.querySelectorAll(".btn-close");

  supprimer.forEach(function (supp, index) {
    if (prompt) {
      supp.addEventListener("click", function () {
        tableau.splice(index, 1);
        afficherProduit();
        localStorage.setItem("@produits", JSON.stringify(tableau));
      });
    }
  });

  let modifier = document.querySelectorAll(".modif");
  modifier.forEach(function (modif, index) {
    modif.addEventListener("click", function () {
      let produit = tableau[index];
      nom.value = produit.n;
      qte.value = produit.q;
      prixA.value = produit.pA;
      prixV.value = produit.pV;
      deroul.value = produit.dl;
      degre.value = produit.de;
      tableau.splice(index, 1);
      afficherProduit();
      localStorage.setItem("@produits", JSON.stringify(tableau));
    });
  });

  let incr = document.querySelectorAll(".incr");

  incr.forEach(function (incr, index) {
    incr.addEventListener("click", function () {
      if (incr.value > 5) {
        incr.style.backgroundColor = "white";
        localStorage.setItem("@produits", JSON.stringify(tableau));
      }
      if (incr.value < 5) {
        incr.style.backgroundColor = "red";
        localStorage.setItem("@produits", JSON.stringify(tableau));
      }
    });
    incr.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        if (incr.value > 5) {
          incr.style.backgroundColor = "white";
          localStorage.setItem("@produits", JSON.stringify(tableau));
        }
        if (incr.value < 5) {
          incr.style.backgroundColor = "red";
          localStorage.setItem("@produits", JSON.stringify(tableau));
        }
        alert("Quantité modifiée " + incr.value + " Articles");
        tableau[index].q = incr.value;
        localStorage.setItem("@produits", JSON.stringify(tableau));
      }
    });
  });
}

valide.addEventListener("click", function () {
  let limite = document.createElement("div");

  div.appendChild(limite);
  let contenu = new Product(
    nom.value,
    qte.value,
    prixA.value,
    prixV.value,
    deroul.value,
    degre.value
  );

  tableau.push(contenu);
  afficherProduit();
  localStorage.setItem("@produits", JSON.stringify(tableau));

  nom.value = "";
  qte.value = "";
  prixA.value = "";
  prixV.value = "";
  deroul.value = "";
  degre.value = "";
});