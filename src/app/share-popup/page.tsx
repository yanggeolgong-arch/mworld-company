'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function SharePopupContent() {
  const searchParams = useSearchParams();
  const text = searchParams.get('text') ?? '';
  const url = searchParams.get('url') ?? '';
  const sns = searchParams.get('sns') ?? '';
  const shareContent = `${text}\n${url}`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `${sns || 'SNS'} 공유하기`;
  }, [sns]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center font-sans text-[#1a1c1e]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-center">
          {sns === 'kakao' ? '카카오톡' : sns === 'instagram' ? '인스타그램' : 'SNS'}에 공유하기
        </h2>
        <p className="text-sm text-gray-600 text-center">
          아래 링크를 복사한 뒤, 앱에서 붙여넣기 하세요.
        </p>
        <div className="bg-gray-100 rounded-xl p-4 text-sm break-all">{shareContent}</div>
        <button
          onClick={handleCopy}
          className="w-full py-3 rounded-xl bg-[#ff6b00] text-white font-bold text-sm hover:bg-[#e55d00] transition-colors"
        >
          {copied ? '✓ 복사됨' : '링크 복사'}
        </button>
        <button
          onClick={() => window.close()}
          className="w-full py-2 text-gray-500 text-sm hover:text-gray-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default function SharePopupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩...</div>}>
      <SharePopupContent />
    </Suspense>
  );
}
