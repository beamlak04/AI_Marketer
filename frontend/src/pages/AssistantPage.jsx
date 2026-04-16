import React from "react";
import ChatUI from "../components/assistant/ChatUI";

const AssistantPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <div className="section-kicker">AI Assistant</div>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">Ask for captions, pricing ideas, or product analysis.</h2>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">Use the assistant to generate launch copy, refine offers, or turn product data into the next campaign.</p>
      </div>
      <div className="soft-surface rounded-[2rem] p-4 md:p-5">
        <ChatUI />
      </div>
    </div>
  );
};

export default AssistantPage;
