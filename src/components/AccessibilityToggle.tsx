import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AccessibilityToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon: React.ReactNode;
}

const AccessibilityToggle: React.FC<AccessibilityToggleProps> = ({
  id,
  label,
  description,
  checked,
  onChange,
  icon,
}) => {
  return (
    <div className="flex items-center justify-between p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          {icon}
        </div>
        <div className="space-y-1">
          <Label htmlFor={id} className="text-base font-medium cursor-pointer">
            {label}
          </Label>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="ml-4"
      />
    </div>
  );
};

export default AccessibilityToggle;