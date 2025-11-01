import PropTypes from "prop-types";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CodeExplanation = ({ explanation }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(explanation);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Error during copy", err);
		}
	};

	return (
		<div className='text-gray-900 w-full max-w-4xl mt-6 bg-gray-50 p-6 rounded-2xl shadow-lg '>
			<div className='flex items-center justify-between mb-2'>
				<h2 className=' text-xl font-semibold mb-2'>Explanation</h2>
				<button
					onClick={handleCopy}
					className='text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition'>
					{copied ? "Скопировано ✅" : "Копировать"}
				</button>
			</div>

			<Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
		</div>
	);
};

CodeExplanation.propTypes = {
	explanation: PropTypes.string.isRequired,
};

export default CodeExplanation;
