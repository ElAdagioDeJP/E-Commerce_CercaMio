Write-Host "Creando entorno virtual para Django..."
python -m venv venv

Write-Host "Activando entorno virtual..."
.\venv\Scripts\Activate.ps1

Write-Host "Instalando dependencias de Django..."
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
} else {
    Write-Host "No se encontró el archivo requirements.txt."
}

Write-Host "Instalando dependencias de npm..."
npm install

Write-Host "Instalación completada. ¡Ya estás listo para trabajar!"
