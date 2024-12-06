let model;
let imageUploadElement = document.getElementById('imageUpload');

// Fonction pour initialiser le modèle et charger le fichier
export async function setupModel(URL, predictionCallback) {
  // Enregistrer la fonction callback de la prédiction
  window.predictionCallback = predictionCallback;

  // Charger le modèle Teachable Machine
  const modelURL = `${URL}model.json`;
  const metadataURL = `${URL}metadata.json`;

  model = await window.tmImage.load(modelURL, metadataURL);

  // Ajouter un écouteur d'événements pour l'upload d'image
  imageUploadElement.addEventListener('change', handleImageUpload);
}

// Fonction pour gérer l'image téléchargée et effectuer la prédiction
async function handleImageUpload(event) {
  let file = event.target.files[0];
  if (file) {
    let img = new Image();
    img.src = URL.createObjectURL(file); // Crée une URL temporaire pour l'image téléchargée
    img.onload = async () => {
      await predict(img); // Effectuer la prédiction sur l'image
    };
  }
}

// Fonction de prédiction
async function predict(image) {
  // Effectuer la prédiction sur l'image téléchargée
  const predictions = await model.predict(image);
  console.log(predictions); // Afficher les résultats dans la console
  
  // Mettre à jour le graphique avec les résultats de la prédiction
  window.predictionCallback(predictions);
}