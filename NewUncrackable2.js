function bypass_root_detection() {
    Java.perform(function() {
        var b_class = Java.use("sg.vantagepoint.a.b");
        b_class.a.implementation = function () {
            return false;
        };

        b_class.b.implementation = function () {
            return false;
        };

        b_class.c.implementation = function() {
            return false;
        };
    });
    console.log("[+] Root detection bypassed.");
}

function retrieve_secret() {
    console.log("[+] Attach strncmp and monitor secret comparisons...");
    Interceptor.attach(Module.findExportByName("libc.so", "strncmp"), {
        onEnter: function(args) {         
            var input = Memory.readUtf8String(args[0]);
            var secret = Memory.readUtf8String(args[1]);

            if (input.startsWith("AAAA")) {
                console.log(`[+] Found secret: ${secret}`);
                var file = new File("/data/local/tmp/secret.txt", "w");
                file.write(secret);
                file.close();
                console.log("[+] Secret saved to /data/local/tmp/secret.txt");
            }
        },
    });
}

function monitor_app_lifecycle() {
    Java.perform(function() {
        var MainActivity = Java.use("sg.vantagepoint.uncrackable2.MainActivity");
        MainActivity.onResume.implementation = function() {
            console.log("[+] onResume hooked. App is running.");
            this.onResume();
        };
    });
}

bypass_root_detection();
retrieve_secret();
monitor_app_lifecycle();
