import { Metadata } from "next";
import React from "react";
import ResumeForm from "../../../components/resume/Form";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "创建简历 - WeCV AI",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-3/4 lg:w-3/5">
        {/* <h2>Edit Resume</h2> */}
        <Breadcrumbs currentPage="创建/编辑简历" />
        <ResumeForm></ResumeForm>
      </div>
    </div>
  );
}
