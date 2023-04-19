import * as React from "react";

export function VirtualScroll() {
  const scrollElementRef = React.useRef<HTMLDivElement>(null);
  const contentElementRef = React.useRef<HTMLDivElement>(null);
  const contentOffset = React.useRef(0);

  React.useEffect(() => {
    const scrollElement = scrollElementRef.current;
    const contentElement = contentElementRef.current;
    if (!scrollElement || !contentElement) return;

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      event.stopPropagation();
      if (!(event.currentTarget instanceof HTMLElement)) return;
      if (!scrollElement || !contentElement) return;

      const offsetValue = Math.floor(contentOffset.current - event.deltaY / 30);
      const newContentOffset = Math.min(
        0,
        Math.max(
          -(scrollElement.scrollHeight - scrollElement.clientHeight),
          offsetValue
        )
      );

      contentOffset.current = newContentOffset;
      contentElement.style.transform = `translateY(${newContentOffset}px)`;
    }

    scrollElement.addEventListener("wheel", onWheel, { passive: false });
    () => scrollElement.removeEventListener("wheel", onWheel);
  });

  return (
    <div
      ref={scrollElementRef}
      className="w-full h-[400px] overflow-hidden p-4 shadow-lg rounded-lg"
    >
      <div ref={contentElementRef}>
        {Array.from({ length: 100 }, (_, k) => (
          <div key={k}>{k}</div>
        ))}
      </div>
    </div>
  );
}
