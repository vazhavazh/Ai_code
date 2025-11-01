import { useActionState, useState } from "react";
import { explain } from "../../actions";
import CodeExplanation from "../CodeExplanation";
import Error from "../Error";

const CodeExplainForm = () => {
	const [formState, formAction, isPending] = useActionState(explain, null);
	const [code, setCode] = useState("");
	return (
		<div className='w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg'>
			<form action={formAction}>
				<label className='block mb-2 font-semibold text-gray-900'>
					Language:{" "}
				</label>
				<select
					name='language'
					className='border rounded-lg p-2 w-full mb-4 bg-gray-400 cursor-pointer'>
					<option
						className='text-gray-900'
						value='javascript'>
						JavaScript
					</option>
					<option
						className='text-gray-900'
						value='python'>
						Python
					</option>
					<option
						className='text-gray-900'
						value='java'>
						Java
					</option>
				</select>

				<label className='block font-semibold mb-2 text-gray-900'>
					Your Code:
				</label>
				<textarea
					name='code'
					required
					placeholder='Paste your code ...'
					className='border rounded-lg w-full p-3 font-mono text-sm bg-gray-400 min-h-[150px]'
					value={code}
					onChange={(e) => setCode(e.target.value)}
				/>
				<button
					disabled={isPending}
					type='submit'
					className='cursor-pointer mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50'>
					{isPending ? "Объяснение" : "Объяснение кода"}
				</button>
			</form>
			{isPending ? (
				<p className='bg-gray-300 my-3 w-64 p-2 rounded-sm'>Думаю...</p>
			) : formState?.success ? (
				<CodeExplanation explanation={formState?.data.explanation} />
			) : (
				formState?.success === "false" && <Error error={formState?.error} />
			)}
		</div>
	);
};

export default CodeExplainForm;
