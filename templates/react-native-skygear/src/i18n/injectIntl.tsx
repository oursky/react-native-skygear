import * as React from "react";
import { Consumer, ContextValue } from "@oursky/react-messageformat";
import hoistNonReactStatic from "hoist-non-react-statics";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export interface IntlProps {
  intl: ContextValue;
}

function _injectIntl<Props extends IntlProps>(
  Component: React.ComponentType<Props>
) {
  return function(props: Subtract<Props, IntlProps>) {
    // tslint:disable-next-line: oursky-no-inline-function-children
    return <Consumer>{intl => <Component {...props} intl={intl} />}</Consumer>;
  };
}

export function injectIntl<Props extends IntlProps>(
  Component: React.ComponentType<Props>
) {
  const WrappedComponent = _injectIntl(Component);
  hoistNonReactStatic(WrappedComponent, Component);
  return WrappedComponent;
}
