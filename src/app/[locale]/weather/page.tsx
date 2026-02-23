export default function WeatherPage() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>오늘날씨미쳤네</h1>
      <p>배포 테스트 시간: {new Date().toLocaleString()}</p>
    </div>
  );
}
