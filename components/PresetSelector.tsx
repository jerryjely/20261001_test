
import React from 'react';
import { PermissionPreset } from '../types';

interface PresetSelectorProps {
  presets: PermissionPreset[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ presets, selectedId, onSelect }) => {
  const selectedPreset = presets.find(p => p.id === selectedId);

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <span className="w-1.5 h-4 bg-indigo-600 rounded-full mr-2"></span>
        권한 프리셋 선택
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {presets.map(preset => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            className={`px-4 py-3 text-sm font-medium rounded-lg border transition-all ${
              selectedId === preset.id 
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm ring-1 ring-indigo-500' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>
      
      <div className={`p-4 rounded-md transition-all ${selectedPreset ? 'bg-slate-50 border border-slate-200 opacity-100' : 'bg-transparent opacity-0 pointer-events-none'}`}>
        <p className="text-sm text-slate-600 flex items-start">
          <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="font-medium text-slate-800 mr-2">안내:</span>
          {selectedPreset?.description || ''}
        </p>
      </div>
    </div>
  );
};

export default PresetSelector;
