'use client';

import { CursorProvider } from '@/components/CursorContext';
import CustomCursor from '@/components/CustomCursor';
import { ScrollWrapper } from '@/components/ScrollWrapper';
import NoiseOverlay from '@/components/NoiseOverlay';
import HeroSection from '@/components/HeroSection';

export default function V2Page() {
  return (
    <CursorProvider>
      <ScrollWrapper>
        <div className="cursor-none bg-[#060606] min-h-screen text-white">
          <CustomCursor />
          <NoiseOverlay />
          <HeroSection />
          {/* More sections will be added here */}
        </div>
      </ScrollWrapper>
    </CursorProvider>
  );
}
