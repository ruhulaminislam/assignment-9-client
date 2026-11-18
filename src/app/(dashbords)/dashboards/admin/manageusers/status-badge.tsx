export function StatusBadge({ isBlocked }: { isBlocked: boolean }) {
  if (isBlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBE9E7] px-2.5 py-1 text-xs font-medium text-[#B94343] ring-1 ring-[#B94343]/20">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        Blocked
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F3EA] px-2.5 py-1 text-xs font-medium text-[#287A55] ring-1 ring-[#287A55]/20">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      Active
    </span>
  );
}
