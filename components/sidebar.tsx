import React from "npm:react";
import {
  Box,
  Text,
  useApp,
  useFocus,
  useFocusManager,
  useInput,
} from "npm:ink";
import { Theme } from "../theme/theme.ts";
import { useAppContext } from "../providers/app.context.tsx";

type ItemProps = {
  readonly id: string;
  readonly label: string;
};

function Item({ label, id }: ItemProps) {
  const { isFocused } = useFocus({ id });
  return (
    <Text color={isFocused ? Theme.focusColor : Theme.menuColor}>{label}</Text>
  );
}

export const Sidebar = () => {
  const { exit } = useApp();
  const { focus } = useFocusManager();
  const { addLog } = useAppContext();

  useInput((input, key) => {
    addLog(`Input: ${JSON.stringify(input)} - Char: ${input.charCodeAt(0)}`);
    if (input === "q" && key.meta) exit();
    if (input === "1" && key.meta) focus("1");
    if (input === "2" && key.meta) focus("2");
    if (input === "3" && key.meta) focus("3");
    if (input === "b" && key.meta) focus("negrito");
    if (input === "i" && key.meta) focus("italico");
    if (input === "s" && key.meta) focus("sublinhado");
  });

  return (
    <Box
      borderStyle={Theme.borderStyle}
      borderColor={Theme.borderColor}
      width="20%"
      flexDirection="column"
      flexGrow={1}
      paddingLeft={1}
      paddingRight={1}
    >
      <Item id="1" label="Item 1" />
      <Item id="2" label="Item 2" />
      <Item id="3" label="Item 3" />
    </Box>
  );
};
