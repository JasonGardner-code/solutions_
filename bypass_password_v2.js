Java.perform(function () {
    // Find the native function in libnative-lib.so
    var lib = Module.findExportByName("libnative-lib.so", "Java_com_optiv_ndkcrackme_MainActivity_b");

    if (lib) {
        console.log("Found function: " + lib);

        // Hook the function
        Interceptor.attach(lib, {
            onEnter: function (args) {
                try {
                    // Attempt to decode the input string safely
                    var input = Memory.readUtf8String(args[1]);
                    console.log("Intercepted password check. Input: " + input);
                } catch (e) {
                    console.log("Error decoding input string: " + e.message);
                }
            },
            onLeave: function (retval) {
                console.log("Original return value: " + retval.toInt32());
                retval.replace(1); // Overwrite return value to indicate success
                console.log("Modified return value: " + retval.toInt32());
            }
        });

        console.log("[X] Password bypass hook installed.");
    } else {
        console.log("Failed to find target function in libnative-lib.so.");
    }
});

