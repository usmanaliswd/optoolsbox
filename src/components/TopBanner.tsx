import Image from "next/image";
import Link from "next/link";
import BgImage from "../../public/grain-bg.svg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white text-black py-8 px-6 sm:px-10 rounded-3xl md:mt-8">
      {/* Background grain image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BgImage}
          alt="Background texture"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          All-in-One Toolbox for Daily Productivity
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          From smart calculators to handy image & link tools, TopToolsBox has
          everything you need — all in one place.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/calculators/bmi">
            <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition">
              Try BMI Calculator
            </button>
          </Link>
          <Link href="/tools/image-tools/converter">
            <button className="px-5 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition">
              Use Image Converter
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
