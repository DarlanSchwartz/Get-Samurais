import { createGlobalStyle } from "styled-components";
import { mainColor, mainRed } from "../Colors/mainColors";

const ResetStyle = createGlobalStyle`
html, body, span, applet, object, iframe,
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


    body,html{
        min-height: 100% !important;
		height: 100% !important;
        background-color: transparent;
    }
	body.swal2-height-auto {
		height: 100% !important
	}
	body{
		background-color: black;

		&::-webkit-scrollbar {
			width: 10px; /* Largura da barra de rolagem */
		}
		&::-webkit-scrollbar-thumb {
			background-color: ${mainRed}; /* Cor do handle */
			border-radius: 3px; /* Borda arredondada do handle */
		}

		overflow-y: auto !important;
		padding: 0 !important;
	}

    #root{
		height: 100%;
        min-height: 100%;
		position: relative;
        --toastify-color-success: #1f1f1f !important;
    }

	.swal2-image{
		object-fit: cover;
	}

    button{
        cursor: pointer;
    }

    a{
        text-decoration: none;
    }

    .main-background-image {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: url("/background5.png");
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(4px);
        opacity: 30%;
		pointer-events: none;
    }


    @font-face {
        font-family: 'Bonzai';
        src: url('/bonzai.ttf') format('truetype');
    }

    *{
        font-family: 'Poppins';
        transition: all 200ms;
        box-sizing: border-box;
    }

    
`;

export default ResetStyle;