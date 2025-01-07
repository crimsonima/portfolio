import StyledLayout from "./StyledLayout";
import GlobalStyles from "./GlobalStyles";

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
      <GlobalStyles />
      <body>
        <StyledLayout>{children}</StyledLayout>
      </body>
    </html>
  );
}
