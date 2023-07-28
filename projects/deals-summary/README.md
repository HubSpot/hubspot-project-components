# Deals summary sample

Sample UIE react projects that developers can use to learn the ins/outs of building a custom UI extension with HubSpot first party data.

## Quick Start

1. Use project [start](https://git.hubteam.com/HubSpot/react-uie-samples/tree/master/deals-summary-start) state.


2. Add a function to calculate average amount to [get-data.js](./src/app/app.functions/get-data.js):

```
function calculateAverageAmount(deals) {
  const totalCount = deals.length;

  const amounts = deals.map((deal) => parseFloat(deal.properties.amount));
  const totalDeals = amounts.reduce((sum, amount) => sum + amount, 0);

  const average = Math.ceil(totalDeals / totalCount);
  return -Math.round(-average);
}
```

3. Calculate `totalAmount` and pass the result in reponse:

```
const averageAmount = calculateAverageAmount(deals);
sendResponse({ dealsCount: deals.length, totalAmount, averageAmount });

```

4. Obtain `averageAmount` in [DealsSummary](./src/app/extensions/card-frontend.js) component, adding a state variable: 
```
const [totalAmount, setTotalAmount] = useState(0);
``` 
and updating the state with in `useEffect` function: 
```setTotalAmount(response.totalAmount);
```


4. Render `totalAmount` with a new `StatiscticsItem` element:

```
<StatisticsItem label="AVG MARGIN" number={averageAmount}>
  <Text>Low End</Text>
</StatisticsItem>
```

Final view:

![image](https://git.hubteam.com/storage/user/1895/files/568309b2-67ea-46cb-8d79-f13b6d726c87)
