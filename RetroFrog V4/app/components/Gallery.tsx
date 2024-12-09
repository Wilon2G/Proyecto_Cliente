const images = [
  '/assets/big/DkCountryCover.jpg',
  '/assets/big/StreetFighterCover.png',
  '/assets/big/SuperBombermanCover.jpg',
  '/assets/big/SuperMario.jpeg',
];

export default function Gallery() {
  return (
    <div className="gallery">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Game Cover ${index + 1}`} />
      ))}
    </div>
  );
}
