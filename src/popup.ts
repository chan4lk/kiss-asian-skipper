import * as moment from "moment";
import * as $ from "jquery";

let count = 0;

const map = {
  "cow, grass": "/Special/CapImg/Q2ZoamhKZVJPUWtvMmh2R2NxWTRQNHFQWkhpVVZlU2VQVHNRcCtheGdpczNTbVVsTjZRbEhCWGZEL2NWYUZvSg==.jpg",
  "boy, balloon": "/Special/CapImg/UmdRK3E4bnJWbkZuM3lHbmNhK3pFZGxmRStzTndady9BV3NlZTVRd1lPb1NOdzl4d3BuQlFCTjl6WVJmelVxVg==.jpg",
  "boy, basketball": "/Special/CapImg/NTVMZkhCYUZST0ZINlBoWkhyRFV1b2pHc3JXaWlaLzlPTVd0V2hQZ281M09jaXQ4NlFQcTdjZG1KVXBydlYyWA==.jpg",
  "boy, doctor": "/Special/CapImg/WHh1L1l1Q20vdXRXU1VDaElEQnVOWlJXNzdvNi9tZVpxOXhSSEFVL3oyNkQ0eU8yZ0RINlZGTnIrb3ViZ3B2dg==.jpg",
  "boy, fish": "/Special/CapImg/TTdkOGdmVngzSHpDNStncENwaDlvZ3ZURmlVbllUSnQ1aGdweHdreHNqSFR3ZUdGdXlLcnR2Sk50akF2cHhPNw==.jpg",
  "car, acura" : "/Special/CapImg/QXhUcm83MEVGNmljMkpSemtTMlhGUHZrK2xjd1I0M3ZQTVJiTjVDUHJqbUd6dVRXWW43Qjgrb3VsSGYzVW03eg==.jpg",
  "car, lotus": "/Special/CapImg/T0MweUVEeHVoajg0b2djUldFWFZ1THlUTGlnVVB2YkZsWDZDc2V6R1kxcFJXY3lxdW9TUm1CYm9WZFJISXREcg==.jpg",
  "cat, cup": "/Special/CapImg/dFg2THkvVFVwSktXMXhIdk91N2hNNkppQnlHSy9zbEV4bGVFNnlIVjlsWWZBWFdMNy9lREhXMmVHUGRRWHRXYg==.jpg",
  "couple, hug": "/Special/CapImg/dXhMQVFRcEt4cmtLaUJnWm51RDU3ZjVrcm5Ub2hUc3EvRDlBL0FIaHRnQjVYNHpZLzhRQlNFMlBHVzhuWmpXcA==.jpg",
  "cow, flower": "/Special/CapImg/SDY0eWl5dnZwWHYvMnJZaEVzQVA1Zm93QWN4SVhWWm84dFFuKzdzOVpCUTlCMFA5R2ZtaWg3ZTc2ZEE5Y21ycA==.jpg",
  "cow, moo": "/Special/CapImg/NjRCeVpHSThCblVtOE1GaS81YVRRd3plcWplMkgySUQ1SGZWeHpHaXlMYmFJVFR3NWRJUE1DeGlYQWFpTEUrMA==.jpg",
  "girl, balloon": "/Special/CapImg/M3FBMWMyT1RDTU9rUGFreTVwbXcrRThhS2VieGdyRmpZbFJUc3k3ZGh0S2c0ZDNvWVFuSXM5MFJFODgyQ2NxMw==.jpg",
  "girl, candy": "/Special/CapImg/NHhrRDZZMzc3QXhkWm5hbm5panMwWExVU2JaZjd2cVRGQ1NTdi9yQ1EzbkltcmlBV0hNaEF0S0xFdTAvcTkweA==.jpg",
  "girl, glasses": "/Special/CapImg/OTFsREVxL1o5WFhNZk8rVEVzMXdKRVZ1RW1HdG5JYXUvRFdkOTJpOGVuNTVVT0RLanB3S2xzUGZjdjVjeXdCcw==.jpg",
  "monkey, cloud": "/Special/CapImg/R2pOZUdmQ1crNDdNQy82Q3MzV1QycWthSkNVR1Y2NEROSlJ0ejlUVGs0Sy9tdU1zNld3VFVlbXFUUXhnL3N0UA==.jpg",
  "penguin, boxing": "/Special/CapImg/WnpENi9vWmJBMkY4MWRYNFpiYTVzVDFzVHZWeFV3dDFwMG4wQS90RXU4N09PS0FPM0lMSHhVSkM0SVN2VXN3SQ==.jpg",
  "pig, taking pictures": "/Special/CapImg/Y1hlZmVoVm9tSnVNSmt4Yk1jenlNN0JzbFU5R3pNemx1RVB3UXNDdlpSNndGenRsTU5Ga2tJcWk4RGJYeEdjZQ==.jpg",
  "pineapple, black glasses": "/Special/CapImg/SGRHR1FPN25lTUhVTTVsbHl4RkFYWlNQdks2Y3YrQUNuOXlFVktaU0ZZamFMbFU5Z3lieGNTTWNYSGcvMm51WW85NWcrdi9FODB0ZUpPZ25RWWVmaXc9PQ==.jpg",
  "two boys, run": "/Special/CapImg/QnNFUUtXRCtKdjlaeUNyQXVBYUFEd2pKWklaTHl5RnVORVlIMk1OdDJMcWEybWllT1hhRlJYelZ1ekRlVUhidQ==.jpg",
  "witch, owl": "/Special/CapImg/SEhENHJFMncrMmp6NlFCb1N0S3A1V3hJNytYYXl4ckw1NElDODV2cW50aE84ellISXYvc0ZZWXVRRWc1U2dNeQ==.jpg",
}

$(function() {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  let config = {};

  chrome.storage.sync.get({
    data: map
  }, function(items: {data}) {
    config = items.data;
  });

  chrome.tabs.query(queryInfo, function(tabs) {
    $("#url").text(tabs[0].url);
    $("#time").text(moment().format("YYYY-MM-DD HH:mm:ss"));
  });

  chrome.browserAction.setBadgeText({ text: count.toString() });
  $("#countUp").click(() => {
    chrome.browserAction.setBadgeText({ text: (++count).toString() });
  });

  $("#skip").click(() => {
    chrome.storage.sync.get({
      data: map
    }, function(items: {data}) {
      config = items.data;
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (
        tabs[0].url.indexOf("https://kissasian.sh/Special/AreYouHuman2") > -1
      ) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            skip: true,
            config
          },
          function(msg) {
            console.log("result message:", msg);
          }
        );
      }
    });
  });


  $("#capture").click(() => {
    chrome.storage.sync.get({
      data: map
    }, function(items: {data}) {
      config = items.data;
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0].url.indexOf("https://kissasian.sh/Special/AreYouHuman2") > -1) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            capture: true,
            config
          },
          function(msg) {
            console.log("result message:", msg);
          }
        );
      }
    });
  });

});
