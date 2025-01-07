import StyledLayout from "./StyledLayout";

export const metadata = {
  title: "Portfolio",
  description: "My portfolio site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledLayout>{children}</StyledLayout>
      </body>
    </html>
  );
}
