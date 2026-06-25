<?php
function convertToWebP($source, $destination, $quality=80) {
    $info = getimagesize($source);
    
    if ($info['mime'] == 'image/jpeg') 
        $image = imagecreatefromjpeg($source);
    elseif ($info['mime'] == 'image/png') {
        $image = imagecreatefrompng($source);
        imagepalettetotruecolor($image);
        imagealphablending($image, true);
        imagesavealpha($image, true);
    }
    else
        return false;
    
    // Convert and save as WebP
    $result = imagewebp($image, $destination, $quality);
    imagedestroy($image);
    return $result;
}

// Saari images convert karo /img/ folder se
$imageDir = $_SERVER['DOCUMENT_ROOT'] . '/img/';
$images = glob($imageDir . '*.{jpg,jpeg,png}', GLOB_BRACE);

foreach ($images as $image) {
    $webpPath = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $image);
    if (!file_exists($webpPath)) {
        convertToWebP($image, $webpPath, 80);
        echo "Converted: " . basename($image) . " → " . basename($webpPath) . "<br>";
    }
}
echo "Done! All images converted.";
?>