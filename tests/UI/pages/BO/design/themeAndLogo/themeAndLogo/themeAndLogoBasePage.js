require('module-alias/register');
const BOBasePage = require('@pages/BO/BObasePage');

/**
 * Theme & Logo base page, contains functions that can be used on the page
 * @class
 * @type {themeAndLogoBasePage}
 * @extends BOBasePage
 */
module.exports = class themeAndLogoBasePage extends BOBasePage {
  /**
   * @constructs
   * Setting up texts and selectors to use on theme & logo page
   */
  constructor() {
    super();
    this.advancedCustomizationNavItemLink = '#subtab-AdminPsThemeCustoAdvanced';
    this.themeShopCard = '#themes-logo-page .card-header[data-role="theme-shop"]';
    this.cardInactiveTheme = '#themes-logo-page .card-body :nth-child(2) .theme-card';
    this.useTheme = '.action-button.js-display-use-theme-modal';
    this.useThemeModalDialog = '#use_theme_modal .modal-dialog';
    this.useThemeModalDialogYesButton = `${this.useThemeModalDialog} .js-submit-use-theme`;
    this.deleteTheme = '.delete-button';
    this.deleteThemeModalDialog = '#delete_theme_modal .modal-dialog';
    this.deleteThemeModalDialogYesButton = `${this.deleteThemeModalDialog} .js-submit-delete-theme`;
  }

  /* Header Methods */
  /**
   * Go to advanced customizationpage
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async goToSubTabAdvancedCustomization(page) {
    await this.clickAndWaitForNavigation(page, this.advancedCustomizationNavItemLink);
  }

  /**
   * Use the Theme
   * @param page {Page} Browser tab
   * @returns {Promise<String>}
   */
  async useThisTheme(page) {
    await this.scrollTo(page, this.themeShopCard);
    await page.hover(this.cardInactiveTheme);
    await this.waitForSelectorAndClick(page, this.useTheme);
    await this.waitForSelectorAndClick(page, this.useThemeModalDialogYesButton);

    return this.getAlertSuccessBlockParagraphContent(page);
  }

  /**
   * Delete the not used Theme
   * @param page {Page} Browser tab
   * @returns {Promise<String>}
   */
  async deleteNotUsedTheme(page) {
    await this.scrollTo(page, this.themeShopCard);
    await page.hover(this.cardInactiveTheme);
    await this.waitForSelectorAndClick(page, this.deleteTheme);
    await this.waitForSelectorAndClick(page, this.deleteThemeModalDialogYesButton);

    return this.getAlertSuccessBlockParagraphContent(page);
  }
};
