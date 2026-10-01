
import { MenuItem, PermissionPreset, MenuPermission } from './types';

const emptyPerm: MenuPermission = { READ: false, CREATE: false, UPDATE: false, DELETE: false };
const fullPerm: MenuPermission = { READ: true, CREATE: true, UPDATE: true, DELETE: true };
const readOnlyPerm: MenuPermission = { READ: true, CREATE: false, UPDATE: false, DELETE: false };

export const MENU_DATA: MenuItem[] = [
  {
    id: 'm1', name: '바이오 지표 분석', depth: 1, permissions: { ...emptyPerm },
    children: [
      {
        id: 'm1-1', name: '지표 기초 조사', depth: 2, permissions: { ...emptyPerm },
        children: [
          {
            id: 'm1-1-1', name: '조사 대상 관리', depth: 3, permissions: { ...emptyPerm },
            children: [
              { id: 'm1-1-1-1', name: '대상자 상세 조회', depth: 4, permissions: { ...emptyPerm } },
              { id: 'm1-1-1-2', name: '이력 관리', depth: 4, permissions: { ...emptyPerm } }
            ]
          }
        ]
      },
      { id: 'm1-2', name: '통계 산출 자동화', depth: 2, permissions: { ...emptyPerm } }
    ]
  },
  {
    id: 'm2', name: '기술혁신 통계', depth: 1, permissions: { ...emptyPerm },
    children: [
      {
        id: 'm2-1', name: '기술 트렌드 분석', depth: 2, permissions: { ...emptyPerm },
        children: [
          { id: 'm2-1-1', name: '키워드 추출 서비스', depth: 3, permissions: { ...emptyPerm } }
        ]
      }
    ]
  },
  {
    id: 'm3', name: '연구지원 행정', depth: 1, permissions: { ...emptyPerm },
    children: [
      { id: 'm3-1', name: '과제 관리', depth: 2, permissions: { ...emptyPerm } },
      { id: 'm3-2', name: '예산 집행 내역', depth: 2, permissions: { ...emptyPerm } }
    ]
  },
  {
    id: 'm4', name: '시스템 설정', depth: 1, permissions: { ...emptyPerm },
    children: [
      { id: 'm4-1', name: '사용자 관리', depth: 2, permissions: { ...emptyPerm } },
      { id: 'm4-2', name: '공통코드 관리', depth: 2, permissions: { ...emptyPerm } }
    ]
  }
];

export const PRESETS: PermissionPreset[] = [
  {
    id: 'bio_admin',
    name: 'Bio지표 관리자',
    description: 'Bio지표 관련 메뉴 전체에 대한 관리 권한이 기본 적용됩니다.',
    defaultPermissions: {
      'm1': { ...fullPerm },
      'm1-1': { ...fullPerm },
      'm1-1-1': { ...fullPerm },
      'm1-1-1-1': { ...fullPerm },
      'm1-1-1-2': { ...fullPerm },
      'm1-2': { ...fullPerm },
      'm2': { ...readOnlyPerm }
    }
  },
  {
    id: 'tech_admin',
    name: '기술혁신 관리자',
    description: '기술혁신 통계 및 분석 메뉴에 대한 편집 권한이 부여됩니다.',
    defaultPermissions: {
      'm2': { ...fullPerm },
      'm2-1': { ...fullPerm },
      'm2-1-1': { ...fullPerm },
      'm3': { ...readOnlyPerm }
    }
  },
  {
    id: 'research_admin',
    name: '연구지원 관리자',
    description: '연구지원 행정 프로세스 및 예산 관리 권한이 부여됩니다.',
    defaultPermissions: {
      'm3': { ...fullPerm },
      'm3-1': { ...fullPerm },
      'm3-2': { ...fullPerm },
      'm1': { ...readOnlyPerm }
    }
  },
  {
    id: 'super_admin',
    name: '전체 관리자',
    description: '시스템 내 모든 메뉴에 대한 모든 권한(조회/등록/수정/삭제)을 보유합니다.',
    defaultPermissions: {
      'm1': { ...fullPerm }, 'm1-1': { ...fullPerm }, 'm1-1-1': { ...fullPerm }, 'm1-1-1-1': { ...fullPerm }, 'm1-1-1-2': { ...fullPerm }, 'm1-2': { ...fullPerm },
      'm2': { ...fullPerm }, 'm2-1': { ...fullPerm }, 'm2-1-1': { ...fullPerm },
      'm3': { ...fullPerm }, 'm3-1': { ...fullPerm }, 'm3-2': { ...fullPerm },
      'm4': { ...fullPerm }, 'm4-1': { ...fullPerm }, 'm4-2': { ...fullPerm }
    }
  }
];
