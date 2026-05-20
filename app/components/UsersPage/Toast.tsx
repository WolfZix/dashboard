import { Check, X } from "lucide-react";

type ToastProps = {
  type: "success" | "error";
  message: string;
};

export default function Toast({ type, message }: ToastProps) {
  const isSuccess = type === "success";
  return (
    <div className="fixed bottom-5 right-5 w-80 overflow-hidden rounded-2xl border border-slate-700 light:border-[#e2e8f0] bg-slate-900 light:bg-white shadow-2xl z-9999 select-none">
      <div className="flex items-center gap-3 p-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${isSuccess ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
        >
          {isSuccess ? <Check size={20} /> : <X size={20} />}
        </div>
        <div>
          <div className="font-semibold">
            {isSuccess ? "Success!" : "Error!"}
          </div>
          <div className="text-sm text-slate-400">{message}</div>
        </div>
      </div>
      <div
        className={`h-1 animate-toast ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
      />
    </div>
  );
}
