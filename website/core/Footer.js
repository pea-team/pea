/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    const docsUrl = this.props.config.docsUrl
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    return `${baseUrl}${docsPart}${langPart}${doc}`
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + (language ? `${language}/` : '') + doc
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>文档</h5>
            <a href={this.docUrl('intro/about.html', this.props.language)}>
              关于
            </a>
            <a
              href={this.docUrl('intro/quick-start.html', this.props.language)}
            >
              快速开始
            </a>
          </div>
          <div>
            <h5>社区</h5>
            <a
              href="http://stackoverflow.com/questions/tagged/peajs"
              target="_blank"
              rel="noreferrer noopener"
            >
              Stack Overflow
            </a>
            <a
              href="https://github.com/pea-team/pea/issues"
              target="_blank"
              rel="noreferrer noopener"
            >
              Issue
            </a>
          </div>
          <div>
            <h5>更多</h5>
            <a
              href="https://github.com/pea-team/pea"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <a
              className="github-button"
              href="https://github.com/pea-team/pea"
              target="_blank"
              rel="noreferrer noopener"
              data-icon="octicon-star"
              data-count-href="/pea-team/pea/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub"
            >
              Star
            </a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    )
  }
}

module.exports = Footer
