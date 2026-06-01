"use client";

export function PrintResumeButton() {
  return (
    <button className="resume-print-button" onClick={() => window.print()} type="button">
      导出 PDF
    </button>
  );
}
