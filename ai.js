import { initAI, classifyAI } from './aimodels.min.js'

document.addEventListener('DOMContentLoaded', async () => {

    // Select the concept to detect in Image
    const concepts = ["Imagenet"]; // ["Imagenet", "NSFW", "Porn"];

    // Optionally, call initAI to help initialization 
    await initAI(concepts)

    // Get the image element 
    const imgElement = document.getElementById('imgdiv'); 
    // const imgElement = "http://127.0.0.1:8082/peacock.jpg";

    // Detect and get the results
    // Consider get consent from user to contribute data in privacy preserving way, and improve models.
    let results = await classifyAI(imgElement, concepts, false, true);

    // Do action based on results
    console.log(results);
});