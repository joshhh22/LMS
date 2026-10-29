import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorAlert({
  title = "Terjadi Kesalahan",
  message,
  onRetry,
}: ErrorAlertProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-sm text-red-700 mt-1">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="mt-3 border-red-300 bg-white text-red-800 hover:bg-red-50"
            >
              Coba Lagi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

