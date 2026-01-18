import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as HelmetAsync from "react-helmet-async";
import BreadcrumbSchema from "./components/BreadcrumbSchema";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const Livestream = lazy(() => import("./pages/Livestream"));
const About = lazy(() => import("./pages/About"));
const Eternity = lazy(() => import("./pages/Eternity"));
const Beliefs = lazy(() => import("./pages/Beliefs"));
const Leadership = lazy(() => import("./pages/Leadership"));
const Purpose = lazy(() => import("./pages/Purpose"));
const Contact = lazy(() => import("./pages/Contact"));
const Give = lazy(() => import("./pages/Give"));
const Sermons = lazy(() => import("./pages/Sermons"));
const SermonDetail = lazy(() => import("./pages/SermonDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { HelmetProvider } = (HelmetAsync as any).default || HelmetAsync;
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <BreadcrumbSchema />
            <Navigation />
            <ScrollToTop />
            <main className="flex-grow">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                    Loading...
                  </div>
                }
              >
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/livestream" element={<Livestream />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/eternity" element={<Eternity />} />
                    <Route path="/beliefs" element={<Beliefs />} />
                    <Route path="/leadership" element={<Leadership />} />
                    <Route path="/purpose" element={<Purpose />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/give" element={<Give />} />
                    <Route path="/sermons" element={<Sermons />} />
                    <Route path="/sermons/:id" element={<SermonDetail />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageTransition>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
