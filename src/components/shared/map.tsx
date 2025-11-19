"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MapProps {
  latitude: number;
  longitude: number;
  address?: string;
  className?: string;
}

export const Map = ({ latitude, longitude, address, className }: MapProps) => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Check if Google Maps API key is available
    const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

    if (!apiKey) {
      console.warn("Google Maps API key not found. Map will not be displayed.");
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        });

        new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map,
          title: address || "Property Location",
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [latitude, longitude, address]);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent>
        {address && (
          <p className="mb-4 text-sm text-muted-foreground">{address}</p>
        )}
        <div
          ref={mapRef}
          className="h-[400px] w-full rounded-lg bg-muted"
          style={{ minHeight: "400px" }}
        />
        {!process.env.NEXT_PUBLIC_MAPS_API_KEY && (
          <p className="mt-2 text-xs text-muted-foreground">
            Map requires Google Maps API key to be configured
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: {
            center: { lat: number; lng: number };
            zoom: number;
            mapTypeControl?: boolean;
            fullscreenControl?: boolean;
            streetViewControl?: boolean;
          }
        ) => {
          // Map instance
        };
        Marker: new (options: {
          position: { lat: number; lng: number };
          map: any;
          title?: string;
        }) => {
          // Marker instance
        };
      };
    };
  }
}

