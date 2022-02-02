const OriginalCodeBuilder = require('../../helpers/code-builder')
class CodeBuilder extends OriginalCodeBuilder {
  constructor(indent = '    ', join = '\n', defaultLevel = 0) {
    super(indent, join)
    this.indentLevel = defaultLevel
  }

  /** Current indentation level */
  indentLevel = 0

  /**
   * Increase indentation level
   *
   * @returns {this}
   */
  indent() {
    this.indentLevel++
    return this
  }
  /**
   * Decrease indentation level
   *
   * @returns {this}
   */
  unindent() {
    this.indentLevel--
    return this
  }
  /**
   * Reset indentation level
   *
   * @returns {this}
   */
  reindent() {
    this.indentLevel = 0
    return this
  }

  /** @inheritdoc */
  push(str) {
    return super.push(this.indentLevel, str)
  }
}

module.exports = CodeBuilder
