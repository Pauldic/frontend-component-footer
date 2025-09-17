import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';
import { ActionRow, Container, Hyperlink } from '@edx/paragon';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';
import '../_footer.scss';

ensureConfig([
  'ABOUT_URL',
  'CONTACT_URL',
  'LMS_BASE_URL',
  'MARKETING_SITE_BASE_URL',
  'TERMS_OF_SERVICE_URL',
  'PRIVACY_POLICY_URL',
  'SUPPORT_EMAIL',
  'SITE_NAME',
  'STUDIO_BASE_URL',
  'SHOW_ACCESSIBILITY_PAGE',
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

    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;


    return (
      <footer class="primary" role="contentinfo">
        <Container size="xl" className="px-4">
          <ActionRow className="pt-3 m-0 x-small just-to-know-2">
            © {new Date().getFullYear()} <Hyperlink destination={config.MARKETING_BASE_URL} target="_blank" className="ml-2">{config.SITE_NAME}</Hyperlink>
            <ActionRow.Spacer />
            {!_.isEmpty(config.ABOUT_URL) && (
              <Hyperlink destination={config.ABOUT_URL} data-testid="aboutUs">
                {intl.formatMessage(messages['footer.edxLinks.about'])}
              </Hyperlink>
            )}
            {!_.isEmpty(config.CONTACT_URL) && (
              <Hyperlink destination={config.CONTACT_URL} data-testid="contactUs">
                {intl.formatMessage(messages['footer.connectLinks.contact'])}
              </Hyperlink>
            )}
            {!_.isEmpty(config.TERMS_OF_SERVICE_URL) && (
              <Hyperlink destination={config.TERMS_OF_SERVICE_URL} data-testid="termsOfService">
                {intl.formatMessage(messages['footer.legalLinks.termsOfService'])}
              </Hyperlink>
            )}{!_.isEmpty(config.PRIVACY_POLICY_URL) && (
              <Hyperlink destination={config.PRIVACY_POLICY_URL} data-testid="privacyPolicy">
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
            <Hyperlink destination={config.LMS_BASE_URL}>{config.SITE_NAME} Site</Hyperlink>
          </ActionRow>
          {showLanguageSelector && (<LanguageSelector options={supportedLanguages} onSubmit={onLanguageSelected} />)}
        </Container>
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
