export function Footer() {
    return (
        <footer className="w-full max-w-7xl mx-auto p-4 mt-20 mb-10">
            <div className="bg-black text-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-black uppercase mb-2 tracking-tighter">Unduhin</h2>
                    <p className="font-bold opacity-70">Media downloader neobrutalist terbaik untukmu.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 font-black uppercase text-sm">
                    <a href="#" className="hover:text-primary transition-colors underline decoration-2 underline-offset-4">Privasi</a>
                    <a href="#" className="hover:text-secondary transition-colors underline decoration-2 underline-offset-4">Ketentuan</a>
                    <a href="https://github.com/void-panda" className="hover:text-accent transition-colors underline decoration-2 underline-offset-4">Github</a>
                </div>

                <div className="text-center md:text-right">
                    <p className="font-mono text-xs opacity-60 uppercase">© 2026 UNDUHIN. TANPA HAK CIPTA.</p>
                    <p className="text-[10px] opacity-40 font-bold uppercase mt-1 tracking-widest">Dibuat dengan kekacauan dan neobrutalisme.</p>
                </div>
            </div>
        </footer>
    );
}
