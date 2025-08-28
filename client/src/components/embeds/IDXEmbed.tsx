import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface IDXEmbedProps {
  embedType: "search" | "showcase" | "map" | "wrapper";
  scriptSrc?: string;
  containerId?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function IDXEmbed({ 
  embedType, 
  scriptSrc, 
  containerId,
  children,
  className 
}: IDXEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptSrc && typeof window !== "undefined") {
      // Create and load IDXBroker script
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => {
        console.log(`IDX ${embedType} widget loaded`);
      };
      script.onerror = () => {
        console.error(`Failed to load IDX ${embedType} widget`);
      };
      
      document.head.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [scriptSrc, embedType]);

  const defaultContainerId = containerId || `idx-${embedType}-container`;

  return (
    <div className={className} data-testid={`idx-embed-${embedType}`}>
      <div 
        id={defaultContainerId}
        ref={containerRef}
        className="w-full"
      >
        {children || (
          <Card className="border-dashed border-2 border-muted-foreground/20">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-lg font-semibold text-muted-foreground">
                  IDXBroker {embedType.charAt(0).toUpperCase() + embedType.slice(1)} Widget
                </div>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  This is a placeholder for the IDXBroker {embedType} widget. 
                  Configure the integration by providing the script source URL.
                </p>
                {!scriptSrc && (
                  <div className="bg-muted p-4 rounded-lg text-xs font-mono text-left max-w-md mx-auto">
                    <div className="font-semibold mb-2">Integration Instructions:</div>
                    <div className="space-y-1">
                      <div>1. Get your IDX widget code from IDXBroker</div>
                      <div>2. Extract the script src URL</div>
                      <div>3. Pass it to the scriptSrc prop</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Widget configuration example */}
      {!scriptSrc && (
        <div className="mt-4 text-xs text-muted-foreground">
          <details className="cursor-pointer">
            <summary className="font-semibold">Example Implementation</summary>
            <pre className="mt-2 bg-muted p-2 rounded text-xs overflow-x-auto">
{`<IDXEmbed 
  embedType="${embedType}"
  scriptSrc="https://widgets.idxbroker.com/js/[your-widget-id]"
  containerId="custom-${embedType}-container"
/>`}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
