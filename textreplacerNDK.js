Java.perform(function () {
    console.log("Starting text replacer...");

    var TextView = Java.use("android.widget.TextView");

    TextView.setText.overloads.forEach(function (overload) {
        overload.implementation = function (arg1) {
            if (arg1 && arg1.toString) {
                var originalText = arg1.toString();
                console.log("Original Text: " + originalText);

                // Prevent modifying already modified text
                if (!originalText.includes("Access granted")) {
                    var replacedText = originalText.replace("Password rejected!", "Access granted!");
                    console.log("Replaced Text: " + replacedText);

                    // Ensure correct type
                    var javaString = Java.use("java.lang.String").$new(replacedText);
                    return overload.call(this, javaString);
                }
            }
            return overload.call(this, arg1);
        };
    });

    console.log("Text replacer installed.");
});  