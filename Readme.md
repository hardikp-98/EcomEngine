---
# ECOM API Engine

Welcome to the ECOM API Engine README. Follow these steps to set up and run the ECOM API engine with sequelize db on your local machine.

## Installation

1. Clone the git repository or unzip the folder named `EcomEngine`.

    ```
    git clone https://github.com/hardikp-98/EcomEngine.git
    ```

2. Navigate to the `EcomEngine` directory and install the necessary Node.js modules.

    ```
    cd EcomEngine
    npm install
    ```

## Configuration

3. Open the configuration file and fill in below details (Mandatory):

`Note: make sure you have proper postgres/mysql connection`

    Path: `/src/config/local.ts`

    ```typescript
    export const config = Object.freeze({
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_NAME: 'ecomengine',
        DB_USERNAME: 'postgres',
        DB_PASSWORD: 'admin',
        DB_SCHEMA:'W',
        SERVER_PORT:8000,  // Port where you want to host application 
        JWT_SECRETKEY : 'Psh3iu2dhbjhb33322', // Secret key
        JWT_EXPIREIN: '1h', // JWT expiry 
        LOGIN_USERNAME: 'SYSTEM', // Login username
        LOGIN_PASSWORD: 'SYSTEM123'  // Login password
    });
    ```

## Running the Server

4. Once the configuration is done, start the server.

    ```
    npm run local
    ```

## Testing

5. Import the Postman collection from the provided folder.

6. Test the ping API to check whether the server is running or not.

7. Use the login API to generate a JWT token with the username and password configured in the config file. Use this token in the headers of other core APIs as `Authorization: Bearer <<token>>`.

That's it! You have successfully set up and configured the ECOM API engine on your local machine.

---
