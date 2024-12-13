import { NyTitle } from "~/components/IconsSVG";

export default function HomePage() {
  return (
    <div>
      <header>
        <h1>Welcome!</h1>
      </header>
      <main>
        <div className="w-1/4">
          <h1>What&apos;s fresh?</h1>
          <div className="bg-[#FFFFFF] p-8">
            <NyTitle/>
            <h2 className="text-xl" style={{fontFamily:"nyt-cheltenham, cheltenham-fallback-georgia, cheltenham-fallback-noto, georgia, 'times new roman', times, serif"}}>
              Breaking news! Oracle surrenders their empire to the retroForg army!
            </h2>
            <p style={{fontFamily:"nyt-imperial, georgia, 'times new roman', times, Songti SC, simsun, serif"}}>
              Millionare and CEO of the gigant international empire Oracle is forced to surrender his company to the new lider in technology RetroFrof INC.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
