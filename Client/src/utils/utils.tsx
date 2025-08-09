import React from 'react';

export const Capitalize = (sentence: string) => {
	return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export function renderFormattedText(text: string) {
	// Split on line breaks first
	return text.split('\n').map((line, lineIndex) => {
		// Inside each line, split into bold/non-bold parts
		const parts = line.split(/(\*\*.*?\*\*)/g);

		return (
			<React.Fragment key={lineIndex}>
				{parts.map((part, i) => (part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part))}
				<br />
			</React.Fragment>
		);
	});
}
