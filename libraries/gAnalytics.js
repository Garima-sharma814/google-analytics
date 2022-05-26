const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY.replace(new RegExp('\\\\n'), '\n');
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
const { google } = require('googleapis');
const analytics = google.analytics('v3');
const viewId = process.env.VIEW_ID;

const jwt = { // Json Web token
  email: clientEmail,
  key: privateKey,
  scopes,
};

const getMetric = async (metric, startDate, endDate) => {
  await setTimeout(() => {
    console.log('Hi');
  }, Math.trunc(1000 * Math.random()));

  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    'start-date': startDate,
    'end-date': endDate,
    metrics: metric
  })

  const res = {}
  res[metric] = {
    value: parseInt(result.data.totalForAllResults[metric], 10),
    start: startDate,
    end: endDate
  }

  console.log(res);
  return res
};


const parseMetric = (metric) => {
  let parsedMetric;
  if (!metric.startsWith('ga:'))
    parsedMetric = `ga:${metric}`

  return parseMetric
}

const getUserData = (metric, startDate, endDate) => {
  const results = [];
  for (let i = 0; i <= metric.length; i++) {
    const parsedMetric = parseMetric(metric[i]);
    if (results.indexOf(parsedMetric) === -1)
      results.push(getMetric(metric, startDate, endDate))
  }

  return results
}

module.exports({ getUserData })