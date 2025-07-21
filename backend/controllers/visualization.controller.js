const { loadPyodide } = require("pyodide");

// Function to execute Python code and generate execution steps
async function executePythonCode(code) {
    const pyodide = await loadPyodide();

    // Load the tracing function into Pyodide
    await pyodide.runPythonAsync(`
import sys
import json
import types

execution_steps = []

def make_json_serializable(value):
    if isinstance(value, (int, float, bool, type(None), str)):
        return value
    elif isinstance(value, (tuple, set)):
        return list(value)
    elif isinstance(value, dict):
        return {k: make_json_serializable(v) for k, v in value.items()}
    elif isinstance(value, list):
        return [make_json_serializable(v) for v in value]
    elif hasattr(value, '__dict__'):
        obj = {k: make_json_serializable(v) for k, v in value.__dict__.items()}
        obj['type'] = type(value).__name__
        return obj
    else:
        return str(value)

def trace_function(frame, event, arg):
    if event == "line":
        local_vars = frame.f_locals
        line_no = frame.f_lineno
        function_name = frame.f_code.co_name

        serializable_vars = []
        for var, value in local_vars.items():
            if var.startswith('__') or isinstance(value, (types.BuiltinFunctionType, type)):
                continue
            try:
                serializable_vars.append({
                    "name": var,
                    "value": make_json_serializable(value),
                    "type": type(value).__name__
                })
            except:
                pass

        execution_steps.append({
            "line": line_no,
            "function": function_name,
            "local_vars": serializable_vars,
            "description": f"Executing line {line_no} in {function_name}"
        })

    return trace_function

def execute_code(user_code):
    global execution_steps
    execution_steps = []

    local_scope = {}
    try:
        compiled = compile(user_code, "<string>", "exec")
        sys.settrace(trace_function)
        exec(compiled, {}, local_scope)
    except Exception as e:
        execution_steps.append({"error": str(e)})
    finally:
        sys.settrace(None)

    filtered_steps = [
        step for step in execution_steps
        if step.get("local_vars") or step.get("function") != "<module>" or "error" in step
    ]
    return json.dumps(filtered_steps, indent=4)
  `);

    try {
        const wrappedCode = `
def __user_main__():
${code
.split("\n")
.map(line => "    " + line)
.join("\n")}

__user_main__()`;
        // Pass the code correctly as a string argument
        const traceResults = await pyodide.runPythonAsync(`execute_code(${JSON.stringify(wrappedCode)})`);
        return JSON.parse(traceResults);
    } catch (error) {
        throw new Error(`Execution error: ${error.message}`);
    }
}

module.exports = {
    executePythonCode,
};