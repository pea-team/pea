/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>TypeScript</>,
    description: <>TypeScript 是一等公民，提供良好的开发体验</>
  },
  {
    title: <>Create React App</>,
    description: (
      <>
        基于 create-react-app，不用关心 Webpack 配置，享受 React 社区最优秀的
        setup、develop、build 工具
      </>
    )
  },
  {
    title: <>Progressive</>,
    description: <>开箱即用，可以快速上手，也可以开发复杂应用</>
  }
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          {imgUrl && (
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          )}
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <ul className="feature">
            <li>
              <a href="https://reactjs.org/" target="_blank">
                React
              </a>
            </li>
            <li>
              <a href="https://www.typescriptlang.org/" target="_blank">
                TypeScript
              </a>
            </li>
            <li>
              <a href="/docs/rest/started" target="_blank">
                Restful
              </a>
            </li>
            <li>
              <a href="/docs/graphql/started" target="_blank">
                GraphQL
              </a>
            </li>
            <li>
              <a href="/docs/form/start" target="_blank">
                Form
              </a>
            </li>
            <li>
              <a href="/docs/plugin/use" target="_blank">
                Plugin
              </a>
            </li>
          </ul>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("/docs/intro/quick-start")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
