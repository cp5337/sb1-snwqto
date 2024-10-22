import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface VRaven {
  id: string;
  name: string;
  location: string;
  status: 'Active' | 'Inactive';
  target: string;
}

const VRavensList: React.FC = () => {
  const [vRavens, setVRavens] = useState<VRaven[]>([
    { id: 'vr1', name: 'vRaven-Energy-1', location: 'Texas, USA', status: 'Active', target: 'Texas Power Grid' },
    { id: 'vr2', name: 'vRaven-TexasGrid-1', location: 'Austin, TX', status: 'Active', target: 'ERCOT' },
    { id: 'vr3', name: 'vRaven-NYPD-1', location: 'New York City, NY', status: 'Active', target: 'NYPD HQ' },
    { id: 'vr4', name: 'vRaven-LAPD-ECrimes-1', location: 'Los Angeles, CA', status: 'Active', target: 'LAPD E-Crimes Division' },
    { id: 'vr5', name: 'vRaven-FDLE-1', location: 'Tallahassee, FL', status: 'Inactive', target: 'FDLE Regional Offices' },
    { id: 'vr6', name: 'vRaven-DEA-1', location: 'Washington, D.C.', status: 'Active', target: 'DEA Headquarters' },
    { id: 'vr7', name: 'vRaven-StMarys-1', location: 'San Francisco, CA', status: 'Inactive', target: 'St. Mary\'s Medical Center' },
    { id: 'vr8', name: 'vRaven-MiamiPD-1', location: 'Miami, FL', status: 'Active', target: 'Miami Police Department' },
    { id: 'vr9', name: 'vRaven-ChicagoFD-1', location: 'Chicago, IL', status: 'Active', target: 'Chicago Fire Department' },
    { id: 'vr10', name: 'vRaven-SeattlePort-1', location: 'Seattle, WA', status: 'Active', target: 'Port of Seattle' },
    { id: 'vr11', name: 'vRaven-BostonTransit-1', location: 'Boston, MA', status: 'Inactive', target: 'MBTA Transit System' },
    { id: 'vr12', name: 'vRaven-PhoenixWater-1', location: 'Phoenix, AZ', status: 'Active', target: 'Phoenix Water Services' },
  ]);

  // ... rest of the component code ...

};

export default VRavensList;