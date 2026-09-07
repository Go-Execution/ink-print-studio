import { useState } from "react";
import tshirt from "@/assets/tshirt.jpg";

type Ink = {
  id: string;
  name: string;
  hex: string;
  code: string;
  onLight: boolean;
};

const INKS: Ink[] = [
  { id: "cobalt", name: "Cobalt", hex: "#2A4B8D", code: "PMS 293", onLight: false },
  { id: "coral", name: "Coral", hex: "#FF5A3C", code: "PMS 172", onLight: false },
  { id: "marigold", name: "Marigold", hex: "#FFB627", code: "PMS 130", onLight: true },
  { id: "ink", name: "Ink Black", hex: "#1B1B1F", code: "PMS BLK", onLight: false },
  { id: "white", name: "Off White", hex: "#F6F4EF", code: "PMS 000", onLight: true },
];

export function InkPicker() {
  const [ink, setInk] = useState<Ink>(INKS[0]!);

  return (
    <div className="ticket relative bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-hairline pb-3">
        <span className="spec">Live preview / Tee 001</span>
        <span className="spec text-cobalt">100% Cotton</span>
      </div>

      <div className="relative mt-4 overflow-hidden bg-bg">
        <img
          src={tshirt}
          alt="Blank white cotton t-shirt laid flat, shown from above as a print preview"
          width={1024}
          height={1024}
          className="block w-full mix-blend-multiply"
        />
        {/* Printed graphic area */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2"
        >
          <svg viewBox="0 0 200 200" className="w-full">
            <g
              style={{
                fill: ink.hex,
                stroke: ink.hex,
                transition: "fill 180ms ease, stroke 180ms ease",
              }}
            >
              <circle cx="100" cy="100" r="72" fill="none" strokeWidth="7" />
              <text
                x="100"
                y="88"
                textAnchor="middle"
                stroke="none"
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "40px",
                  letterSpacing: "-1px",
                }}
              >
                YOUR
              </text>
              <text
                x="100"
                y="126"
                textAnchor="middle"
                stroke="none"
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "40px",
                  letterSpacing: "-1px",
                }}
              >
                DESIGN
              </text>
              <rect x="52" y="140" width="96" height="5" stroke="none" />
            </g>
          </svg>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="spec mb-3">Pick your ink</legend>
        <div className="flex flex-wrap items-center gap-3">
          {INKS.map((c) => {
            const active = c.id === ink.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setInk(c)}
                aria-pressed={active}
                aria-label={`${c.name} ink`}
                title={c.name}
                className={`swatch ${active ? "swatch-active" : ""}`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
        <p className="spec mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-hairline pt-3">
          <span>Ink: {ink.name}</span>
          <span className="text-thread">Ref {ink.code}</span>
        </p>
      </fieldset>
    </div>
  );
}
