import React from "npm:react";
import { Box, Text, useFocus } from "npm:ink";
import { Theme } from "../theme/theme.ts";

type ItemProps = {
  readonly id: string;
  readonly label: string;
};

function CommandItem({ label, id }: ItemProps) {
  const { isFocused } = useFocus({ id });
  return (
    <Text color={isFocused ? Theme.focusColor : Theme.menuColor}>{label}</Text>
  );
}

export const Header = () => {
  const commandItems = [
    { id: "negrito", label: "𝗕" },
    { id: "italico", label: "𝘐" },
    { id: "sublinhado", label: "S̲" }
  ];

  return (
    <Box
      borderStyle={Theme.borderStyle}
      borderColor={Theme.borderColor}
      width="100%"
      paddingLeft={1}
    >
      <Box flexGrow={1}>
        <Text color={Theme.textColor}>QSR Notes</Text>
      </Box>

      <Box>
        {commandItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <CommandItem id={item.id} label={item.label} />
            {index < commandItems.length - 1 && <Text> | </Text>}
          </React.Fragment>
        ))}<Text> </Text>
      </Box>
    </Box>
  );
};
