import * as React from "react";
import { Text, TextProps } from "react-native";
import {
  FormattedMessage,
  Components,
  Values,
} from "@oursky/react-messageformat";

export const AppText: React.SFC<TextProps> = props => (
  <Text allowFontScaling={false} {...props} />
);

interface LocalizedTextProps extends TextProps {
  messageID: string;
  messageArgs?: Values;
  components?: Components;
}

export function LocalizedText(props: LocalizedTextProps) {
  const { messageID, messageArgs, components, ...textProps } = props;
  return (
    <AppText {...textProps}>
      <FormattedMessage
        id={messageID}
        values={messageArgs}
        components={components}
      />
    </AppText>
  );
}
