# Travel plan CLI

[![Node.js CI](https://github.com/lencse/travel-plan-test-task/actions/workflows/default.yml/badge.svg)](https://github.com/lencse/travel-plan-test-task/actions)
[![Coverage Status](https://coveralls.io/repos/github/lencse/travel-plan-test-task/badge.svg?branch=main)](https://coveralls.io/github/lencse/travel-plan-test-task?branch=main)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lencse_travel-plan-test-task&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=lencse_travel-plan-test-task)

This is a CLI tool to calculate optimal routes between travel destinations.

## The task

### Rules

* Every destination is marked with a letter.
* `a` and `A` mean two different destinations.
* Rule `a => b` means that `b` must precede `a` in the optimal route because it costs less to travel this way.
* Rule `a =>` means that `a` is a travel destination, but not specifies any destinations that must precede it.

### Input format

* Rules are separated by newlines.
* Besides these newlines, every whitespace characters are ignored.

### Output format

* Travel destinations are printed in the planned order in one line.

## Prerequisites

* [node.js](https://nodejs.org/) (10 or higher)
* [yarn](https://yarnpkg.com/) package manager

## Installation

```bash
git clone git@github.com:lencse/travel-plan-test-task.git
cd travel-plan-test-task
yarn
yarn build
```

### Usage

The script reads from the standard input and prints the travel plan to the standard output.

#### Example

```bash
echo "
x =>
y => z
z =>
" | ./travel-plan.js
```

Result:
```
xzy
```