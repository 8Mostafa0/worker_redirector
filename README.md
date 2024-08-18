## Proxy Worker Script
This repository contains a Cloudflare Worker script that acts as a simple proxy. The script forwards HTTP requests to a target server while allowing you to specify parameters such as the domain, username, and password through the URL query string. The script also ensures that the request method (GET, POST, PUT, DELETE, etc.) is preserved during the forwarding process.

# Features
Supports All HTTP Methods: The worker forwards requests using the same HTTP method as the original request (e.g., GET, POST, PUT, DELETE).
Dynamic Parameter Handling: The domain, username, password, and additional parameters can be passed via the query string, which the worker then forwards appropriately.
Security Check: The script includes basic validation for the username and password to ensure only authorized requests are forwarded.
URL Decoding: Automatically detects and decodes URL-encoded domain names.
# Usage
Query Parameters
dom: (Required) The target domain to which the request should be forwarded. Must be included in the query string.
use: (Required) The username for validation. If not provided or invalid, the request will be rejected.
pass: (Required) The password for validation. If not provided or invalid, the request will be rejected.
Additional parameters: Any other query parameters will be included in the request to the target domain.
# Example
bash
```
curl "https://your-worker-domain.com?dom=https%3A%2F%2Fexample.com&use=mosielite&pass=mosielite&param1=value1&param2=value2"
```
This example forwards a request to https://example.com, passing param1=value1 and param2=value2 as parameters. The request will only proceed if the correct username and password are provided.

# Error Handling
If the dom parameter is missing, the worker responds with 400 Bad Request.
If the username or password is missing or incorrect, the worker responds with 400 Bad Request.
Deployment
Clone the repository.
Customize the worker script if necessary.
Deploy the script using the Cloudflare Workers interface or via the Wrangler CLI.
bash
```
wrangler publish
```
