# Incident: 2025-12-02 18:26:00

## Summary

> [!NOTE]
> Write a summary of the incident in a few sentences. Include what happened, why, the severity of the incident and how long the impact lasted.

```md
Between the time of 11:26 and 11:28 on December 2, 2025, all users encountered an error that prevented pizzas from being purchased. The event was triggered by a change in the pizza factory api response around 11:26. This was triggered by me manually initiating chaos for the purpose of this assignment.

The pizza factory started returning a response from 'chaos monkey' that included a reportUrl rather than it's typical response. The event was detected by the Grafana monitoring system. The team started worked (and resolved) this event by visiting the reportUrl, after which the pizza ordering api response returned to normal. This high level incident affected 100% of users and resulted in a complete loss of revenue from not selling pizzas for the duration of the incident.
```

## Detection

> [!NOTE]
> When did the team detect the incident? How did they know it was happening? How could we improve time-to-detection? Consider: How would we have cut that time by half?

```md
This incident was detected when the Pizzas Ordered alert was triggered from failed pizza orders and Matthew Nelson was paged. The time to detection was immediate when traffic was being generated to the pizza ordering endpoint. The problem likely existed before that, but no pizzas were being ordered.

A script that periodically hits the endpoints will be set up by Matthew Nelson so that issues with the endpoints can be detected earlier, minimizing the effect to actual users.
```

## Impact

> [!NOTE]
> Describe how the incident impacted internal and external users during the incident. Include how many support cases were raised.

```md
For 0 hours 3 minutes between 18:26 UTC and 18:28 UTC on 12/02/2025, users were unable to purchase pizzas because of an unexpected response from the external Pizza Factory API.

This incident affected 100% of customers, causing a total of 17 pizza purchase failures.
```

## Timeline

> [!NOTE]
> Detail the incident timeline. We recommend using UTC to standardize for timezones.
> Include any notable lead-up events, any starts of activity, the first known impact, and escalations. Note any decisions or changed made, and when the incident ended, along with any post-impact events of note.

```md
All times are UTC.

- Day Prior - Chaos initiated on Pizza Factory site.
- _18:26_ - Pizza Factory API starts giving unexpected responses.
- _18:26_ - Alert that the pizza orders are failing.
- _18:28_ - Matthew visited the support link for the pizza factory.
- _18:29_ - Pizza Factory API responses return to normal. Issue is resolved.
```

## Response

> [!NOTE]
> Who responded to the incident? When did they respond, and what did they do? Note any delays or obstacles to responding.

```md
After receiving a page at 18:26 UTC, Matthew Nelson came online to Grafana and resolved the issue at 18:28 UTC.
```

## Root cause

> [!NOTE]
> Note the final root cause of the incident, the thing identified that needs to change in order to prevent this class of incident from happening again.

```md
Chaos was initiated through the Pizza Factory on 12/01/2025. This was set to randomly start failing the Pizza Factory API sometime between 15:00 UTC and 21:00 UTC.
```

## Resolution

> [!NOTE]
> Describe how the service was restored and the incident was deemed over. Detail how the service was successfully restored and you knew how what steps you needed to take to recovery.
> Depending on the scenario, consider these questions: How could you improve time to mitigation? How could you have cut that time by half?

```md
By visiting the reportUrl link that was included in the failing Pizza Factory chaos monkey response, the issue was promptly resolved.
```

## Prevention

> [!NOTE]
> Now that you know the root cause, can you look back and see any other incidents that could have the same root cause? If yes, note what mitigation was attempted in those incidents and ask why this incident occurred again.

```md
No other incidents have ever been caused by this same issue.
```

## Action items

> [!NOTE]
> Describe the corrective action ordered to prevent this class of incident in the future. Note who is responsible and when they have to complete the work and where that work is being tracked.

```md
1. Always depend on the same version of the Pizza Factory API.
2. Start the process of moving the pizza ordering to our own system, rather than depending on an external API.
3. In the result of failed pizza orders, queue up the requested orders so that we can process them once our system is working again.
```
