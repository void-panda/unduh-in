"use client";

import { DownloaderForm } from "@/components/downloader-form";
import { Youtube, Instagram, Facebook, Video, Zap, ShieldCheck, Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <main className="min-h-screen pt-32 pb-20 selection:bg-secondary selection:text-black">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-12 relative">
        <motion.div
          animate={{
            rotate: [0, 5, 0, -5, 0],
            x: [0, 10, 0, -10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-10 hidden lg:block"
        >
          <div className="bg-primary border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-12">
            <p className="font-black text-xs uppercase tracking-tighter">Cepat & Gratis</p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block bg-accent border-4 border-black px-4 py-1 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2"
          >
            100% Gratis
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-black"
          >
            UNDUH<span className="text-secondary">IN.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-xl md:text-2xl font-bold border-4 border-black inline-block p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase leading-tight mt-4 text-black"
          >
            The World's Most Honest Media Downloader. <br />
            Gratis. Tanpa Iklan. <span className="bg-accent text-black px-2 py-1">Tanpa Watermark</span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          className="max-w-3xl mx-auto"
        >
          <DownloaderForm />
        </motion.div>
      </section>

      {/* Platforms Section */}
      <section className="max-w-7xl mx-auto px-4 mt-32">
        <div className="mb-10 flex items-center gap-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">Mendukung Platform</h2>
          <div className="h-2 flex-1 bg-black"></div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { name: "TikTok", color: "bg-[#000000] text-white", icon: Video },
            { name: "YouTube", color: "bg-[#FF0000] text-white", icon: Youtube },
            { name: "Instagram", color: "bg-secondary text-black", icon: Instagram },
            { name: "Facebook", color: "bg-[#1877F2] text-white", icon: Facebook },
          ].map((platform) => (
            <motion.div
              key={platform.name}
              variants={itemVariants}
              whileHover={{ y: -8, rotate: 1 }}
              className={`${platform.color} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-2 cursor-default group`}
            >
              <platform.icon size={40} className="group-hover:scale-110 transition-transform" />
              <span className="font-black text-xl uppercase tracking-tighter">{platform.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 mt-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<ShieldCheck size={48} />}
            title="Privasi Aman"
            description="Kami tidak melacakmu. Kami tidak simpan riwayat unduhanmu. Kami bahkan tidak tahu siapa kamu. Serius."
            color="bg-primary"
            index={0}
          />
          <FeatureCard
            icon={<Zap size={48} />}
            title="Super Cepat"
            description="Proxy kami dioptimalkan untuk kecepatan. Dapatkan kontenmu dalam hitungan detik tanpa nunggu skrip pihak ketiga."
            color="bg-accent"
            index={1}
          />
          <FeatureCard
            icon={<Download size={48} />}
            title="Tanpa Watermark"
            description="Dapatkan konten original kualitas tinggi tanpa logo atau watermark yang mengganggu. Murni medianya."
            color="bg-secondary"
            index={2}
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center space-y-6 relative overflow-hidden"
        >
          <motion.div
            animate={{
              x: [0, 50, 0, -50, 0],
              y: [0, -20, 0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-32 h-32 bg-primary/20 -z-10 blur-3xl rounded-full"
          />

          <h2 className="text-4xl md:text-6xl font-black uppercase text-black">Gas Mulai Unduh</h2>
          <p className="text-xl font-bold max-w-xl mx-auto text-black">
            Gabung dengan ribuan pengguna yang percaya pada Unduhin.
            Sudah dibilang kalau ini gratis selamanya?
          </p>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-black cursor-pointer text-white px-10 py-5 font-black text-2xl uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(136,170,238,1)]"
            >
              Kembali ke Atas <ArrowRight className="inline ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description, color, index }: { icon: React.ReactNode, title: string, description: string, color: string, index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`${color} border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4`}
    >
      <div className="bg-white border-4 border-black w-16 h-16 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {icon}
      </div>
      <h3 className="text-3xl font-black uppercase tracking-tighter text-black">{title}</h3>
      <p className="font-bold leading-snug text-black/80">{description}</p>
    </motion.div>
  );
}
