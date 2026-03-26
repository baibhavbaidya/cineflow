"use client";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  subtitle?: string;
  delay?: number;
  accent?: boolean;
}

export default function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  subtitle,
  delay = 0,
  accent = false,
}: StatCardProps) {
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isNumber = typeof value === "number";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!visible || !isNumber) return;
    const duration = 1200;
    const steps = 60;
    const increment = (value as number) / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= (value as number)) {
        setDisplay(value as number);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [visible, value, isNumber]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden scanline"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        background: "var(--cinema-card)",
        border: `1px solid ${accent ? "var(--cinema-amber)" : "var(--cinema-border)"}`,
        borderRadius: "2px",
        padding: "1.5rem",
      }}
    >
      {accent && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, var(--cinema-amber), var(--cinema-gold))",
          }}
        />
      )}
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "var(--cinema-dim)",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "2.8rem",
          lineHeight: 1,
          color: accent ? "var(--cinema-amber)" : "var(--cinema-text)",
          letterSpacing: "0.02em",
        }}
      >
        {prefix}
        {isNumber ? display.toLocaleString() : value}
        {suffix}
      </p>
      {subtitle && (
  <p style={{
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.6rem",
    color: "var(--cinema-amber)",
    letterSpacing: "0.05em",
    marginTop: "0.4rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "160px",
    opacity: 0.8,
  }}>
    {subtitle}
  </p>
)}
    </div>
  );
}