import { ExerciseAttributeValueEnum } from "@prisma/client"

import Bodyweight from "@public/images/equipment/bodyweight.png";

import { EquipmentItem } from "../types";

export const EQUIPMENT_CONFIG: EquipmentItem[] = [
  {
    value: ExerciseAttributeValueEnum.BODY_ONLY,
    label: "Bodyweight",
    icon: Bodyweight,
    description: "Exercises using only your body weight",
    className: "h-12 w-12",
  }
]