# Smart Agriculture Monitoring System

To run this project on another machine, follow these steps:

## Prerequisites (Before you start)
1.  **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
2.  **MongoDB**: Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community).
    -   Make sure MongoDB is running as a service.

## How to Run

### Method 1: The Easy Way (Windows)
1.  Copy this entire project folder to the new computer.
2.  Double-click the **`setup_and_run.bat`** file.
3.  It will automatically install everything and start the servers.

### Method 2: Manual Way
1.  Open a terminal in the project folder.
2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```
3.  **Frontend Setup** (in a new terminal):
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Default Login
-   **Username**: `admin`
-   **Password**: `1234`

## Troubleshooting
-   If you see "MongoDB Connection Error", make sure MongoDB is installed and running.
-   If login fails, run `node backend/reset_admin.js` to reset the admin user.
