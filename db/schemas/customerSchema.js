const validator = require('validator');

const schema = {
          clientBank : {
              type: String,
              required: true
          },
          clientID : {
              type: String,
              required: true
          },
          consentID : {
              type: String,
              required: true,
              validate(value) {
                if (!validator.isNumeric(value)) {
                    throw new Error('consentID is invalid')
                }
            }
          },
          customerID : {
              type: String,
              required: true
          },
          customerPassport : {
              type: String
          },
          consentTrack : {
              type: String,
              required: true
          },
          consentStatus : {
              type: String,
              required: true
          },
          activationStatus : {
              type: String,
              required: true
          },
          customerSite : {
              type: String,
              required: true
          },
          consentReusability : {
              type: String,
              required: true
          },
          acceptedDate : {
              type: String,
              required: true,
              validate(value) {
                if (!validator.isDate(value)) {
                    throw new Error('acceptedDate is invalid')
                }
            }
          },
          confirmationTimestamp : {
              type: String,
              required: true,
              timestamps: true
          },
          validFrom : {
              type: String,
              required: true,
              validate(value) {
                if (!validator.isDate(value)) {
                    throw new Error('validFrom is invalid')
                }
            }
          },
          validUntil : {
              type: String,
              required: true,
              validate: [function dateValidator(value) {
                return this.validFrom <= value;
              }, 'validFrom must be less than validUntil']
          },
          modificationTimestamp : {
              type: String,
              timestamps: true
          },
          cancellationTimestamp : {
              type: String,
              timestamps: true
          },
          cancellationReason : {
              type: String
          },
          cancellationInitiator : {
              type: String
          },
          frequencyPerDay : {
              type: Number,
              required: true
          },
          accountPermissions : [{
                  scope : {
                      type : String,
                      required: true
                  },
                  accountNumberIBAN : {
                      type : String,
                      required: true
                  },
                  openingBranch : {
                      type : String,
                      required: true,
                      validate(value) {
                        if (!validator.isNumeric(value)) {
                            throw new Error('openingBranch is invalid')
                        }
                    }
                  },
                  accountNumber : {
                      type : String,
                      required: true,
                      validate(value) {
                        if (!validator.isNumeric(value)) {
                            throw new Error('accountNumber is invalid')
                        }
                    }
                  },
                  productCode : {
                      type : String,
                      required: true
                  },
                  currencyCode : {
                      type : String
                  },
                  accountStatus : {
                      type : String,
                      required: true
                  },
                  managingBranch : {
                      type : String,
                      required: true,
                      validate(value) {
                        if (!validator.isNumeric(value)) {
                            throw new Error('managingBranch is invalid')
                        }
                    }
                  }
          }]
};

module.exports = schema;    