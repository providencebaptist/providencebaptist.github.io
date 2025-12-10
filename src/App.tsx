import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as HelmetAsync from "react-helmet-async";
import BreadcrumbSchema from "./components/BreadcrumbSchema";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import History from "./pages/History";
import Livestream from "./pages/Livestream";
import About from "./pages/About";
import Eternity from "./pages/Eternity";
import Beliefs from "./pages/Beliefs";
import Leadership from "./pages/Leadership";
import Purpose from "./pages/Purpose";
import Contact from "./pages/Contact";
import Give from "./pages/Give";
import Sermons from "./pages/Sermons";
import SermonDetail from "./pages/SermonDetail";
import NotFound from "./pages/NotFound";

const { HelmetProvider } = HelmetAsync;
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
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
