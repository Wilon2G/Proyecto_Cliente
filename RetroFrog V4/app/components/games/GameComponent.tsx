export default function GameComponent() {
  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100%' }}>
      <iframe
        src="/assets/external/webretro/index.html?core=snes9x&rom=SuperBomberman.smc"
        style={{
          border: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        className=" rounded-md shadow-md"
      ></iframe>
    </div>
  );
}
