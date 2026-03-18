"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultMarketingDesignId,
  getMarketingDesignPreset,
  isMarketingDesignId,
  marketingDesignPresets,
  type MarketingDesignId,
  type MarketingDesignPreset,
} from "@/config/marketing-designs";

const STORAGE_KEY = "kilatkoding-marketing-design";

type MarketingDesignContextValue = {
  activeDesign: MarketingDesignPreset;
  designId: MarketingDesignId;
  presets: readonly MarketingDesignPreset[];
  setDesignId: (designId: MarketingDesignId) => void;
};

const MarketingDesignContext =
  createContext<MarketingDesignContextValue | null>(null);

function readStoredDesign() {
  if (typeof window === "undefined") {
    return defaultMarketingDesignId;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (storedValue && isMarketingDesignId(storedValue)) {
    return storedValue;
  }

  return defaultMarketingDesignId;
}

export function MarketingDesignProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [designId, setDesignIdState] =
    useState<MarketingDesignId>(defaultMarketingDesignId);

  useEffect(() => {
    setDesignIdState(readStoredDesign());
  }, []);

  const setDesignId = useCallback((nextDesignId: MarketingDesignId) => {
    setDesignIdState(nextDesignId);
    window.localStorage.setItem(STORAGE_KEY, nextDesignId);
  }, []);

  const activeDesign = useMemo(
    () => getMarketingDesignPreset(designId),
    [designId],
  );

  useEffect(() => {
    document.body.dataset.marketingDesign = designId;
    document.body.dataset.marketingDesignFamily = activeDesign.family;
    document.body.dataset.marketingDesignMode = activeDesign.mode;
    document.body.style.colorScheme = activeDesign.mode;

    return () => {
      delete document.body.dataset.marketingDesign;
      delete document.body.dataset.marketingDesignFamily;
      delete document.body.dataset.marketingDesignMode;
      document.body.style.removeProperty("color-scheme");
    };
  }, [activeDesign.family, activeDesign.mode, designId]);

  const value = useMemo(
    () => ({
      activeDesign,
      designId,
      presets: marketingDesignPresets,
      setDesignId,
    }),
    [activeDesign, designId, setDesignId],
  );

  return (
    <MarketingDesignContext.Provider value={value}>
      <div
        className="marketing-shell min-h-screen flex flex-col"
        data-design={designId}
      >
        {children}
      </div>
    </MarketingDesignContext.Provider>
  );
}

export function useMarketingDesign() {
  const context = useContext(MarketingDesignContext);

  if (!context) {
    throw new Error(
      "useMarketingDesign must be used within a MarketingDesignProvider.",
    );
  }

  return context;
}
