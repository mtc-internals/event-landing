"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { skipOptimizer } from "@/lib/img";

export interface CollagePhoto {
  key: string;
  image: string;
  title: string;
  badge: string;
  color: string;
}

const SLOTS = [
  { top: "2%", left: "0%", rotate: -7, size: 128 },
  { top: "58%", left: "6%", rotate: 5, size: 108 },
  { top: "4%", right: "2%", rotate: 6, size: 112 },
  { top: "56%", right: "8%", rotate: -6, size: 132 },
] as const;

export function HeroPhotoCollage({ photos }: { photos: CollagePhoto[] }) {
  if (photos.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {photos.slice(0, 4).map((photo, i) => {
        const slot = SLOTS[i];
        return (
          <motion.div
            key={photo.key}
            initial={{ opacity: 0, scale: 0.85, rotate: slot.rotate - 6 }}
            animate={{ opacity: 1, scale: 1, rotate: slot.rotate }}
            transition={{ duration: 0.6, delay: 0.15 * i, ease: "easeOut" }}
            className="absolute"
            style={{
              top: slot.top,
              left: "left" in slot ? slot.left : undefined,
              right: "right" in slot ? slot.right : undefined,
              width: slot.size,
              height: slot.size,
            }}
          >
            <div
              className="absolute -inset-3 rounded-[38%_62%_63%_37%/41%_44%_56%_59%]"
              style={{ background: `${photo.color}2e` }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-elevated ring-4 ring-background">
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="140px"
                unoptimized={skipOptimizer(photo.image)}
                className="object-cover"
              />
            </div>
            <span
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-2 rounded-full border border-border-subtle bg-surface-elevated px-2.5 py-1 text-[0.6rem] font-bold whitespace-nowrap text-foreground shadow-soft"
            >
              {photo.badge}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
