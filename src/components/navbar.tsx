"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-50 p-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        className="bg-primary border-4 border-black w-10 h-10 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all"
                    >
                        <span className="font-black text-2xl">U</span>
                    </motion.div>
                    <span className="font-black text-3xl uppercase tracking-tighter group-hover:text-secondary transition-colors">Unduhin</span>
                </Link>

                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button asChild variant="outline" className="hidden md:flex font-black uppercase border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                            <a href="https://github.com/void-panda" target="_blank" rel="noreferrer">
                                <Github className="mr-2 h-5 w-5" /> void-panda
                            </a>
                        </Button>
                    </motion.div>

                    <motion.a
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        href="https://github.com/void-panda"
                        className="md:hidden bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <Github className="h-6 w-6" />
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
}
