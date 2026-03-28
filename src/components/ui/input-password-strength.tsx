"use client";

import { useId, useMemo, forwardRef } from "react";
import { Check, X } from "lucide-react";

import { Input, InputProps } from "@/components/ui/input";

export const InputPasswordStrength = forwardRef<HTMLInputElement, InputProps>(({ onChange, value, ...props }, ref) => {
  const id = useId();

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass || ""),
      text: req.text,
    }));
  };

  const strength = checkStrength(value as string);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <div className="min-w-[300px]">
      <div className="space-y-2">
        <div className="relative">
          <Input
            aria-describedby={`${id}-description`}
            aria-invalid={strengthScore < 4}
            className="pe-9"
            id={id}
            onChange={onChange}
            placeholder="Password"
            ref={ref}
            type={"password"}
            value={value}
            {...props}
          />
        </div>
      </div>

      <div
        aria-label="Password strength"
        aria-valuemax={4}
        aria-valuemin={0}
        aria-valuenow={strengthScore}
        className="bg-border mb-4 mt-3 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        />
      </div>

      <p className="text-foreground mb-2 text-sm font-medium" id={`${id}-description`}>
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      <ul aria-label="Password requirements" className="space-y-1.5">
        {strength.map((req, index) => (
          <li className="flex items-center gap-2" key={index}>
            {req.met ? (
              <Check aria-hidden="true" className="text-emerald-500" size={16} />
            ) : (
              <X aria-hidden="true" className="text-muted-foreground/80" size={16} />
            )}
            <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
              {req.text}
              <span className="sr-only">{req.met ? " - Requirement met" : " - Requirement not met"}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

InputPasswordStrength.displayName = "InputPasswordStrength";
