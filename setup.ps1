# Ruta del entorno virtual
$venvPath = ".\frontend\venv"

# Verificar si el entorno virtual ya existe
if (Test-Path $venvPath) {
    Write-Host "El entorno virtual ya existe. Activandolo..."
    & "$venvPath\Scripts\Activate.ps1"
} else {
    # Crear el entorno virtual si no existe
    Write-Host "El entorno virtual no existe. Creandolo en la carpeta 'frontend'..."
    python -m venv $venvPath

    # Activar el entorno virtual después de crearlo
    Write-Host "Activando entorno virtual recién creado..."
    & "$venvPath\Scripts\Activate.ps1"
}

# Siempre instalar dependencias de Django desde requirements.txt si existe
Write-Host "Instalando dependencias de Django..."
if (Test-Path ".\backend\requirements.txt") {
    pip install -r ".\backend\requirements.txt"
} else {
    Write-Host "No se encontró el archivo requirements.txt en la carpeta backend."
}

# Instalar dependencias de npm en la carpeta "frontend"
Write-Host "Instalando dependencias de npm..."
Set-Location -Path ".\frontend"
npm install

Write-Host "Instalación completada. ¡Ya estás listo para trabajar!"
