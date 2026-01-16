"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface MediaPreviewProps {
    data: {
        platform: string;
        title: string;
        thumbnail: string;
        url: string;
        type: "video" | "image" | "audio";
    };
}

export function MediaPreview({ data }: MediaPreviewProps) {
    // Helper untuk generate link proxy
    const getDownloadLink = (url: string, title: string) => {
        // Safe base64 untuk browser dan node
        const base64 = typeof window !== 'undefined'
            ? btoa(unescape(encodeURIComponent(url)))
            : Buffer.from(url).toString('base64');

        return `/api/proxy?url=${encodeURIComponent(base64)}&filename=${encodeURIComponent(title)}.mp4`;
    };

    return (
        <Card className="neo-card overflow-hidden text-left bg-white">
            <div className="bg-primary p-4 border-b-4 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="font-black uppercase text-2xl tracking-tighter">{data.platform}</span>
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                >
                    KUALITAS ORIGINAL
                </motion.div>
            </div>

            <div className="p-6 md:p-10 flex flex-col md:flex-row gap-10">
                <motion.div
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="w-full md:w-2/5 aspect-video bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group cursor-crosshair"
                >
                    <img
                        src={data.thumbnail}
                        alt={data.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors pointer-events-none" />
                </motion.div>

                <div className="flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                        <h3 className="text-3xl md:text-4xl font-black uppercase leading-none tracking-tight break-words">{data.title}</h3>
                        <div className="flex items-center gap-2 text-primary font-black uppercase italic text-sm">
                            <ShieldCheck size={18} />
                            Unduhan Terverifikasi
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <motion.div
                            whileHover={{ y: -4 }}
                            whileTap={{ y: 2 }}
                        >
                            <Button
                                asChild
                                className="neo-button h-16 text-2xl bg-secondary group w-full"
                            >
                                <a href={getDownloadLink(data.url, data.title)} download>
                                    <Download className="mr-3 h-6 w-6 group-hover:translate-y-1 transition-transform" />
                                    UNDUH MEDIA
                                </a>
                            </Button>
                        </motion.div>

                        <div className="flex items-center gap-4">
                            <motion.a
                                whileHover={{ backgroundColor: "#000", color: "#fff" }}
                                href={data.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 text-center py-2 font-black uppercase text-[10px] border-2 border-dashed border-black transition-colors"
                            >
                                <ExternalLink size={12} className="inline mr-2" /> Link Langsung
                            </motion.a>
                            <div className="text-[10px] font-bold uppercase opacity-40 leading-none">
                                Link kedaluwarsa dalam <br /> 24 jam
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black text-white p-2 text-center text-[10px] font-black tracking-[0.2em] uppercase">
                Proses unduhan aman melalui Unduhin Proxy Engine v1.0
            </div>
        </Card>
    );
}
