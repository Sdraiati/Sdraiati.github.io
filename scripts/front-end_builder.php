<?php

// Definisci le directory di origine e destinazione
$contentDir = 'content/';
$layoutDir = 'layout/';
$outputDir = 'output/';

// Leggi tutti i file nella cartella "content"
$contentFiles = scandir($contentDir);

// Loop attraverso i file
foreach ($contentFiles as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'html') {
        // Leggi il contenuto del file HTML
        $content = file_get_contents($contentDir . $file);
        
        // Cerca e sostituisci le righe di import
        $content = preg_replace_callback('/^\s*import\s+(.+)$/m', function($matches) use ($layoutDir) {
            $layoutFile = trim($matches[1]);
            $layoutContent = file_get_contents($layoutDir . $layoutFile);
            return $layoutContent;
        }, $content);
        
        // Salva il contenuto generato nella cartella "output"
        file_put_contents($outputDir . $file, $content);
    }
}

echo "Operazione completata!\n";
?>
