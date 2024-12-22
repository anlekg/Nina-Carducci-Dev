import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import fs from 'fs/promises';

const convertToWebP = async (inputDir, outputDir) => {
    try {
        const files = await fs.readdir(inputDir, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(inputDir, file.name);
            const outputPath = fullPath;

            if (file.isDirectory()) {
                // Créez le dossier de sortie s'il n'existe pas
                await fs.mkdir(outputPath, { recursive: true });
                // Récursion pour traiter les sous-dossiers
                await convertToWebP(fullPath, path.join(outputDir, file.name));
            } else if (/\.(jpe?g|png)$/i.test(file.name)) {
                // Convertir les images en WebP
                await imagemin([fullPath], {
                    destination: outputDir,
                    plugins: [
                        imageminWebp({ quality: 75 }) // Ajustez la qualité si nécessaire
                    ]
                });
                console.log(`Converti : ${outputPath}`);
            }
        }
    } catch (error) {
        console.error('Erreur lors de la conversion :', error);
    }
};

const inputDirectory = './images'; // Changez le chemin vers vos images

const main = async () => {
    try {
        await fs.mkdir(outputDirectory, { recursive: true });
        await convertToWebP(inputDirectory, outputDirectory);
        console.log('Conversion terminée !');
    } catch (error) {
        console.error('Erreur principale :', error);
    }
};

main();