import i18n from '../i18n';
import _ from 'lodash';
import validate from 'validate.js';
import { asyncValidateUsername, asyncValidatePassword } from './utils';

function translateDefaultValidators(t) {
  validate.validators.presence.message = t('validation:input.required');
}

export function i18nT() {
  return i18n.t.bind(i18n);
}

export const validateEmail = (values, { t = i18nT() }) => {
  return validate(values, {
    email: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      },
      email: {
        message: t('validation:email.invalidFormat')
      },
      length: {
        maximum: 255,
        tooLong: t('validation:input.maxLength', {
          content: 'Email',
          characterCount: '%{count}'
        })
      }
    }
  }, { fullMessages: false }) || {};
};

validate.validators.regex = (value, options, key, attributes) => {
  const regExp = new RegExp(options.pattern);

  if (!regExp.test(value)) {
    return options.message;
  }
};

export const validatePassword = (values, { t = i18nT() }) => {
  return validate(values, {
    password: {
      presence: {
        allowEmpty: false
      },
      length: {
        minimum: 8,
        tooShort: t('validation:input.minLength', {
          content: 'Password',
          characterCount: '%{count}'
        }),
        maximum: 100,
        tooLong: t('validation:input.maxLength', {
          content: undefined,
          characterCount: '%{count}'
        })
      },
      regex: {
        pattern: '^((?=.*[0-9])(?=.*[A-Za-z])(?=.*[@$!%*#?&]))',
        message: t('validation:password.charRestrictions')
      }
    },
    passwordValidate: {
      presence: {
        allowEmpty: false
      },
      equality: {
        attribute: 'password',
        message: t('validation:password.mustMatch'),
        comparator: (v1, v2) => {
          return v1 === v2;
        }
      }
    }
  }, { fullMessages: false }) || {};
};


export const validatePhoneNumber = (values, { t = i18nT() }) => {
  const errors = validate(values, {
    phoneNumber: {
      presence: true
    }
  }, { fullMessages: false }) || {};
  const phoneNumber = _.get(values, 'phoneNumber');
  if (phoneNumber) {
    if (typeof phoneNumber === 'object') {
      if (_.isEmpty(_.trim(phoneNumber.number))) {
        errors.phoneNumber = [t('validation:input.required')];
      } else if (!phoneNumber.valid) {
        errors.phoneNumber = [t('validation:phone.mustBeAValidNumber')];
      }
    }
  }
  return errors;
};

export const validateCustomerInformation = (values, { t = i18nT(), productType }) => {
  const customerInfo = _.get(values, 'customerInfo', {});
  const channelTypeRequired = (productType === 'managed_vmc');
  const errors = validate(customerInfo, {
    productType: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      }
    },
    customerType: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required')
      }
    },
    channelType: {
      presence: channelTypeRequired && {
        message: t('validation:input.required')
      }
    }
  }, { fullMessages: false });
  return errors ? { customerInfo: errors } : {};
};

export const validateAddress = (values, { t, props: { country, countryData, hasZipcode } }) => {
  translateDefaultValidators(t);
  const address = _.get(values, 'address', {});
  const checkState = !(country && (countryData.states && countryData.states.length === 0));
  const errors = validate(address, {
    country: {
      presence: {
        allowEmpty: false
      }
    },
    street: {
      presence: {
        allowEmpty: false,
        maximum: 100,
        tooLong: t('validation:input.maxLength', {
          content: undefined,
          characterCount: '%{count}'
        })
      }
    },
    state: {
      presence: checkState
    },
    city: {
      presence: {
        allowEmpty: false,
        message: t('validation:input.required'),
        maximum: 100,
        tooLong: t('validation:input.maxLength', {
          content: undefined,
          characterCount: '%{count}'
        })
      }
    },
    zipcode: {
      presence: hasZipcode,
      length: {
        maximum: 20,
        tooLong: t('validation:input.maxLength', {
          content: undefined,
          characterCount: '%{count}'
        })
      }
    }
  }, { fullMessages: false });
  return errors ? { address: errors } : {};
};

export const validateCurrency = (values) => {
  const errors = validate(values, {
    currency: {
      presence: {
        allowEmpty: false
      }
    }
  }, { fullMessages: false });
  return errors || {};
};

export const validateBilling = (values, { t = i18nT(), ...props }) => {
  translateDefaultValidators(t);
  const billing = _.get(values, 'billingInfo', {});
  return {
    billingInfo: {
      ...validateAddress(billing, { t, props }),
      ...validateCurrency(billing, t)
    }
  };
};

export const validateUser = (values, { t = i18nT() }) => {
  const userInfo = _.get(values, 'userInfo', {});
  translateDefaultValidators(t);
  const errors = validate(userInfo, {
    firstName: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 100,
        tooLong: t('validation:input.maxLength', {
          content: 'Input',
          characterCount: '%{count}'
        })
      }
    },
    lastName: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 100,
        tooLong: t('validation:input.maxLength', {
          content: 'Input',
          characterCount: '%{count}'
        })
      }
    },
    username: {
      presence: {
        allowEmpty: false
      },
      format: {
        pattern: '^[^!@#$%^&*()?_\v-]*$',
        message: t('validation:input.invalidCharacter', {
          content: 'Username'
        })
      },
      length: {
        maximum: 15,
        tooLong: t('validation:input.lessOrEqual', {
          content: 'Username',
          characterCount: '%{count}'
        }),
        minimum: 8,
        tooShort: t('validation:input.minLength', {
          content: 'Username',
          characterCount: '%{count}'
        })
      }
    },
    accountName: {
      presence: {
        allowEmpty: false
      },
      length: {
        maximum: 255,
        tooLong: t('validation:input.maxLength', {
          content: 'Account Name',
          characterCount: '%{count}'
        })
      }
    }
  }, { fullMessages: false }) || {};
  return {
    userInfo: {
      ...errors,
      ...validateEmail(userInfo, t),
      ...validatePassword(userInfo, t),
      ...validatePhoneNumber(userInfo, t)
    }
  };
};

export const asyncValidate = (values, dispatch, { t = i18nT() }, field) => {
  const { userInfo: { username, password } } = values;
  return field === 'userInfo.username'
    ? asyncValidateUsername(username, dispatch, t) : asyncValidatePassword(password, t);
};
