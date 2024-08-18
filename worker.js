addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);

    // Extract all query parameters
    const searchParams = url.searchParams;

    // Extract the domain from query parameters
    const domain = searchParams.get('dom');
    if (!domain) {
        return new Response('Missing "domain" parameter in query string.', { status: 400 });
    }
    const password = searchParams.get('pass');
    const username = searchParams.get('use');
    if(!username){
        return new Response('Username Not Set.', { status: 400 });
    }
    if(!password){
        return new Response('Password Not Set.', { status: 400 });
    }
    if(password !== "mosielite"){
        return new Response('Invalied Password.', { status: 400 });
    }
    if(username !== "mosielite"){
        return new Response('Invalied Username.', { status: 400 });
    }
    if (domain.includes('%')) {
        domain = decodeURIComponent(domain);
    }
    // Construct the target URL
    let targetUrl = `${domain}`;

    // Remove the domain parameter from the query string since it is now part of the target URL
    searchParams.delete('dom');
    searchParams.delete('pass');
    searchParams.delete('use');

    // Convert remaining searchParams to a query string
    const queryString = new URLSearchParams(searchParams).toString();

    // Prepare the fetch options
    let fetchOptions = {
        method: request.method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    // Include the request body for methods that allow a body (POST, PUT, DELETE, etc.)
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
        fetchOptions.body = queryString;
    } else {
        // For GET or HEAD, add parameters to the URL
        if (queryString) {
            targetUrl += `?${queryString}`;
        }
    }

    // Forward the request
    const response = await fetch(targetUrl, fetchOptions);

    // Return the response from the target server
    return new Response(await response.text(), {
        headers: { 'Content-Type': 'text/html' },
    });
}