'use strict';
const nock = require('nock');

const testRequest = (request, statusCode) => {
  const sgClient = require('./client');
  sgClient.setApiKey('SG.API Key');
  sgClient.setDefaultHeader('X-Mock', statusCode);
  return sgClient
    .request(request)
    .then(([response, body]) => {
      expect(response.statusCode).to.equal(statusCode);
    });
};

describe('client', () => {
  const sgClient = require('./client');
  let consoleWarnSpy;

  beforeEach(() => {
    consoleWarnSpy = sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore();
    nock.cleanAll();
  });

  describe('setApiKey', () => {
    it('should not log a warning for a proper API key value', () => {
      sgClient.setApiKey('SG.1234567890');
      expect(consoleWarnSpy.notCalled).to.equal(true);
    });

    it('should log a warning for an undefined API key value', () => {
      sgClient.setApiKey(undefined);
      expect(consoleWarnSpy.calledOnce).to.equal(true);
    });

    it('should send requests to the SendGrid path', () => {
      const scope = nock('https://api.sendgrid.com')
        .matchHeader('Authorization', /^Bearer SG\.1234567890$/)
        .get('/')
        .reply(200, 'test response');

      sgClient.setApiKey('SG.1234567890');

      return sgClient.request({})
        .then(() => scope.done());
    });
  });

  describe('setTwilioEmailAuth', () => {
    it('should not log a warning for proper creds', () => {
      sgClient.setTwilioEmailAuth('username', 'password');
      expect(consoleWarnSpy.notCalled).to.equal(true);
    });

    it('should log a warning for a null password', () => {
      sgClient.setTwilioEmailAuth('username', null);
      expect(consoleWarnSpy.calledOnce).to.equal(true);
    });

    it('should send requests to the Twilio Email path', () => {
      const scope = nock('https://email.twilio.com')
        .matchHeader('Authorization', /^Basic dXNlcm5hbWU6cGFzc3dvcmQ=$/)
        .get('/')
        .reply(200, 'test response');

      sgClient.setTwilioEmailAuth('username', 'password');

      return sgClient.request({})
        .then(() => scope.done());
    });
  });

  it('should allow large payloads', () => {
    const request = {
      body: {
        content: [
          {
            type: 'text/plain',
            value: '#'.repeat(1024 * 1024 * 25), // 25 MB,
          },
        ],
        from: {
          email: 'me@you.com',
        },
        personalizations: [],
        subject: 'Hello, World!',
      },
      method: 'POST',
      url: '/v3/mail/send',
    };

    return testRequest(request, 202);
  });
});

describe('setImpersonateSubuser', () => {
  const impersonateSubuser = 'abcxyz@this.is.a.test.subuser';
  const sgClient = require('./client');
  sgClient.setImpersonateSubuser(impersonateSubuser);

  it('should set the impersonate subuser header', () => {
    expect(sgClient.impersonateSubuser).to.equal(impersonateSubuser);
  });
});

