'use client';

import Image from 'next/image';
import { useMemo } from 'react';

interface BlogContentWithImagesProps {
  htmlContent: string;
  imageMap: Record<string, { src: string; alt: string }>;
}

export function BlogContentWithImages({ htmlContent, imageMap }: BlogContentWithImagesProps) {
  const processedContent = useMemo(() => {
    // HTML을 파싱하여 이미지 placeholder를 찾고 next/image로 교체
    const parts: Array<{ type: 'html' | 'image'; content?: string; imageKey?: string }> = [];
    let remainingHtml = htmlContent;
    let lastIndex = 0;

    // 모든 이미지 placeholder 찾기
    const imagePlaceholders = Array.from(
      htmlContent.matchAll(/<!--IMAGE_PLACEHOLDER:(\w+)-->/g)
    );

    imagePlaceholders.forEach((match, index) => {
      const matchIndex = match.index!;
      const imageKey = match[1];

      // 이전 placeholder 이후부터 현재 placeholder까지의 HTML 추가
      if (matchIndex > lastIndex) {
        parts.push({
          type: 'html',
          content: htmlContent.substring(lastIndex, matchIndex),
        });
      }

      // 이미지 추가
      parts.push({
        type: 'image',
        imageKey,
      });

      lastIndex = matchIndex + match[0].length;
    });

    // 마지막 HTML 추가
    if (lastIndex < htmlContent.length) {
      parts.push({
        type: 'html',
        content: htmlContent.substring(lastIndex),
      });
    }

    // placeholder가 없으면 전체 HTML 반환
    if (imagePlaceholders.length === 0) {
      parts.push({
        type: 'html',
        content: htmlContent,
      });
    }

    return parts;
  }, [htmlContent, imageMap]);

  return (
    <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-headings:font-semibold prose-p:text-white prose-p:font-light prose-p:leading-relaxed prose-a:text-[#22d3ee] prose-a:no-underline hover:prose-a:text-[#fde047] prose-strong:text-[#fde047] prose-strong:font-semibold prose-ul:text-white prose-ol:text-white prose-li:text-white prose-img:rounded-lg prose-img:my-8 prose-blockquote:text-[#f3f4f6] prose-blockquote:border-l-[#22d3ee]">
      {processedContent.map((part, index) => {
        if (part.type === 'html' && part.content) {
          return (
            <div
              key={`html-${index}`}
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          );
        } else if (part.type === 'image' && part.imageKey && imageMap[part.imageKey]) {
          const { src, alt } = imageMap[part.imageKey];
          return (
            <div key={`image-${index}`} className="my-8 w-full">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1200px"
                  className="object-cover"
                  loading="lazy"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  unoptimized={false}
                />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
