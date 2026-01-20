import type { AppProps } from "next/app";
import "../index.css";
import ClientProviders from "../app/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientProviders>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Component {...pageProps} />
      </TooltipProvider>
    </ClientProviders>
  );
}

export default MyApp;
