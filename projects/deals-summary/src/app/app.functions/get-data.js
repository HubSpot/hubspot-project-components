// for HubSpot API calls
const hubspot = require('@hubspot/api-client');

exports.main = async (context = {}, sendResponse) => {
  const { hs_object_id } = context.propertiesToSend;
  const { PRIVATE_APP_ACCESS_TOKEN } = context.secrets;
  const hubSpotClient = new hubspot.Client({
    accessToken: PRIVATE_APP_ACCESS_TOKEN,
  });

  const deals = await getOpenAssociatedDeals(hubSpotClient, hs_object_id);
  const totalAmount = calculateTotalAmount(deals);
  const averageAmount = calculateAverageAmount(deals);

  sendResponse({ dealsCount: deals.length, totalAmount, averageAmount });
};

async function getOpenAssociatedDeals(hubSpotClient, hs_object_id) {
  const objectData = await hubSpotClient.crm.contacts.basicApi.getById(
    hs_object_id,
    null,
    null,
    ['deals']
  );
  const dealIds = objectData.associations.deals.results.map((deal) => deal.id);
  const deals = await hubSpotClient.crm.deals.batchApi.read({
    properties: ['amount', 'hs_is_closed'],
    inputs: dealIds.map((id) => ({ id })),
  });
  const filteredDeals = deals.results.filter(
    (deal) => deal.properties.hs_is_closed == 'false'
  );

  return filteredDeals;
}

function calculateTotalAmount(deals) {
  const amounts = deals.map((deal) => parseFloat(deal.properties.amount));
  return amounts.reduce((sum, amount) => sum + amount, 0);
}

function calculateAverageAmount(deals) {
  const totalCount = deals.length;

  const amounts = deals.map((deal) => parseFloat(deal.properties.amount));
  const totalDeals = amounts.reduce((sum, amount) => sum + amount, 0);

  const average = Math.ceil(totalDeals / totalCount);
  return -Math.round(-average);
}
