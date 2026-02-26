'use client';

import { useEffect, useState } from "react";
import { BackgroundSlider } from "../_components/BackgroundSlider";
import { MUSEUM_SLIDES } from "./museumSlides";

export function MuseumSliderHero() {
  const [lang, setLang] = useState<"en" | "pa">("en");
  const [expandedByKey, setExpandedByKey] = useState<Record<string, boolean>>(
    {}
  );
  const [manualPaused, setManualPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = MUSEUM_SLIDES.map((s) => ({ src: s.src, alt: s.alt }));
  const [isMobile, setIsMobile] = useState(false);
  const previewChars = isMobile ? 70 : 150;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const toggleExpanded = (key: string) => {
    setExpandedByKey((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const truncate = (text: string, maxChars: number) => {
    if (text.length <= maxChars) return text;
    return `${text.slice(0, maxChars).trimEnd()}...`;
  };

  return (
    <BackgroundSlider
      slides={slides}
      intervalMs={14000}
      showOverlay
      overlayClassName="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"
      imageFit="contain"
      animateChildren
      enableDrag
      dragScope="all"
      showControls
      controlsPlacement="bottomCenter"
      showPlayPause
      onActiveIndexChange={setActiveIndex}
      paused={
        !!expandedByKey[`${(MUSEUM_SLIDES[activeIndex] ?? MUSEUM_SLIDES[0]).filename}:${lang}`]
          ? true
          : manualPaused
      }
      onPausedChange={(next) => {
        const currentKey = `${(MUSEUM_SLIDES[activeIndex] ?? MUSEUM_SLIDES[0]).filename}:${lang}`;
        if (expandedByKey[currentKey] && next === false) return;
        setManualPaused(next);
      }}
    >
      {(active) => {
        const copy = MUSEUM_SLIDES[active] ?? MUSEUM_SLIDES[0];
        const displayTitle = lang === "pa" && copy.titlePa ? copy.titlePa : copy.title;
        const description =
          lang === "pa" ? copy.descriptionPa ?? copy.description : copy.description;
        const key = `${copy.filename}:${lang}`;
        const isExpanded = !!expandedByKey[key];
        const isLong = description.length > previewChars;
        const shownDescription =
          isExpanded || !isLong ? description : truncate(description, previewChars);

        const readMoreLabel = lang === "pa" ? "ਪੂਰਾ ਪੜ੍ਹੋ" : "Read more";
        const readLessLabel = lang === "pa" ? "ਘੱਟ ਪੜ੍ਹੋ" : "Read less";

        return (
          <div className="flex h-screen overflow-hidden items-end px-3 pb-12 pt-8 text-white sm:px-10 sm:pb-8 sm:pt-14">
            <div className="w-full animate-fade-in-up">
              <div className="flex w-full flex-col items-start gap-3">
                <div className="w-full text-left sm:w-[22rem] sm:shrink-0 md:w-[28rem] lg:w-[32rem]">
                  <div className="block w-full">
                    <div className="mb-3 flex items-center justify-start gap-2">
                      <button
                        type="button"
                        onClick={() => setLang("pa")}
                        aria-pressed={lang === "pa"}
                        data-no-drag="true"
                        className={[
                          "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition",
                          lang === "pa"
                            ? "bg-white text-black"
                            : "bg-white/10 text-white hover:bg-white/20",
                        ].join(" ")}
                      >
                        ਪੰਜਾਬੀ
                      </button>
                      <button
                        type="button"
                        onClick={() => setLang("en")}
                        aria-pressed={lang === "en"}
                        data-no-drag="true"
                        className={[
                          "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition",
                          lang === "en"
                            ? "bg-white text-black"
                            : "bg-white/10 text-white hover:bg-white/20",
                        ].join(" ")}
                      >
                        English
                      </button>
                    </div>
                    <h1 className="space-y-2 leading-tight">
                      <div className="text-2xl font-semibold text-white sm:text-3xl">
                        {displayTitle}
                      </div>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full max-w-3xl text-left sm:mt-4">
                <div
                  data-no-drag={isExpanded ? "true" : undefined}
                  className={[
                    isExpanded
                      ? "max-h-[38vh] overflow-y-auto overscroll-contain pr-2 sm:max-h-[44vh]"
                      : "",
                  ].join(" ")}
                >
                  <p className="whitespace-pre-line text-sm font-medium leading-6 text-zinc-100 sm:text-base sm:leading-7">
                    {shownDescription}
                  </p>
                </div>
                {isLong ? (
                  <div className="mt-3 flex justify-start">
                    <button
                      type="button"
                      onClick={() => toggleExpanded(key)}
                      aria-expanded={isExpanded}
                      data-no-drag="true"
                      className="inline-flex cursor-pointer items-center gap-1 p-0 text-xs font-semibold text-white/90 underline decoration-white/40 underline-offset-4 transition hover:text-white hover:decoration-white/80"
                    >
                      <span>{isExpanded ? readLessLabel : readMoreLabel}</span>
                    </button>
                  </div>
                ) : null}

                {copy.artist || copy.medium ? (
                  <div className="mt-4 grid min-w-0 grid-cols-2 gap-x-4 gap-y-1 text-xs text-zinc-200 sm:text-sm">
                    {copy.artist ? (
                      <div className="min-w-0 break-words text-left">
                        <span className="font-semibold text-zinc-100">
                          Artist:
                        </span>{" "}
                        {copy.artist}
                      </div>
                    ) : (
                      <div />
                    )}
                    {copy.medium ? (
                      <div className="min-w-0 break-words text-right">
                        <span className="font-semibold text-zinc-100">
                          Medium:
                        </span>{" "}
                        {copy.medium}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      }}
    </BackgroundSlider>
  );
}
