import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
    return (
        <div
            role="status"
            className="flex flex-col items-center justify-center gap-2 my-8 animate-in fade-in duration-300"
        >
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Generating your magic schedule...</span>
        </div>
    );
}
