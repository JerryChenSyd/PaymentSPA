# It is an Angular4 SPA application implemented by Visual Sudio 2017 community version with Node.js( v8.9.4+) and ASP.NET Core 2 Web API.
# Client-side using Angular 4 and Http service to post data to server
# Client-side using the bootstrap 3 to produce the responsive UI
# Serve-side using ASP.NET Core 2 Web API to handle the request
# Using Jasmine and Karma for the client side unit test and test runner
# Using Xunit and Moq for server side unit test and mock library, using Visual Studio Test Explorer as the test runner
# Client-side log using JSNLog framework to log the main activities and post the log event date to the server side.
# Server-side log using NLog framwork to log the event from both server-side and client-side events.
# Payment data is valid in both client and server side  and stored in a text file and the file path is the "PaymentsData/Payments.txt" under the project workspace.
# The main activity log file path is "${basedir}/LogData/nlog-own-transaction-${shortdate}.log", here base dir is the ASP.NET Core 2 application standard output path. For example, in the debug mode, the log path is "bin\Debug\netcoreapp2.0\LogData\nlog-own-transaction-${shortdate}.log"
# The client-side unit test is set using Chrome broswer,so make sure Chrome browser is installed in the build and test machine.
# Follow this intruction for the Karma testing: First, open a command prompt in the directory where the .csproj file is located and run this command "karma start .\ClientApp\test\karma.conf.js".
