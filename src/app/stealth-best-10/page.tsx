import Image from 'next/image';

export const dynamic = 'force-dynamic';

const IMG_BASE = '/images/stealth-best-10';

const SHOPS: Array<{
  id: number;
  name: string;
  img: string;
  brief: string;
  story: string;
  blogUrl: string;
  query: string;
}> = [
  [
    '빨간대게',
    '눅진한 게 내장에 밥을 볶아 먹는 그 전율의 맛... ',
    '제주항 인근에 자리한 이곳은 대게의 본질을 놓치지 않는 흔치 않은 공간이다. 탁월한 수율과 함께 제공되는 해산물의 품격은 말할 필요가 없다. 코스의 마침표를 찍는 볶음밥은 단순한 마무리가 아니라, 한 끼 전체를 재해석하는 결정적 순간이다.',
    'https://blog.naver.com/jejuopsuye/221278283818',
    '제주 빨간대게',
  ],
  [
    '왕서방식당',
    '로컬들만 조용히 찾아가는 숨은 중식의 고수... ',
    '과시하지 않는 맛의 미학. 짬뽕 한 그릇에 담긴 국물은 깊은 불맛과 함께 입안에서 오래 머문다. 화려함 대신 기본에 대한 집착이 빚어낸 결과물이다. 해장과 동시에 다음 한 잔을 부르는, 중식당이 가질 수 있는 최고의 덕목을 갖추었다.',
    'https://blog.naver.com/jejuopsuye/221242208075',
    '제주 왕서방식당',
  ],
  [
    '황금돈가',
    '제주 흑돼지의 육즙이 입안에서 폭발하는 순간... ',
    '제주 흑돼지의 가능성을 재정의하는 공간. 두툼한 목살과 멜젓의 조합은 이미 정석으로 자리했고, 그릴 위에서 완성되는 마지막 터치는 수년간의 노하우가 응축된 순간이다. 고기의 질과 다루는 손길, 그 둘의 만남이 만들어내는 완성도가 인상적이다.',
    'https://blog.naver.com/jejuopsuye/221209043068',
    '제주 황금돈가',
  ],
  [
    '커피구십구점구',
    '인생 커피를 만날 확률 99.9%의 감성 공간... ',
    '직접 로스팅한 원두에서 풍기는 향미는 이 공간의 정체성이다. 제주 시내 한편에 자리한 이 휴식처는 커피와 수제 디저트의 균형을 이해하고 있다. 시끄럽지 않은 품격, 과하지 않은 친절함. 여행 중 필요한 휴식의 기준을 제시한다.',
    'https://blog.naver.com/jejuopsuye/224114102719',
    '제주 커피구십구점구',
  ],
  [
    '짬뽕에취한날',
    '갈비짬뽕 한 그릇에 담긴 묵직한 내공... ',
    '해산물 짬뽕의 대안을 제시하는 한 그릇. 갈비가 통째로 담긴 비주얼은 단순한 과시가 아니다. 깊은 고기 육수가 면과 재료를 감싸며, 해산물 위주의 짬뽕과는 명확히 구분되는 맛의 세계를 연다. 묵직함이 주는 만족감이 남다르다.',
    'https://blog.naver.com/jejuopsuye/221207381828',
    '제주 짬뽕에취한날',
  ],
  [
    '하윤이네',
    '집밥보다 더 따뜻한 정성이 가득한 제주 식탁... ',
    '정갈한 밑반찬과 메인 요리의 구성은 단순한 식사가 아니라 한 끼에 대한 태도를 보여준다. 엄마의 손맛을 떠올리게 하는 정성은 여행 중 피로한 속을 위로하기에 충분하다. 제주에서 찾기 어려운, 편안함의 기준을 제시하는 공간이다.',
    'https://blog.naver.com/jejuopsuye/224063605688',
    '제주 하윤이네',
  ],
  [
    '램스키친',
    '양고기의 편견을 깨는 부드럽고 잡내 없는 식감... ',
    '프리미엄 양갈비를 전문적으로 다루는 이곳은 양고기에 대한 편견을 해체한다. 전문 에디터의 그릴링은 온도와 시간에 대한 이해가 녹아 있다. 와인 한 잔과 함께하면 제주의 밤은 예상과 다른 방식으로 기억에 남는다.',
    'https://blog.naver.com/jejuopsuye/224002909182',
    '제주 램스키친',
  ],
  [
    '청기와장어',
    '지친 기력을 보강해줄 힘이 불끈 솟는 장어... ',
    '숯불 위에서 구워지는 두툼한 장어는 고소함의 정점을 보여준다. 특제 소스와 생강채의 조합은 환절기 보양의 정석이다. 지친 기력을 보충하는 한 끼로서의 역할을 넘어, 맛 그 자체로 기억에 남는 공간이다.',
    'https://blog.naver.com/jejuopsuye/223972283259',
    '제주 청기와장어',
  ],
  [
    '섬타르',
    '제주 로컬 식재료를 담은 타르트의 달콤한 유혹... ',
    '제주의 흙과 바람이 키운 재료들이 타르트 속에 담긴다. 시각과 미각을 동시에 만족시키는 구성은 선물용으로도 손색이 없다. 섬의 맛을 달콤함으로 번역한 결과물이 이곳에 있다.',
    'https://blog.naver.com/jejuopsuye/224066284940',
    '제주 섬타르',
  ],
  [
    '브와두스',
    '매일 아침 갓 구운 빵 냄새가 반겨주는 베이커리... ',
    '신선한 재료와 정직한 제조 과정이 만드는 빵과 케이크가 공간을 채운다. 넓은 매장은 서두르지 않는 커피 타임을 위한 설계다. 베이커리 카페가 지향해야 할 모델을 보여주는 공간이다.',
    'https://blog.naver.com/expsyting/224039782737',
    '제주 브와두스',
  ],
].map(([name, brief, story, blogUrl, query], i) => ({
  id: i + 1,
  name,
  img: `${IMG_BASE}/${i + 1}.jpg`,
  brief,
  story,
  blogUrl,
  query,
}));

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function StealthBest10Page() {
  const shuffled = shuffle(SHOPS);
  const topSix = shuffled.slice(0, 6);

  return (
    <main className="min-h-screen bg-slate-950 overflow-y-auto">
      <h1 className="text-center text-white text-2xl font-bold py-6">
        Stealth Best 10
      </h1>

      {/* 1. 상단 그리드: 6개(3행), grid-cols-2, 여백 최소화 */}
      <section className="px-2 pb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-1">
          {topSix.map((shop) => (
            <article
              key={shop.id}
              className="bg-slate-900 rounded overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={shop.img}
                  alt={shop.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-2 text-white">
                <h2 className="font-bold text-sm mb-0.5">{shop.name}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {shop.brief}
                  <a
                    href="#detail-section"
                    className="inline ml-1 text-orange-400 hover:text-orange-300 underline text-xs"
                  >
                    자세히 더보기
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. 하단 상세 섹션 (Smooth Scroll 타겟) */}
      <section id="detail-section" className="px-4 pb-16">
        <h2 className="text-white text-lg font-bold mb-4 pt-4 border-t border-slate-700">
          상세 정보
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {shuffled.map((shop) => (
            <article
              key={shop.id}
              className="bg-slate-900 rounded-lg overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={shop.img}
                  alt={shop.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">{shop.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  {shop.story}
                </p>
                <a
                  href={shop.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 text-sm underline"
                >
                  블로그 원문 보기
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
