## Marche suivre pour le projet ##
1 : Pensez, dans votre tête ou sur papier, le concept.  
2 : Imaginez votre DB, peux importe le moyen utilisé, ça doit aller assez vite.  
3 : Commencez à préparer votre JSON, testez la avec json-server.  
4 : Quand l'api est mise en place (1 journée max) penssez à votre front.  
5 : Lancez-vous dans la conception basique html du projet.  
6 : Commencez à lier vos actions dans l'html avec des events JS.  
7 : Avant toutes opérations de créations, delete, modif etc, préparer uniquement les fonctionnalités de reading de datas.  
8 : Quand toutes les données / bouttons, sont prêt vous pourrez commencer avec le CRUD (Create Read Update Delete) read déjà fait...  
9 : Commencez par le Create (form avec post comme method + lien du json server dans action (voir doc pour poster :))).  
10 : Commencez à mettre en place les updates des datas.  
11 : Préparez les deletes (inactive/desactivate) des datas.  

## Gestion magasin fruits et légumes ##
1 : Liste fruits et légumes (id, nom, prix achat, prix de vente, fournisseur, stock, origine, catégorie (fruit ou légume), image, ...)  
2 : Liste des fournisseurs (id, nom, adresse, produits (id), montant total achats, ...)  
3 : Liste des clients (id, nom, prenom, age, adresse, email, tel, montant total ventes, ...)  
4 : Liste des commandes fournisseurs (id, nom fournisseur (id), produit, quantité, prix total, date dernier achat, ...)  
5 : Liste des commandes clients (id, nom client (id), prix total, date derniere visite, (produits), ...)  
