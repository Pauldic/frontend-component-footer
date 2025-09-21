import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
// import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';
import { ActionRow, Container, Hyperlink } from '@edx/paragon';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

// ensureConfig([
//   'ABOUT_URL',
//   'CONTACT_URL',
//   'LMS_BASE_URL',
//   'MARKETING_SITE_BASE_URL',
//   'TERMS_OF_SERVICE_URL',
//   'PRIVACY_POLICY_URL',
//   'SUPPORT_EMAIL',
//   'SITE_NAME',
//   'STUDIO_BASE_URL',
//   'SHOW_ACCESSIBILITY_PAGE',
// ], 'Footer component');

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

    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    // const { config } = this.context;
    const LMS_BASE_URL = "https://nacarlearning.org";
    const STUDIO_BASE_URL = "https://studio.nacarlearning.org";
    const config = {
      "MARKETING_BASE_URL": LMS_BASE_URL,
      "ABOUT_URL": LMS_BASE_URL + "/about",
      "CONTACT_URL": LMS_BASE_URL + "/contact",
      "TERMS_OF_SERVICE_URL": LMS_BASE_URL + "/tos",
      "PRIVACY_POLICY_URL": LMS_BASE_URL + "/privacy",
      "SHOW_ACCESSIBILITY_PAGE": this.context.config.SHOW_ACCESSIBILITY_PAGE,
      "STUDIO_BASE_URL": STUDIO_BASE_URL,
      "LMS_BASE_URL": LMS_BASE_URL,
      "SITE_NAME": "NACAR Learning Site"
    }


    return (
      <footer class="primary" role="contentinfo">
        <Container size="xl" className="px-4">
          <ActionRow className="pt-3 m-0 x-small just-to-know-2 footer-links">
            {!_.isEmpty(config.ABOUT_URL) && (
              <Hyperlink destination={config.ABOUT_URL} data-testid="aboutUs" className="footer-link">
                {intl.formatMessage(messages['footer.edxLinks.about'])}
              </Hyperlink>
            )}
            {!_.isEmpty(config.CONTACT_URL) && (
              <Hyperlink destination={config.CONTACT_URL} data-testid="contactUs" className="footer-link">
                {intl.formatMessage(messages['footer.connectLinks.contact'])}
              </Hyperlink>
            )}
            {!_.isEmpty(config.TERMS_OF_SERVICE_URL) && (
              <Hyperlink destination={config.TERMS_OF_SERVICE_URL} data-testid="termsOfService" className="footer-link">
                {intl.formatMessage(messages['footer.legalLinks.termsOfService'])}
              </Hyperlink>
            )}{!_.isEmpty(config.PRIVACY_POLICY_URL) && (
              <Hyperlink destination={config.PRIVACY_POLICY_URL} data-testid="privacyPolicy" className="footer-link">
                {intl.formatMessage(messages['footer.legalLinks.privacyPolicy'])}
              </Hyperlink>
            )}
            {config.SHOW_ACCESSIBILITY_PAGE === 'true' && (
              <Hyperlink
                destination={`${config.STUDIO_BASE_URL}/accessibility`}
                data-testid="accessibilityRequest"
              >
                {intl.formatMessage(messages['footer.legalLinks.a11yPolicy'])}
              </Hyperlink>
            )}
          </ActionRow>
          <ActionRow className="mb-3">
            © {new Date().getFullYear()} <Hyperlink destination={config.MARKETING_BASE_URL} target="_blank" className="ml-2">{config.SITE_NAME}</Hyperlink>
          </ActionRow>
          {showLanguageSelector && (<LanguageSelector options={supportedLanguages} onSubmit={onLanguageSelected} />)}
        </Container>
        <style>{`
          .footer-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            text-align: center;
          }
          .footer-link { 
            transition: color 0.2s;
          }
          .help-sidebar > .sidebar-link,
          .help-sidebar .sidebar-link,
          button[data-testid="helpToggleButton"],
          a[href*="edx.org"],
          a[href*="openedx.org"],
          a[href*="readthedocs.io"],
          .footer-top .powered-area,
          .footer-top > .powered-area {
            display: none !important;
          }
        `}</style>
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
