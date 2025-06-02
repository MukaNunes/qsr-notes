import React, { useState, useEffect } from "npm:react";
import { Box, render, Text, useStdout } from "npm:ink";
import { Header, MainArea, Sidebar } from "./components/index.ts";
import { Footer } from "./components/footer.tsx";
import { AppProvider } from "./providers/app.context.tsx";

function getTerminalHeight() {
  return Deno.consoleSize().rows;
}

export const MainTemplate = () => {
  const { stdout } = useStdout();
  const [height, setHeight] = useState(stdout?.rows ?? 24);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentHeight = getTerminalHeight();
      setHeight((prev: number) => (prev !== currentHeight ? currentHeight : prev));
    }, 250);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (!stdout) return;

    function onResize() {
      setHeight(stdout.rows);
    }

    stdout.on("resize", onResize);

    return () => stdout.off("resize", onResize);
  }, [stdout]);

  return (
    <Box flexDirection="column" height={height-1}>
      <Header />
      <Box flexGrow={1} flexDirection="row">
        <Sidebar />
        <MainArea />
      </Box>
      <Footer />
    </Box>
  );
}

render(
  <AppProvider>
    <MainTemplate />
  </AppProvider>
);
