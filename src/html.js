import React from "react";
import android192 from "./img/android-chrome-192x192.png"
import appleTouch from "./img/apple-touch-icon-180x180.png"
import favicon16 from "./img/favicon-16x16.png"
import favicon32 from "./img/favicon-32x32.png"
import favicon96 from "./img/favicon-96x96.png"
import mstile from "./img/mstile-144x144.png"
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} className="sr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <link rel="stylesheet" href="https://use.typekit.net/efp6eer.css" />
        <link rel="icon" type="image/png" href={favicon32} sizes="32x32"/>
        <link rel="icon" type="image/png" href={android192} sizes="192x192"/>
        <link rel="icon" type="image/png" href={favicon96} sizes="96x96"/>
        <link rel="icon" type="image/png" href={favicon16} sizes="16x16"/>
        <meta property="og:title" content="Half of Eight, Projects" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Graphic design, posters, user interfaces, lo-fi 3d, and ambient music. On monthly basis" />
        <meta property="og:image" content="./img/halfof8-ogmeta.png" />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};
