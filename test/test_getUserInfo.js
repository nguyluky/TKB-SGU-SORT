// const {getUserToken, getUserInfo} = require("../src/utils/sgu_api")



// var test = getUserInfo("eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ii03NzM3NTUzMjE0NTEyNDg3MTAyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IjMxMjM1NjAwMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI4OTQ4MTcyNDQ0NDg2MDQxMTYyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU0lOSFZJRU4iLCJzZXNzaW9uIjoiLTc5NjEyODE2ODczMjQ1NDQ5OTQiLCJkdnBjIjoiLTc2NDg0NjY0NTU5NjU0MzQ0NzgiLCJuYW1lIjoiTmd1eeG7hW4gS2jhuq9jIEhp4bq_dSIsInBhc3N0eXBlIjoiMCIsInVjdiI6IjkxNDE5MjM1MyIsInByaW5jaXBhbCI6Im5ndXllbmtoYWNoaWV1MTE3QGdtYWlsLmNvbSIsIndjZiI6IjAiLCJuYmYiOjE3MTIzMTU4NjQsImV4cCI6MTcxMjMyMzA2NCwiaXNzIjoiZWR1c29mdCIsImF1ZCI6ImFsbCJ9.fnmWLhBrvnBPNOOXvKioNKt9ph7Ntu8zWYeAd3Uhn0Y")
// test.then(e => {
//     console.log(JSON.parse(e))
// })

const Logger = require('../src/utils/logger')

Logger.error('test err')
Logger.info('test info')