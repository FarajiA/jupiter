const { I } = inject();

const customerInfo = {
  selectors: {
    customerInfoLabel: '.InputField-label'
  },

  async customerInfoLabel() {
    return await I.grabTextFrom(this.selectors.customerInfoLabel);
  }
};

module.exports = customerInfo;
