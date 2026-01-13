export const WEIGHT_CONVERSION = {
  LBS_TO_KG: 0.453592,
  KG_TO_LBS: 2.20462,
} as const;

export type WeightUnit = "kg" | "lbs";

export function convertWeight(weight: number, fromUnit: WeightUnit, toUnit: WeightUnit): number {
  if (fromUnit === toUnit) return weight;

  if (fromUnit === "lbs" && toUnit === "kg") {
    return weight * WEIGHT_CONVERSION.LBS_TO_KG;
  }

  if (fromUnit === "kg" && toUnit === "lbs") {
    return weight * WEIGHT_CONVERSION.KG_TO_LBS;
  }

  return weight;
}

export function formatWeight(weight: number, unit: WeightUnit, decimals: number = 1): string {
  return `${weight.toFixed(decimals)} ${unit}`;
}

export function convertVolumeToUnit(
  exercises: Array<{
    sets: Array<{
      completed: boolean;
      types: string[];
      valuesInt?: number[];
      units?: string[];
    }>;
  }>,
  targetUnit: WeightUnit,
): number {
  let totalVolume = 0;

  exercises.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      if (set.completed && set.types.includes("REPS") && set.types.includes("WEIGHT") && set.valuesInt) {
        const repsIndex = set.types.indexOf("REPS");
        const weightIndex = set.types.indexOf("WEIGHT");

        const reps = set.valuesInt[repsIndex] || 0;
        const weight = set.valuesInt[weightIndex] || 0;

        // set unit
        const originalUnit: WeightUnit = set.units && set.units[weightIndex] === "lbs" ? "lbs" : "kg";

        const convertedWeight = convertWeight(weight, originalUnit, targetUnit);

        totalVolume += reps * convertedWeight;
      }
    });
  });

  return Math.round(totalVolume * 10) / 10; // round to 1 decimal
}
