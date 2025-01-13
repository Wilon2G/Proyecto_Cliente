import { NyTitle } from "./IconsSVG";

//Fake news
export default function News(){
    return(
        <div className="w-fit">
          <h1>What&apos;s fresh?</h1>

          <div className="bg-[#FFFFFF] p-8 w-full ">
          <div className='flex justify-center'>
          <NyTitle />
          </div>

            <div className="flex mt-5">
              <div className="mr-5">
                <h2
                  className="text-xl"
                  style={{
                    fontFamily:
                      "nyt-cheltenham, cheltenham-fallback-georgia, cheltenham-fallback-noto, georgia, 'times new roman', times, serif",
                      fontWeight:700,
                      marginBottom:"1rem"
                  }}
                >
                  Breaking news! Oracle surrenders their empire to the retroForg
                  army!
                </h2>
                <p
                  style={{
                    fontFamily:
                      "nyt-imperial, georgia, 'times new roman', times, Songti SC, simsun, serif",
                      color:"#5A5A5A"
                  }}
                >
                  Millionare and CEO of the gigant international empire Oracle
                  is forced to surrender his company to the new leader in
                  technology RetroFrog INC &quot;We just can&apos;t compete with their greatness&quot;.
                </p>
                <br>
                </br>
                <p
                  style={{
                    fontFamily:
                      "nyt-imperial, georgia, 'times new roman', times, Songti SC, simsun, serif",
                      color:"#5A5A5A"
                  }}
                >
                  He will spend his retirement in a budist temple at Chongqing, China.
                </p>
              </div>

              <img
                className="w-2/3 h-2/3"
                src="/assets/news/ceoNews.png"
                alt="oracleCeo"
              />
              
            </div>
          </div>
        </div>
    );
}