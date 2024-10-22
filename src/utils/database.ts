/**
 * database.ts
 * Utility functions for interacting with the MongoDB database
 * Author: Charlie Payne
 * Date: June 15, 2023
 */

import { getDb } from './mongodb';
import { generateHashHex } from './murmurHash';

interface ThreatActor {
  id: string;
  name: string;
  type: string;
}

interface CTASTask {
  id: string;
  number: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  relatedActorId?: string;
  isSection: boolean;
}

/**
 * Retrieves all threat actors from the database
 * @returns An array of ThreatActor objects
 */
export async function getThreatActors(): Promise<ThreatActor[]> {
  const db = getDb();
  return await db.collection('threatActors').find().toArray();
}

/**
 * Creates a new threat actor in the database
 * @param name The name of the threat actor
 * @param type The type of the threat actor
 * @returns The newly created ThreatActor object
 */
export async function createThreatActor(name: string, type: string): Promise<ThreatActor> {
  const db = getDb();
  const id = generateHashHex(`${name}-${type}`);
  const newActor: ThreatActor = { id, name, type };
  await db.collection('threatActors').insertOne(newActor);
  return newActor;
}

/**
 * Retrieves all CTAS tasks from the database
 * @returns An array of CTASTask objects
 */
export async function getCTASTasks(): Promise<CTASTask[]> {
  const db = getDb();
  return await db.collection('task_ctas_5').find().toArray();
}

/**
 * Creates a new CTAS task in the database
 * @param number The task number
 * @param title The task title
 * @param description The task description
 * @param isSection Whether the task is a section
 * @param relatedActorId The ID of the related threat actor (optional)
 * @returns The newly created CTASTask object
 */
export async function createCTASTask(
  number: string,
  title: string,
  description: string,
  isSection: boolean,
  relatedActorId?: string
): Promise<CTASTask> {
  const db = getDb();
  const id = generateHashHex(`${number}-${title}`);
  const newTask: CTASTask = {
    id,
    number,
    title,
    description,
    status: 'Pending',
    relatedActorId,
    isSection
  };
  await db.collection('task_ctas_5').insertOne(newTask);
  return newTask;
}

/**
 * Updates the status of a CTAS task in the database
 * @param taskId The ID of the task to update
 * @param newStatus The new status for the task
 * @returns The updated CTASTask object, or null if the task wasn't found
 */
export async function updateCTASTaskStatus(
  taskId: string,
  newStatus: 'Pending' | 'In Progress' | 'Completed'
): Promise<CTASTask | null> {
  const db = getDb();
  const result = await db.collection('task_ctas_5').findOneAndUpdate(
    { id: taskId },
    { $set: { status: newStatus } },
    { returnDocument: 'after' }
  );
  return result.value;
}

/**
 * Retrieves all CTAS tasks with related actor information
 * @returns An array of CTASTask objects with an additional actorName property
 */
export async function getTasksWithRelatedActors(): Promise<(CTASTask & { actorName?: string })[]> {
  const db = getDb();
  const tasks = await getCTASTasks();
  const actors = await getThreatActors();
  return tasks.map(task => ({
    ...task,
    actorName: task.relatedActorId
      ? actors.find(actor => actor.id === task.relatedActorId)?.name
      : undefined
  }));
}