"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Link as LinkIcon, AlertCircle, X, ClipboardPaste } from "lucide-react";
import { MediaPreview } from "./media-preview";
import { motion, AnimatePresence } from "framer-motion";

export function DownloaderForm() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any | null>(null);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
        }
    };

    const handleClear = () => {
        setUrl("");
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const res = await fetch("/api/download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Terjadi kesalahan pada server");
            }

            setData(result.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-12 w-full text-left">
            <Card className="neo-card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black/50" />
                        <Input
                            placeholder="TEMPEL LINK MEDIA DI SINI..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="neo-input pl-14 pr-24 h-16 text-xl uppercase tracking-tight placeholder:italic"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                            <AnimatePresence mode="wait">
                                {url ? (
                                    <motion.button
                                        key="clear"
                                        initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                                        type="button"
                                        onClick={handleClear}
                                        className="p-2 bg-destructive border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                                        title="Hapus"
                                    >
                                        <X size={18} className="text-white" />
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        key="paste"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={handlePaste}
                                        className="p-2 bg-accent border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                                        title="Tempel"
                                    >
                                        <ClipboardPaste size={18} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full md:w-auto"
                    >
                        <Button
                            type="submit"
                            disabled={loading}
                            className="neo-button cursor-pointer h-16 px-10 text-xl w-full"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2" />}
                            {loading ? "MENCARI..." : "UNDUH SEKARANG"}
                        </Button>
                    </motion.div>
                </form>
                <p className="mt-4 text-xs font-black uppercase text-black/40 text-center md:text-left">
                    Mendukung TikTok, YouTube, Instagram, Facebook • Video & Foto
                </p>
            </Card>

            <AnimatePresence mode="wait">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-destructive text-black p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 font-black uppercase md:text-xl"
                    >
                        <div className="bg-white border-4 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <div>{error}</div>
                    </motion.div>
                )}

                {data && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                    >
                        <MediaPreview data={data} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
