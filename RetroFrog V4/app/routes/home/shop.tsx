import Spotlight from '~/components/Spotlight';
import Catalog, { SubCatalog } from '~/components/Catalog';

export default function Shop() {
  return (
    <>
      <Spotlight />
      <h1 className="title">Juegos populares</h1>
      <Catalog />
      <h1 className="title">Más Hot topic</h1>
      <SubCatalog />
    </>
  );
}
