Write-Host "Creando entorno virtual para Django en la carpeta frontend..."
python -m venv ".\frontend\venv"  # Crea el entorno virtual en la carpeta "frontend"

Write-Host "Activando entorno virtual..."
& ".\frontend\venv\Scripts\Activate.ps1"  # Activar el entorno virtual desde la carpeta "frontend"

Write-Host "Instalando dependencias de Django..."
if (Test-Path ".\frontend\requirements.txt") {  # Verificar que "requirements.txt" esté en la carpeta "frontend"
    pip install -r ".\frontend\requirements.txt"  # Instalar dependencias desde "requirements.txt" en "frontend"
} else {
    Write-Host "No se encontró el archivo requirements.txt en la carpeta frontend."
}

Write-Host "Instalando dependencias de npm..."
# Cambiar al directorio frontend para asegurarnos de que npm vea el package.json
Set-Location -Path ".\frontend"
npm install  # Instalar las dependencias de npm en la carpeta "frontend"

Write-Host "Instalación completada. ¡Ya estás listo para trabajar!"
