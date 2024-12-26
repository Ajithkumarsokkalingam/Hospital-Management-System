export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'patient' | 'receptionist';
  name: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  userId: string;
  specialty: string;
  department: string;
  availability: {
    days: string[];
    hours: string[];
  };
  contact: {
    phone: string;
    email: string;
  };
}

export interface Patient {
  id: string;
  userId: string;
  dateOfBirth: string;
  bloodGroup: string;
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: 'regular' | 'emergency';
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'medicine' | 'equipment' | 'consumable';
  quantity: number;
  unit: string;
  threshold: number;
  lastUpdated: string;
}