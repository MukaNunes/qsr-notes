import React from "npm:react";
import { Box, Text } from "npm:ink";
import { Theme } from "../theme/theme.ts";
import { useAppContext } from "../providers/app.context.tsx";

export const Footer = () => {
  const { logs } = useAppContext();
  const logEntry = logs.length > 0 ? logs[logs.length - 1] : "-";

  return (
    <Box
      borderStyle={Theme.borderStyle}
      borderColor={Theme.borderColor}
      width="100%"
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      <Text color={Theme.textColor}>
        <Text>{logEntry}</Text>
      </Text>
    </Box>
  );
};
