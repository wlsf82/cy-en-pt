# cy-en-pt

[![main](https://github.com/wlsf82/cy-en-pt/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/cy-en-pt/actions)

Sample project to demonstrate how to test a website that has versions in two different languages (En and PT-BR.)

## Pre-requirements

It is required to have git, Node.js and npm installed to clone and run this project.

> I used versions `2.34.1`, `v18.15.0`, and `9.5.0.` of git, Node.js and npm, respectively. I suggest you use the same or later LTS versions.

## Installation

After cloning and accessing the repository, run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

Run `npm test` (or `npm t` for the short version) to run the tests in headless mode in both languages (EN and PT-BR.)

Run `npm test:en` to run the tests in headless mode in English.

Run `npm test:pt-br` to run the tests in headless mode in Portuguese (Brazil.)

Run `npm run cy:open:en` to open the Cypress App and run the tests in interactive mode in English.

Or, run `npm run cy:open:pt-br` to open the Cypress App and run the tests in interactive mode in Portuguese (Brazil.)

## Support this project

If you want to support this project, leave a ⭐.

___

This project was created with 💚 by [Walmyr](https://walmyr.dev).
