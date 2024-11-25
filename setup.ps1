

# Crear el entorno virtual en la carpeta "frontend"
Write-Host "Creando entorno virtual para Django en la carpeta frontend..."
python -m venv ".\frontend\venv"  # Crea el entorno virtual en la carpeta "frontend"

# Activar el entorno virtual desde la carpeta "frontend"
Write-Host "Activando entorno virtual..."
& ".\frontend\venv\Scripts\Activate.ps1"

# Instalar dependencias de Django si existe requirements.txt
Write-Host "Instalando dependencias de Django..."
if (Test-Path ".\frontend\requirements.txt") {
    pip install -r ".\frontend\requirements.txt"
} else {
    Write-Host "No se encontró el archivo requirements.txt en la carpeta frontend."
}

# Instalar dependencias de npm en la carpeta "frontend"
Write-Host "Instalando dependencias de npm..."
Set-Location -Path ".\frontend"
npm install


Write-Host "Instalación completada. ¡Ya estás listo para trabajar!"
