import _ from 'lodash';
import { ALT_CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/altCustomer';
import { RACK_CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/rackspaceCustomer';

export const channelInput = {
  'key': 'Aggregator',
  'value': '',
  'destination': 'CMS'
};

export const contractEntityInput = {
  'key': 'Cloud_Sub_Type_for_CE',
  'value': 'ONICA_CA'
};

export const formatAltCustomer = (type, contractEntity) => {
  ALT_CUSTOMER_SIGNUP_REQUEST.metadata.property.forEach((obj) => {
    if (obj.key === 'Business_Unit') {
      obj.value = type;
    }
  });
  if (contractEntity === 'ONICA_CA') {
    ALT_CUSTOMER_SIGNUP_REQUEST.metadata.property.push(contractEntityInput);
  }
  return {
    ...ALT_CUSTOMER_SIGNUP_REQUEST
  };
};

export const formatRackspaceCustomer = (channelType) => {
  if (channelType) {
    channelInput.value = channelType;
    RACK_CUSTOMER_SIGNUP_REQUEST.metadata.property.push(channelInput);
  }
  return {
    ...RACK_CUSTOMER_SIGNUP_REQUEST
  };
};

export const formatRequest = (values) => {
  const type = _.get(values, ['customerInfo', 'customerType']);
  const channelType = _.get(values, ['customerInfo', 'channelType']);
  const contractEntity = _.get(values, ['billingInfo', 'contractEntity']);
  console.log(contractEntity);
  const template = (
    type !== 'rackspace'
      ? formatAltCustomer(type.toUpperCase(), contractEntity)
      : formatRackspaceCustomer(channelType)
  );
  return {
    ...template,
    accountName: values.userInfo.accountName,
    externalId: (values.customerInfo.productType).toUpperCase(),
    serviceLevel: 'MANAGED',
    currencyCode: values.billingInfo.currency.toUpperCase(),
    description: `A Karate (${type.toUpperCase()}) cloud signup request from the retail site.`,
    contacts: {
      contact: [
        {
          firstName: values.userInfo.firstName,
          lastName: values.userInfo.lastName,
          title: values.title,
          addresses: {
            address: [
              {
                ...values.billingInfo.address,
                primary: true
              }
            ]
          },
          emailAddresses: {
            emailAddress: [
              {
                address: values.userInfo.email,
                primary: true
              }
            ]
          },
          phoneNumbers: {
            phoneNumber: [
              {
                country: values.userInfo.phoneNumber.countryCode,
                number: values.userInfo.phoneNumber.number,
                category: 'HOME',
                primary: true
              }
            ]
          },
          user: {
            username: values.userInfo.username,
            password: values.userInfo.password
          },
          roles: template.contacts.contact[0].roles
        }
      ]
    }
  };
};
