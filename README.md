# Inventory Management System Backend

A microservices-based backend application for comprehensive inventory management, sales tracking, and user authentication.

## Overview

This backend system is designed to support inventory management operations with a modular microservices architecture. The system consists of three main services:

- **Auth Service**: Handles user authentication, registration, and authorization
- **Inventory Service**: Manages inventory items, stock levels, and product information
- **Sales Service**: Processes sales transactions and generates reports

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **API Style**: RESTful
- **CORS**: Enabled for cross-origin requests

## Services

### Auth Service
Manages user authentication and authorization with endpoints at `/auth`.

### Inventory Service
Handles inventory management with endpoints at `/inventory`.

### Sales Service
Processes sales transactions with endpoints at `/sales`.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (or your configured database)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/inventory-app-backend.git
   cd inventory-app-backend
   ```

2. Install dependencies for each service
   ```
   cd auth-service && npm install
   cd ../inventory-service && npm install
   cd ../sales-service && npm install
   ```

3. Configure environment variables
   Create a `.env` file in each service directory with the required configuration.

4. Start the services
   ```
   # In separate terminals
   cd auth-service && npm start
   cd inventory-service && npm start
   cd sales-service && npm start
   ```

## API Testing

Each service includes a test endpoint at `/test` to verify the API is working correctly.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
