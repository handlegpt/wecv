import Image from "next/image";
import Link from "next/link";
import React from "react";
import CallToAction from "../components/feature/CallToAction";
import Features from "../components/feature/Feature";
import FeaturesList from "../components/feature/FeatureList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WeCV AI - 智能简历生成器",
  description:
    "WeCV AI 智能简历生成器，基于AI技术帮助您创建专业简历，支持PDF、Word格式下载，免费开源服务。",
};

export default function Page() {
  return (
    <>
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row">
          <div className="">
            <Image
              src="/resume_undraw.svg"
              alt="WeCV AI Hero Image"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={600}
              height={600}
            />
          </div>
          <div>
            <h1 className="mb-5 text-5xl font-bold">WeCV AI</h1>
            <p className="mb-5">
              WeCV AI 智能简历生成器，基于AI技术帮助您创建专业简历，
              支持PDF、Word格式下载，直接分享给朋友或招聘方。
              完全免费的开源服务。
            </p>
            <button className="btn btn-primary text-white ">
              <Link href="/resume">开始使用</Link>
            </button>
          </div>
        </div>
      </div>

      <Features />
      <FeaturesList />
      <CallToAction />
    </>
  );
}
