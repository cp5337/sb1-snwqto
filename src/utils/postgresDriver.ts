/**
 * postgresDriver.ts
 * Utility functions for connecting to and interacting with PostgreSQL
 * Author: Charlie Payne
 * Date: June 15, 2023
 */

import { Pool } from 'pg';

let pool: Pool | null = null;

export function initPostgres() {
  pool = new Pool({
    user: process.env.POSTGRES_USER || 'ctas_user',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'ctas_geospatial',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  });
}

export function getPostgresPool(): Pool {
  if (!pool) {
    throw new Error('PostgreSQL pool not initialized. Call initPostgres() first.');
  }
  return pool;
}

export async function closePostgres() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Example query function for GeoJSON data
export async function queryGeospatialData(sql: string, params: any[] = []) {
  const client = await getPostgresPool().connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// Function to insert GeoJSON data
export async function insertGeoJSONData(geoJSON: any) {
  const client = await getPostgresPool().connect();
  try {
    const query = `
      INSERT INTO geospatial_data (geom, properties)
      VALUES (ST_GeomFromGeoJSON($1), $2)
    `;
    await client.query(query, [JSON.stringify(geoJSON.geometry), JSON.stringify(geoJSON.properties)]);
  } finally {
    client.release();
  }
}