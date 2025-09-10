import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
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

    // <footer id="footer" class="tutor-container">
    //   <div class="footer-top">
    //     <div class="powered-area">
    //       <ul class="logo-list">
    //         <li>Powered by</li>
    //         <li><a href="https://edly.io/tutor/" rel="noreferrer" target="_blank">
    //             <img src="https://nacarlearning.org/theming/asset/images/tutor-logo.png" alt="Runs on Tutor" width="57">
    //           </a>
    //         </li>
    //         <li><a href="https://open.edx.org" rel="noreferrer" target="_blank">
    //             <img src="https://nacarlearning.org/theming/asset/images/openedx-logo.png" alt="Powered by Open edX" width="79">
    //             </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   <span class="copyright-site">Copyrights ©2025. All Rights Reserved.</span>
    // </footer>


    return (
      <footer
        role="contentinfo"
        className="footer d-flex border-top py-3 px-4 data-from-my-mfe-version-2"
      >
        <div className="container-fluid d-flex">
          <a
            className="d-block"
            href={config.LMS_BASE_URL}
            aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
          >
            <img
              style={{ maxHeight: 45 }}
              src={logo || config.LOGO_TRADEMARK_URL}
              alt={intl.formatMessage(messages['footer.logo.altText'])}
            />
          </a>
          <div className="flex-grow-1" />
          {showLanguageSelector && (
            <LanguageSelector
              options={supportedLanguages}
              onSubmit={onLanguageSelected}
            />
          )}
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
