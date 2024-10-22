import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver;

export function initNeo4j() {
  const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
  const user = process.env.NEO4J_USER || 'neo4j';
  const password = process.env.NEO4J_PASSWORD || 'password';

  driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
}

export function getNeo4jDriver() {
  if (!driver) {
    throw new Error('Neo4j driver not initialized. Call initNeo4j() first.');
  }
  return driver;
}

export async function closeNeo4j() {
  if (driver) {
    await driver.close();
  }
}