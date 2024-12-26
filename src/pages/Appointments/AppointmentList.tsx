import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { Text, Heading2 } from '../../components/ui/Typography';
import { StatusBadge } from '../../components/ui/StatusBadge';

export function AppointmentList() {
  const { appointments, doctors, patients } = useStore();

  if (appointments.length === 0) {
    return (
      <Card className="text-center py-8">
        <Text>No appointments scheduled yet.</Text>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const doctor = doctors.find(d => d.id === appointment.doctorId);
        const patient = patients.find(p => p.id === appointment.patientId);

        return (
          <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <Heading2 className="text-lg">
                  Appointment with Dr. {doctor?.specialty || 'Unknown'}
                </Heading2>
                <Text className="mt-1">
                  Patient: {patient?.userId || 'Unknown'}
                </Text>
                <Text className="mt-1">
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </Text>
                {appointment.notes && (
                  <Text className="mt-2 italic">
                    Notes: {appointment.notes}
                  </Text>
                )}
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={appointment.status} />
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}