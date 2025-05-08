import { useEffect, useRef, useState } from "react";

export default function useScrollArrows({ direction = "vertical", scrollAmount = 100 }) {
    const scrollRef = useRef(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(false);

    const isVertical = direction === "vertical";

    const checkScrollVisibility = () => {
        const el = scrollRef.current;
        if (!el) return;

        const scrollPos = isVertical ? el.scrollTop : el.scrollLeft;
        const clientSize = isVertical ? el.clientHeight : el.clientWidth;
        const scrollSize = isVertical ? el.scrollHeight : el.scrollWidth;

        const atStart = scrollPos <= 0;
        const atEnd = scrollPos + clientSize >= scrollSize - 1;

        setShowPrev(!atStart);
        setShowNext(!atEnd);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        checkScrollVisibility();
        el.addEventListener("scroll", checkScrollVisibility);
        window.addEventListener("resize", checkScrollVisibility);

        return () => {
            el.removeEventListener("scroll", checkScrollVisibility);
            window.removeEventListener("resize", checkScrollVisibility);
        };
    }, []);

    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;

        const amount = dir === "prev" ? -scrollAmount : scrollAmount;
        const scrollOptions = isVertical
            ? { top: amount, behavior: "smooth" }
            : { left: amount, behavior: "smooth" };

        el.scrollBy(scrollOptions);
    };

    return {
        scrollRef,
        showPrev,
        showNext,
        scroll,
    };
}
