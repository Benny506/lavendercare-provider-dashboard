import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Color from "color";

/**
 * Hook to export a DOM section as PDF using react-pdf
 */
export default function useDivToPDF() {
  const exportPDF = useCallback(async (element, filename = "document.pdf") => {
    if (!element) {
      console.error("No element provided to exportPDF");
      return;
    }

    // Clone element so we don't mutate the live DOM
    const cloned = element.cloneNode(true);
    inlineMinimalStyles(cloned);

    // Convert cloned HTML to React PDF content
    const htmlString = cloned.outerHTML;
    const reactElement = (
      <div
        style={{
          fontFamily: "Helvetica",
          fontSize: "12pt", // fallback
          padding: "20px",
        }}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    );

    const blob = await pdf(reactElement).toBlob();
    saveAs(blob, filename);
  }, []);

  return exportPDF;
}

/**
 * Inline minimal styles so react-pdf can render them
 */
function inlineMinimalStyles(rootEl) {
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const el = walker.currentNode;
    const cs = getComputedStyle(el);

    // Scale down font size from px to pt, and shrink for PDF
    let fontSizePx = parseFloat(cs.fontSize);
    let fontSizePt = (fontSizePx / 1.33) * 0.85; // px → pt + shrink

    const entries = [
      ["color", normalizeColor(cs.color)],
      ["background-color", normalizeColor(cs.backgroundColor)],
      ["font-size", `${fontSizePt.toFixed(2)}pt`], // scaled
      ["font-weight", cs.fontWeight],
      ["font-family", cs.fontFamily],
      ["line-height", cs.lineHeight],
      ["text-align", cs.textAlign],

      // spacing
      ["padding", cs.padding],
      ["margin", cs.margin],

      // borders
      ["border-width", cs.borderWidth],
      ["border-style", cs.borderStyle],
      ["border-color", normalizeColor(cs.borderColor)],

      // layout
      ["display", cs.display],
      ["flex-direction", cs.flexDirection],
      ["justify-content", cs.justifyContent],
      ["align-items", cs.alignItems],
    ];

    const existing = el.getAttribute("style") || "";
    const inline = entries
      .filter(
        ([, v]) =>
          v &&
          v !== "initial" &&
          v !== "auto" &&
          v !== "normal" &&
          v !== "rgba(0, 0, 0, 0)"
      )
      .map(([k, v]) => `${k}: ${v};`)
      .join(" ");

    if (inline) {
      el.setAttribute("style", `${existing} ${inline}`.trim());
    }
  }
}

/**
 * Normalize colors & handle unsupported formats like oklch()
 */
function normalizeColor(value) {
  if (!value) return value;
  try {
    return Color(value).rgb().string(); // Convert everything to rgb()
  } catch {
    return value; // leave unchanged if parsing fails
  }
}
