package tree_sitter_testplan_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_testplan "github.com/ocioficial/tree-sitter-testplan/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_testplan.Language())
	if language == nil {
		t.Errorf("Error loading Testplan grammar")
	}
}
