import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import DestinationsPage from "@/pages/DestinationsPage";
import DestinationDetail from "@/pages/DestinationDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import OurStory from "@/pages/OurStory";
import Testimonials from "@/pages/Testimonials";
import SEO from "@/pages/SEO";
import ChatPage from "@/pages/ChatPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/destinations" component={DestinationsPage} />
      <Route path="/destination/:id" component={DestinationDetail} />
      <Route path="/about" component={About} />
      <Route path="/our-story" component={OurStory} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/seo" component={SEO} />
      <Route path="/contact" component={Contact} />
      <Route path="/chat" component={ChatPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
