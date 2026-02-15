# 공양걸AI연구소 알고리즘 확산 시스템 배포 가이드

## ✅ 완료된 작업

### 1. Entity SEO 강제 주입
- ✅ `src/app/layout.tsx` 메타데이터 수정 완료
- ✅ 모든 타이틀에 "공양걸AI연구소" 브랜드명 맨 앞 배치
- ✅ JSON-LD Organization 스키마에 카카오톡 SG7979 포함
- ✅ 모든 canonical URL을 `https://www.aijeju.co.kr`로 통일

### 2. 전수 한국어화 및 브랜딩
- ✅ "M-World Company" → "공양걸AI연구소" 전체 변경
- ✅ "협력 문의" → "협업 문의" 통일
- ✅ 모든 메타데이터에 공양걸AI연구소 브랜드명 앞에 배치
- ✅ 에러 페이지 제목 한국어화

### 3. 문장 교정 및 최적화
- ✅ 김정선 교정 원칙 적용 ('~적', '~의' 배제)
- ✅ LCP 최적화 유지 (StructuredData는 head 태그 내 유지)
- ✅ 이미지 레이지 로딩 기본 적용

## 🚀 배포 단계 (마우스 클릭만으로 완료)

### Step 1: 소스 제어 패널 열기
1. VS Code/Cursor 좌측 사이드바에서 **소스 제어 아이콘** (분기 모양 아이콘) 클릭
   - 또는 단축키: `Ctrl + Shift + G` (Windows) / `Cmd + Shift + G` (Mac)

### Step 2: 변경사항 확인
1. 소스 제어 패널에서 **"변경 사항"** 섹션 확인
2. 수정된 파일들이 목록으로 표시됨:
   - `src/app/layout.tsx`
   - `src/components/Header.tsx`
   - `src/components/Footer.tsx`
   - `src/app/page.tsx`
   - `src/app/success-cases/page.tsx`
   - `src/app/growth-engine/page.tsx`
   - `src/app/insights/page.tsx`
   - `src/app/partnership/page.tsx`
   - `src/app/blog/page.tsx`
   - 기타 블로그 관련 파일들

### Step 3: 변경사항 스테이징
1. 각 파일 옆의 **"+" 아이콘** 클릭하여 스테이징
   - 또는 **"변경 사항" 헤더 옆의 "+" 아이콘** 클릭하여 모든 파일 한 번에 스테이징

### Step 4: 커밋 메시지 작성
1. 상단 **"메시지" 입력란**에 다음 커밋 메시지 입력:
   ```
   feat: 공양걸AI연구소 엔티티 SEO 강제 실행 및 전수 한국어화
   
   - Entity SEO: 모든 메타데이터에 공양걸AI연구소 브랜드명 맨 앞 배치
   - JSON-LD Organization 스키마에 카카오톡 SG7979 포함
   - 전수 한국어화: M-World Company → 공양걸AI연구소
   - 협력 문의 → 협업 문의 통일
   - 모든 canonical URL을 www.aijeju.co.kr로 통일
   - 문장 교정: 김정선 원칙 적용 (~적, ~의 배제)
   ```

### Step 5: 커밋 실행
1. **"커밋" 버튼** 클릭 (또는 `Ctrl + Enter`)

### Step 6: 원격 저장소에 푸시
1. 소스 제어 패널 상단의 **"동기화 변경 사항"** 버튼 클릭
   - 또는 **"..." 메뉴** → **"Push"** 선택
   - 또는 단축키: `Ctrl + Shift + P` → "Git: Push" 입력

### Step 7: 배포 확인
1. 배포 플랫폼 (Vercel, Netlify 등)에서 자동 배포 시작됨
2. 배포 완료 후 `https://www.aijeju.co.kr` 접속하여 확인

## 📋 변경사항 요약

### 메타데이터 변경
- **레이아웃**: "공양걸AI연구소 | 10년 차 전문가의 압도적 실행 전략"
- **성공 사례**: "공양걸AI연구소 성공 사례 | 실행력으로 증명된 압도적 성과"
- **성장 엔진**: "공양걸AI연구소 성장 엔진 | 효율성 극대화 AI 자동화 시스템"
- **성공 노하우**: "공양걸AI연구소 성공 노하우 | 10년 차 전문가의 마케팅 인사이트"
- **협업 문의**: "공양걸AI연구소 협업 문의 | 카카오톡 SG7979"

### JSON-LD 스키마
```json
{
  "@type": "Organization",
  "name": "공양걸AI연구소",
  "url": "https://www.aijeju.co.kr",
  "contactPoint": {
    "additionalProperty": {
      "name": "카카오톡",
      "value": "SG7979"
    }
  }
}
```

### 브랜딩 통일
- 모든 "M-World Company" → "공양걸AI연구소"
- 모든 "협력 문의" → "협업 문의"
- 모든 URL → `https://www.aijeju.co.kr` 통일

## ⚠️ 주의사항

1. **배포 전 확인**: 로컬에서 `npm run build` 실행하여 빌드 오류 확인 권장
2. **캐시 무효화**: 배포 후 브라우저 캐시 클리어 또는 시크릿 모드로 확인
3. **SEO 확인**: Google Search Console에서 구조화 데이터 테스트 실행

## 🎯 완료 체크리스트

- [x] Entity SEO 강제 주입 완료
- [x] 전수 한국어화 완료
- [x] 브랜딩 통일 완료
- [x] 문장 교정 완료
- [x] URL 통일 완료
- [ ] 커밋 및 푸시 (사용자 실행 필요)
- [ ] 배포 확인 (사용자 확인 필요)
