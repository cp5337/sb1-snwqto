import { v4 as uuidv4 } from 'uuid';

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

const getStoredData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStoredData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const initMockDatabase = (): void => {
  if (!localStorage.getItem('threatActors')) {
    const initialActors: ThreatActor[] = [
      { id: uuidv4(), name: 'APT29', type: 'Nation State' },
      { id: uuidv4(), name: 'Lazarus Group', type: 'Nation State' },
      { id: uuidv4(), name: 'FIN7', type: 'Cybercrime' },
    ];
    setStoredData('threatActors', initialActors);
  }

  if (!localStorage.getItem('ctasTasks')) {
    const initialTasks: CTASTask[] = [
      { id: uuidv4(), number: '1.0', title: 'Pre-Operational Planning', description: 'Initial planning phase', status: 'Pending', isSection: true },
      { id: uuidv4(), number: '1.1', title: 'Analyze APT29 TTPs', description: 'Review recent APT29 activities and update threat model', status: 'Pending', relatedActorId: initialActors[0].id, isSection: false },
      { id: uuidv4(), number: '1.2', title: 'Lazarus Group Infrastructure Mapping', description: 'Map out known Lazarus Group infrastructure and C2 servers', status: 'In Progress', relatedActorId: initialActors[1].id, isSection: false },
      { id: uuidv4(), number: '2.0', title: 'Operational Execution', description: 'Execution phase', status: 'Pending', isSection: true },
      { id: uuidv4(), number: '2.1', title: 'FIN7 Malware Analysis', description: 'Reverse engineer latest FIN7 malware samples', status: 'Completed', relatedActorId: initialActors[2].id, isSection: false },
    ];
    setStoredData('ctasTasks', initialTasks);
  }
};

export const getThreatActors = (): ThreatActor[] => {
  return getStoredData<ThreatActor>('threatActors');
};

export const createThreatActor = (name: string, type: string): ThreatActor => {
  const newActor: ThreatActor = { id: uuidv4(), name, type };
  const actors = getThreatActors();
  actors.push(newActor);
  setStoredData('threatActors', actors);
  return newActor;
};

export const getCTASTasks = (): CTASTask[] => {
  return getStoredData<CTASTask>('ctasTasks');
};

export const createCTASTask = (number: string, title: string, description: string, isSection: boolean, relatedActorId?: string): CTASTask => {
  const newTask: CTASTask = { 
    id: uuidv4(), 
    number, 
    title, 
    description, 
    status: 'Pending', 
    relatedActorId,
    isSection 
  };
  const tasks = getCTASTasks();
  tasks.push(newTask);
  setStoredData('ctasTasks', tasks);
  return newTask;
};

export const updateCTASTaskStatus = (taskId: string, newStatus: 'Pending' | 'In Progress' | 'Completed'): CTASTask | null => {
  const tasks = getCTASTasks();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;
    setStoredData('ctasTasks', tasks);
    return tasks[taskIndex];
  }
  return null;
};

export const getTasksWithRelatedActors = (): (CTASTask & { actorName?: string })[] => {
  const tasks = getCTASTasks();
  const actors = getThreatActors();
  return tasks.map(task => ({
    ...task,
    actorName: task.relatedActorId ? actors.find(actor => actor.id === task.relatedActorId)?.name : undefined
  }));
};

export const uploadTasksFromCSV = (csvContent: string): void => {
  const lines = csvContent.split('\n');
  const tasks = getCTASTasks();
  
  for (const line of lines.slice(1)) { // Skip header
    const [number, title, description, status, relatedActorId, isSection] = line.split(',');
    if (title && description) {
      tasks.push({
        id: uuidv4(),
        number: number.trim(),
        title: title.trim(),
        description: description.trim(),
        status: (status?.trim() as 'Pending' | 'In Progress' | 'Completed') || 'Pending',
        relatedActorId: relatedActorId?.trim() || undefined,
        isSection: isSection?.trim().toLowerCase() === 'true'
      });
    }
  }
  
  setStoredData('ctasTasks', tasks);
};