describe('test_access_settings_activity_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
  };
  request.method = 'GET';
  request.url = '/v3/access_settings/activity';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_access_settings_whitelist_post', () => {
  const request = {};
  request.body = {
    ips: [
      {
        ip: '192.168.1.1',
      },
      {
        ip: '192.*.*.*',
      },
      {
        ip: '192.168.1.3/32',
      },
    ],
  };
  request.method = 'POST';
  request.url = '/v3/access_settings/whitelist';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_access_settings_whitelist_delete', () => {
  const request = {};
  request.body = {
    ids: [
      1,
      2,
      3,
    ],
  };
  request.method = 'DELETE';
  request.url = '/v3/access_settings/whitelist';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_access_settings_whitelist_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/access_settings/whitelist';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_access_settings_whitelist__rule_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/access_settings/whitelist/{rule_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_access_settings_whitelist__rule_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/access_settings/whitelist/{rule_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_alerts_post', () => {
  const request = {};
  request.body = {
    email_to: 'example@example.com',
    frequency: 'daily',
    type: 'stats_notification',
  };
  request.method = 'POST';
  request.url = '/v3/alerts';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_alerts_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/alerts';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_alerts__alert_id__patch', () => {
  const request = {};
  request.body = {
    email_to: 'example@example.com',
  };
  request.method = 'PATCH';
  request.url = '/v3/alerts/{alert_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_alerts__alert_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/alerts/{alert_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_alerts__alert_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/alerts/{alert_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_api_keys_post', () => {
  const request = {};
  request.body = {
    name: 'My API Key',
    sample: 'data',
    scopes: [
      'mail.send',
      'alerts.create',
      'alerts.read',
    ],
  };
  request.method = 'POST';
  request.url = '/v3/api_keys';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_api_keys_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
  };
  request.method = 'GET';
  request.url = '/v3/api_keys';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_api_keys__api_key_id__put', () => {
  const request = {};
  request.body = {
    name: 'A New Hope',
    scopes: [
      'user.profile.read',
      'user.profile.update',
    ],
  };
  request.method = 'PUT';
  request.url = '/v3/api_keys/{api_key_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_api_keys__api_key_id__patch', () => {
  const request = {};
  request.body = {
    name: 'A New Hope',
  };
  request.method = 'PATCH';
  request.url = '/v3/api_keys/{api_key_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_api_keys__api_key_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/api_keys/{api_key_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_api_keys__api_key_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/api_keys/{api_key_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_asm_groups_post', () => {
  const request = {};
  request.body = {
    description: 'Suggestions for products our users might like.',
    is_default: true,
    name: 'Product Suggestions',
  };
  request.method = 'POST';
  request.url = '/v3/asm/groups';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_asm_groups_get', () => {
  const request = {};
  request.qs = {
    id: 1,
  };
  request.method = 'GET';
  request.url = '/v3/asm/groups';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_asm_groups__group_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/asm/groups/{group_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_asm_groups__group_id__patch', () => {
  const request = {};
  request.body = {
    description: 'Suggestions for items our users might like.',
    id: 103,
    name: 'Item Suggestions',
  };
  request.method = 'PATCH';
  request.url = '/v3/asm/groups/{group_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_asm_groups__group_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/asm/groups/{group_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_asm_groups__group_id__suppressions_post', () => {
  const request = {};
  request.body = {
    recipient_emails: [
      'test1@example.com',
      'test2@example.com',
    ],
  };
  request.method = 'POST';
  request.url = '/v3/asm/groups/{group_id}/suppressions';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_asm_groups__group_id__suppressions_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/asm/groups/{group_id}/suppressions';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_asm_groups__group_id__suppressions_search_post', () => {
  const request = {};
  request.body = {
    recipient_emails: [
      'exists1@example.com',
      'exists2@example.com',
      'doesnotexists@example.com',
    ],
  };
  request.method = 'POST';
  request.url = '/v3/asm/groups/{group_id}/suppressions/search';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_asm_groups__group_id__suppressions__email__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/asm/groups/{group_id}/suppressions/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_asm_suppressions_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/asm/suppressions';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_asm_suppressions_global_post', () => {
  const request = {};
  request.body = {
    recipient_emails: [
      'test1@example.com',
      'test2@example.com',
    ],
  };
  request.method = 'POST';
  request.url = '/v3/asm/suppressions/global';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_asm_suppressions_global__email__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/asm/suppressions/global/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_asm_suppressions_global__email__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/asm/suppressions/global/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_asm_suppressions__email__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/asm/suppressions/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_browsers_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    browsers: 'test_string',
    end_date: '2016-04-01',
    limit: 'test_string',
    offset: 'test_string',
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/browsers/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_campaigns_post', () => {
  const request = {};
  request.body = {
    categories: [
      'spring line',
    ],
    custom_unsubscribe_url: '',
    html_content: '<html><head><title></title></head><body><p>Check out our spring line!</p></body></html>',
    ip_pool: 'marketing',
    list_ids: [
      110,
      124,
    ],
    plain_content: 'Check out our spring line!',
    segment_ids: [
      110,
    ],
    sender_id: 124451,
    subject: 'New Products for Spring!',
    suppression_group_id: 42,
    title: 'March Newsletter',
  };
  request.method = 'POST';
  request.url = '/v3/campaigns';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_campaigns_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
    offset: 1,
  };
  request.method = 'GET';
  request.url = '/v3/campaigns';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_campaigns__campaign_id__patch', () => {
  const request = {};
  request.body = {
    categories: [
      'summer line',
    ],
    html_content: '<html><head><title></title></head><body><p>Check out our summer line!</p></body></html>',
    plain_content: 'Check out our summer line!',
    subject: 'New Products for Summer!',
    title: 'May Newsletter',
  };
  request.method = 'PATCH';
  request.url = '/v3/campaigns/{campaign_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_campaigns__campaign_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/campaigns/{campaign_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_campaigns__campaign_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/campaigns/{campaign_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_campaigns__campaign_id__schedules_delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_campaigns__campaign_id__schedules_post', () => {
  const request = {};
  request.body = {
    send_at: 1489771528,
  };
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_campaigns__campaign_id__schedules_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_campaigns__campaign_id__schedules_patch', () => {
  const request = {};
  request.body = {
    send_at: 1489451436,
  };
  request.method = 'PATCH';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_campaigns__campaign_id__schedules_now_post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules/now';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_campaigns__campaign_id__schedules_test_post', () => {
  const request = {};
  request.body = {
    to: 'your.email@example.com',
  };
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules/test';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_categories_get', () => {
  const request = {};
  request.qs = {
    category: 'test_string',
    limit: 1,
    offset: 1,
  };
  request.method = 'GET';
  request.url = '/v3/categories';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_categories_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    categories: 'test_string',
    end_date: '2016-04-01',
    limit: 1,
    offset: 1,
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/categories/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_categories_stats_sums_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    limit: 1,
    offset: 1,
    sort_by_direction: 'asc',
    sort_by_metric: 'test_string',
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/categories/stats/sums';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_clients_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/clients/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_clients__client_type__stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/clients/{client_type}/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_custom_fields_post', () => {
  const request = {};
  request.body = {
    name: 'pet',
    type: 'text',
  };
  request.method = 'POST';
  request.url = '/v3/contactdb/custom_fields';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_contactdb_custom_fields_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/custom_fields';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_custom_fields__custom_field_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/contactdb/custom_fields/{custom_field_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 202);
  });
});

describe('test_contactdb_custom_fields__custom_field_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/custom_fields/{custom_field_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_lists_post', () => {
  const request = {};
  request.body = {
    name: 'your list name',
  };
  request.method = 'POST';
  request.url = '/v3/contactdb/lists';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_contactdb_lists_delete', () => {
  const request = {};
  request.body = [
    1,
    2,
    3,
    4,
  ];
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_contactdb_lists_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/lists';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_lists__list_id__delete', () => {
  const request = {};
  request.qs = {
    delete_contacts: 'true',
  };
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists/{list_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 202);
  });
});

describe('test_contactdb_lists__list_id__patch', () => {
  const request = {};
  request.body = {
    name: 'newlistname',
  };
  request.qs = {
    list_id: 1,
  };
  request.method = 'PATCH';
  request.url = '/v3/contactdb/lists/{list_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_lists__list_id__get', () => {
  const request = {};
  request.qs = {
    list_id: 1,
  };
  request.method = 'GET';
  request.url = '/v3/contactdb/lists/{list_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_lists__list_id__recipients_post', () => {
  const request = {};
  request.body = [
    'recipient_id1',
    'recipient_id2',
  ];
  request.method = 'POST';
  request.url = '/v3/contactdb/lists/{list_id}/recipients';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_contactdb_lists__list_id__recipients_get', () => {
  const request = {};
  request.qs = {
    list_id: 1,
    page: 1,
    page_size: 1,
  };
  request.method = 'GET';
  request.url = '/v3/contactdb/lists/{list_id}/recipients';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_lists__list_id__recipients__recipient_id__post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_contactdb_lists__list_id__recipients__recipient_id__delete', () => {
  const request = {};
  request.qs = {
    list_id: 1,
    recipient_id: 1,
  };
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_contactdb_recipients_post', () => {
  const request = {};
  request.body = [
    {
      age: 25,
      email: 'example@example.com',
      first_name: '',
      last_name: 'User',
    },
    {
      age: 25,
      email: 'example2@example.com',
      first_name: 'Example',
      last_name: 'User',
    },
  ];
  request.method = 'POST';
  request.url = '/v3/contactdb/recipients';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_contactdb_recipients_delete', () => {
  const request = {};
  request.body = [
    'recipient_id1',
    'recipient_id2',
  ];
  request.method = 'DELETE';
  request.url = '/v3/contactdb/recipients';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_recipients_get', () => {
  const request = {};
  request.qs = {
    page: 1,
    page_size: 1,
  };
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_recipients_patch', () => {
  const request = {};
  request.body = [
    {
      email: 'jones@example.com',
      first_name: 'Guy',
      last_name: 'Jones',
    },
  ];
  request.method = 'PATCH';
  request.url = '/v3/contactdb/recipients';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_contactdb_recipients_billable_count_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/billable_count';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_recipients_count_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/count';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_recipients_search_get', () => {
  const request = {};
  request.qs = {
    '{field_name}': 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/search';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_recipients__recipient_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/contactdb/recipients/{recipient_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_contactdb_recipients__recipient_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/{recipient_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_recipients__recipient_id__lists_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/{recipient_id}/lists';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_reserved_fields_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/reserved_fields';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_segments_post', () => {
  const request = {};
  request.body = {
    conditions: [
      {
        and_or: '',
        field: 'last_name',
        operator: 'eq',
        value: 'Miller',
      },
      {
        and_or: 'and',
        field: 'last_clicked',
        operator: 'gt',
        value: '01/02/2015',
      },
      {
        and_or: 'or',
        field: 'clicks.campaign_identifier',
        operator: 'eq',
        value: '513',
      },
    ],
    list_id: 4,
    name: 'Last Name Miller',
  };
  request.method = 'POST';
  request.url = '/v3/contactdb/segments';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_segments_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/segments';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_segments__segment_id__delete', () => {
  const request = {};
  request.qs = {
    delete_contacts: 'true',
  };
  request.method = 'DELETE';
  request.url = '/v3/contactdb/segments/{segment_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_contactdb_segments__segment_id__patch', () => {
  const request = {};
  request.body = {
    conditions: [
      {
        and_or: '',
        field: 'last_name',
        operator: 'eq',
        value: 'Miller',
      },
    ],
    list_id: 5,
    name: 'The Millers',
  };
  request.qs = {
    segment_id: 'test_string',
  };
  request.method = 'PATCH';
  request.url = '/v3/contactdb/segments/{segment_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_segments__segment_id__get', () => {
  const request = {};
  request.qs = {
    segment_id: 1,
  };
  request.method = 'GET';
  request.url = '/v3/contactdb/segments/{segment_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_segments__segment_id__recipients_get', () => {
  const request = {};
  request.qs = {
    page: 1,
    page_size: 1,
  };
  request.method = 'GET';
  request.url = '/v3/contactdb/segments/{segment_id}/recipients';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_contactdb_status_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/status';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_devices_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    limit: 1,
    offset: 1,
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/devices/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_geo_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    country: 'US',
    end_date: '2016-04-01',
    limit: 1,
    offset: 1,
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/geo/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_post', () => {
  const request = {};
  request.body = {
    count: 90323478,
    subusers: [
      'subuser1',
      'subuser2',
    ],
    user_can_send: true,
    warmup: true,
  };
  request.method = 'POST';
  request.url = '/v3/ips';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_ips_get', () => {
  const request = {};
  request.qs = {
    exclude_whitelabels: 'true',
    ip: 'test_string',
    limit: 1,
    offset: 1,
    sort_by_direction: 'asc',
    subuser: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/ips';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_assigned_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/ips/assigned';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_pools_post', () => {
  const request = {};
  request.body = {
    name: 'marketing',
  };
  request.method = 'POST';
  request.url = '/v3/ips/pools';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_pools_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/ips/pools';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_pools__pool_name__put', () => {
  const request = {};
  request.body = {
    name: 'new_pool_name',
  };
  request.method = 'PUT';
  request.url = '/v3/ips/pools/{pool_name}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_pools__pool_name__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/ips/pools/{pool_name}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_ips_pools__pool_name__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/ips/pools/{pool_name}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_pools__pool_name__ips_post', () => {
  const request = {};
  request.body = {
    ip: '0.0.0.0',
  };
  request.method = 'POST';
  request.url = '/v3/ips/pools/{pool_name}/ips';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_ips_pools__pool_name__ips__ip__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/ips/pools/{pool_name}/ips/{ip}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_ips_remaining_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/ips/remaining';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_warmup_post', () => {
  const request = {};
  request.body = {
    ip: '0.0.0.0',
  };
  request.method = 'POST';
  request.url = '/v3/ips/warmup';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_warmup_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/ips/warmup';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips_warmup__ip_address__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/ips/warmup/{ip_address}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_ips_warmup__ip_address__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/ips/warmup/{ip_address}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_ips__ip_address__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/ips/{ip_address}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_batch_post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/mail/batch';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_mail_batch__batch_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail/batch/{batch_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_send_post', () => {
  const request = {};
  request.body = {
    content: [
      {
        type: 'text/html',
        value: '<html><p>Hello, world!</p></html>',
      },
    ],
    from: {
      email: 'sam.smith@example.com',
      name: 'Sam Smith',
    },
    personalizations: [
      {
        subject: 'Hello, World!',
        to: [
          {
            email: 'john.doe@example.com',
            name: 'John Doe',
          },
        ],
      },
    ],
    reply_to: {
      email: 'sam.smith@example.com',
      name: 'Sam Smith',
    },
    subject: 'Hello, World!',
  };
  request.method = 'POST';
  request.url = '/v3/mail/send';
  it('should have the correct response code', () => {
    return testRequest(request, 202);
  });
});

describe('test_mail_settings_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
    offset: 1,
  };
  request.method = 'GET';
  request.url = '/v3/mail_settings';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_address_whitelist_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
    list: [
      'email1@example.com',
      'example.com',
    ],
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/address_whitelist';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_address_whitelist_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/address_whitelist';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_bcc_patch', () => {
  const request = {};
  request.body = {
    email: 'email@example.com',
    enabled: false,
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/bcc';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_bcc_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/bcc';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_bounce_purge_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
    hard_bounces: 5,
    soft_bounces: 5,
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/bounce_purge';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_bounce_purge_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/bounce_purge';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_footer_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
    html_content: '...',
    plain_content: '...',
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/footer';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_footer_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/footer';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_forward_bounce_patch', () => {
  const request = {};
  request.body = {
    email: 'example@example.com',
    enabled: true,
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/forward_bounce';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_forward_bounce_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/forward_bounce';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_forward_spam_patch', () => {
  const request = {};
  request.body = {
    email: '',
    enabled: false,
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/forward_spam';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_forward_spam_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/forward_spam';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_plain_content_patch', () => {
  const request = {};
  request.body = {
    enabled: false,
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/plain_content';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_plain_content_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/plain_content';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_spam_check_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
    max_score: 5,
    url: 'url',
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/spam_check';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_spam_check_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/spam_check';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_template_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
    html_content: '<% body %>',
  };
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/template';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mail_settings_template_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/template';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_mailbox_providers_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    limit: 1,
    mailbox_providers: 'test_string',
    offset: 1,
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/mailbox_providers/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_partner_settings_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
    offset: 1,
  };
  request.method = 'GET';
  request.url = '/v3/partner_settings';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_partner_settings_new_relic_patch', () => {
  const request = {};
  request.body = {
    enable_subuser_statistics: true,
    enabled: true,
    license_key: '',
  };
  request.method = 'PATCH';
  request.url = '/v3/partner_settings/new_relic';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_partner_settings_new_relic_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/partner_settings/new_relic';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_scopes_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/scopes';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_scopes_requests_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
    offset: 1,
  };
  request.method = 'GET';
  request.url = '/v3/scopes/requests';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_scopes_requests__request_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/scopes/requests/{request_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_scopes_requests__request_id__approve_patch', () => {
  const request = {};
  request.method = 'PATCH';
  request.url = '/v3/scopes/requests/{request_id}/approve';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_senders_post', () => {
  const request = {};
  request.body = {
    address: '123 Elm St.',
    address_2: 'Apt. 456',
    city: 'Denver',
    country: 'United States',
    from: {
      email: 'from@example.com',
      name: 'Example INC',
    },
    nickname: 'My Sender ID',
    reply_to: {
      email: 'replyto@example.com',
      name: 'Example INC',
    },
    state: 'Colorado',
    zip: '80202',
  };
  request.method = 'POST';
  request.url = '/v3/senders';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_senders_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/senders';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_senders__sender_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/senders/{sender_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_senders__sender_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/senders/{sender_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_senders__sender_id__patch', () => {
  const request = {};
  request.body = {
    address: '123 Elm St.',
    address_2: 'Apt. 456',
    city: 'Denver',
    country: 'United States',
    from: {
      email: 'from@example.com',
      name: 'Example INC',
    },
    nickname: 'My Sender ID',
    reply_to: {
      email: 'replyto@example.com',
      name: 'Example INC',
    },
    state: 'Colorado',
    zip: '80202',
  };
  request.method = 'PATCH';
  request.url = '/v3/senders/{sender_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_senders__sender_id__resend_verification_post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/senders/{sender_id}/resend_verification';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    limit: 1,
    offset: 1,
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers_post', () => {
  const request = {};
  request.body = {
    email: 'John@example.com',
    ips: [
      '1.1.1.1',
      '2.2.2.2',
    ],
    password: 'johns_password',
    username: 'John@example.com',
  };
  request.method = 'POST';
  request.url = '/v3/subusers';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
    offset: 1,
    username: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/subusers';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers_reputations_get', () => {
  const request = {};
  request.qs = {
    usernames: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/subusers/reputations';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    limit: 1,
    offset: 1,
    start_date: '2016-01-01',
    subusers: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/subusers/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers_stats_monthly_get', () => {
  const request = {};
  request.qs = {
    date: 'test_string',
    limit: 1,
    offset: 1,
    sort_by_direction: 'asc',
    sort_by_metric: 'test_string',
    subuser: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/subusers/stats/monthly';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers_stats_sums_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    limit: 1,
    offset: 1,
    sort_by_direction: 'asc',
    sort_by_metric: 'test_string',
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/subusers/stats/sums';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers__subuser_name__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/subusers/{subuser_name}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_subusers__subuser_name__patch', () => {
  const request = {};
  request.body = {
    disabled: false,
  };
  request.method = 'PATCH';
  request.url = '/v3/subusers/{subuser_name}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_subusers__subuser_name__ips_put', () => {
  const request = {};
  request.body = [
    '127.0.0.1',
  ];
  request.method = 'PUT';
  request.url = '/v3/subusers/{subuser_name}/ips';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers__subuser_name__monitor_put', () => {
  const request = {};
  request.body = {
    email: 'example@example.com',
    frequency: 500,
  };
  request.method = 'PUT';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers__subuser_name__monitor_post', () => {
  const request = {};
  request.body = {
    email: 'example@example.com',
    frequency: 50000,
  };
  request.method = 'POST';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers__subuser_name__monitor_delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_subusers__subuser_name__monitor_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_subusers__subuser_name__stats_monthly_get', () => {
  const request = {};
  request.qs = {
    date: 'test_string',
    limit: 1,
    offset: 1,
    sort_by_direction: 'asc',
    sort_by_metric: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/subusers/{subuser_name}/stats/monthly';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_blocks_delete', () => {
  const request = {};
  request.body = {
    delete_all: false,
    emails: [
      'example1@example.com',
      'example2@example.com',
    ],
  };
  request.method = 'DELETE';
  request.url = '/v3/suppression/blocks';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_suppression_blocks_get', () => {
  const request = {};
  request.qs = {
    end_time: 1,
    limit: 1,
    offset: 1,
    start_time: 1,
  };
  request.method = 'GET';
  request.url = '/v3/suppression/blocks';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_blocks__email__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/suppression/blocks/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_suppression_blocks__email__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/suppression/blocks/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_bounces_delete', () => {
  const request = {};
  request.body = {
    delete_all: true,
    emails: [
      'example@example.com',
      'example2@example.com',
    ],
  };
  request.method = 'DELETE';
  request.url = '/v3/suppression/bounces';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_suppression_bounces_get', () => {
  const request = {};
  request.qs = {
    end_time: 1,
    start_time: 1,
  };
  request.method = 'GET';
  request.url = '/v3/suppression/bounces';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_bounces__email__delete', () => {
  const request = {};
  request.qs = {
    email_address: 'example@example.com',
  };
  request.method = 'DELETE';
  request.url = '/v3/suppression/bounces/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_suppression_bounces__email__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/suppression/bounces/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_invalid_emails_delete', () => {
  const request = {};
  request.body = {
    delete_all: false,
    emails: [
      'example1@example.com',
      'example2@example.com',
    ],
  };
  request.method = 'DELETE';
  request.url = '/v3/suppression/invalid_emails';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_suppression_invalid_emails_get', () => {
  const request = {};
  request.qs = {
    end_time: 1,
    limit: 1,
    offset: 1,
    start_time: 1,
  };
  request.method = 'GET';
  request.url = '/v3/suppression/invalid_emails';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_invalid_emails__email__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/suppression/invalid_emails/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_suppression_invalid_emails__email__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/suppression/invalid_emails/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_spam_reports_delete', () => {
  const request = {};
  request.body = {
    delete_all: false,
    emails: [
      'example1@example.com',
      'example2@example.com',
    ],
  };
  request.method = 'DELETE';
  request.url = '/v3/suppression/spam_reports';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_suppression_spam_reports_get', () => {
  const request = {};
  request.qs = {
    end_time: 1,
    limit: 1,
    offset: 1,
    start_time: 1,
  };
  request.method = 'GET';
  request.url = '/v3/suppression/spam_reports';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_spam_reports__email__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/suppression/spam_reports/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_suppression_spam_reports__email__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/suppression/spam_reports/{email}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_suppression_unsubscribes_get', () => {
  const request = {};
  request.qs = {
    end_time: 1,
    limit: 1,
    offset: 1,
    start_time: 1,
  };
  request.method = 'GET';
  request.url = '/v3/suppression/unsubscribes';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_teammates_post', () => {
  const request = {};
  request.body = {
    email: 'teammate1@example.com',
    is_admin: false,
    scopes: [
      'user.profile.read',
      'user.profile.update',
    ],
  };
  request.method = 'POST';
  request.url = '/v3/teammates';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_teammates_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
    offset: 1,
  };
  request.method = 'GET';
  request.url = '/v3/teammates';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_teammates_pending_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/teammates/pending';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_teammates_pending__token__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/teammates/pending/{token}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_teammates_pending__token__resend_post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/teammates/pending/{token}/resend';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_teammates__username__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/teammates/{username}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_teammates__username__patch', () => {
  const request = {};
  request.body = {
    is_admin: false,
    scopes: [
      'user.profile.read',
      'user.profile.edit',
    ],
  };
  request.method = 'PATCH';
  request.url = '/v3/teammates/{username}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_teammates__username__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/teammates/{username}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_templates_post', () => {
  const request = {};
  request.body = {
    name: 'example_name',
  };
  request.method = 'POST';
  request.url = '/v3/templates';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_templates_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/templates';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_templates__template_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/templates/{template_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_templates__template_id__patch', () => {
  const request = {};
  request.body = {
    name: 'new_example_name',
  };
  request.method = 'PATCH';
  request.url = '/v3/templates/{template_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_templates__template_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/templates/{template_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_templates__template_id__versions_post', () => {
  const request = {};
  request.body = {
    active: 1,
    html_content: '<%body%>',
    name: 'example_version_name',
    plain_content: '<%body%>',
    subject: '<%subject%>',
    template_id: 'ddb96bbc-9b92-425e-8979-99464621b543',
  };
  request.method = 'POST';
  request.url = '/v3/templates/{template_id}/versions';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_templates__template_id__versions__version_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_templates__template_id__versions__version_id__patch', () => {
  const request = {};
  request.body = {
    active: 1,
    html_content: '<%body%>',
    name: 'updated_example_name',
    plain_content: '<%body%>',
    subject: '<%subject%>',
  };
  request.method = 'PATCH';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_templates__template_id__versions__version_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_templates__template_id__versions__version_id__activate_post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/templates/{template_id}/versions/{version_id}/activate';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
    offset: 1,
  };
  request.method = 'GET';
  request.url = '/v3/tracking_settings';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_click_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
  };
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/click';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_click_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/tracking_settings/click';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_google_analytics_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
    utm_campaign: 'website',
    utm_content: '',
    utm_medium: 'email',
    utm_source: 'sendgrid.com',
    utm_term: '',
  };
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/google_analytics';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_google_analytics_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/tracking_settings/google_analytics';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_open_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
  };
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/open';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_open_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/tracking_settings/open';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_subscription_patch', () => {
  const request = {};
  request.body = {
    enabled: true,
    html_content: 'html content',
    landing: 'landing page html',
    plain_content: 'text content',
    replace: 'replacement tag',
    url: 'url',
  };
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/subscription';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_tracking_settings_subscription_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/tracking_settings/subscription';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_account_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/account';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_credits_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/credits';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_email_put', () => {
  const request = {};
  request.body = {
    email: 'example@example.com',
  };
  request.method = 'PUT';
  request.url = '/v3/user/email';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_email_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/email';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_password_put', () => {
  const request = {};
  request.body = {
    new_password: 'new_password',
    old_password: 'old_password',
  };
  request.method = 'PUT';
  request.url = '/v3/user/password';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_profile_patch', () => {
  const request = {};
  request.body = {
    city: 'Orange',
    first_name: 'Example',
    last_name: 'User',
  };
  request.method = 'PATCH';
  request.url = '/v3/user/profile';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_profile_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/profile';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_scheduled_sends_post', () => {
  const request = {};
  request.body = {
    batch_id: 'YOUR_BATCH_ID',
    status: 'pause',
  };
  request.method = 'POST';
  request.url = '/v3/user/scheduled_sends';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_user_scheduled_sends_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/scheduled_sends';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_scheduled_sends__batch_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_user_scheduled_sends__batch_id__patch', () => {
  const request = {};
  request.body = {
    status: 'pause',
  };
  request.method = 'PATCH';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_user_scheduled_sends__batch_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_settings_enforced_tls_patch', () => {
  const request = {};
  request.body = {
    require_tls: true,
    require_valid_cert: false,
  };
  request.method = 'PATCH';
  request.url = '/v3/user/settings/enforced_tls';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_settings_enforced_tls_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/settings/enforced_tls';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_username_put', () => {
  const request = {};
  request.body = {
    username: 'test_username',
  };
  request.method = 'PUT';
  request.url = '/v3/user/username';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_username_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/username';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_webhooks_event_settings_patch', () => {
  const request = {};
  request.body = {
    bounce: true,
    click: true,
    deferred: true,
    delivered: true,
    dropped: true,
    enabled: true,
    group_resubscribe: true,
    group_unsubscribe: true,
    open: true,
    processed: true,
    spam_report: true,
    unsubscribe: true,
    url: 'url',
  };
  request.method = 'PATCH';
  request.url = '/v3/user/webhooks/event/settings';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_webhooks_event_settings_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/webhooks/event/settings';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_webhooks_event_test_post', () => {
  const request = {};
  request.body = {
    url: 'url',
  };
  request.method = 'POST';
  request.url = '/v3/user/webhooks/event/test';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_user_webhooks_parse_settings_post', () => {
  const request = {};
  request.body = {
    hostname: 'myhostname.com',
    send_raw: false,
    spam_check: true,
    url: 'http://email.myhosthame.com',
  };
  request.method = 'POST';
  request.url = '/v3/user/webhooks/parse/settings';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_user_webhooks_parse_settings_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/settings';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_webhooks_parse_settings__hostname__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_user_webhooks_parse_settings__hostname__patch', () => {
  const request = {};
  request.body = {
    send_raw: true,
    spam_check: false,
    url: 'http://newdomain.com/parse',
  };
  request.method = 'PATCH';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_webhooks_parse_settings__hostname__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_user_webhooks_parse_stats_get', () => {
  const request = {};
  request.qs = {
    aggregated_by: 'day',
    end_date: '2016-04-01',
    limit: 'test_string',
    offset: 'test_string',
    start_date: '2016-01-01',
  };
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/stats';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_domains_post', () => {
  const request = {};
  request.body = {
    automatic_security: false,
    custom_spf: true,
    default: true,
    domain: 'example.com',
    ips: [
      '192.168.1.1',
      '192.168.1.2',
    ],
    subdomain: 'news',
    username: 'john@example.com',
  };
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_whitelabel_domains_get', () => {
  const request = {};
  request.qs = {
    domain: 'test_string',
    exclude_subusers: 'true',
    limit: 1,
    offset: 1,
    username: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_domains_default_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/default';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_domains_subuser_delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/subuser';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_whitelabel_domains_subuser_get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/subuser';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_domains__domain_id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_whitelabel_domains__domain_id__patch', () => {
  const request = {};
  request.body = {
    custom_spf: true,
    default: false,
  };
  request.method = 'PATCH';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_domains__domain_id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_domains__domain_id__subuser_post', () => {
  const request = {};
  request.body = {
    username: 'jane@example.com',
  };
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{domain_id}/subuser';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_whitelabel_domains__id__ips_post', () => {
  const request = {};
  request.body = {
    ip: '192.168.0.1',
  };
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{id}/ips';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_domains__id__ips__ip__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/{id}/ips/{ip}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_domains__id__validate_post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{id}/validate';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_ips_post', () => {
  const request = {};
  request.body = {
    domain: 'example.com',
    ip: '192.168.1.1',
    subdomain: 'email',
  };
  request.method = 'POST';
  request.url = '/v3/whitelabel/ips';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_whitelabel_ips_get', () => {
  const request = {};
  request.qs = {
    ip: 'test_string',
    limit: 1,
    offset: 1,
  };
  request.method = 'GET';
  request.url = '/v3/whitelabel/ips';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_ips__id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/ips/{id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_whitelabel_ips__id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/ips/{id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_ips__id__validate_post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/whitelabel/ips/{id}/validate';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_links_post', () => {
  const request = {};
  request.body = {
    default: true,
    domain: 'example.com',
    subdomain: 'mail',
  };
  request.qs = {
    limit: 1,
    offset: 1,
  };
  request.method = 'POST';
  request.url = '/v3/whitelabel/links';
  it('should have the correct response code', () => {
    return testRequest(request, 201);
  });
});

describe('test_whitelabel_links_get', () => {
  const request = {};
  request.qs = {
    limit: 1,
  };
  request.method = 'GET';
  request.url = '/v3/whitelabel/links';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_links_default_get', () => {
  const request = {};
  request.qs = {
    domain: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/default';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_links_subuser_delete', () => {
  const request = {};
  request.qs = {
    username: 'test_string',
  };
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/links/subuser';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_whitelabel_links_subuser_get', () => {
  const request = {};
  request.qs = {
    username: 'test_string',
  };
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/subuser';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_links__id__delete', () => {
  const request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/links/{id}';
  it('should have the correct response code', () => {
    return testRequest(request, 204);
  });
});

describe('test_whitelabel_links__id__patch', () => {
  const request = {};
  request.body = {
    default: true,
  };
  request.method = 'PATCH';
  request.url = '/v3/whitelabel/links/{id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_links__id__get', () => {
  const request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/{id}';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_links__id__validate_post', () => {
  const request = {};
  request.method = 'POST';
  request.url = '/v3/whitelabel/links/{id}/validate';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});

describe('test_whitelabel_links__link_id__subuser_post', () => {
  const request = {};
  request.body = {
    username: 'jane@example.com',
  };
  request.method = 'POST';
  request.url = '/v3/whitelabel/links/{link_id}/subuser';
  it('should have the correct response code', () => {
    return testRequest(request, 200);
  });
});
