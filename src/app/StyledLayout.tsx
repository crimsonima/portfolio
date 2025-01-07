"use client";

import GlobalStyles from "./styles/GlobalStyles";

export default function StyledLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}
