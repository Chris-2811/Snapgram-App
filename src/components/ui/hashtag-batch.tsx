import React from "react";

function HashtagBatch({ title }: { title: string }) {
  return (
    <div className="rounded-full border border-light-400 px-3 py-[0.625rem] text-xs font-semibold text-light-300 md:px-4">
      #{title}
    </div>
  );
}

export default HashtagBatch;
