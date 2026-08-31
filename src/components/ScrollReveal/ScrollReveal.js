import { useEffect } from "react";

import "./ScrollReveal.scss";

/**
 * Reveals section content as it scrolls into view.
 *
 * The section shells animate with CSS scroll-driven timelines, but their
 * contents cannot: every section sets `overflow-y: hidden`, which makes it a
 * scroll container, so a descendant's `view()` timeline resolves against the
 * section rather than the page and never advances. Verified by probe - a
 * `view()` animation on an Experience card stayed pinned at its start value
 * through the whole page.
 *
 * So one IntersectionObserver drives them all instead. The hidden state is
 * applied from here rather than in the stylesheet, so if this never runs the
 * content is simply visible rather than stuck at opacity 0.
 */
const TARGETS = [
  ".aboutMe--description",
  ".aboutMe--description-flex",
  ".aboutMe--description-row",
  ".skillsPage--description",
  ".skillsPage--skills-items",
  ".skillsPage--desktop-skill-illustration",
  ".skillsPage--mobile-skill-illustrations",
  ".experience--btn-group",
  ".experience--item-general-box",
  ".contactMe--description",
  ".contactMe--form"
].join(", ");

export default function ScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // eslint-disable-next-line no-param-reassign
          entry.target.dataset.reveal = "in";
          observer.unobserve(entry.target);
        });
      },
      // Matches the section titles: reveal once the element is properly on
      // screen, not the instant it clips the bottom edge.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    // Marked with a data attribute rather than a class: several of these
    // elements have a React-managed `className` which React rewrites on
    // re-render, silently dropping any class added from here. Attributes it
    // does not render are left alone.
    //
    // Re-queried on a short delay as well as immediately, because sections
    // mount their contents behind a MediaQuery and the full set is not in the
    // DOM on the first frame.
    const attach = () => {
      document.querySelectorAll(TARGETS).forEach((el) => {
        if (el.dataset.reveal) return;
        // eslint-disable-next-line no-param-reassign
        el.dataset.reveal = "out";
        observer.observe(el);
      });
    };
    attach();
    const timer = setTimeout(attach, 400);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
