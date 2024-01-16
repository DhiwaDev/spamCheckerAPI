# SpamChecker API

## Overview

SpamChecker API is a RESTful API designed to be consumed by a mobile app. It provides functionalities similar to popular apps that identify spam numbers and allow users to find a person's name by searching for their phone number.

## Getting Started

### Prerequisites

- **Node.js:** Ensure that Node.js is installed on your machine. If not, download and install it from [nodejs.org](https://nodejs.org/).
- **MySQL:** You need a MySQL database for this application. Make sure to set up the database and update the configuration in `config/config.json`.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/spamchecker-api.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd spamchecker-api
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Database setup:**

   - Create a MySQL database.
   - Update the database configuration in `config/config.json`.

5. **Run the migration to create tables:**

   ```bash
   npx sequelize-cli db:migrate
   ```

### Running the Scripts

#### 1. `app.js` - Start the Server:

```bash
npm start
```

The server will be running at `http://localhost:3000`.

#### 2. `populate.js` - Populate Database with Sample Data:

```bash
node scripts/populateDatabaseScript.js
```

This script uses Faker.js to generate random user data and populates the database with 100 users.

#### 3. `auth.js` - Authentication Routes:

This script handles user registration, login, and profile routes. It includes the following routes:

- **Register a User:**

  ```bash
  POST http://localhost:3000/auth/register
  ```

- **Login:**

  ```bash
  POST http://localhost:3000/auth/login
  ```

- **Get User Profile (requires authentication):**

  ```bash
  GET http://localhost:3000/auth/profile
  ```

#### 4. `api.js` - API Routes:

This script includes routes for reporting spam, retrieving spam reports, and searching for users. It includes the following routes:

- **Report Spam:**

  ```bash
  POST http://localhost:3000/api/reportSpam/:userId
  ```

- **Get All Spam Reports:**

  ```bash
  GET http://localhost:3000/api/spamReports
  ```

- **Search Users:**

  ```bash
  GET http://localhost:3000/api/searchUsers?query=<searchQuery>
  ```

  Replace `<searchQuery>` with the name or phone number you want to search for.

### Testing

To run tests, use the following command:

```bash
npm test
```

## Contributing

Feel free to contribute by opening issues or creating pull requests.
```

This updated guide covers the new `searchUsers` route in `api.js` and provides an example of how to use it.