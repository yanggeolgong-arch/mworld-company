# M World Company: Executive Protocol (SEO & Automation)

프로젝트 전반의 콘텐츠·SEO·성능 기준을 정의합니다. AI 에이전트 및 개발 시 이 프로토콜을 준수합니다.

---

## Core Mandate: Date & Time Management

- **Zero-Static Date Rule**: 정적 날짜 입력을 엄격히 금지한다. 모든 날짜와 시간은 파일 생성/수정 시점의 `current_date`를 호출하여 동적으로 주입한다.
- **Auto-Sync**: 블로그 포스팅, 메타데이터, JSON-LD 스키마의 `datePublished` 및 `dateModified`는 항상 최신 배포 시간으로 자동 갱신한다.

**구현**: `src/lib/blog-dates.ts`  
- `getTodayISO()` — 오늘 YYYY-MM-DD  
- `getSchemaDates(publishedDate)` — datePublished + dateModified(오늘)  
- `formatBlogDate(isoDate)` — ko-KR 표시용  

---

## Content & Branding Standards

- **Persona**: 엠월드컴퍼니 10년 차 전문가의 1인칭 통찰을 담아 작성한다.
- **Branding**: '엠월드컴퍼니', '10년 이상 실행 업무 전문가', 'KakaoTalk: SG7979'를 명시한다.
- **Tone**: 군더더기 없이 간결하게 작성하며, 초등학생 수준의 가독성을 유지한다.
- **Prohibited**: 자살, 살인 등 부정적인 단어 사용을 엄격히 금지한다.

---

## Technical SEO & Performance

- **98 Score Guard**: 웹 성능 98점 사수를 위해 WebP 변환, Lazy Loading 코딩을 강제한다.
- **GEO Master**: '상위 노출' 대신 '알고리즘 확산' 용어를 사용하고 기술적 SEO 구조를 강화한다.

---

*이 문서는 `.cursor/rules/mworld-executive-protocol.mdc`와 동기화되어 Cursor AI 컨텍스트에 반영됩니다.*
