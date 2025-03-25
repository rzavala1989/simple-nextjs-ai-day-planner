import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ScheduleOutputProps {
    schedule: string;
}

export default function ScheduleOutput({ schedule }: ScheduleOutputProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Behold: Your Optimized Schedule 📅</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap">
                {schedule}
            </CardContent>
        </Card>
    );
}
