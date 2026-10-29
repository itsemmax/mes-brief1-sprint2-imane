let produits = [
  { id: 1, nom: "Jus d'orange", prix: 8 },
  { id: 2, nom: "Sandwich", prix: 15 },
  { id: 3, nom: "Biscuit", prix: 5 },
];

const formulaire = document.querySelector("#formulaire");
const champNom = document.querySelector("#nom");
const champPrix = document.querySelector("#prix");
const listeProduits = document.querySelector("#liste-produits");
const compteur = document.querySelector("#compteur");
const total = document.querySelector("#total");
const titreFormulaire = document.querySelector("#titre-formulaire");
const boutonEnregistrer = document.querySelector("#bouton-enregistrer");
const boutonAnnuler = document.querySelector("#bouton-annuler");

let produit_id = 0;
let t=0;
function afficherProduits() {
  listeProduits.replaceChildren();

  produits.forEach(function (produit) {
    const carte = document.createElement("article");
    carte.className = "product-card";

    const nom = document.createElement("h3");
    nom.textContent = produit.nom;

    const prix = document.createElement("p");
    prix.textContent = produit.prix.toFixed(2) + " DH";

    const boutonModifier = document.createElement("button");
    boutonModifier.type = "button";
    boutonModifier.className = "btn btn-edit";
    boutonModifier.textContent = "Modifier";
    boutonModifier.addEventListener("click",()=>{
      champNom.value = produit.nom;
      champPrix.value = produit.prix;
      produit_id = produit.id;
      boutonEnregistrer.text="Modifier le produit";
      boutonAnnuler.hidden = false;
      window.scrollTo(0,0);
    })

    carte.append(nom, prix, boutonModifier);
    listeProduits.appendChild(carte);
  });
}

boutonAnnuler.addEventListener("click",()=>{
  formulaire.reset();
  produit_id = 0;
  boutonAnnuler.hidden=true;
  boutonEnregistrer.text="Ajouter au panier";
})

function ajouterProduit(event) {
  event.preventDefault();

  const nom = champNom.value.trim();
  const prix = Number(champPrix.value);

  if (nom === "" || !Number.isFinite(prix) || prix <= 0) {
    alert("Saisissez un nom et un prix supérieur à 0.");
    return;
  }
  if(produit_id == 0){
  const nouvelId =
    produits.length === 0
      ? 1
      : Math.max(
          ...produits.map(function (produit) {
            return produit.id;
          }),
        ) + 1;

  const nouveauProduit = { id: nouvelId, nom: nom, prix: prix };
  produits.push(nouveauProduit);
  }
  else{
    for(let i=0;i<produits.length;i++){
      if(produits[i].id == produit_id){
      produits[i].id = produit_id;
      produits[i].nom= champNom.value.trim();
      produits[i].prix = Number(champPrix.value);
      }
    }
  }
  compteur.textContent=`${produits.length} produit(s)`;
  for(let i=0;i<produits.length;i++){
    t += produits[i].prix;
  }
  total.textContent=`${t} DH`;
  afficherProduits();
  formulaire.reset();
  produit_id = 0;
  boutonAnnuler.hidden=true;
  boutonEnregistrer.text="Ajouter au panier";
}

formulaire.addEventListener("submit", ajouterProduit);

afficherProduits();
