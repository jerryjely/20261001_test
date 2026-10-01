
import React, { useState } from 'react';
import { MenuItem, MenuPermission, PermissionType } from '../types';

interface PermissionTreeRowProps {
  item: MenuItem;
  currentPermissions: Record<string, MenuPermission>;
  onToggle: (id: string, type: PermissionType) => void;
  onInherit: (parentId: string, type: PermissionType, checked: boolean) => void;
}

const PermissionTreeRow: React.FC<PermissionTreeRowProps> = ({ item, currentPermissions, onToggle, onInherit }) => {
  const [isOpen, setIsOpen] = useState(item.depth === 1); // 1 depth is always open
  const perms = currentPermissions[item.id] || { READ: false, CREATE: false, UPDATE: false, DELETE: false };

  const handleCheckboxChange = (type: PermissionType) => {
    const newValue = !perms[type];
    onToggle(item.id, type);
    // Automatic inheritance to children
    if (item.children && item.children.length > 0) {
      onInherit(item.id, type, newValue);
    }
  };

  const depthStyles = [
    'bg-slate-50 font-bold border-b-2 border-slate-200',
    'bg-white border-b border-slate-100',
    'bg-white border-b border-slate-50',
    'bg-white border-b border-slate-50 italic text-slate-500'
  ];

  const paddingLeft = (item.depth - 1) * 24 + 12;

  return (
    <>
      <div className={`flex items-center group transition-colors hover:bg-slate-50 ${depthStyles[item.depth - 1]}`}>
        {/* Menu Label Column */}
        <div className="flex-1 py-3 px-2 flex items-center" style={{ paddingLeft: `${paddingLeft}px` }}>
          {item.children && item.children.length > 0 ? (
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="mr-2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <svg 
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <span className="w-6"></span>
          )}
          <span className="text-sm text-slate-700 truncate">{item.name}</span>
          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 font-normal">
            {item.depth}Depth
          </span>
        </div>

        {/* Permission Checkbox Columns */}
        <div className="flex w-72 justify-around py-3 px-4 border-l border-slate-100">
          {(['READ', 'CREATE', 'UPDATE', 'DELETE'] as PermissionType[]).map(type => (
            <div key={type} className="flex justify-center w-full">
              <input
                type="checkbox"
                checked={perms[type]}
                onChange={() => handleCheckboxChange(type)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {isOpen && item.children?.map(child => (
        <PermissionTreeRow
          key={child.id}
          item={child}
          currentPermissions={currentPermissions}
          onToggle={onToggle}
          onInherit={onInherit}
        />
      ))}
    </>
  );
};

export default PermissionTreeRow;
