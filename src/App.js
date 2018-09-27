import React, { Component } from 'react';
import './App.css';

import FormBotApp from './FormBotApp';

const uak_id = 7320;
const mf_state = {
  result: {
    bank_details: 0,
    bse_registration_status: 0,
    pan_number: '',
    email: '',
    error: '',
    account_number: 0, 
    confirm_account_number: 0,
    account_type: '',
    ifsc_code: '',
    signature_image: '',
    cheque_image: '',
    kyc_status: 0,
    date_of_birth: '',
  },
  currentNode: 0,
  currentQuestionIndex: 0,
  questions: [
    {
      node: 1,
      serverImplementation: {
        request: {
          type: 'POST',
          baseURL: 'http://dev01.moneysmart.co.in:9123',
          endpoint: '/api/get_kyc_data/',
          headers: {
            'Content-Type': 'application/json', 
          },
          data: {
            uak_id
          },
          showMessage: 'Please Wait , fetching your kyc details',
        },
        response: {
          success: {
            showMessage: 'Okk Done',
          },
          error : {
            showMessage: 'Oh, Something Went Wrong :( !!!',
          }
        }
      }
    },
    {
      node: 2,
      question: ["what's your PAN number ?"],
      entity: "pan_number",
      entityPath: "",
      widget: 'text',
      placeholder: 'XXXXXXXXXX',
      //inputMask: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /\d/, /\d/, /\d/, /\d/, /[A-Za-z]/],
      validateInput: {
        outputType: 'string',
        casing: 'uppercase',
        validations: [
          {
            type: 'string',
            propertyName: 'inputValue',
            regexPattern: '^[A-za-z]{5}\\d{4}[A-za-z]{1}$',
            errorMessage: 'Pan number is invalid'
          },
        ]
      },
      askConditions: [
        { entity: 'pan_number', entityPath: '', value: '' },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 3,
      question: ["what's your email ?"],
      entity: "email",
      entityPath: "",
      widget: 'text',
      validateInput: {
        outputType: 'string',
        validations: [
          {
            type: 'string',
            propertyName: 'inputValue',
            regexPattern: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
            errorMessage: 'Email id is invalid'
          },
        ]
      },
      askConditions: [
          { entity: 'email', entityPath: '', value: '' },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 4,
      question: ["what's your date of birth ?"],
      entity: "date_of_birth",
      entityPath: "",
      widget: 'text',
      placeholder: 'YYYY-MM-DD',
      //inputMask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
      validateInput: {
        outputType: 'string',
        autoValidateAndFill: [
          {
            regexPattern: '^\\d{4}$',
            fill: '-'
          },
          {
            regexPattern: '^\\d{4}-\\d{2}$',
            fill: '-'
          }
        ],
        validations: [
          {
            type: 'string',
            propertyName: 'inputValue',
            regexPattern: '^\\d{4}-\\d{2}-\\d{2}$',
            errorMessage: 'Date of birth is invalid'
          },
        ]
      },
      askConditions: [
        { entity: 'date_of_birth', entityPath: '', value: '' },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 5,
      serverImplementation: {
        request: {
          type: 'POST',
          baseURL: 'http://dev01.moneysmart.co.in:9123',
          endpoint: '/api/update_ckyc/',
          headers: {
            'Content-Type': 'application/json', 
          },
          data: {
            uak_id,
            pan_number: '{{pan_number}}',
            email: '{{email}}',
            date_of_birth: '{{date_of_birth}}'
          },
          showMessage: 'Please Wait , updating your kyc details',
        },
        response: {
          success: {
            showMessage: 'Okk Done',
            mandatoryConditions: {
              kyc_status: 1
            }
          },
          error : {
            showMessage: 'Oh, Something Went Wrong :( !!!',
          }
        }
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 0 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 6,
      question: ["Now i need your bank details", "can you please enter your account number ?"],
      entity: "account_number",
      entityPath: "",
      widget: 'text',
      placeholder: 'Enter your account number',
      //inputMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
      validateInput: {
        outputType: 'number',
        validations: [
          {
            type: 'number',
            propertyName: 'inputLength',
            comparisionOperator: '==',
            propertyValue: 12,
            errorMessage: 'Account number should be of 12 digits'
          },
        ]
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 1 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 7,
      question: ["please enter your account number again ?"],
      entity: "confirm_account_number",
      entityPath: "",
      widget: 'text',
      placeholder: 'Enter your account number',
      //inputMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
      validateInput: {
        outputType: 'number',
        validations: [
          {
            type: 'number',
            propertyName: 'inputLength',
            comparisionOperator: '==',
            propertyValue: 12,
            errorMessage: 'Account number should be of 12 digits'
          },
          {
            type: 'string',
            propertyName: 'inputValue',
            comparisionOperator: '==',
            propertyValue: '{{account_number}}',
            errorMessage: 'Account Number & Confirm Account number is not Matching'
          },
        ]
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 1 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 8,
      question: ["please select account type"],
      entity: "account_type",
      entityPath: "",
      widget: 'radio',
      radioOptions: [
        { value: 'SAVINGS', label: 'SAVINGS' },
        { value: 'CURRENT', label: 'CURRENT' }
      ],
      validateInput: {
        outputType: 'string',
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 1 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 9,
      question: ["please enter ifsc code ?"],
      entity: "ifsc_code",
      entityPath: "",
      widget: 'text',
      placeholder: 'Enter ifsc code',
      //inputMask: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
      validateInput: {
        outputType: 'string',
        casing: 'uppercase',
        validations: [
          {
            type: 'number',
            propertyName: 'inputLength',
            comparisionOperator: '==',
            propertyValue: 11,
            errorMessage: 'IFSC code is invalid'
          },
        ]
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 1 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 10,
      serverImplementation: {
        request: {
          type: 'POST',
          baseURL: 'http://dev01.moneysmart.co.in:9123',
          endpoint: '/api/create_bank_details/',
          headers: {
            'Content-Type': 'application/json', 
          },
          data: {
            uak_id,
            account_number:"{{account_number}}",
            confirm_account_number:"{{confirm_account_number}}",
            account_type:"{{account_type}}",
            ifsc_code: "{{ifsc_code}}"
          },
          showMessage: 'Please Wait , while updating your bank details',
        },
        response: {
          success: {
            showMessage: 'Okk Done',
            mandatoryConditions: {
              kyc_status: 2
            }
          },
          error : {
            showMessage: 'Oh, Something Went Wrong :( !!!',
          }
        }
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 1 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 11,
      question: ["please upload your signature image !"],
      entity: "signature_image",
      entityPath: "",
      widget: 'file',
      fileExtensions: ['jpg', 'png', 'jpeg'],
      validateInput: {
        outputType: 'string',
      },
      showFileUploadButtonIcon:true,
      placeholder: 'Click to upload signature',
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 2 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 12,
      serverImplementation: {
        request: {
          type: 'POST',
          baseURL: 'http://dev01.moneysmart.co.in:9123',
          endpoint: '/api/upload_signature/',
          headers: {
            'Content-Type': 'application/json', 
          },
          data: {
            uak_id,
            signature_image: "{{signature_image}}"
          },
          showMessage: 'Please Wait , while uploading your signature image',
        },
        response: {
          success: {
            showMessage: 'Okk Done',
            mandatoryConditions: {
              success: true
            }
          },
          error : {
            showMessage: 'Oh, Something Went Wrong :( !!!',
          }
        }
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 2 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 13,
      question: ["please upload cheque image !"],
      entity: "cheque_image",
      entityPath: "",
      widget: 'file',
      fileExtensions: ['jpg', 'png', 'jpeg'],
      validateInput: {
        outputType: 'string',
      },
      showFileUploadButtonIcon:true,
      placeholder: 'Click to upload signature',
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 2 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 14,
      serverImplementation: {
        request: {
          type: 'POST',
          baseURL: 'http://dev01.moneysmart.co.in:9123',
          endpoint: '/api/upload_cheque/',
          headers: {
            'Content-Type': 'application/json', 
          },
          data: {
            uak_id,
            cheque_image: "{{cheque_image}}"
          },
          showMessage: 'Please Wait , while uploading your cheque image',
        },
        response: {
          success: {
            showMessage: 'Okk Done',
            mandatoryConditions: {
              success: true
            }
          },
          error : {
            showMessage: 'Oh, Something Went Wrong :( !!!',
          }
        }
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 2 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 15,
      serverImplementation: {
        request: {
          type: 'POST',
          baseURL: 'http://dev01.moneysmart.co.in:9123',
          endpoint: '/api/create_bse_user_and_update_aof/',
          headers: {
            'Content-Type': 'application/json', 
          },
          data: {
            uak_id,
          },
          showMessage: 'Please Wait , while creating bse user',
        },
        response: {
          success: {
            showMessage: 'Okk Done',
            mandatoryConditions: {
              bse_registration_status: 8
            }
          },
          error : {
            showMessage: 'Oh, Something Went Wrong :( !!!',
          }
        }
      },
      askConditions: [
        { entity: 'kyc_status', entityPath: '', value: 2 },
      ],
      skipConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
    {
      node: 16,
      question: ["okk onboarding completed", "Thanks !!!", "Please Wait while we redirecting to homepage"],
      redirectURL: 'https://www.google.com',
      redirectDelay: 2000,
      askConditions: [
        { entity: 'bse_registration_status', entityPath: '', value: 8 },
      ],
    },
  ],
  repliedMessages: [],
  isBotTyping: false,
  isUserTyping: false,
  isUserAllowedToAnswer: false,
};

const state = {
  result: {},
  currentNode: 0,
  currentQuestionIndex: 0,
  questions: [
    {
      node: 1,
      question: ["what's your PAN number ?"],
      entity: "panNumber",
      entityPath: "formData",
      widget: 'text',
      placeholder: 'XXXXXXXXXX',
      inputMask: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /\d/, /\d/, /\d/, /\d/, /[A-Za-z]/],
      validateInput: {
        outputType: 'string',
        casing: 'uppercase',
      }
    },
    {
      node: 2,
      question: ["what's your date of birth ?"],
      entity: "dateOfBirth",
      entityPath: "formData",
      widget: 'text',
      placeholder: 'DD/MM/YYYY',
      inputMask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      validateInput: {
        outputType: 'string',
      },
    },
    {
      node: 3,
      question: ["Hello there", "what's your full name ?"],
      entity: "completeName",
      entityPath: "formData",
      widget: 'text',
      placeholder: 'Enter your full name',
      validateInput: {
        outputType: 'object',
        splitBy: ' ',
        keys: [
          {
            keyName: 'firstName',
            keyValueIndex: 0,
            casing: 'titleCase'
          },
          {
            keyName: 'middleName',
            keyValueIndex: {
              or: [
                {
                  inputLength: 3,
                  keyValueIndex: 1,
                }
              ],
            },
            casing: 'titleCase'
          },
          {
            keyName: 'lastName',
            keyValueIndex: {
              or: [
                {
                  inputLength: 2,
                  keyValueIndex: 1,
                },
                {
                  inputLength: 3,
                  keyValueIndex: 2,
                }
              ],
            },
            casing: 'titleCase'
          }
        ],
        validations: [
          {
            type: 'number',
            comparisionOperator: '>=',
            propertyName: 'inputLength',
            propertyValue: 2,
            errorMessage: 'Full name must contain atleast first and last name'
          },
          {
            type: 'number',
            comparisionOperator: '<=',
            propertyName: 'inputLength',
            propertyValue: 3,
            errorMessage: 'Full name can only contain first, middle and last name'
          }
        ]
      }
    },
    {
      node: 4,
      question: ["what's your age ?"],
      entity: "age",
      entityPath: "formData",
      widget: 'text',
      placeholder: 'Enter your age',
      validateInput: {
        outputType: 'number',
        regexPattern: '^\\d{2}$',
        validations: [
          {
            type: 'number',
            propertyName: 'inputValue',
            comparisionOperator: '>=',
            propertyValue: 18,
            errorMessage: 'Age must be greater than 18'
          },
          {
            type: 'number',
            propertyName: 'inputValue',
            comparisionOperator: '<=',
            propertyValue: 75,
            errorMessage: 'Age must be less than 75'
          }
        ]
      }
    },
    {
      node: 5,
      question: ["what's your email ?"],
      entity: "email",
      entityPath: "formData",
      widget: 'text',
      validateInput: {
        outputType: 'string',
        validations: [
          {
            type: 'string',
            propertyName: 'inputValue',
            regexPattern: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
            errorMessage: 'Email id is invalid'
          },
        ]
      }
    },
    {
      node: 6,
      question: "What's your mobile ?",
      entity: "mobile",
      entityPath: "formData",
      widget: 'text',
      validateInput: {
        outputType: 'number',
        validations: [
          {
            type: 'string',
            propertyName: 'inputValue',
            regexPattern: '/^\\d{10}$/',
            errorMessage: 'Mobile number is invalid'
          },
        ]
      }
    },
    {
      node: 7,
      question: ["what's your gender ?"],
      entity: "gender",
      entityPath: "formData",
      widget: 'radio',
      radioOptions: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ],
      onInputFillMessage: 'Hey , don\'t be oversmart , you have to choose one of below options',
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 8,
      question: ["what's your marital status ?"],
      entity: "maritalStatus",
      entityPath: "formData",
      widget: 'radio',
      radioOptions: [
        { value: 'M', label: 'Married' },
        { value: 'U', label: 'Unmarried' }
      ],
      onInputFillMessage: 'Hey , don\'t be oversmart , you have to choose one of below options',
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 9,
      question: ["what's your husband name ?"],
      entity: "husbandName",
      entityPath: "formData",
      widget: 'text',
      askConditions: {
        and: [
          { entity: 'gender', entityPath: 'formData', value: 'female' },
          { entity: 'maritalStatus', entityPath: 'formData', value: 'M' }
        ]
      },
      validateInput: {
        outputType: 'object',
        splitBy: ' ',
        keys: [
          {
            keyName: 'firstName',
            keyValueIndex: 0,
            casing: 'titleCase'
          },
          {
            keyName: 'middleName',
            keyValueIndex: {
              or: [
                {
                  inputLength: 3,
                  keyValueIndex: 1,
                }
              ],
            },
            casing: 'titleCase'
          },
          {
            keyName: 'lastName',
            keyValueIndex: {
              or: [
                {
                  inputLength: 2,
                  keyValueIndex: 1,
                },
                {
                  inputLength: 3,
                  keyValueIndex: 2,
                }
              ],
            },
            casing: 'titleCase'
          }
        ],
        validations: [
          {
            type: 'number',
            comparisionOperator: '>=',
            propertyName: 'inputLength',
            propertyValue: 2,
            errorMessage: 'Full name must contain atleast first and last name'
          },
          {
            type: 'number',
            comparisionOperator: '<=',
            propertyName: 'inputLength',
            propertyValue: 3,
            errorMessage: 'Full name can only contain first, middle and last name'
          }
        ]
      }
    },
    {
      node: 10,
      question: ["what's your father full name ?"],
      entity: "fatherName",
      entityPath: "formData",
      widget: 'text',
      validateInput: {
        outputType: 'object',
        splitBy: ' ',
        keys: [
          {
            keyName: 'firstName',
            keyValueIndex: 0,
            casing: 'titleCase'
          },
          {
            keyName: 'middleName',
            keyValueIndex: {
              or: [
                {
                  inputLength: 3,
                  keyValueIndex: 1,
                }
              ],
            },
            casing: 'titleCase'
          },
          {
            keyName: 'lastName',
            keyValueIndex: {
              or: [
                {
                  inputLength: 2,
                  keyValueIndex: 1,
                },
                {
                  inputLength: 3,
                  keyValueIndex: 2,
                }
              ],
            },
            casing: 'titleCase'
          }
        ],
        validations: [
          {
            type: 'number',
            comparisionOperator: '>=',
            propertyName: 'inputLength',
            propertyValue: 2,
            errorMessage: 'Full name must contain atleast first and last name'
          },
          {
            type: 'number',
            comparisionOperator: '<=',
            propertyName: 'inputLength',
            propertyValue: 3,
            errorMessage: 'Full name can only contain first, middle and last name'
          }
        ]
      }
    },
    {
      node: 11,
      question: ["what's your mother full name ?"],
      entity: "motherName",
      entityPath: "formData",
      widget: 'text',
      validateInput: {
        outputType: 'object',
        splitBy: ' ',
        keys: [
          {
            keyName: 'firstName',
            keyValueIndex: 0,
            casing: 'titleCase'
          },
          {
            keyName: 'middleName',
            keyValueIndex: {
              or: [
                {
                  inputLength: 3,
                  keyValueIndex: 1,
                }
              ],
            },
            casing: 'titleCase'
          },
          {
            keyName: 'lastName',
            keyValueIndex: {
              or: [
                {
                  inputLength: 2,
                  keyValueIndex: 1,
                },
                {
                  inputLength: 3,
                  keyValueIndex: 2,
                }
              ],
            },
            casing: 'titleCase'
          }
        ],
        validations: [
          {
            type: 'number',
            comparisionOperator: '>=',
            propertyName: 'inputLength',
            propertyValue: 2,
            errorMessage: 'Full name must contain atleast first and last name'
          },
          {
            type: 'number',
            comparisionOperator: '<=',
            propertyName: 'inputLength',
            propertyValue: 3,
            errorMessage: 'Full name can only contain first, middle and last name'
          }
        ]
      }
    },
    {
      node: 12,
      question: ["Whats your's residency status"],
      entity: "residency",
      entityPath: "formData",
      widget: 'radio',
      radioOptions: [
        { value: 'RI', label: 'Indian' },
        { value: 'NRI', label: 'NRI' }
      ],
      onInputFillMessage: 'Hey , don\'t be oversmart , you have to choose one of below options',
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 13,
      question: ["Okk", "now i want your's permanent address , so please enter your pincode"],
      entity: "csp",
      entityPath: "formData.permanentAddress",
      widget: 'searchselect',
      searchOptions: [
        { value: '400050', title: '400050', description: 'Bandra, Mumbai' },
        { value: '400053', title: '400053', description: 'Andheri, Mumbai' },
        { value: '560078', title: '560078', description: 'South End Circle, Bangalore' }
      ],
      validateInput: {
        outputType: 'string',
      },
      placeholder: 'Enter Your Pincode',
      minCharactersToSearch: 3,
    },
    {
      node: 14,
      question: ["please enter house number along with road/street name if any"],
      entity: "addressLine1",
      entityPath: "formData.permanentAddress",
      widget: 'text',
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 15,
      question: ["please enter landmark"],
      entity: "landmark",
      entityPath: "formData.permanentAddress",
      widget: 'text',
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 16,
      question: ["is your current address same as permanent address ?"],
      entity: "isSameAsPermanent",
      entityPath: "formData.currentAddress",
      widget: 'radio',
      radioOptions: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 17,
      question: ["okk , so i want your's current address also , so please enter your pincode"],
      entity: "csp",
      entityPath: "formData.currentAddress",
      askConditions: {
        and: [
          { entity: 'isSameAsPermanent', entityPath: 'formData.currentAddress', value: 'no' },
        ],
      },
      widget: 'searchselect',
      searchOptions: [
        { value: '400050', title: '400050', description: 'Bandra, Mumbai' },
        { value: '400053', title: '400053', description: 'Andheri, Mumbai' },
        { value: '560078', title: '560078', description: 'South End Circle, Bangalore' }
      ],
      validateInput: {
        outputType: 'string',
      },
      placeholder: 'Enter Your Pincode',
      minCharactersToSearch: 3,
    },
    {
      node: 18,
      question: ["please enter house number along with road/street name if any"],
      entity: "addressLine1",
      entityPath: "formData.currentAddress",
      widget: 'text',
      askConditions: {
        and: [
          { entity: 'isSameAsPermanent', entityPath: 'formData.currentAddress', value: 'no' },
        ],
      },
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 19,
      question: ["please enter landmark"],
      entity: "landmark",
      entityPath: "formData.currentAddress",
      widget: 'text',
      askConditions: [
        { entity: 'isSameAsPermanent', entityPath: 'formData.currentAddress', value: 'no' },
      ],
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 20,
      question: ["What's your children category ?"],
      entity: "gender",
      entityPath: "formData",
      widget: 'checkbox',
      checkboxOptions: [
        { value: 'son', label: 'Son' },
        { value: 'daughter', label: 'Daughter' },
      ],
      onInputFillMessage: 'Hey , don\'t be oversmart , you have to select from below options',
      validateInput: {
        outputType: 'array',
        joinWith: ', '
      },
    },
    {
      node: 21,
      question: ["please upload your aadhaar !"],
      entity: "aadhaarImage",
      entityPath: "formData",
      widget: 'file',
      fileExtensions: ['jpg', 'png', 'jpeg', 'pdf'],
      validateInput: {
        outputType: 'string',
      },
      showFileUploadButtonIcon:true,
      placeholder: 'Click to upload aadhaar'
    },
    {
      node: 22,
      question: ["please upload your pan card !"],
      entity: "pancard",
      entityPath: "formData",
      fileExtensions: ['jpg', 'png', 'jpeg', 'pdf'],
      widget: 'file',
      validateInput: {
        outputType: 'string',
      }
    },
    {
      node: 23,
      question: ["Okk thanks for info", "now you have to make payment , can we proceed ?"],
      widget: 'radio',
      radioOptions: [
        { value: 'payment_proceed_yes', label: 'Yes' },
        { value: 'payment_proceed_no', label: 'No' },
        { value: 'payment_proceed_later', label: 'Later' }
      ],
      validateInput: {
        outputType: 'string',
      }
    },
  ],
  repliedMessages: [],
  isBotTyping: false,
  isUserTyping: false,
  isUserAllowedToAnswer: false,
};

class App extends Component {
  render() {
    return (
      <div id="chatbot-ui-container">
        <FormBotApp state={mf_state} />
      </div>
    );
  }
}

export default App;
