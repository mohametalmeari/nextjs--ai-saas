"use client";

import { Heading } from "@/components/heading";
import { MessageSquareIcon } from "lucide-react";

const Page = () => {
  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquareIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>Hi-Prompt-Form</div>
        <div className="space-y-4 mt-4">Hi-Messages-Content</div>
      </div>
    </div>
  );
};

export default Page;
