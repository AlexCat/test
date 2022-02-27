import { Global, css } from '@emotion/react'

import sbSansText_300 from 'assets/fonts/sbtext_300.woff2'
import sbSansText_400 from 'assets/fonts/sbtext_400.woff2'
import sbSansText_500 from 'assets/fonts/sbtext_500.woff2'
import sbSansText_600 from 'assets/fonts/sbtext_600.woff2'
import sbSansText_700 from 'assets/fonts/sbtext_700.woff2'

import sbSansDisplay_300 from 'assets/fonts/sbsans_300.woff2'
import sbSansDisplay_400 from 'assets/fonts/sbsans_400.woff2'
import sbSansDisplay_600 from 'assets/fonts/sbsans_600.woff2'
import 'react-tabs/style/react-tabs.css'

const styles = css`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* custom styles */

  @font-face {
	font-family: "Sb-Sans-Text";
    font-style: normal;
    font-weight: 300;
	src: url(${sbSansText_300}) format("woff2")
  }
  @font-face {
	font-family: "Sb-Sans-Text";
    font-style: normal;
    font-weight: 400;
	src: url(${sbSansText_400}) format("woff2")
  }
  @font-face {
	font-family: "Sb-Sans-Text";
    font-style: normal;
    font-weight: 500;
	src: url(${sbSansText_500}) format("woff2")
  }
  @font-face {
	font-family: "Sb-Sans-Text";
    font-style: normal;
    font-weight: 600;
	src: url(${sbSansText_600}) format("woff2")
  }
  @font-face {
	font-family: "Sb-Sans-Text";
    font-style: normal;
    font-weight: 700;
	src: url(${sbSansText_700}) format("woff2")
  }

  @font-face {
	font-family: "Sb-Sans-Display";
    font-style: normal;
    font-weight: 300;
	src: url(${sbSansDisplay_300}) format("woff2")
  }
  @font-face {
	font-family: "Sb-Sans-Display";
    font-style: normal;
    font-weight: 400;
	src: url(${sbSansDisplay_400}) format("woff2")
  }
  @font-face {
	font-family: "Sb-Sans-Display";
    font-style: normal;
    font-weight: 600;
	src: url(${sbSansDisplay_600}) format("woff2")
  }

html {
	font-family: "Sb-Sans-Text";
}
::-webkit-scrollbar{
	width: 8px;
}
::-webkit-scrollbar-track{
}
::-webkit-scrollbar-thumb{
	border-radius: 8px;
	-webkit-box-shadow: inset -1px -1px 5px rgb(183 181 181);
}

.Toastify__toast {
	padding: 0;
	border-radius: 8px;
}
.Toastify__toast-body {
	margin: 0;
	padding: 0;
}
`

function GlobalStyles() {
	return (
		<Global styles={styles} />
	)
}

export {
	GlobalStyles
}