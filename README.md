gl2js
=====

Convert GLSL files to JSON or JS code for use in projects

No actual GL conversion code take place, just text transfer and dropping some newline/carriage returns for minimization purposes.

With either JS or JSON output, an object is created with each shader name as the key. Each shader is an additional object containing vertex and fragment keys.
Shader code text is assigned to each key.

For JSON output, the shader object is stringified and written.
For JS ouput, the shader object is stringfied and ouput with an "export default" in front of it for JS modules or if modules aren't desired,
allows a custom assignment in front of it.

Options
-------

* Files/Globs:
Any parameter can be a file or glob. Multiple files or globs are accepted

* Output
"output" option specifies file to write to. If a JSON extension is used, the options below don't apply

* Modules
"module" option can be true to use module exports
Ouput will be "export default { ...shaders... }"

* Assign To
If Modules aren't used, then "assignto" option can be used set shader object to a variable
Ouput will be "x = { ...shaders... }" where "x" is the option we set. Other potentially useful options for "assignto"
could be "var x", "window.x", or "myobject.shaders"

Example Usage
-------------

* node index.js **/*.glsl output=./shaders.js variable=x
* node index.js **/*.glsl output=./shaders.js variable='var x'
* node index.js **/*.glsl output=./examples/shaders.js assignto=window.x
* node index.js examples/*.glsl output=./examples/shaders.json
