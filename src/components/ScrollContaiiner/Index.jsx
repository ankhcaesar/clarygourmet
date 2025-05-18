import { useEffect, useRef, useState } from "react";
import styles from "./ScrollContainer.module.css";

const iconos = {
  up: "/icons/subir_negro.svg",
  down: "/icons/bajar_negro.svg",
  right: "/icons/ir_negro.svg",
  left: "/icons/volver_negro.svg",
};

export default function ScrollContainer({
  direction = "vertical",
  scrollAmount = 200,
  children,
}) {
  const scrollRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const isVertical = direction === "vertical";

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScrollVisibility = () => {
      const scrollPos = isVertical ? el.scrollTop : el.scrollLeft;
      const clientSize = isVertical ? el.clientHeight : el.clientWidth;
      const scrollSize = isVertical ? el.scrollHeight : el.scrollWidth;

      setShowPrev(scrollPos > 0);
      setShowNext(scrollPos + clientSize < scrollSize - 1);
    };

    checkScrollVisibility();
    el.addEventListener("scroll", checkScrollVisibility);
    window.addEventListener("resize", checkScrollVisibility);

    return () => {
      el.removeEventListener("scroll", checkScrollVisibility);
      window.removeEventListener("resize", checkScrollVisibility);
    };
  }, [isVertical]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = dir === "prev" ? -scrollAmount : scrollAmount;
    const scrollOptions = isVertical
      ? { top: amount, behavior: "smooth" }
      : { left: amount, behavior: "smooth" };

    el.scrollBy(scrollOptions);
  };

  const renderArrow = (dir) => {
    const isPrev = dir === "prev";
    const icon = isPrev
      ? iconos[isVertical ? "up" : "left"]
      : iconos[isVertical ? "down" : "right"];
    const positionClass = styles[isVertical
      ? isPrev ? "top" : "bottom"
      : isPrev ? "left" : "right"];

    return (
      <button
        className={`${styles.arrowBtn} ${positionClass}`}
        onClick={() => scroll(dir)}
        aria-label={`Scroll ${dir}`}
      >
        <img src={icon} alt={`Flecha ${dir}`} />
      </button>
    );
  };

  return (
    <div className={styles.scrollWrapper}>
      {showPrev && renderArrow("prev")}

      <div
        ref={scrollRef}
        className={`${styles.scrollContainer} ${
          isVertical ? styles.vertical : styles.horizontal
        }`}
      >
        {children}
      </div>

      {showNext && renderArrow("next")}
    </div>
  );
}
