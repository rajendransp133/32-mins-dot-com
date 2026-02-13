import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";

const ctaButtonVariants = cva(
  "px-7 py-2 rounded-4xl text-[clamp(0.75rem,3vw,1.25rem)] tracking-tighter flex items-center justify-center gap-3 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-transparent text-white border-white border font-normal rounded-3xl w-fit btn-style510",
        secondary:
          "bg-[#2943FC] text-white font-semibold w-fit rounded-3xl btn-style511",
      },
    },
  }
);

export default function CtaButton({
  variant = "primary",
  onClick = () => {},
  children = "",
}: VariantProps<typeof ctaButtonVariants> & {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button className={cx(ctaButtonVariants({ variant }))} onClick={onClick}>
      {children}
    </button>
  );
}
