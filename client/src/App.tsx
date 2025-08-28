import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Brokerage from "@/pages/Brokerage";
import Agents from "@/pages/Agents";
import AgentDetail from "@/pages/AgentDetail";
import School from "@/pages/School";
import Development from "@/pages/Development";
import PropertyManagement from "@/pages/PropertyManagement";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Donate from "@/pages/Donate";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/brokerage" component={Brokerage} />
      <Route path="/agents" component={Agents} />
      <Route path="/agents/:id" component={AgentDetail} />
      <Route path="/school" component={School} />
      <Route path="/development" component={Development} />
      <Route path="/property-management" component={PropertyManagement} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/donate" component={Donate} />
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
