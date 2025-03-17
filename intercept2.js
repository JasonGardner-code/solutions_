setImmediate(function() {
    console.log("[*] Waiting for Traffic...");
    
    Java.perform(function() {
        try {
            var red = '\u001b[31m', green = '\u001b[32m', reset = '\u001b[0m';

            // Try hooking OkHttpClient
            try {
                var okhttp3Client = Java.use('okhttp3.OkHttpClient');
                console.log(green + "[*] Found okhttp3" + reset);
                var originalNewCall = okhttp3Client.newCall.overload('okhttp3.Request');

                originalNewCall.implementation = function(request) {
                    console.log(red + "[API Call] " + request.method() + " " + request.url() + reset);
                    return this.newCall(request);
                };
            } catch (e) {
                console.log(red + "[!] OkHttp3 not found." + reset);
            }

            // Try hooking Retrofit
            try {
                var retrofit = Java.use('retrofit2.Retrofit');
                console.log(green + "[*] Found Retrofit" + reset);
            } catch (e) {
                console.log(red + "[!] Retrofit not found." + reset);
            }

            // Try hooking HttpURLConnection
            try {
                var httpURLConnection = Java.use('java.net.HttpURLConnection');
                console.log(green + "[*] Found HttpURLConnection" + reset);

                httpURLConnection.connect.implementation = function() {
                    console.log(red + "[API Call] HttpURLConnection " + this.getURL().toString() + reset);
                    return this.connect();
                };
            } catch (e) {
                console.log(red + "[!] HttpURLConnection not found." + reset);
            }

            // Try hooking Apache HttpClient
            try {
                var apacheHttpClient = Java.use('org.apache.http.impl.client.DefaultHttpClient');
                console.log(green + "[*] Found Apache HttpClient" + reset);
            } catch (e) {
                console.log(red + "[!] Apache HttpClient not found." + reset);
            }

        } catch (e) {
            console.log(red + "[Error] " + e.message + reset);
        }
    });
});
