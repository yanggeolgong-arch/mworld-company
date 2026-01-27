# 블로그 포스팅 수동 작성 가이드

## 📝 수동 블로그 포스팅 방법

### 1단계: 새 포스트 폴더 생성

`src/app/blog/` 디렉토리에 새 폴더를 만듭니다. 폴더명은 URL 슬러그가 됩니다.

**예시:**
```
src/app/blog/새-포스트-제목/page.tsx
```

**슬러그 규칙:**
- 한글 사용 가능 (예: `1인-기업-알고리즘-확산-시장-장악-로드맵`)
- 공백은 하이픈(`-`)으로 대체
- 특수문자 제거

### 2단계: 포스트 페이지 파일 생성

기존 포스트를 템플릿으로 사용하여 `page.tsx` 파일을 생성합니다.

**필수 수정 항목:**

1. **메타데이터 (metadata)**
   ```typescript
   export const metadata: Metadata = {
     title: '포스트 제목 - 엠월드컴퍼니',
     description: '포스트 설명 (SEO용)',
     keywords: '키워드1, 키워드2, 키워드3',
     alternates: {
       canonical: 'https://aijeju.co.kr/blog/슬러그',
     },
     openGraph: {
       title: '포스트 제목',
       description: '포스트 설명',
       type: 'article',
       publishedTime: '2026-01-27', // 발행일
       url: 'https://aijeju.co.kr/blog/슬러그',
     },
   };
   ```

2. **상수 정의**
   ```typescript
   const slug = '슬러그-이름';
   const title = '포스트 제목';
   const canonicalUrl = generateCanonicalUrl(`/blog/${slug}`);
   ```

3. **브레드크럼**
   ```typescript
   const breadcrumbs = generateBlogBreadcrumbs(slug, title, '카테고리명');
   ```

4. **JSON-LD 스키마**
   ```typescript
   const blogPostingSchema = {
     '@context': 'https://schema.org',
     '@type': 'BlogPosting',
     headline: '포스트 제목',
     description: '포스트 설명',
     url: canonicalUrl,
     datePublished: '2026-01-27',
     dateModified: '2026-01-27',
     author: {
       '@type': 'Person',
       name: '엠월드컴퍼니 최고실행자',
       jobTitle: '10년 이상 실행사 대표 전문가',
     },
     publisher: {
       '@type': 'Organization',
       name: '엠월드컴퍼니',
       logo: {
         '@type': 'ImageObject',
         url: 'https://aijeju.co.kr/logo.png',
       },
     },
     mainEntityOfPage: {
       '@type': 'WebPage',
       '@id': canonicalUrl,
     },
     keywords: '키워드1, 키워드2',
     articleSection: '카테고리명',
   };
   ```

5. **컴포넌트 함수명 변경**
   ```typescript
   export default function YourPostNamePage() {
     // ...
   }
   ```

### 3단계: static-posts.ts에 메타데이터 추가

`src/lib/static-posts.ts` 파일의 `staticPosts` 배열에 새 포스트 정보를 추가합니다.

```typescript
{
  slug: '슬러그-이름',
  title: '포스트 제목',
  description: '포스트 설명 (SEO용)',
  date: '2026-01-27', // YYYY-MM-DD 형식
  category: '카테고리명',
  categorySlug: 'category-slug', // 영문 슬러그
  excerpt: '포스트 요약 (선택사항)',
  featuredImage: 'https://images.unsplash.com/...', // 선택사항
},
```

**카테고리 슬러그 매핑:**
- `플레이스 알고리즘` → `place-algorithm`
- `광고대행사 창업` → `ad-agency-startup`
- `숏폼 마케팅 실무` → `shortform-marketing`

### 4단계: 콘텐츠 작성

포스트 본문을 작성합니다. 기존 포스트 구조를 참고하세요:

```tsx
<div className="prose prose-lg prose-invert max-w-none prose-h1:text-white prose-h1:font-semibold prose-h2:text-white prose-h2:font-semibold prose-h2:text-3xl prose-h2:mb-6 prose-h3:text-white prose-h3:font-semibold prose-h3:text-2xl prose-h3:mb-4 prose-h4:text-white prose-h4:font-semibold prose-h5:text-white prose-h5:font-semibold prose-h6:text-white prose-h6:font-semibold prose-p:text-white prose-p:font-light prose-p:leading-relaxed prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-[#d4af37] prose-strong:text-white prose-ul:text-white prose-ol:text-white prose-li:text-white prose-img:rounded-lg prose-img:my-8">
  
  {/* 섹션 예시 */}
  <section className="mb-8">
    <h2 className="text-3xl font-semibold text-white mb-4">섹션 제목</h2>
    <p className="text-white font-light leading-relaxed mb-4">
      본문 내용...
    </p>
  </section>

  {/* 이미지 추가 예시 */}
  <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg relative">
    <Image
      src="https://images.unsplash.com/photo-..."
      alt="이미지 설명"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1200px"
      className="object-cover"
      quality={85}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
  </div>

</div>
```

### 5단계: 이미지 추가 (선택사항)

**Unsplash 이미지 사용:**
```tsx
<Image
  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&q=80"
  alt="이미지 설명"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1200px"
  className="object-cover"
  quality={90}
/>
```

**이미지 크기 조정:**
- `w=1200&h=600`: 너비 1200px, 높이 600px
- `fit=crop`: 크롭 모드
- `q=80`: 품질 80%

### 6단계: 검증 및 배포

1. **로컬에서 확인**
   ```bash
   npm run dev
   ```
   - `http://localhost:3000/blog/슬러그-이름` 접속하여 확인

2. **빌드 테스트**
   ```bash
   npm run build
   ```

3. **배포**
   ```bash
   git add .
   git commit -m "feat: add new blog post - 포스트 제목"
   git push
   ```

## 📋 체크리스트

- [ ] 새 폴더 생성 (`src/app/blog/슬러그/page.tsx`)
- [ ] `page.tsx` 파일 생성 및 메타데이터 수정
- [ ] `static-posts.ts`에 메타데이터 추가
- [ ] 콘텐츠 작성
- [ ] 이미지 추가 (선택)
- [ ] 로컬에서 확인
- [ ] 빌드 테스트
- [ ] 커밋 및 푸시

## 🎨 스타일 가이드

### 텍스트 색상
- 제목: `text-white`
- 본문: `text-white font-light`
- 강조: `text-emerald-400` 또는 `text-[#d4af37]`

### 제목 크기
- H1: `text-4xl sm:text-5xl`
- H2: `text-3xl`
- H3: `text-2xl` 또는 `text-xl`

### 간격
- 섹션 간격: `mb-8`
- 문단 간격: `mb-4`

## 📚 참고 템플릿

기존 포스트를 템플릿으로 사용:
- `src/app/blog/1인-기업-알고리즘-확산-시장-장악-로드맵/page.tsx`
- `src/app/blog/ai-1인-기업-10명-대행사-압도/page.tsx`

## ❓ 문제 해결

**404 에러가 발생하는 경우:**
- `static-posts.ts`에 메타데이터가 추가되었는지 확인
- 슬러그가 정확히 일치하는지 확인
- 빌드 후 확인

**블로그 목록에 나타나지 않는 경우:**
- `static-posts.ts`의 `slug`가 폴더명과 일치하는지 확인
- 날짜 형식이 `YYYY-MM-DD`인지 확인
