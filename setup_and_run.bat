@echo off
echo ===========================================
echo       Smart Agri - Setup & Run Script
echo ===========================================

echo.
echo [1/4] Installing Backend Dependencies...
cd back
call npm install
cd ..

echo.
echo [2/4] Installing Frontend Dependencies...
cd front
call npm install
cd ..

echo.
echo [3/4] Checking MongoDB Connection...
echo Make sure MongoDB Community Server is installed and running!
echo If you haven't installed it, download from: https://www.mongodb.com/try/download/community 

echo.
echo [4/4] Starting the Application...
start cmd /k "cd back && npm run dev"
start cmd /k "cd front && npm run dev"

echo.
echo Success! The Backend and Frontend are launching in new windows.
echo Frontend URL: http://localhost:5173
pause
