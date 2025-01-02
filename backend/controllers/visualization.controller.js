const { loadPyodide } = require("pyodide");

// list of steps(objects) of the execution of the py code 
let executionSteps = [];

// executes and return the steps in JSON
async function executePythonCode(code) {
    executionSteps = [];
    currentIndex = 0;
  
    const pyodide = await loadPyodide();
  
    pyodide.runPython(`
  import sys
  import json
  import types
  
  execution_steps = []
  
  def trace_function(frame, event, arg):
      if event == "line":
          local_vars = frame.f_locals
          line_no = frame.f_lineno
          function_name = frame.f_code.co_name
  
          # Serialize local variables and handle non-serializable objects
          serializable_vars = {}
          for var, value in local_vars.items():
              # Filter out large built-in objects like __builtins__ and others
              if var.startswith('__') or isinstance(value, (types.BuiltinFunctionType, type)):
                  continue
              try:
                  serializable_vars[var] = str(value)  # Convert to string if not serializable
              except Exception:
                  serializable_vars[var] = str(type(value))  # Fallback to type if conversion fails
  
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
      try:
          sys.settrace(trace_function)
          exec(user_code, {})
      except Exception as e:
          execution_steps.append({"error": str(e)})
      finally:
          sys.settrace(None)
      return json.dumps(execution_steps)
    `);
  
    try {
      const traceResults = pyodide.runPython(`execute_code('''${code.replace(/'/g, "\\'")}''')`);
      executionSteps = JSON.parse(traceResults);
      
    } catch (error) {
      throw new Error("Execution error: " + error.message);
    }
  }
  
module.exports = executePythonCode;