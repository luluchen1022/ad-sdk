import http from "k6/http";
import { check, group, sleep } from "k6";
import { Rate } from "k6/metrics";

// A custom metric to track failure rates
var failureRate = new Rate("check_failure_rate");

// Options
export let options = {
  stages: [
    // Linearly ramp up from 1 to 50 VUs during first minute
    { target: 200, duration: "10s" },
    // Hold at 50 VUs for the next 3 minutes and 30 seconds
    // { target: 50, duration: "3m30s" },
    // Linearly ramp down from 50 to 0 50 VUs over the last 30 seconds
    // { target: 0, duration: "30s" }
    // Total execution time will be ~5 minutes
  ],
  thresholds: {
    // We want the 95th percentile of all HTTP request durations to be less than 500ms
    "http_req_duration": ["p(95)<500"],
    // Requests with the staticAsset tag should finish even faster
    "http_req_duration{staticAsset:yes}": ["p(99)<250"],
    // Thresholds based on the custom metric we defined and use to track application failures
    "check_failure_rate": [
      // Global failure rate should be less than 1%
      "rate<0.01",
      // Abort the test early if it climbs over 5%
      { threshold: "rate<=0.05", abortOnFail: true },
    ],
  },
};

// Main function
export default function () {
  let response = http.get("http://localhost:3000/ads");

  // check() returns false if any of the specified conditions fail
  let checkRes = check(response, {
    "http2 is used": (r) => r.proto === "HTTP/1.1",
    "status is 200": (r) => r.status === 200,
    "content is present": (r) => r.body.indexOf("success") !== -1,
  });

  // We reverse the check() result since we want to count the failures
  failureRate.add(!checkRes);

  sleep(Math.random() * 3 + 2); // Random sleep between 2s and 5s
}