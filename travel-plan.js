#!/usr/bin/env node
const { main } = require('./build/src/main')
const { EOL } = require('os')

process.stdin.resume()
process.stdin.setEncoding('utf8')

let input = ''

process.stdin.on('data', function (chunk) {
    input += chunk
})

process.stdin.on('end', function () {
    const output = main(input.trim())
    process.stdout.write(output + EOL)
})
