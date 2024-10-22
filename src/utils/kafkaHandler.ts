import { generateHashHex } from './murmurHash';
import { getNeo4jDriver } from './neo4jDriver';

interface KafkaMessage {
  type: string;
  data: any;
}

export async function processKafkaMessage(message: KafkaMessage) {
  const { type, data } = message;
  const hashId = generateHashHex(JSON.stringify(data));
  const driver = getNeo4jDriver();
  const session = driver.session();

  try {
    switch (type) {
      case 'threat_actor':
        await session.run(
          `MERGE (a:ThreatActor {id: $hashId})
           SET a.name = $name, a.type = $type`,
          { hashId, name: data.name, type: data.type }
        );
        break;
      case 'vulnerability':
        await session.run(
          `MERGE (v:Vulnerability {id: $hashId})
           SET v.name = $name, v.cvss = $cvss`,
          { hashId, name: data.name, cvss: data.cvss }
        );
        break;
      // Add more cases for different message types
      default:
        console.warn(`Unknown message type: ${type}`);
    }
  } finally {
    await session.close();
  }

  return hashId;
}