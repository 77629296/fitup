"use client";
import Image from "next/image"
import { Card, CardContent } from '@/components/ui/card';

import { useI18n } from 'locales/client';
import { getEquipmentTranslation } from "@/shared/lib/workout-session/equipments";

import { EQUIPMENT_CONFIG } from "../model/equipment-config";
import { ExerciseAttributeValueEnum } from '@prisma/client';

interface EquipmentSelectionProps {
  onClearEquipment: VoidFunction;
  onToggleEquipment: (equipment: ExerciseAttributeValueEnum) => void;
  selectedEquipment: ExerciseAttributeValueEnum[];
}

interface EquipmentCardProps {
  equipment: (typeof EQUIPMENT_CONFIG)[0];
  isSelected: boolean;
  onToggle: () => void;
}

function EquipmentCard({ equipment, isSelected, onToggle }: EquipmentCardProps) {
  const t = useI18n();
  const translation = getEquipmentTranslation(equipment.value, t);

  return (
    <Card>
      <CardContent>
        <div>
          {isSelected && (
            <div>
              <div>
                badge
              </div>
            </div>
          )}
          <div>
            <div>
              <Image
                alt={`${translation.label} illustration`}
                className="object-contain3"
                height={48}
                src={equipment.icon}
                style={{
                  width: "6.25rem",
                  height: "5rem",
                }}
                width={64}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function EquipmentSelection({ onToggleEquipment, selectedEquipment }: EquipmentSelectionProps) {
  return (
    <div className="space-y-6">
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          EQUIPMENT_CONFIG.map((equipment, index) => (
            <div
              className='animate-fade-in-up'
              key={equipment.value}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <EquipmentCard
                equipment={equipment}
                isSelected={selectedEquipment.includes(equipment.value)}
                onToggle={() => onToggleEquipment(equipment.value)}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}