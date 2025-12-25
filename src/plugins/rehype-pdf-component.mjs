/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a PDF embed component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.src - The path to the PDF file.
 * @param {string} [properties.width] - The width of the PDF embed.
 * @param {string} [properties.height] - The height of the PDF embed.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created PDF embed component.
 */
export function PdfComponent(properties, children) {
	if (!properties?.src) {
		return h(
			"div",
			{ class: "hidden" },
			'Invalid PDF directive. (PDF directives must include a src attribute: ":::pdf{src=\"path/to/file.pdf\"} :::")',
		);
	}

	const width = properties.width || "100%";
	const height = properties.height || "600px";

	return h("div", { class: "pdf-container" }, [
		h("embed", {
			type: "application/pdf",
			src: properties.src,
			width: width,
			height: height,
			class: "pdf-embed"
		})
	]);
}