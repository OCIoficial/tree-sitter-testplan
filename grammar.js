/**
 * @file Grammar for Ocimatic testplans
 * @author Nico Lehmann
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "testplan",

  extras: ($) => [
    /[ \t]/, // Ignore spaces and tabs, newlines are handled explicitly
    $.comment, // Comments
  ],

  supertypes: ($) => [$.directive, $.item],

  rules: {
    source_file: ($) => repeat($.subtask),
    subtask: ($) => seq(field("header", $.subtask_header), repeat($.item)),
    subtask_header: ($) => seq("[", "Subtask", $.number, "]", $._newline),
    item: ($) => choice($.directive, $.command, $._newline),

    directive: ($) => choice($.extends, $.validator),
    extends: ($) => seq("@extends", "subtask", $.number, $._newline),
    validator: ($) => seq("@validator", $.arg, $._newline),

    command: ($) =>
      seq($.group_name, ";", choice($.copy, $.echo, $.script), $._newline),

    copy: ($) => seq("copy", $.arg),
    echo: ($) => seq("echo", repeat($.arg)),
    script: ($) => seq(field("command", $.arg), repeat($.arg)),

    arg: ($) => choice($.string_literal, $.word),

    word: (_) => /[^\s"]+/,
    string_literal: (_) => seq('"', /([^"\\]|\\.)*/, '"'),

    group_name: (_) => /[a-zA-Z0-9_-]+/,
    number: (_) => /\d+/,

    comment: (_) => /#.*/,
    _newline: (_) => "\n",
  },
});
