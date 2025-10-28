/**
 * @file Grammar for Ocimatic testplans
 * @author Nico Lehmann
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "testplan",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
