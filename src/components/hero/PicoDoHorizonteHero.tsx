import React from "react";
import picoDoHorizonteHero from "@/assets/pico-do-horizonte-hero";

type Props = {
  src?: string; // default: pico do horizonte reviewer image
  alt?: string; // acessibilidade
  height?: number; // altura em px (ex.: 520)
  overlay?: boolean; // overlay suave opcional
  className?: string; // classes extras
};

const DEFAULT_IMAGE_SRC = picoDoHorizonteHero;

export default function PicoDoHorizonteHero({
  src = DEFAULT_IMAGE_SRC,
  alt = "Trilha do Pico do Horizonte, trilha de terra sinuosa levando a um pico ao pôr do sol",
  height = 520,
  overlay = false,
  className = "",
}: Props) {
  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
      aria-label={alt}
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url('${src}')` }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none" />
      )}
      {/* Sem texto; apenas imagem */}
    </section>
  );
}
