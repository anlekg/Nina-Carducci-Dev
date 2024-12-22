import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import fs from 'fs/promises';

const optimizeWebP = async (inputDir, outputDir, quality = 75) => {
    try {
        const files = await fs.readdir(inputDir, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(inputDir, file.name);
            const outputPath = fullPath;

            if (file.isDirectory()) {
                // Créez le dossier de sortie s'il n'existe pas
                await fs.mkdir(outputPath, { recursive: true });
                // Récursion pour traiter les sous-dossiers
                await optimizeWebP(fullPath, path.join(outputDir, file.name), quality);
            } else if (/\.webp$/i.test(file.name)) {
                // Optimiser les fichiers WebP
                await imagemin([fullPath], {
                    destination: outputDir,
                    plugins: [
                        imageminWebp({ quality: quality }) // Ajuste la compression (valeur entre 0 et 100)
                    ]
                });
                console.log(`Optimisé : ${outputPath}`);
            }
        }
    } catch (error) {
        console.error("Erreur lors de l'optimisation :", error);
    }
};

const inputDirectory = './images'; // Changez le chemin vers vos images WebP

const main = async () => {
    try {
        await fs.mkdir(outputDirectory, { recursive: true });
        await optimizeWebP(inputDirectory, outputDirectory);
        console.log('Optimisation terminée !');
    } catch (error) {
        console.error('Erreur principale :', error);
    }
};

main();