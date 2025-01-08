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
      <head>
        {/* Add your custom font link */}
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledLayout>{children}</StyledLayout>
      </body>
    </html>
  );
}
