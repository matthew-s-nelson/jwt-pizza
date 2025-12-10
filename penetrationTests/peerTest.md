# Matthew Nelson and David Bloomfield Pen Test

## Self-attacks
| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 4, 2025 |
| Target         | pizza.msn510.click |
| Classification | Security breach |
| Severity       | 3 |
| Description    | Any customer account could be accessed without a password |
| Corrections    | Require passwords on the backend. |

| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 4, 2025 |
| Target         | pizza.msn510.click |
| Classification | Avoiding Payment |
| Severity       | 3 |
| Description    | Users could change the price of their pizza/order. |
| Corrections    | Base the order price amount on the databse rather than what's passed from the frontend. |

| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 4, 2025 |
| Target         | pizza.msn510.click |
| Classification | Deleting Data |
| Severity       | 1 |
| Description    | Any user could delete franchises |
| Corrections    | Add admin check to the delete franchise endpoint. |


## Peer attacks
| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 9, 2025 |
| Target         | https://pizza.dbl00m11.click/ |
| Classification | Security breach |
| Severity       | 3 |
| Description    | Any customer account could be accessed without a password |
| Corrections    | Require passwords on the backend. |

| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 9, 2025 |
| Target         | pizza.msn510.click |
| Classification | Avoiding Payment |
| Severity       | 3 |
| Description    | Users could change the price of their pizza/order. |
| Corrections    | Base the order price amount on the databse rather than what's passed from the frontend. |

| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 9, 2025 |
| Target         | pizza.dbl00m11.click/ |
| Classification | Deleting Data |
| Severity       | 1 |
| Description    | Any user could delete franchises |
| Corrections    | Add admin check to the delete franchise endpoint. |


## Learnings
1. Ensure that your GitHub secrets aren't being saved into any file.
2. Every endpoint needs to be covered by middleware and have backend verification. Frontend verification is just to improve the UX.
3. Add as many layers of security as possible.
    - Make your GitHub repositories private.
    - Restrict access to everything as much as possible (e.g. AWS roles).
