# What I learned
https://nguyentoanuit.wordpress.com/2017/11/25/setup-asp-net-core-react-redux/https://stackoverflow.com/questions/22842691/what-is-the-meaning-of-the-dist-directory-in-open-source-projects
## Webpack
* webpack.config.js
* is used to specify things like dist and boot-client
* 4 main concepts
    1. entry
        * entry: { 'main-client': './ClientApp/boot-client.tsx' }
        * entry: { 'main-server': './ClientApp/boot-server.tsx' }
    2. output
    3. loader
    4. plugin
* webpack.config.vendor.js
	* problem: Cannot find module './wwwroot/dist/vendor-manifest.json'
	* node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js
	* node node_modules/webpack/bin/webpack.js


* dist folders (dist = distribution) production files generated/compiled to be sent to the browser
    * these are generated upon compilation
    * these folders exist in wwwroot and ClientApp
    * in these folders exists vendor.js
        * 3rd party dependecies are smushed together here to be shipped to the client

* boot-client.js & boot-server.js
    * this is like your main class with your main method 
    * webpack needs to know where this for entry

* main-client.js & main-server.js
    * main-server is referenced for prerendering
        * ```<app asp-prerender-module="ClientApp/dist/main-server">Loading...</app>```
    * For clarity's sake, main-server.js & main-client file is an artifact of the TypeScript-to-JavaScript transpilation task in the Webpack build process.

## TypeScript
* ts vs tsx
    * tsx is typescript with the ability to use xml allowing you to write html as a type
* tsx is exactly that, it is typescript with xml not html
	* the xml is converted into html but we use the attribute className instead of class
	* REASON!!!!! we have to avoid javascript keywords like, class, for, if
		* class -> className
		* for -> htmlFor

## JavaScriptServices
* https://docs.microsoft.com/en-us/aspnet/core/client-side/spa-services?view=aspnetcore-2.2
* consists of 3 different nuget packages
1. NodeServices
    * node as in node.js
    * so you can run javascript on the server
2. SpaServices
    * Spa stands for single page application
    * to make using Single page application frameworks EASIER
    * allows for
        * serverside pre-rendering
        * index.cshtml -> asp-prerender-module
        * webpack dev middleware
        * hot module replacement
        * routing helpers
3. SpaTemplates
    * build client side assets with webpack
## Redux
* a redux like architecture is generally required WHEN you have a large application that needs server side rendering with isomorphic rendering
* without redux there is only 1 boot.tsx required

## React
 * 2 types of components
	* stateless functional components
	* stateful object components
* where to initialize data
	* https://medium.com/@marikalam/react-basic-constructor-componentdidmount-and-render-9476f8d28f0f

## Quest to implement login/register
* https://fullstackmark.com/post/13/jwt-authentication-with-aspnet-core-2-web-api-angular-5-net-core-identity-and-facebook-login
* http://blogs.interknowlogy.com/2016/09/22/keeping-net-app-settings-secrets-out-of-source-control/


## Routers
* react router 
	* the base for a router
* react router dom
	* wrapper of react router that runs in the browser
	* there is a react router native (for react native applications)
* react router redux
	* similar to react router dom
	* router in sync with application state
* https://stackoverflow.com/questions/43185222/what-is-difference-between-react-router-4-0-react-router-dom-and-react-router-r

## Entity framework
* Migrations
	* `dotnet ef migrations add [name for the migration]`
		* this can be used to create OR update a class
		* generates a migration file for this
		* requires being able to build the project
	* `dotnet ef database update`
		* this applies migrations to the database
		* requires being able to build the project
	* https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/

## SignalR
* how to authenticate signalr
	* https://docs.microsoft.com/en-us/aspnet/core/signalr/authn-and-authz?view=aspnetcore-2.2
* signalr at microsoft build (things have changed since though)
	* https://www.youtube.com/watch?v=1TrttIkbs6c

## bugs found
* SignalR Hub disposes userManager before async Tasks finish
	* solution is to avoid using async methods
	* async methods outlive the lifetime of the disposed dbcontext