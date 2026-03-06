'use client';

import React from 'react';

const CDN = 'https://cdn.simpleicons.org';

/** 11개 SNS 공유 - 공식 앱 아이콘 (Simple Icons CDN) */
const SNS_LIST: {
  id: string;
  name: string;
  icon: string;
  color: string;
  getHref: (url: string, text: string) => string | null;
}[] = [
  { id: 'kakao', name: '카카오톡', icon: 'kakaotalk', color: 'FEE500', getHref: (u) => `https://story.kakao.com/s/share?url=${encodeURIComponent(u)}` },
  { id: 'band', name: '네이버 밴드', icon: 'naver', color: '03C75A', getHref: (u) => `https://band.us/plugin/share?body=${encodeURIComponent(u)}` },
  { id: 'line', name: '라인', icon: 'line', color: '00B900', getHref: (u) => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(u)}` },
  { id: 'instagram', name: '인스타그램', icon: 'instagram', color: 'E4405F', getHref: () => null },
  { id: 'facebook', name: '페이스북', icon: 'facebook', color: '1877F2', getHref: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { id: 'twitter', name: '트위터 X', icon: 'x', color: '000000', getHref: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', color: '25D366', getHref: (u, t) => `https://wa.me/?text=${encodeURIComponent(t + ' ' + u)}` },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', color: '0A66C2', getHref: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
  { id: 'pinterest', name: 'Pinterest', icon: 'pinterest', color: 'BD081C', getHref: (u, t) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(u)}&description=${encodeURIComponent(t)}` },
  { id: 'telegram', name: '텔레그램', icon: 'telegram', color: '26A5E4', getHref: (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { id: 'reddit', name: 'Reddit', icon: 'reddit', color: 'FF4500', getHref: (u, t) => `https://reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}` },
];

function getShareData(shopName: string): { url: string; text: string } {
  if (typeof window !== 'undefined') {
    return { url: window.location.href, text: `${shopName} - 제주도 맛집 베스트` };
  }
  return { url: 'https://www.aijeju.co.kr/ko/stealth-best-10', text: `${shopName} - 제주도 맛집 베스트` };
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

type Props = { shopName: string; expanded?: boolean; onCopy?: () => void };

export function SnsShareButtons({ shopName, expanded = true, onCopy }: Props) {
  const { url, text } = getShareData(shopName);

  const handleClick = async (item: (typeof SNS_LIST)[number]) => {
    if (item.id === 'instagram') {
      const ok = await copyToClipboard(`${text}\n${url}`);
      if (ok) onCopy?.();
      return;
    }
    const href = item.getHref(url, text);
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  return (
    <div className={`grid grid-cols-4 sm:grid-cols-6 gap-3 ${expanded ? 'block' : 'hidden'}`}>
      {SNS_LIST.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors min-w-[64px]"
          title={`${item.name}으로 공유하기`}
          aria-label={`${item.name}으로 공유하기`}
        >
          <img
            src={`${CDN}/${item.icon}/${item.color}`}
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 object-contain flex-shrink-0"
          />
          <span className="text-[10px] font-medium text-gray-600 truncate w-full text-center">{item.name}</span>
        </button>
      ))}
    </div>
  );
}
