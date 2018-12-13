# Betvictor Technical task


## API Documentation
___

**All responses are encoded in JSON and have the appropriate Content-Type header. Response errors make use of [readable details](https://tools.ietf.org/html/rfc7807) as specified in that RFC.**


### GET /api/sports

```
GET /api/sports
Content-Type: "application/json"
```

##### Returns

**200** response

```
HTTP/1.1 200 Ok
[
   {
      "id": 100,
      "title": "Football",
      "meetings": [],
      "is_virtual": false,
      "events": [],
      "pos": 1
    }
]
```
##### Errors

Content-Type: "application/problem+json"

Error | Description
----- | ------------
404   | Sports cannot be found


### GET /api/sports/{id}

```
GET /api/sports/100
Content-Type: "application/json"
```

##### Returns

**200** response

```
HTTP/1.1 200 Ok
{
  "id": 100,
  "title": "Football",
  "meetings": [],
  "is_virtual": false,
  "events": [],
  "pos": 1
}
```
##### Errors

Content-Type: "application/problem+json"

Error | Description
----- | ------------
404   | Sport with id 100 cannot be found

### GET /api/sports/{id}/events/{eid}

```
GET /api/sports/100/events/1013539500
Content-Type: "application/json"
```

##### Returns

**200** response

```
HTTP/1.1 200 Ok
{
  "id": 1013539500,
  "is_virtual": false,
  "outcomes": [],
  "event_id": 1013539500,
  "title": "Real Madrid v CSKA Moscow",
  "market_id": null,
  "market_type_id": null,
  "status_id": null,
  "score": "0-3",
  "description": null,
  "start_time": 1544637300000,
  "meeting": "Champions League",
  "meeting_id": 130873010,
  "media": null,
  "american_format": false,
  "event_type": "GAMEEVENT",
  "pos": 0,
  "home_team": "Real Madrid",
  "away_team": "CSKA Moscow",
  "team_information": true,
  "home_score": 0,
  "away_score": 3,
  "period_id": 235,
  "status_type": "text",
  "status": "Second Half",
  "total_outcomes": 0
}
```
##### Errors

Content-Type: "application/problem+json"

Error | Description
----- | ------------
404   | Event with id 1013539500 cannot be found

## Assumptions and decisions
---

I've used _[Typescript](https://www.typescriptlang.org/)_ which was not necessary at all but I wanted to show you that I have experience with more than just Node.js and that I'm willing to go the extra mile.

Tests are done with _[Jest](https://jestjs.io/)_ to perform testing using BDD. I've used _[nock](https://github.com/nock/nock)_ to mock http requests in order to create unit and integration tests. Since the response from the endpoint is always changing I've decided to save a certain state and mock it as if it was being served from the live feed.

I´ve tried to use a n-layer architecture while performing this task. Each layer is testable with few dependencies being injected with the help of _[Inversify](https://github.com/inversify/InversifyJS)_ in order to provide inversion of control and to make layers loose coupled. In order to achive this there are interfaces that serve as contracts between layers. As long as those contracts are not broken each piece can be easily replaceable. 

The cache mechanism makes use of _[node-cache](https://www.npmjs.com/package/node-cache)_. It has a contract and its implementation is encapsulated inside a class which makes it very easy to replace as long as the contract is not broken. I've decided to apply the cache mechanism to all endpoints because all of them are GET methods which can be cached.

I was not able to support more than one language. I couldn't figure out how and eventualy ran out of time for it as well. I've decided to implement the other features as well as to cover them with tests.

There's integration tests that test the whole flow plus some http headers and status codes and responses and there is unit tests that perform validation over a single piece of code.


## Run it
___

Run tests

`npm run build & npm run test`


Run server

`npm run build & npm start`
