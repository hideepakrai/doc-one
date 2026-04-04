"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    title: string;
    description: string;
    confirmText?: string;
    type?: "danger" | "info";
    isLoading?: boolean;
}

export default function ConfirmModal({
    isOpen, onClose, onConfirm, title, description, confirmText = "Confirm", type = "danger", isLoading = false
}: ConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-primary-dark/40 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        className="relative w-full max-w-md bg-card rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
                    >
                        <div className="p-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg", 
                                    type === 'danger' ? 'bg-red-50 text-red-500 shadow-red-500/10' : 'bg-blue-50 text-blue-500 shadow-blue-500/10'
                                )}>
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-muted/60 hover:bg-muted rounded-full transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <h3 className="text-2xl font-bold tracking-tight text-primary-dark mb-4">{title}</h3>
                            <p className="text-muted-foreground font-medium mb-10 leading-relaxed">{description}</p>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={onClose}
                                    className="h-14 rounded-2xl border border-border font-bold text-sm hover:bg-muted transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={cn("h-14 rounded-2xl text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2",
                                        type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-primary hover:bg-primary-dark shadow-primary/20'
                                    )}
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
