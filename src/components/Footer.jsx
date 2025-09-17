import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

// import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
  'PLATFORM_NAME',
  'ABOUT_URL',
  'CONTACT_URL',
  'TOS_URL',
  'PRIVACY_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;

    console.log(this.props);

    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;
    const currentYear = new Date().getFullYear();


    return (
      <footer class="primary" role="contentinfo">
        <div class="footer-content-primary data-from-my-mfe-version-2">
          <div class="colophon">
            <p>&copy; {currentYear}{' '} <a href={config.LMS_BASE_URL} rel="external">{config.PLATFORM_NAME}</a>.</p>
          </div>

          <nav class="nav-peripheral" aria-label="">
            <ol>
              <li class="nav-item nav-peripheral-aar">
                <a href={config.ABOUT_URL}>{intl.formatMessage(messages['footer.legalLinks.privacyPolicy'])}</a>
              </li>
              <li class="nav-item">
                <a href={config.CONTACT_URL}>{intl.formatMessage(messages['footer.connectLinks.contact'])}</a>
              </li>
              <li class="nav-item nav-peripheral-tos">
                <a href={config.TOS_URL}>{intl.formatMessage(messages['footer.legalLinks.termsOfService'])}</a>
              </li>
              <li class="nav-item nav-peripheral-pp">
                <a href={config.PRIVACY_URL}>{intl.formatMessage(messages['footer.legalLinks.privacyPolicy'])}</a>
              </li>
            </ol>
          </nav>

          {showLanguageSelector && (<LanguageSelector options={supportedLanguages} onSubmit={onLanguageSelected} />)}

        </div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
