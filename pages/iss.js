import { WhereISS, TypingText } from "../components";

const ISS = () => {
  return (
    <div className="bg-primary-black overflow-hidden star-bg pt-28">
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-12">
        <TypingText title="| Track the ISS" textStyles="text-center" />
        <h1 className="text-white text-center font-bold text-4xl sm:text-6xl mt-4">
          Observation <span className="text-[#34acc7]">Dashboard</span>
        </h1>

        <div className="mt-12 glassmorphism p-6 rounded-3xl border-[#34acc7]/20 flex items-center gap-6">
          <span className="text-3xl">📡</span>
          <div>
            <h3 className="text-white font-bold text-lg">Star Titan Tip: &quot;Can I see it tonight?&quot;</h3>
            <p className="text-secondary-white text-sm">
              Usually, the ISS is visible for 2-5 minutes as a bright white &quot;star.&quot; Watch my <a href="https://youtube.com/@StarTitan" target="_blank" className="text-[#34acc7] font-semibold underline">Tracking Guide</a> to learn the best apps and techniques I use from Jaipur.
            </p>
          </div>
        </div>
      </div>
      <div className="gradient-04 z-0" />
      <WhereISS />
    </div>
  );
};

export default ISS;