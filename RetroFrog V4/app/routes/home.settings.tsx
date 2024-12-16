import Custom from '~/components/Custom';
import Developers from '~/components/Developers';
import PrivacyPolices from '~/components/PrivacyPolices';

export default function Settings() {
  return (
    <>
      <div className="flex flex-col justify-center content-around gap-16 text-center w-full h-full">
        <h1 className="text-3xl font-semibold mb-4 ">Settings</h1>

        <div className="custom">
          <Custom />
        </div>

        <div className="privacy">
          <PrivacyPolices />
        </div>

        <div className="aboutUs">
          <Developers />
        </div>
      </div>
    </>
  );
}
