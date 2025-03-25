'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import TaskInput from './components/TaskInput';
import ScheduleOutput from './components/ScheduleOutput';
import LoadingSpinner from './components/LoadingSpinner';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: '400',
});

export default function Home() {
    const [tasks, setTasks] = useState('');

    const {
        mutate: generateSchedule,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tasks: tasks.split('\n').filter(Boolean) }),
            });
            if (!res.ok) throw new Error('Failed to generate schedule');
            return res.json();
        },
    });

    const handleGenerate = () => {
        reset();
        generateSchedule();
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-100 text-foreground">
            {/* Full-width Sticky Header */}
            <header
                className={`${orbitron.className} sticky top-0 z-50 p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center shadow-md`}
            >
                <h1 className="text-2xl font-extrabold tracking-tight">
                    Digital Day Planner
                </h1>
                <p className="mt-2 text-sm">
                    Organize your day with a little bit of help...
                </p>
            </header>

            {/* Main Content Container */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="mx-auto w-full md:max-w-[60%]">
                    {isPending && <LoadingSpinner />}
                    {isError && (
                        <p className="text-center text-red-500 bg-red-100 dark:bg-red-900 p-2 rounded-md my-4">
                            Error: {error.message}
                        </p>
                    )}
                    {data?.schedule && <ScheduleOutput schedule={data.schedule} />}
                </div>
            </div>

            {/* Sticky Footer for Task Input */}
            <footer className="sticky bottom-0 bg-slate-100 border-t border-slate-300 dark:border-slate-700 p-4">
                <div className="mx-auto w-full md:max-w-[60%]">
                    <TaskInput
                        tasks={tasks}
                        setTasksAction={setTasks}
                        generateScheduleAction={handleGenerate}
                        disabled={isPending}
                    />
                </div>
            </footer>
        </div>
    );
}
