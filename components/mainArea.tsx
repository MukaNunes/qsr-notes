import React, { useState } from "npm:react";
import { Box, Text, useInput } from "npm:ink";
import { Theme } from "../theme/theme.ts";

export const MainArea = () => {
  const [lines, setLines] = useState<string[]>([""]);
  const [cursor, setCursor] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  });

  useInput((input, key) => {
    const currentLine = lines[cursor.row] || "";

    if (key.return) {
      const newLines = [...lines];
      newLines.splice(cursor.row + 1, 0, "");
      setLines(newLines);
      setCursor({ row: cursor.row + 1, col: 0 });
    } else if (key.backspace) {
      // TODO: Implementar remoção de caracteres
    } else if (input) {
      const updatedLine =
        currentLine.slice(0, cursor.col) +
        input +
        currentLine.slice(cursor.col);
      const newLines = [...lines];
      newLines[cursor.row] = updatedLine;
      setLines(newLines);
      setCursor({ ...cursor, col: cursor.col + 1 });
    }
  });

  return (
    <Box
      borderStyle={Theme.borderStyle}
      borderColor={Theme.borderColor}
      width="100%"
      flexDirection="column"
      paddingLeft={1}
      paddingRight={1}
    >
      {lines.map((line: string, i: number) =>
        React.createElement(
          Text,
          { key: i },
          i === cursor.row
            ? line.slice(0, cursor.col) + "_" + line.slice(cursor.col)
            : line
        )
      )}
    </Box>
  );
};
