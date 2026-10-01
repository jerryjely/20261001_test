
import React, { useState, useCallback, useEffect } from 'react';
import { AdminInfo, MenuPermission, PermissionType, MenuItem } from './types';
import { PRESETS, MENU_DATA } from './constants';
import AdminForm from './components/AdminForm';
import PresetSelector from './components/PresetSelector';
import PermissionTreeRow from './components/PermissionTreeRow';

const App: React.FC = () => {
  const [adminInfo, setAdminInfo] = useState<AdminInfo>({
    userId: '',
    userName: '',
    department: '',
    presetId: ''
  });

  const [permissions, setPermissions] = useState<Record<string, MenuPermission>>({});

  // Initialize permissions
  useEffect(() => {
    const initial: Record<string, MenuPermission> = {};
    const traverse = (items: MenuItem[]) => {
      items.forEach(item => {
        initial[item.id] = { READ: false, CREATE: false, UPDATE: false, DELETE: false };
        if (item.children) traverse(item.children);
      });
    };
    traverse(MENU_DATA);
    setPermissions(initial);
  }, []);

  const handleAdminInfoChange = (field: keyof AdminInfo, value: string) => {
    setAdminInfo(prev => ({ ...prev, [field]: value }));
    
    // If preset changed, apply preset permissions
    if (field === 'presetId') {
      const preset = PRESETS.find(p => p.id === value);
      if (preset) {
        setPermissions(prev => {
          const next = { ...prev };
          // Reset all to false first
          Object.keys(next).forEach(key => {
            next[key] = { READ: false, CREATE: false, UPDATE: false, DELETE: false };
          });
          // Apply preset
          Object.entries(preset.defaultPermissions).forEach(([id, perm]) => {
            next[id] = { ...perm };
          });
          return next;
        });
      }
    }
  };

  const togglePermission = useCallback((id: string, type: PermissionType) => {
    setPermissions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: !prev[id][type]
      }
    }));
  }, []);

  const inheritPermissions = useCallback((parentId: string, type: PermissionType, checked: boolean) => {
    const getChildrenIds = (id: string): string[] => {
      const ids: string[] = [];
      const findAndAdd = (items: MenuItem[]) => {
        for (const item of items) {
          if (item.id === id) {
            const collect = (children: MenuItem[]) => {
              children.forEach(c => {
                ids.push(c.id);
                if (c.children) collect(c.children);
              });
            };
            if (item.children) collect(item.children);
            return true;
          }
          if (item.children && findAndAdd(item.children)) return true;
        }
        return false;
      };
      findAndAdd(MENU_DATA);
      return ids;
    };

    const targetIds = getChildrenIds(parentId);
    setPermissions(prev => {
      const next = { ...prev };
      targetIds.forEach(id => {
        next[id] = { ...next[id], [type]: checked };
      });
      return next;
    });
  }, []);

  const handleSave = () => {
    alert('권한 설정이 저장되었습니다.');
    console.log('Saved Admin Info:', adminInfo);
    console.log('Saved Permissions:', permissions);
  };

  const handleReset = () => {
    if (confirm('모든 입력을 초기화하시겠습니까?')) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-slate-800 text-white py-4 px-6 shadow-md mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            관리자 계정 등록 및 권한 설정
          </h1>
          <div className="text-sm opacity-80">국가 통계 분석 플랫폼 v2.0</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <AdminForm 
          info={adminInfo} 
          onChange={handleAdminInfoChange} 
          presets={PRESETS} 
        />

        {/* Middle Section */}
        <PresetSelector 
          presets={PRESETS} 
          selectedId={adminInfo.presetId}
          onSelect={(id) => handleAdminInfoChange('presetId', id)}
        />

        {/* Bottom Section: Permission Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full mr-2"></span>
              메뉴 트리 기반 권한 상세 조정
            </h2>
            <div className="flex gap-4 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>상위 권한 변경 시 하위 상속</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>개별 조정 가능</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="flex bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
            <div className="flex-1 py-3 px-6">메뉴 명칭</div>
            <div className="flex w-72 justify-around py-3 px-4 border-l border-slate-200">
              <div className="w-full text-center">조회 (R)</div>
              <div className="w-full text-center">등록 (C)</div>
              <div className="w-full text-center">수정 (U)</div>
              <div className="w-full text-center">삭제 (D)</div>
            </div>
          </div>

          {/* Tree Rows */}
          <div className="max-h-[500px] overflow-y-auto">
            {MENU_DATA.map(menu => (
              <PermissionTreeRow
                key={menu.id}
                item={menu}
                currentPermissions={permissions}
                onToggle={togglePermission}
                onInherit={inheritPermissions}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400 font-medium italic">
            "본 화면은 권한 구조 설명을 위한 예시 화면입니다."
          </p>
        </div>
      </main>

      {/* Persistent Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <div className="max-w-7xl mx-auto flex justify-end gap-3">
          <button 
            onClick={handleReset}
            className="px-6 py-2 border border-slate-300 rounded text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            초기화
          </button>
          <button 
            className="px-6 py-2 border border-slate-300 rounded text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            취소
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5"
          >
            저장하기
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
