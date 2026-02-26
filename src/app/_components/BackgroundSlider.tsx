'use client';

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

type Slide = {
  src: string;
  alt: string;
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
  showOverlay?: boolean;
  overlayClassName?: string;
  imageFit?: "cover" | "contain";
  enableDrag?: boolean;
  dragScope?: "background" | "all";
  showControls?: boolean;
  controlsPlacement?: "middleSplit" | "bottomCenter";
  controlsClassName?: string;
  paused?: boolean;
  defaultPaused?: boolean;
  showPlayPause?: boolean;
  onPausedChange?: (paused: boolean) => void;
  onActiveIndexChange?: (activeIndex: number) => void;
  animateChildren?: boolean;
  children: ReactNode | ((activeIndex: number) => ReactNode);
};

export function BackgroundSlider({
  slides,
  intervalMs = 12000,
  showOverlay = true,
  overlayClassName,
  imageFit = "cover",
  enableDrag = false,
  dragScope = "background",
  showControls = false,
  controlsPlacement = "middleSplit",
  controlsClassName,
  paused,
  defaultPaused = false,
  showPlayPause = false,
  onPausedChange,
  onActiveIndexChange,
  animateChildren = false,
  children,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [internalPaused, setInternalPaused] = useState(defaultPaused);

  const effectivePaused = paused ?? internalPaused;

  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (isDragging) return;
    if (effectivePaused) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [slides.length, intervalMs, isDragging, effectivePaused]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setContainerWidth(el.getBoundingClientRect().width);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const content = typeof children === "function" ? children(activeIndex) : children;

  const canInteract = slides.length > 1 && (enableDrag || showControls);
  const imageFitClassName = imageFit === "contain" ? "object-contain" : "object-cover";

  const clampIndex = (index: number) => {
    const len = slides.length;
    if (len === 0) return 0;
    return ((index % len) + len) % len;
  };

  const goTo = (index: number) => {
    setDragOffsetPx(0);
    setActiveIndex(clampIndex(index));
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  const togglePaused = () => {
    const next = !effectivePaused;
    if (paused === undefined) setInternalPaused(next);
    onPausedChange?.(next);
  };

  const baseTranslateX = useMemo(() => {
    return -activeIndex * containerWidth;
  }, [activeIndex, containerWidth]);

  const translateX = baseTranslateX + (enableDrag ? dragOffsetPx : 0);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!enableDrag) return;
    if (slides.length <= 1) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest?.('[data-no-drag="true"]')) return;
    if ((e as unknown as { button?: number }).button === 2) return;
    if (pointerIdRef.current != null) return;

    pointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    setIsDragging(true);
    setDragOffsetPx(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enableDrag) return;
    if (pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startXRef.current;
    setDragOffsetPx(dx);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!enableDrag) return;
    if (pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startXRef.current;
    const threshold = Math.max(40, containerWidth * 0.18);

    pointerIdRef.current = null;
    setIsDragging(false);
    setDragOffsetPx(0);

    if (Math.abs(dx) >= threshold) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  return (
    <div
      ref={containerRef}
      className={[
        "relative min-h-screen w-full overflow-hidden bg-black",
        enableDrag && dragScope === "all" ? "cursor-grab active:cursor-grabbing" : "",
      ].join(" ")}
      style={{ touchAction: enableDrag && dragScope === "all" ? "pan-y" : undefined }}
      onPointerDown={enableDrag && dragScope === "all" ? onPointerDown : undefined}
      onPointerMove={enableDrag && dragScope === "all" ? onPointerMove : undefined}
      onPointerUp={enableDrag && dragScope === "all" ? endDrag : undefined}
      onPointerCancel={enableDrag && dragScope === "all" ? endDrag : undefined}
    >
      <div
        className={[
          "absolute inset-0",
          enableDrag && dragScope === "background"
            ? "cursor-grab active:cursor-grabbing"
            : "",
        ].join(" ")}
        style={{ touchAction: enableDrag && dragScope === "background" ? "pan-y" : undefined }}
        onPointerDown={enableDrag && dragScope === "background" ? onPointerDown : undefined}
        onPointerMove={enableDrag && dragScope === "background" ? onPointerMove : undefined}
        onPointerUp={enableDrag && dragScope === "background" ? endDrag : undefined}
        onPointerCancel={enableDrag && dragScope === "background" ? endDrag : undefined}
      >
        <div
          className={[
            "flex h-full w-full",
            isDragging ? "transition-none" : "transition-transform duration-700 ease-out",
          ].join(" ")}
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.src} className="relative h-full w-full shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={imageFitClassName}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {showOverlay ? (
        <div
          aria-hidden
          className={
            overlayClassName ?? "absolute inset-0 bg-black/65 backdrop-blur-[1px]"
          }
        />
      ) : null}

      {showControls && canInteract ? (
        <div
          className={[
            controlsPlacement === "bottomCenter"
              ? "pointer-events-none absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-3 px-3 sm:px-6"
              : "pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-3 sm:px-6",
            controlsClassName ?? "",
          ].join(" ")}
        >
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            data-no-drag="true"
            className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-white/90 transition hover:text-white sm:px-4 sm:py-3 sm:text-sm"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
            </svg>
            <span className="hidden sm:inline">Prev</span>
          </button>
          {showPlayPause && controlsPlacement === "bottomCenter" ? (
            <button
              type="button"
              aria-label={effectivePaused ? "Play slideshow" : "Pause slideshow"}
              onClick={togglePaused}
              data-no-drag="true"
              className="pointer-events-auto inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white/90 transition hover:text-white"
            >
              {effectivePaused ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              )}
            </button>
          ) : null}
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            data-no-drag="true"
            className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-white/90 transition hover:text-white sm:px-4 sm:py-3 sm:text-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </button>
        </div>
      ) : null}

      <div className="relative z-10">
        {animateChildren ? <div key={activeIndex}>{content}</div> : content}
      </div>
    </div>
  );
}
