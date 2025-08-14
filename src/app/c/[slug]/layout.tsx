import React from "react";
import {getAllCategories} from "@/utils/lib/categories";

export async function generateStaticParams() {
  const categories = await getAllCategories();

  if (!categories) {
    return [];
  }

  const paths = categories.map((category) => {
    const {slug} = category;

    return {
      slug
    };
  });

  return paths;
}

type TCategoryLayoutProps = {
  children: React.ReactNode;
}

export default function CategoryLayout({ children }: TCategoryLayoutProps) {
  return <>{children}</>;
}