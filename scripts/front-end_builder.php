<?php

// Funzione per generare un file HTML
function generateHTMLFile($contentFile) {
    // Path dei file
    $headFile = "layout/head.html";
    $headerFile = "layout/header.html";
    $footerFile = "layout/footer.html";
    
    // Lettura del contenuto dei file
    $headContent = file_get_contents($headFile);
    $headerContent = file_get_contents($headerFile);
    $footerContent = file_get_contents($footerFile);
    $content = file_get_contents($contentFile);
    
    // Generazione del nome del file HTML
    $htmlFileName = pathinfo($contentFile, PATHINFO_FILENAME) . ".html";
    
    // Apertura del file HTML
    $htmlFile = fopen($htmlFileName, "w");
    
    // Scrittura dell'head nel file HTML
    fwrite($htmlFile, $headContent);
    
    // Scrittura dell'header nel file HTML
    fwrite($htmlFile, $headerContent);
    
    // Scrittura del contenuto nel file HTML
    fwrite($htmlFile, $content);
    
    // Scrittura del footer nel file HTML
    fwrite($htmlFile, $footerContent);
    
    // Chiusura del file HTML
    fclose($htmlFile);
    
    echo "File HTML generato: $htmlFileName\n";
}

// Cartella dei contenuti
$contentFolder = "content";

// Lettura dei file nella cartella dei contenuti
$contentFiles = glob($contentFolder . "/*.html");

// Generazione dei file HTML per ogni file nella cartella dei contenuti
foreach ($contentFiles as $contentFile) {
    generateHTMLFile($contentFile);
}

?>
