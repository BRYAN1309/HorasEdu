import React from 'react';

export const Capitalize = (sentence: string) => {
	return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export function renderFormattedText(text: string) {
	return text.split('\n').map((line, lineIndex) => {
		// Detect heading level based on pattern (Markdown style)
		let headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
		let Tag: string = 'p';
		let content = line;

		if (headingMatch) {
			const hashes = headingMatch[1].length;
			Tag = `h${hashes}`;
			content = headingMatch[2];
		}

		// Split into bold/non-bold parts
		const parts = content
			.split(/(\*\*.*?\*\*)/g)
			.map((part, i) => (part.startsWith('**') && part.endsWith('**') ? React.createElement('strong', {key: i}, part.slice(2, -2)) : part));

		return React.createElement(React.Fragment, {key: lineIndex}, React.createElement(Tag, null, parts), React.createElement('br'));
	});
}
