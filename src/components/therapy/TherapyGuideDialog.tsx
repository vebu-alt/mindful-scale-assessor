
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import TherapyGuide from './TherapyGuide';
import { TherapyType } from '@/utils/therapyGuides';

interface TherapyGuideDialogProps {
  therapyType: TherapyType;
  triggerElement?: React.ReactNode;
}

const TherapyGuideDialog: React.FC<TherapyGuideDialogProps> = ({ 
  therapyType,
  triggerElement
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerElement || (
          <Button variant="outline" size="sm" className="gap-1">
            <InfoIcon size={16} />
            <span>View Therapy Guide</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
        <TherapyGuide 
          therapyType={therapyType} 
          onClose={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default TherapyGuideDialog;
