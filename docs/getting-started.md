# Getting Started with CTAS

This guide will help you set up and run CTAS on your local machine for development and testing purposes.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4.4 or later)
- Neo4j (v4.2 or later)
- Docker (optional, for containerized deployment)

## Installation

1. Clone the CTAS repository:
   ```
   git clone https://github.com/your-org/ctas.git
   cd ctas
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=your_password
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the CTAS interface.

## Running Tests

To run the test suite:

```
npm test
```

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory.

## Next Steps

- Explore the [System Architecture](./system-architecture.md) to understand how CTAS components work together.
- Learn about the [Core Components](./core-components/index.md) that make up CTAS.
- Dive into the [HD4 Framework](./hd4-framework/index.md) to understand CTAS's approach to threat management.

If you encounter any issues during setup, please refer to the [Troubleshooting](./troubleshooting.md) guide or contact our support team.