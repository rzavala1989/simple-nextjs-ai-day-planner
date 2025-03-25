'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TaskInputProps {
    tasks: string;
    setTasksAction: (tasks: string) => void;
    generateScheduleAction: () => void;
    disabled: boolean;
}

export default function TaskInput({
                                      tasks,
                                      setTasksAction,
                                      generateScheduleAction,
                                      disabled,
                                  }: TaskInputProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateScheduleAction();
        }
    };

    // When input loses focus, re-focus after a brief delay.
    const handleBlur = () => {
        setTimeout(() => {
            textAreaRef.current?.focus();
        }, 0);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="task-input" className="text-sm text-muted-foreground">
                    What do you need to do today?
                </Label>
                <Textarea
                    id="task-input"
                    ref={textAreaRef}
                    placeholder={`E.g.
• 20 min run
• Prep meeting with Jessica
• Mow lawn
• Help daughter with science project`}
                    value={tasks}
                    onChange={(e) => setTasksAction(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    rows={6}
                    className="resize-none"
                    disabled={disabled}
                    autoFocus
                />
            </div>

            <Button
                onClick={generateScheduleAction}
                disabled={disabled}
                className="w-full font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
                {disabled ? 'Planning...' : '🧠 Plan My Day'}
            </Button>
        </div>
    );
}
