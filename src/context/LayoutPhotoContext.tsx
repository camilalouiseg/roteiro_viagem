import React, { createContext, useContext, useState, useEffect } from 'react';
import { ATTRACTION_PHOTO_PRESETS, DEFAULT_PHOTOS_MAP, AttractionPhoto } from '../data/photoPresets';

export type PhotoLayoutStyle = 'card' | 'compact' | 'banner';

export interface LayoutSettings {
  showPhotos: boolean;
  showPhotosInPdf: boolean;
  photoStyle: PhotoLayoutStyle;
  roundedCorners: boolean;
}

interface LayoutPhotoContextType {
  photos: Record<string, string>;
  customKeys: Set<string>;
  layoutSettings: LayoutSettings;
  attractionsList: AttractionPhoto[];
  setPhotoUrl: (key: string, url: string) => void;
  uploadPhotoFile: (key: string, file: File) => Promise<void>;
  removePhoto: (key: string) => void;
  resetPhotoToDefault: (key: string) => void;
  resetAllPhotos: () => void;
  updateLayoutSettings: (newSettings: Partial<LayoutSettings>) => void;
}

const STORAGE_PHOTOS_KEY = 'roteiro_europa_photos_custom_v2';
const STORAGE_LAYOUT_KEY = 'roteiro_europa_layout_v2';

const DEFAULT_SETTINGS: LayoutSettings = {
  showPhotos: true,
  showPhotosInPdf: true,
  photoStyle: 'card',
  roundedCorners: true,
};

const LayoutPhotoContext = createContext<LayoutPhotoContextType | null>(null);

export const LayoutPhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PHOTOS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PHOTOS_MAP, ...parsed };
      }
    } catch {
      // fallback
    }
    return { ...DEFAULT_PHOTOS_MAP };
  });

  const [customKeys, setCustomKeys] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PHOTOS_KEY + '_custom_keys');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
    return new Set<string>();
  });

  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LAYOUT_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PHOTOS_KEY, JSON.stringify(photos));
      localStorage.setItem(
        STORAGE_PHOTOS_KEY + '_custom_keys',
        JSON.stringify(Array.from(customKeys))
      );
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [photos, customKeys]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LAYOUT_KEY, JSON.stringify(layoutSettings));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [layoutSettings]);

  const setPhotoUrl = (key: string, url: string) => {
    setPhotos((prev) => ({ ...prev, [key]: url }));
    setCustomKeys((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const uploadPhotoFile = (key: string, file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setPhotoUrl(key, e.target.result);
          resolve();
        } else {
          reject(new Error('Falha ao ler arquivo de imagem'));
        }
      };
      reader.onerror = () => reject(new Error('Erro na leitura do arquivo'));
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (key: string) => {
    setPhotos((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    setCustomKeys((prev) => {
      const next = new Set(prev);
      next.add(key); // marked as custom removed
      return next;
    });
  };

  const resetPhotoToDefault = (key: string) => {
    const defaultUrl = DEFAULT_PHOTOS_MAP[key];
    setPhotos((prev) => {
      const updated = { ...prev };
      if (defaultUrl) {
        updated[key] = defaultUrl;
      } else {
        delete updated[key];
      }
      return updated;
    });
    setCustomKeys((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const resetAllPhotos = () => {
    setPhotos({ ...DEFAULT_PHOTOS_MAP });
    setCustomKeys(new Set<string>());
    setLayoutSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_PHOTOS_KEY);
      localStorage.removeItem(STORAGE_PHOTOS_KEY + '_custom_keys');
      localStorage.removeItem(STORAGE_LAYOUT_KEY);
    } catch {
      // ignore
    }
  };

  const updateLayoutSettings = (newSettings: Partial<LayoutSettings>) => {
    setLayoutSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <LayoutPhotoContext.Provider
      value={{
        photos,
        customKeys,
        layoutSettings,
        attractionsList: ATTRACTION_PHOTO_PRESETS,
        setPhotoUrl,
        uploadPhotoFile,
        removePhoto,
        resetPhotoToDefault,
        resetAllPhotos,
        updateLayoutSettings,
      }}
    >
      {children}
    </LayoutPhotoContext.Provider>
  );
};

export const useLayoutPhotos = () => {
  const context = useContext(LayoutPhotoContext);
  if (!context) {
    throw new Error('useLayoutPhotos must be used within a LayoutPhotoProvider');
  }
  return context;
};
