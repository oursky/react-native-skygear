import * as React from "react";
import { Consumer, ContextValue } from "@oursky/react-messageformat";
import hoistNonReactStatic from "hoist-non-react-statics";

export interface IntlProps {
  intl: ContextValue;
}

function _injectIntl<Props>(Component: React.ComponentType<Props & IntlProps>) {
  const ComponentWithIntl: React.SFC<Props> = props => {
    // tslint:disable-next-line:oursky-no-inline-function-children
    return <Consumer>{intl => <Component {...props} intl={intl} />}</Consumer>;
  };
  return ComponentWithIntl;
}

export function injectIntl<Props extends IntlProps>(
  Component: React.ComponentType<Props>
) {
  const WrappedComponent = _injectIntl(Component);
  hoistNonReactStatic(WrappedComponent, Component);
  return WrappedComponent;
}
