import React, { useState } from 'react';
import _ from 'lodash';
import { intlShape, injectIntl, FormattedMessage } from '@edx/frontend-platform/i18n';
// import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import {
  ActionRow,
  Button,
  Container,
  Hyperlink,
  Image,
  TransitionReplace,
} from '@edx/paragon';
import { ExpandLess, ExpandMore, Help } from '@edx/paragon/icons';
import messages from './messages';

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
// ], 'Studio Footer component');

const StudioFooter = ({
  // injected
  intl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { _config } = useContext(AppContext);
  const LMS_BASE_URL = "https://nacarlearning.org";
  const STUDIO_BASE_URL = "https://studio.nacarlearning.org";
  const config = {
    "SUPPORT_EMAIL": "education@nacarlearning.org",
    "MARKETING_BASE_URL": LMS_BASE_URL,
    "ABOUT_URL": LMS_BASE_URL + "/about",
    "CONTACT_URL": LMS_BASE_URL + "/contact",
    "TERMS_OF_SERVICE_URL": LMS_BASE_URL + "/tos",
    "PRIVACY_POLICY_URL": LMS_BASE_URL + "/privacy",
    "SHOW_ACCESSIBILITY_PAGE": "false",
    "STUDIO_BASE_URL": STUDIO_BASE_URL,
    "LMS_BASE_URL": LMS_BASE_URL,
    "SITE_NAME": "NACAR Learning Site"
  }

  return (
    <>
      <div className="m-0 mt-6 row align-items-center justify-content-center data-from-my-mfe-version-1a">
        <div className="col border-top mr-2" />
        <Button
          data-testid="helpToggleButton"
          variant="outline-primary"
          onClick={() => setIsOpen(!isOpen)}
          iconBefore={Help}
          iconAfter={isOpen ? ExpandLess : ExpandMore}
          size="sm"
          style={{ display: "none" }}
        >
          {isOpen ? intl.formatMessage(messages.closeHelpButtonLabel)
            : intl.formatMessage(messages.openHelpButtonLabel)}
        </Button>
        <div className="col border-top ml-2" />
      </div>
      <Container size="xl" className="px-4">
        <TransitionReplace>
          {isOpen ? (
            <ActionRow key="help-link-button-row" className="py-4 just-to-know-1" data-testid="helpButtonRow" style={{ display: "none" }}>
              <ActionRow.Spacer />
              <Button as="a" href="https://docs.edx.org/" size="sm">
                <FormattedMessage {...messages.edxDocumentationButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://open.edx.org/"
                size="sm"
                data-testid="openEdXPortalButton"
              >
                <FormattedMessage {...messages.openEdxPortalButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://www.edx.org/course/edx101-overview-of-creating-an-edx-course#.VO4eaLPF-n1"
                size="sm"
              >
                <FormattedMessage {...messages.edx101ButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://www.edx.org/course/studiox-creating-a-course-with-edx-studio"
                size="sm"
              >
                <FormattedMessage {...messages.studioXButtonLabel} />
              </Button>
              {!_.isEmpty(config.SUPPORT_EMAIL) && (
                <Button
                  as="a"
                  href={`mailto:${config.SUPPORT_EMAIL}`}
                  size="sm"
                  data-testid="contactUsButton"
                >
                  <FormattedMessage {...messages.contactUsButtonLabel} />
                </Button>
              )}
              <ActionRow.Spacer />
            </ActionRow>
          ) : null}
        </TransitionReplace>
        <ActionRow className="pt-3 m-0 x-small just-to-know-2 footer-links">
          {!_.isEmpty(config.ABOUT_URL) && (
            <Hyperlink destination={config.ABOUT_URL} data-testid="aboutUs" className="footer-link" >
              {intl.formatMessage(messages.aboutUsLink)}
            </Hyperlink>
          )}
          {!_.isEmpty(config.CONTACT_URL) && (
            <Hyperlink destination={config.CONTACT_URL} data-testid="contactUS" className="footer-link">
              {intl.formatMessage(messages.contactUsLink)}
            </Hyperlink>
          )}
          {!_.isEmpty(config.TERMS_OF_SERVICE_URL) && (
            <Hyperlink destination={config.TERMS_OF_SERVICE_URL} data-testid="termsOfService" className="footer-link">
              {intl.formatMessage(messages.termsOfServiceLinkLabel)}
            </Hyperlink>
          )}
          {!_.isEmpty(config.PRIVACY_POLICY_URL) && (
            <Hyperlink destination={config.PRIVACY_POLICY_URL} data-testid="privacyPolicy" className="footer-link">
              {intl.formatMessage(messages.privacyPolicyLinkLabel)}
            </Hyperlink>
          )}
          {config.SHOW_ACCESSIBILITY_PAGE === 'true' && (
            <Hyperlink destination={`${config.STUDIO_BASE_URL}/accessibility`} data-testid="accessibilityRequest" className="footer-link">
              {intl.formatMessage(messages.accessibilityRequestLinkLabel)}
            </Hyperlink>
          )}          
        </ActionRow>
        <ActionRow className="mt-3 pb-4 x-small">
          © {new Date().getFullYear()} <Hyperlink destination={config.MARKETING_BASE_URL} target="_blank" className="ml-2">{config.SITE_NAME}</Hyperlink>
          {/* <ActionRow.Spacer />
          <Hyperlink destination={config.LMS_BASE_URL} className="footer-link-lms">{config.SITE_NAME}</Hyperlink> */}
        </ActionRow>
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
          div.pgn__modal-body-content div.video-editor > button:first-child {
            display: none !important; // Hide replace video on the Unit video modal
          }
          .pgn__modal-body-content > h4:nth-of-type(2),
          .pgn__modal-body-content > h4:nth-of-type(2) + hr,
          .pgn__modal-body-content > h4:nth-of-type(2) + hr + div.pgn__form-checkbox,
          .pgn__modal-body-content > h4:nth-of-type(2) + hr + div.pgn__form-checkbox + p {
            display: none !important;
          }
          section.introducing-section > div.form-group-custom:nth-child(5) {
            display: none !important; // Hide Introduction Video
          }
        `}</style>        
      </Container>
    </>
  );
};

StudioFooter.propTypes = {
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(StudioFooter);
