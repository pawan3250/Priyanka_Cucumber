# Cucumber + Playwright Automation Framework

This repository is a learning-focused BDD automation framework built using:

- Cucumber.js
- Playwright
- TypeScript
- Page Object Model (POM)

It demonstrates how to organize real-world UI automation in a reusable and easy-to-understand structure.

## Project Structure

- `src/features/` – Gherkin feature files
- `src/pages/` – Page Object classes
- `src/steps/` – Cucumber step definitions
- `src/support/` – Browser lifecycle and reusable utilities
- `scripts/` – Test runner helpers
- `reports/` – Generated test reports

## Prerequisites

- Node.js 18+
- npm

## Install dependencies

```bash
npm install
```

## Run all tests

```bash
npm test
```

## Run a specific tag

```bash
npm test -- --tags "@home"
```

## Example tags used in the project

- `@home`
- `@blog`
- `@about`
- `@shop`
- `@contact`
- `@myaccount`

## Notes

This framework is designed for learning and demo purposes. It follows a clean BDD structure and is easy to extend to new pages and scenarios.
