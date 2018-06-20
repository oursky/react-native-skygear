import * as React from 'react';
import { connect } from 'react-redux';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { Locale } from '../reducers/app';
import { ApplicationState } from '../reducers';

interface Props {
  children: React.ReactNode;
}

interface MapProps {
  locale: Locale;
}

function renderText(props: { children: string }) {
  return props.children;
}

interface Messages {
  [key: string]: string;
}

interface MessagesByLocale {
  [locale: string]: Messages;
}

const messagesByLocale: MessagesByLocale = {
  en: {
    hello: 'world',
  },
};

class IntlProvider extends React.PureComponent<Props & MapProps> {
  render() {
    return (
      <ReactIntlProvider
        locale={this.props.locale}
        messages={messagesByLocale[this.props.locale]}
        textComponent={renderText}
      >
        {this.props.children}
      </ReactIntlProvider>
    );
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    locale: state.app.locale,
  };
}

export default connect(mapStateToProps)(IntlProvider);
