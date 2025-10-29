/**
 * @file Grammar for Ocimatic testplans
 * @author Nico Lehmann
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "testplan",

  extras: ($) => [
    /[ \t]/, // Ignore spaces and tabs, newlines are handled explicitly
    $.comment, // Comments
  ],

  rules: {
    source_file: ($) => repeat($.subtask),
    subtask: ($) =>
      seq($.subtask_header, repeat(choice($.directive, $.command, $._newline))),
    subtask_header: ($) => seq("[", "Subtask", $.number, "]", $._newline),

    directive: ($) => choice($.extends, $.validator),
    extends: ($) => seq("@extends", "subtask", $.number, $._newline),
    validator: ($) => seq("@validator", $.arg, $._newline),

    command: ($) =>
      seq($.group_name, ";", choice($.copy, $.echo, $.generator), $._newline),

    copy: ($) => seq("copy", $.arg),
    echo: ($) => seq("echo", repeat($.arg)),
    generator: ($) => seq(field("command", $.arg), repeat($.arg)),

    arg: ($) => choice($.string_literal, $.word),

    word: (_) => /[^\s"]+/,
    string_literal: (_) =>
      token(seq('"', /([^"\\]|\\.)*/, token.immediate('"'))),

    group_name: (_) => /[a-zA-Z0-9_-]+/,
    _newline: (_) => "\n",
    number: (_) => /\d+/,
    comment: (_) => /#.*/,
  },
});
