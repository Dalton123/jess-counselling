"use client";

import { Hero } from "@organisms/hero/hero";
import { ServicesWrapper } from "../ComponentSelector/ServicesWrapper";
// Import other components

import { urlForImage } from '../../../sanity/lib/client';

// This component renders the right component based on the _type
export function ComponentSelector({ component }: { component: any }) {
  // Extract the component type
  const type = component._type;

  // Return appropriate component based on type
  switch (type) {
    case 'hero':
      return (
        <Hero data={component} />
      );
    
    case 'services':
      // This requires additional data fetching for the referenced services
      return (
        <ServicesWrapper 
          data={component}
        />
      );
    
    // Add cases for other component types
    
    default:
      return (
        <div className="p-4 bg-yellow-100 rounded">
          <p>Unknown component type: {type}</p>
        </div>
      );
  }
}