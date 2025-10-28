import XCTest
import SwiftTreeSitter
import TreeSitterTestplan

final class TreeSitterTestplanTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_testplan())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Testplan grammar")
    }
}
