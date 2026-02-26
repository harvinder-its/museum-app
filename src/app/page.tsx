import Image from "next/image";
import Link from "next/link";
import { BackgroundSlider } from "./_components/BackgroundSlider";
import { TabbedText } from "./_components/TabbedText";

const slides = [
  {
    src: "/images/museumpaintings/23-darbar-maharaja-ranjit-singh.jpg",
    alt: "Darbar of Maharaja Ranjit Singh",
  },
  {
    src: "/images/museumpaintings/29-anglo-sikh-war.jpg",
    alt: "Anglo-Sikh War",
  },
  {
    src: "/images/museumpaintings/14-dal-khalsa.jpg",
    alt: "Dal Khalsa",
  },
];

export default function Home() {
  return (
    <BackgroundSlider slides={slides} intervalMs={14000}>
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full space-y-6 text-white animate-fade-in-up">
          <div className="text-center space-y-3 font-[var(--font-raleway)]">
            <div className="flex justify-center">
              <Image
                src="/images/asa-logo-dark.webp"
                alt="Sikh Museum logo"
                width={140}
                height={140}
                className="h-auto w-24 sm:w-32"
                priority
              />
            </div>
            <p className="text-base font-semibold uppercase tracking-[0.3em] text-zinc-200">
              Welcome to the Sikh Museum
            </p>
            <h1 className="text-4xl font-semibold sm:text-5xl">
              ਸਿੱਖ ਮਿਊਜ਼ੀਅਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ
            </h1>
          </div>

          <TabbedText
            punjabi={
              <>
                <p>
                  ਇਹ ਪ੍ਰਦਰਸ਼ਨੀ ਸਿੱਖ ਵਿਰਸੇ ਨੂੰ ਸਮੁੱਚਤਾ ਵਿਚ ਮਾਨਣ ਦਾ ਇਕ ਯਤਨ ਹੈ,
                  ਜਿਸ ਵਿੱਚ ਗੁਰੂ ਸਾਹਿਬਾਨ ਦੀ ਪ੍ਰਤੀਕਾਤਮਿਕ ਝਲਕ ਤੋਂ ਲੈ ਕੇ ਵੀਹਵੀਂ
                  ਸਦੀ ਦੇ ਅੰਤ ਤੱਕ ਦੇ ਸਮੇਂ ਨੂੰ ਦਰਸਾਇਆ ਗਿਆ ਹੈ। ਕਾਂਗੜਾ ਅਤੇ ਮੁਗਲ
                  ਸ਼ੈਲੀ ਦੇ ਸਰਵੋਤਮ ਰੂਪਾਂ, ਭਾਵਪੂਰਣ ਤੇਲ-ਚਿੱਤਰਾਂ, ਮੂਰਤੀਆਂ ਅਤੇ
                  ਆਧੁਨਿਕ ਮਧਿਆਮਾਂ ਰਾਹੀਂ ਇਹ ਪ੍ਰਦਰਸ਼ਨੀ ਨਿਆਂ, ਦ੍ਰਿੜਤਾ, ਦਇਆ,
                  ਸਮਾਨਤਾ ਅਤੇ ਭਗਤੀ ਜਿਹੇ ਸਿੱਖ ਮੁੱਲਾਂ ਨੂੰ ਉਜਾਗਰ ਕਰਦੀ ਹੈ।
                </p>
                <p>
                  ਕੀਰਤਨ ਅਤੇ ਢਾਡੀ ਕਲਾ, ਕਲਾ ਦੀ ਜੀਵੰਤ ਪਰੰਪਰਾ ਸਿੱਖ ਧੁਨੀ ਅਤੇ
                  ਅਧਿਆਤਮਿਕਤਾ ਦੇ ਫ਼ਲਸਫ਼ੇ ਨੂੰ ਪ੍ਰਗਟ ਕਰਦੀ ਹੈ—ਗੁਰੂ ਨਾਨਕ ਦੀ ਰਬਾਬ ਦੀ
                  ਧਿਆਨਮਈ ਲਹਿਰ ਤੋਂ ਲੈ ਕੇ ਖ਼ਾਲਸੇ ਦੇ ਨਗਾਰੇ ਦੀ ਗੂੰਜ ਤੱਕ—ਜੋ ਦੈਵੀ
                  ਇਕਸੁਰਤਾ ਤੇ ਸਮੂਹਕ ਜਾਗਰੂਕਤਾ ਦਾ ਪ੍ਰਤੀਕ ਹੈ।
                </p>
                <p>
                  ਇਹ ਸਭ ਕਲਾਵਾਂ ਮਿਲ ਕੇ ਅਧਿਆਤਮਿਕਤਾ, ਇਤਿਹਾਸ ਅਤੇ ਕਲਾ ਅਨੁਭਵ ਵਿਚਕਾਰ
                  ਇੱਕ ਸਦੀਵ ਸੰਵਾਦ ਪੈਦਾ ਕਰਦੀਆਂ ਹਨ।
                </p>
              </>
            }
            english={
              <>
                <p>
                  The permanent exhibition at the Sikh Museum Sydney celebrates
                  the profound spirit of Sikh heritage, tracing a journey from
                  the symbolic essence of the Guru Sahiban to the late
                  twentieth century. Through artworks rendered in classical
                  Kangra and Mughal styles, expressive oil paintings, sculptures,
                  and contemporary media, it illuminates the Sikh values of
                  justice, courage, compassion, equality, and devotion.
                </p>
                <p>
                  The exhibition honors the living traditions of Kirtan and
                  Dhadi, reflecting the Sikh philosophy of sound and spirit,
                  from the meditative Rabab of Guru Nanak to the resounding
                  Nagara of the Khalsa, echoing divine harmony and collective
                  awakening.
                </p>
                <p>
                  Together, these works create a timeless dialogue uniting
                  spirituality, history, and artistic expression.
                </p>
              </>
            }
          />

          <div className="flex justify-center pt-4">
            <Link
              href="/museum"
              className="rounded-full bg-white/15 px-6 py-3 text-base font-semibold text-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md transition hover:bg-white hover:text-black hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.8)]"
            >
              Enter Museum
            </Link>
          </div>
        </div>
      </div>
    </BackgroundSlider>
  );
}
