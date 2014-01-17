khs-grokola-ui
==============

Javascript UI side for khs-command-ref, A web application that provides a reference and solutions repository for Software and Operating Systems.


Development Environment Setup
=============================

IDE 
---
Webstorm, or any IDE that supports javascript

Node.js
-------
Browse to http://nodejs.org and follow the download and installation instructions found there.

Database 
--------
see khs-command-ref readme.

Architecture
------------
Client: Node,Backbone,Require,Bootstrap SPA
Sever Side (see khs-command-ref): Java, Sherpa enabled restful endpoints, Spring IOC, JPA/Hibernate

Setup 
-----
Install Node.js (see above)

Use git to clone the project from github.

To start and run from command line, got the the khs-grokola-ui directory. Type node server/server.js

Start khs-command-ref which runs on port 9080.

Go to http://localhost:8080/khs-command-ref


JavaScript Folder Structure
===========================

Public User Interface 
---------------------
Public cgrok UI elements are located in the client/responsive folder

Models
------
Backbone.js models are defined in client/model

Admin User Interface
--------------------
client/admin

Node Settings
-------------
server/server.js contains everything needed to start up using Node.
server/config/config.json controls what ports it will run on and the connection to the server side Java endpoints.
node_modules directory contains all the required files that would come in from npm.
package.json has the dependencies for npm and what packages will be installed








