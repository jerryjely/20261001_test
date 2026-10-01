
import React from 'react';
import { AdminInfo, PermissionPreset } from '../types';

interface AdminFormProps {
  info: AdminInfo;
  onChange: (field: keyof AdminInfo, value: string) => void;
  presets: PermissionPreset[];
}

const AdminForm: React.FC<AdminFormProps> = ({ info, onChange, presets }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center">
        <span className="w-1.5 h-4 bg-blue-600 rounded-full mr-2"></span>
        관리자 기본 정보 입력
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-600">아이디</label>
          <input 
            type="text" 
            value={info.userId}
            onChange={(e) => onChange('userId', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="admin_id"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-600">성명</label>
          <input 
            type="text" 
            value={info.userName}
            onChange={(e) => onChange('userName', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="홍길동"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-600">소속 부서</label>
          <input 
            type="text" 
            value={info.department}
            onChange={(e) => onChange('department', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="데이터 분석 본부"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-600">관리자 유형 (프리셋)</label>
          <select 
            value={info.presetId}
            onChange={(e) => onChange('presetId', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
          >
            <option value="">프리셋 선택 안함</option>
            {presets.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
