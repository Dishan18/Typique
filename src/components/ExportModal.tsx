import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Download,
  FileText,
  CheckSquare,
  Square,
  MessageCircle,
} from "lucide-react";
import { getFontFamily, getRenderableText } from "../utils/morse";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: string[];
  font: string;
  inkColor: string;
  paperColor: string;
}

export function ExportModal({
  isOpen,
  onClose,
  pages,
  font,
  inkColor,
  paperColor,
}: ExportModalProps) {
  const [selectedPages, setSelectedPages] = useState<Set<number>>(
    new Set(pages.map((_, i) => i)),
  );
  const [isExporting, setIsExporting] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState("");

  const getSelectedText = () => {
    const selectedIndices = Array.from<number>(selectedPages).sort();
    return selectedIndices
      .map((i) => `--- Page ${i + 1} ---\n\n${pages[i]}`)
      .join("\n\n\n");
  };

  // Reset selection when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedPages(new Set(pages.map((_, i) => i)));
      setWhatsAppNumber("");
    }
  }, [isOpen, pages]);

  const togglePage = (index: number) => {
    const next = new Set(selectedPages);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setSelectedPages(next);
  };

  const toggleAll = () => {
    if (selectedPages.size === pages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(pages.map((_, i) => i)));
    }
  };

  const handleExportTxt = () => {
    const textToExport = getSelectedText();

    const blob = new Blob([textToExport], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "typique-document.txt";
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleSendWhatsApp = () => {
    if (selectedPages.size === 0) return;

    const cleanNumber = whatsAppNumber.replace(/\D/g, "");
    if (!/^\d{10}$/.test(cleanNumber)) {
      alert("Please enter a valid 10-digit mobile number without 91.");
      return;
    }

    const messageText = getSelectedText();
    const waUrl = `https://wa.me/91${cleanNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setWhatsAppNumber(nextDigits);
  };

  const handleWhatsAppNumberKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== "Backspace") return;
    e.preventDefault();
    setWhatsAppNumber((prev) => prev.slice(0, -1));
  };

  const handleExportPdf = async () => {
    if (selectedPages.size === 0) return;
    setIsExporting(true);

    try {
      const { jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();

      const selectedIndices = Array.from(selectedPages).sort();

      for (let i = 0; i < selectedIndices.length; i++) {
        const pageIndex = selectedIndices[i];
        const pageElement = document.getElementById(`export-page-${pageIndex}`);
        if (!pageElement) continue;

        const canvas = await html2canvas(pageElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: paperColor,
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const ratio = imgProps.width / imgProps.height;
        const height = pdfWidth / ratio;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, height);
      }

      pdf.save("typique-document.pdf");
      onClose();
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden border-4 border-blue-200 flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-blue-100 flex justify-between items-center bg-blue-50 shrink-0">
              <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                <Download className="w-5 h-5" /> Export Document
              </h2>
              <button
                onClick={onClose}
                className="text-blue-300 hover:text-blue-500 transition-colors"
                disabled={isExporting}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Select Pages</h3>
                <button
                  onClick={toggleAll}
                  className="text-sm font-bold text-blue-500 hover:text-blue-700"
                >
                  {selectedPages.size === pages.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {pages.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => togglePage(index)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors border-2 ${selectedPages.has(index) ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}
                  >
                    {selectedPages.has(index) ? (
                      <CheckSquare className="w-5 h-5 text-blue-500 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300 shrink-0" />
                    )}
                    <span
                      className={`font-medium ${selectedPages.has(index) ? "text-blue-700" : "text-gray-600"}`}
                    >
                      Page {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-blue-100 bg-blue-50 flex flex-col gap-3 shrink-0">
              <div className="bg-white border-2 border-green-200 rounded-xl p-3 sm:p-4 space-y-2">
                <label
                  htmlFor="whatsapp-number"
                  className="text-xs sm:text-sm font-bold text-green-700"
                >
                  Send via WhatsApp
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold text-sm">
                    +91
                  </span>
                  <input
                    id="whatsapp-number"
                    type="tel"
                    inputMode="numeric"
                    value={whatsAppNumber}
                    onChange={handleWhatsAppNumberChange}
                    onKeyDown={handleWhatsAppNumberKeyDown}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
                <p className="text-xs text-green-700/80">
                  Enter mobile number without 91. We auto-prefill 91 in the API.
                </p>
                <button
                  onClick={handleSendWhatsApp}
                  disabled={selectedPages.size === 0 || isExporting}
                  className="w-full py-2.5 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                </button>
              </div>

              <button
                onClick={handleExportPdf}
                disabled={selectedPages.size === 0 || isExporting}
                className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isExporting ? (
                  <span className="animate-pulse">Generating PDF...</span>
                ) : (
                  <>
                    <FileText className="w-5 h-5" /> Export as PDF
                  </>
                )}
              </button>
              <button
                onClick={handleExportTxt}
                disabled={selectedPages.size === 0 || isExporting}
                className="w-full py-3 bg-white text-blue-600 border-2 border-blue-200 rounded-xl font-bold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export as Plain Text
              </button>
            </div>
          </motion.div>

          {/* Hidden elements for PDF generation */}
          <div className="absolute top-[-9999px] left-[-9999px] pointer-events-none">
            {pages.map((text, index) => (
              <div
                key={index}
                id={`export-page-${index}`}
                className="w-[800px] min-h-[1131px] p-16" // A4 ratio
                style={{
                  backgroundColor: paperColor,
                  color: inkColor,
                  fontFamily: getFontFamily(font),
                  fontSize: "1.25rem",
                  lineHeight: "28px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {getRenderableText(text, font)}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
